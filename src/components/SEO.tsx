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
    ogImageAlt,
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

  // Ensure absolute URLs for images (Open Graph protocol requires absolute URLs)
  const absoluteOgImage = ogImage 
    ? (ogImage.startsWith('http') ? ogImage : `https://www.olynkai.com${ogImage.startsWith('/') ? ogImage : '/' + ogImage}`)
    : 'https://www.olynkai.com/assets/olynk-social-preview.png';
  
  // Ensure canonical URL is absolute (Open Graph protocol requires absolute URLs)
  const absoluteCanonical = canonical 
    ? (canonical.startsWith('http') ? canonical : `https://www.olynkai.com${canonical.startsWith('/') ? canonical : '/' + canonical}`)
    : 'https://www.olynkai.com';
  
  // Default image alt text if not provided (Open Graph protocol recommends og:image:alt)
  const imageAlt = ogImageAlt || description || `${title} - OLYNK Intelligence OS`;

  return (
    <>
      <Helmet>
        {/* Open Graph Protocol HTML prefix - Recommended by https://ogp.me/ */}
        <html prefix="og: https://ogp.me/ns#" />
        
        {/* Basic meta tags */}
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords.join(', ')} />
        <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
        
        {/* Open Graph Protocol - Required Properties */}
        {/* Reference: https://ogp.me/ */}
        <meta property="og:title" content={title} />
        <meta property="og:type" content={ogType || 'website'} />
        <meta property="og:url" content={absoluteCanonical} />
        <meta property="og:image" content={absoluteOgImage} />
        
        {/* Open Graph Protocol - Recommended Optional Properties */}
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content="OLYNK" />
        
        {/* Open Graph Protocol - Structured Properties for og:image */}
        {/* Per spec: "If the page specifies an og:image it should specify og:image:alt" */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={imageAlt} />
        <meta property="og:image:secure_url" content={absoluteOgImage.replace('http://', 'https://')} />
        
        {/* Twitter Card tags - All required tags */}
        <meta name="twitter:card" content={twitterCard || 'summary_large_image'} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={absoluteOgImage} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={absoluteCanonical} />
        
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

