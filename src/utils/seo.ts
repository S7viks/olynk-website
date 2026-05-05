// SEO Utility Functions

import { BRAND_LOCKUP, CANONICAL_BASE_URL, COMPANY_NAME, PLATFORM_NAME, absoluteUrl } from "../config/brand";

export interface SEOProps {
  title: string;
  description: string;
  keywords: string[];
  canonical?: string;
  ogImage?: string;
  ogImageAlt?: string; // Recommended by Open Graph protocol: "If the page specifies an og:image it should specify og:image:alt"
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
  return absoluteUrl(path);
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
      "item": absoluteUrl(item.href)
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
    "name": COMPANY_NAME,
    "url": CANONICAL_BASE_URL,
    "logo": absoluteUrl("/assets/olynk-social-preview.png"),
    "description": `${BRAND_LOCKUP} is built for high-velocity commerce operations. Rehearse the future before you live it.`,
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
      CANONICAL_BASE_URL
    ]
  };
};

// Generate software application structured data
export const generateSoftwareStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": PLATFORM_NAME,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "description": `${PLATFORM_NAME} is a simulation-first operating system for founders. Rehearse the future before you live it.`,
    "publisher": {
      "@type": "Organization",
      "name": COMPANY_NAME,
      "url": CANONICAL_BASE_URL
    },
    "offers": {
      "@type": "Offer",
      "price": "15000",
      "priceCurrency": "INR",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "15000",
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
    "Autonomous commerce",
    "operational intelligence",
    "stockout prediction",
    "RTO prevention",
    "ROAS monitoring",
    "inventory management",
    "AI operations",
    "commerce OS"
  ],
  about: [
    `${COMPANY_NAME} company`,
    "operational intelligence India",
    "autonomous commerce technology",
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
    `${PLATFORM_NAME} pricing`,
    "AI operations cost",
    "autonomous commerce pricing",
    "retail AI pricing India",
    "operational intelligence cost"
  ],
  contact: [
    `contact ${COMPANY_NAME}`,
    "operational support",
    "commerce consultation",
    "retail AI demo",
    "operational intelligence contact"
  ],
  promo: [
    `${PLATFORM_NAME} promo`,
    `${PLATFORM_NAME} discount`,
    "special offer",
    "limited time offer",
    "AI operations promo"
  ]
};

// Page-specific SEO configurations
export const PAGE_SEO: Record<string, SEOProps> = {
  home: {
    title: `${BRAND_LOCKUP} | Rehearse the future before you live it`,
    description: `${PLATFORM_NAME} helps founders rehearse the future before they live it. Simulation-first operational intelligence for high-velocity commerce.`,
    keywords: SEO_KEYWORDS.home,
    canonical: CANONICAL_BASE_URL,
    ogImage: absoluteUrl("/assets/olynk-social-preview.png"),
    ogType: "website",
    twitterCard: "summary_large_image",
    structuredData: generateOrganizationStructuredData()
  },
  about: {
    title: `About ${COMPANY_NAME} | The team behind ${PLATFORM_NAME}`,
    description: `${COMPANY_NAME} builds ${PLATFORM_NAME}, a simulation-first operating system for founders. We turn scattered signals into decisions you can rehearse.`,
    keywords: SEO_KEYWORDS.about,
    canonical: absoluteUrl("/about"),
    ogImage: absoluteUrl("/assets/olynk-social-preview.png"),
    ogType: "website",
    twitterCard: "summary_large_image"
  },
  pricing: {
    title: `${PLATFORM_NAME} Pricing | Plans`,
    description: `Pricing for ${PLATFORM_NAME}. Starting at ₹15K/month. Simulation-first operational intelligence for founders.`,
    keywords: SEO_KEYWORDS.pricing,
    canonical: absoluteUrl("/pricing"),
    ogImage: absoluteUrl("/assets/olynk-social-preview.png"),
    ogType: "website",
    twitterCard: "summary_large_image"
  },
  contact: {
    title: `Contact ${COMPANY_NAME} | Book a demo of ${PLATFORM_NAME}`,
    description: `Book a demo of ${PLATFORM_NAME}. Founder-facing, simulation-first operational intelligence.`,
    keywords: SEO_KEYWORDS.contact,
    canonical: absoluteUrl("/request-demo"),
    ogImage: absoluteUrl("/assets/olynk-social-preview.png"),
    ogType: "website",
    twitterCard: "summary_large_image"
  },
  waitlist: {
    title: `Join the ${PLATFORM_NAME} waitlist | Early access`,
    description: `Early access to ${PLATFORM_NAME}. Simulation-first operational intelligence for founders.`,
    keywords: SEO_KEYWORDS.home,
    canonical: absoluteUrl("/waitlist"),
    ogImage: absoluteUrl("/assets/olynk-social-preview.png"),
    ogType: "website",
    twitterCard: "summary_large_image"
  }
};

// Helper function to create promo-specific SEO
export const createPromoSEO = (
  promoTitle: string,
  promoDescription: string,
  promoUrl: string,
  promoImage?: string,
  promoImageAlt?: string,
  customKeywords?: string[]
): SEOProps => {
  return {
    title: promoTitle,
    description: promoDescription,
    keywords: customKeywords || SEO_KEYWORDS.promo,
    canonical: promoUrl,
    ogImage: promoImage || absoluteUrl("/assets/olynk-social-preview.png"),
    ogImageAlt: promoImageAlt || promoDescription,
    ogType: "website",
    twitterCard: "summary_large_image"
  };
};

// Get SEO config for a specific page
export const getPageSEO = (pageName: string, customSEO?: Partial<SEOProps>): SEOProps => {
  const pageSEO = PAGE_SEO[pageName] || DEFAULT_SEO;
  return { ...pageSEO, ...customSEO };
};

// Default SEO settings
export const DEFAULT_SEO: SEOProps = {
  title: `${BRAND_LOCKUP} | Rehearse the future before you live it`,
  description: `${PLATFORM_NAME} helps founders rehearse the future before they live it. Simulation-first operational intelligence.`,
  keywords: SEO_KEYWORDS.home,
  canonical: CANONICAL_BASE_URL,
  ogImage: absoluteUrl("/assets/olynk-social-preview.png"),
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
    { property: "og:site_name", content: COMPANY_NAME },
    
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