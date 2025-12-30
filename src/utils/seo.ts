// SEO Utility Functions

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
    "logo": "https://olynk.ai/assets/Olynk.AI_Logo.png",
    "description": "The intelligence operating system for autonomous commerce. Predict problems 10 days before they happen and execute decisions in real-time.",
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
    "name": "OLYNK Intelligence OS",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "description": "OLynk is the intelligence operating system for autonomous commerce. Predict problems 10 days before they happen and execute decisions in real-time.",
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
    "OLYNK company",
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
    "OLYNK pricing",
    "AI operations cost",
    "autonomous commerce pricing",
    "retail AI pricing India",
    "operational intelligence cost"
  ],
  contact: [
    "contact OLYNK",
    "operational support",
    "commerce consultation",
    "retail AI demo",
    "operational intelligence contact"
  ],
  promo: [
    "OLYNK promo",
    "OLYNK discount",
    "special offer",
    "limited time offer",
    "AI operations promo"
  ]
};

// Page-specific SEO configurations
export const PAGE_SEO: Record<string, SEOProps> = {
  home: {
    title: "OLYNK | The AI Brain for Business Operations",
    description: "Predict problems. Automate decisions. Run your business on autopilot. OLynk sits above your tools to build a live operational model that acts autonomously 24/7.",
    keywords: SEO_KEYWORDS.home,
    canonical: "https://olynk.ai",
    ogImage: "https://olynk.ai/assets/Olynk.AI_Logo.png",
    ogType: "website",
    twitterCard: "summary_large_image",
    structuredData: generateOrganizationStructuredData()
  },
  about: {
    title: "About OLYNK | Our Mission & Vision",
    description: "Learn about OLYNK's mission to build the intelligence operating system for autonomous commerce. We turn scattered data into smart decisions.",
    keywords: SEO_KEYWORDS.about,
    canonical: "https://olynk.ai/about",
    ogImage: "https://olynk.ai/assets/Olynk.AI_Logo.png",
    ogType: "website",
    twitterCard: "summary_large_image"
  },
  pricing: {
    title: "OLYNK Pricing | Plans for Autonomous Commerce",
    description: "Choose the right OLYNK plan for your business. Starting at ₹15K/month. Scale your operations with the AI brain for business.",
    keywords: SEO_KEYWORDS.pricing,
    canonical: "https://olynk.ai/pricing",
    ogImage: "https://olynk.ai/assets/Olynk.AI_Logo.png",
    ogType: "website",
    twitterCard: "summary_large_image"
  },
  contact: {
    title: "Contact OLYNK | Book a Demo",
    description: "Contact OLYNK for operational intelligence support, commerce consultation, or to book a demo. Transform your operations today.",
    keywords: SEO_KEYWORDS.contact,
    canonical: "https://olynk.ai/contact",
    ogImage: "https://olynk.ai/assets/Olynk.AI_Logo.png",
    ogType: "website",
    twitterCard: "summary_large_image"
  },
  waitlist: {
    title: "Join OLYNK Waitlist | Early Access",
    description: "Join the OLYNK waitlist for early access to the AI brain for business operations. Be among the first to experience autonomous commerce.",
    keywords: SEO_KEYWORDS.home,
    canonical: "https://olynk.ai/waitlist",
    ogImage: "https://olynk.ai/assets/Olynk.AI_Logo.png",
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
    ogImage: promoImage || "https://olynk.ai/assets/Olynk.AI_Logo.png",
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
  title: "OLYNK | The AI Brain for Business Operations",
  description: "Predict problems. Automate decisions. Run your business on autopilot. OLynk sits above your tools to build a live operational model that acts autonomously 24/7.",
  keywords: SEO_KEYWORDS.home,
  canonical: "https://olynk.ai",
  ogImage: "https://olynk.ai/assets/Olynk.AI_Logo.png",
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