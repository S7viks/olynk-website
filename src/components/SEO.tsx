import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SEOProps, generateMetaTags, generateStructuredData } from '../utils/seo';

interface SEOComponentProps extends SEOProps {
  children?: React.ReactNode;
}

const SEO: React.FC<SEOComponentProps> = (props) => {
  const {
    title,
    description,
    keywords,
    canonical,
    ogImage,
    ogType,
    twitterCard,
    structuredData,
    noIndex,
    children
  } = props;

  const metaTags = generateMetaTags({
    title,
    description,
    keywords,
    canonical,
    ogImage,
    ogType,
    twitterCard,
    noIndex
  });

  const structuredDataJson = structuredData 
    ? generateStructuredData({ ...props, structuredData })
    : generateStructuredData(props);

  return (
    <>
      <Helmet>
        {/* Basic meta tags */}
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords.join(', ')} />
        <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
        
        {/* Open Graph tags */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content={ogType || 'website'} />
        {canonical && <meta property="og:url" content={canonical} />}
        {ogImage && <meta property="og:image" content={ogImage} />}
        {ogImage && <meta property="og:image:width" content="1200" />}
        {ogImage && <meta property="og:image:height" content="630" />}
        <meta property="og:site_name" content="OLYNK" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content={twitterCard || 'summary_large_image'} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        {ogImage && <meta name="twitter:image" content={ogImage} />}
        
        {/* Canonical URL */}
        {canonical && <link rel="canonical" href={canonical} />}
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredDataJson)}
        </script>
      </Helmet>
      {children}
    </>
  );
};

export default SEO;

