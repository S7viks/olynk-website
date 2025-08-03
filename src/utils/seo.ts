// SEO Utility Functions

export interface SEOProps {
  title: string;
  description: string;
  keywords: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  structuredData?: object;
  noIndex?: boolean;
}



export interface BreadcrumbItem {
  label: string;
  href: string;
}

// Generate canonical URL
export const generateCanonicalUrl = (path: string): string => {
  const baseUrl = 'https://olynk.ai';
  return `${baseUrl}${path}`;
};



// Generate breadcrumb structured data
export const generateBreadcrumbStructuredData = (items: BreadcrumbItem[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `https://olynk.ai${item.href}`
    }))
  };
};

// Generate FAQ structured data
export const generateFAQStructuredData = (faqs: Array<{ question: string; answer: string }>) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

// Generate organization structured data
export const generateOrganizationStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "OLYNK",
    "url": "https://olynk.ai",
    "logo": "https://olynk.ai/assets/Olynk_Logo.png",
    "description": "AI-powered operations advisor for D2C brands in India",
    "foundingDate": "2024",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Hyderabad",
      "addressRegion": "Telangana",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-799-335-9150",
      "contactType": "customer service"
    },
    "sameAs": [
      "https://olynk.ai"
    ]
  };
};

// Generate software application structured data
export const generateSoftwareStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "OLYNK AI Operations Advisor",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "description": "AI-powered operations advisor that predicts problems before they happen for D2C brands",
    "offers": {
      "@type": "Offer",
      "price": "20000",
      "priceCurrency": "INR",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "20000",
        "priceCurrency": "INR",
        "unitText": "MONTH"
      }
    },
    "featureList": [
      "AI Data Unification Engine",
      "Smart Integration Orchestration",
      "AI Inventory Intelligence",
      "Smart Order Orchestration",
      "AI Communication Engine",
      "Operations Command Center",
      "Learning & Memory System"
    ]
  };
};

// SEO keywords for different page types
export const SEO_KEYWORDS = {
  home: [
    "AI operations advisor",
    "D2C operations management",
    "predictive inventory management",
    "AI retail automation India",
    "D2C system integration",
    "retail operations optimization"
  ],
  about: [
    "OLYNK company",
    "AI operations advisor India",
    "D2C technology company",
    "retail AI solutions",
    "operations automation"
  ],
  features: [
    "AI data unification",
    "smart integration orchestration",
    "AI inventory intelligence",
    "order orchestration",
    "AI communication engine",
    "operations command center"
  ],
  pricing: [
    "OLYNK pricing",
    "AI operations cost",
    "D2C automation pricing",
    "retail AI pricing India",
    "operations advisor cost"
  ],
  contact: [
    "contact OLYNK",
    "AI operations support",
    "D2C consultation",
    "retail AI demo",
    "operations advisor contact"
  ],

};

// Default SEO settings
export const DEFAULT_SEO: SEOProps = {
  title: "OLYNK - AI Operations Advisor for D2C Brands | Predict Problems Before They Happen",
  description: "Stop losing ₹2-5L monthly to stockouts and operational chaos. OLYNK's AI advisor predicts what's about to go wrong and tells you exactly how to fix it. Book demo today.",
  keywords: SEO_KEYWORDS.home,
  canonical: "https://olynk.ai",
  ogImage: "https://olynk.ai/assets/Logo111.png",
  ogType: "website",
  twitterCard: "summary_large_image"
};

// Generate meta tags for React Helmet
export const generateMetaTags = (seo: SEOProps) => {
  const metaTags = [
    // Basic meta tags
    { name: "description", content: seo.description },
    { name: "keywords", content: seo.keywords.join(", ") },
    { name: "robots", content: seo.noIndex ? "noindex, nofollow" : "index, follow" },
    
    // Open Graph tags
    { property: "og:title", content: seo.title },
    { property: "og:description", content: seo.description },
    { property: "og:type", content: seo.ogType || "website" },
    { property: "og:url", content: seo.canonical },
    { property: "og:image", content: seo.ogImage },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:site_name", content: "OLYNK" },
    
    // Twitter Card tags
    { name: "twitter:card", content: seo.twitterCard || "summary_large_image" },
    { name: "twitter:title", content: seo.title },
    { name: "twitter:description", content: seo.description },
    { name: "twitter:image", content: seo.ogImage },
    
    // Canonical URL
    { rel: "canonical", href: seo.canonical }
  ];

  return metaTags;
};

// Generate JSON-LD structured data
export const generateStructuredData = (seo: SEOProps) => {
  if (seo.structuredData) {
    return seo.structuredData;
  }
  
  // Default to organization structured data
  return generateOrganizationStructuredData();
};

// Utility function to truncate text for meta descriptions
export const truncateDescription = (text: string, maxLength: number = 160): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + "...";
};

// Generate URL-friendly slugs
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
};

// Extract reading time from content
export const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}; 