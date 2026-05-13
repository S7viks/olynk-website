/**
 * Landing Page Content Configuration
 * 
 * This file contains all content for the Trita customer development landing page.
 * Easy to edit and swap content for A/B testing without touching component code.
 */

// ============================================================================
// HEADLINE VARIATIONS (A/B Testing)
// ============================================================================

export const HEADLINES = {
    // Version A: Shock Value
    A: {
        main: "You're losing ₹8 lakhs every month to Stockouts and RTO.",
        emphasis: "The dashboards never showed you why.",
        subheadline: "Trita isolates the drivers, stress-tests interventions, and can create the PO automatically when policy allows. Causal operations—not another chart."
    },
    // Version B: Empathetic (DEFAULT for V1)
    B: {
        main: "Stop discovering Stockouts when",
        emphasis: "your customers do",
        subheadline: "Trita surfaces the causal drivers 10 days early—velocity, lead time, allocation, promos—and tells you exactly which lever to pull. No dashboards to babysit. No mystery moves."
    },
    // Version C: Problem-Focused
    C: {
        main: "Your operations are bleeding money",
        emphasis: "while correlations mislead you",
        subheadline: "Stockouts. RTO failures. Ad waste. Trita ranks what actually moves cash and service before you spend another ₹2-5L chasing the wrong fix."
    },
    // Version D: Relatable
    D: {
        main: "Modern commerce operations shouldn't feel like",
        emphasis: "pattern-matching in the dark",
        subheadline: "Trita watches your stack 24/7 with causal playbooks: when risk spikes, you see why—and what would change if you intervened. Stop reacting to noise. Start steering drivers."
    }
};

// Current active headline
export const ACTIVE_HEADLINE = 'B';

// ============================================================================
// TRUST ELEMENTS
// ============================================================================

export const TRUST_MICROCOPY = {
    primary: "Built for teams that need causal clarity, not more dashboards",
    pilots: "Currently working with pilot enterprises to validate driver models and governed actions",
    timeline: "See ranked drivers and first interventions in 7-10 days, not months"
};

// ============================================================================
// PAIN POINTS (Use founder's exact language)
// ============================================================================

export const PAIN_POINTS = [
    {
        id: 1,
        title: "The Sunday Night Stockout Panic",
        story: "It's 11 PM on Sunday. A customer just posted on Instagram that your hero SKU is out of stock. You had no idea. Tomorrow, you'll lose ₹2L in sales while you scramble to fix it.",
        impact: "Average cost: ₹2-5L per stockout incident",
        quote: "You find out about Stockouts when customers do - after they've already bounced to competitors."
    },
    {
        id: 2,
        title: "The RTO Black Hole",
        story: "You're losing 15-30% of every month's revenue to COD returns. Bad addresses. Failed deliveries. Repeat offenders. You know it's happening. You just can't predict which orders will fail.",
        impact: "Average loss: ₹3-8L monthly for ₹50L revenue operations",
        quote: "Every RTO costs you 2X - once for shipping, again for lost sale and customer."
    },
    {
        id: 3,
        title: "The Ad Money Bonfire",
        story: "Your Meta ROAS tanks overnight. By the time you notice on Monday morning, you've burned ₹3 lakhs. This happens every few weeks.",
        impact: "Average waste: ₹2-5L monthly in inefficient ad spend",
        quote: "You're spending money on ads for products that are out of stock. And you don't know until it's too late."
    },
    {
        id: 4,
        title: "The Dashboard Circus",
        story: "Shopify says you did ₹45L. Razorpay says ₹47L. Your accounting says ₹44L. You spend 2 hours every day just reconciling numbers across 10 tools.",
        impact: "Time cost: 15-20 hours weekly = ₹80K+ in leadership time",
        quote: "I have 12 tabs open just to understand what happened yesterday. Forget about predicting tomorrow."
    }
];

// ============================================================================
// WHAT TRITA DOES (No fluff, clear explanation)
// ============================================================================

export const CAPABILITIES = [
    {
        id: 1,
        title: "Explains stockouts before they happen",
        explanation: [
            "Models velocity, lead time, promos, and allocation as drivers—not single metrics",
            "Returns \"SKU X stockout risk in 10 days because of A + B\" with confidence",
            "Creates the PO automatically when your policy says it should"
        ],
        realExample: "Prevented 3 Stockouts in first 2 weeks for pilot enterprise A"
    },
    {
        id: 2,
        title: "Flags Orders That Will RTO",
        explanation: [
            "Scores every order before you ship it",
            "\"This order has an 85% chance of failing delivery\"",
            "You decide: verify address, switch to prepaid, or don't ship"
        ],
        realExample: "Flagged ₹2.1L in high-risk RTO orders for pilot enterprise B"
    },
    {
        id: 3,
        title: "Catches ROAS Bleeds in Real-Time",
        explanation: [
            "Monitors your ad spend every hour",
            "\"Campaign Y dropped from 3.2X to 1.8X ROAS - pausing now\"",
            "Reallocates budget to what's working"
        ],
        realExample: "Caught a ROAS bleed before it cost ₹5L for pilot enterprise C"
    }
];

// ============================================================================
// FAQ (Real objections)
// ============================================================================

export const FAQ_ITEMS = [
    {
        question: "Is this just another dashboard?",
        answer: "No. Dashboards replay history. Trita builds causal views—what would change if you pulled a lever—and can execute within guardrails so you fix drivers before they become write-offs."
    },
    {
        question: "How is this different from Triple Whale or Northbeam?",
        answer: "Those tools excel at attribution and reporting. Trita is a causal operating system: it stress-tests interventions, ranks drivers with confidence, and can prevent the ROAS or service hit before it lands."
    },
    {
        question: "What if the causal read is wrong?",
        answer: "Fair question. Every read ships with drivers, data lineage, and confidence. You review counterfactuals, tighten policies, and only automate what you trust. Humans stay on the hook for material decisions until you say otherwise."
    },
    {
        question: "How long until I see results?",
        answer: "Depends what you want to see results in:\n• Stockout predictions: 7 days (after Trita learns your patterns)\n• RTO flagging: Immediately (works on first order)\n• ROAS monitoring: Real-time (starts the day you connect Meta)"
    },
    {
        question: "Do I need a tech team?",
        answer: "No. If you can connect your Shopify store to a payment gateway, you can set up Trita. It's 3 clicks per integration."
    },
    {
        question: "What does this actually cost?",
        answer: "Right now, we're working with pilot enterprises to validate pricing. If you're doing ₹5-50Cr annually and this sounds like your problem, let's talk."
    }
];

// ============================================================================
// SOCIAL PROOF (Brutally honest)
// ============================================================================

export const SOCIAL_PROOF = {
    approach: "pilot", // "pilot" | "testimonials"
    pilotMessage: "We're working with pilot enterprises to validate this. Here's what they're seeing so far:",
    pilotResults: [
        "Operation A: Prevented 3 Stockouts in the first 2 weeks",
        "Operation B: Flagged ₹2.1L in high-risk RTO orders",
        "Operation C: Caught a ROAS bleed before it cost them ₹5L"
    ],
    testimonials: [
        // Will populate as real testimonials come in
        // {
        //   quote: "This thing predicted a stockout 12 days before it happened. I didn't believe it at first. Then it happened exactly when OLynk said it would. That's when I knew this wasn't bullshit.",
        //   author: "Priya",
        //   organization: "Organization Name",
        //   verified: true
        // }
    ]
};

// ============================================================================
// CTA CONFIGURATION
// ============================================================================

type CTAVariant = 'videoFirst' | 'calendarFirst';

interface CTAContent {
    buttonText: string;
    belowText: string;
    calendarUrl: string;
    videoUrl?: string;
}

interface CTAPrimaryConfig {
    variant: CTAVariant;
    videoFirst: CTAContent;
    calendarFirst: CTAContent;
}

export const CTA_CONFIG: {
    primary: CTAPrimaryConfig;
    secondary: {
        show: boolean;
        text: string;
        link: string;
    };
} = {
    primary: {
        variant: "videoFirst" as CTAVariant,
        videoFirst: {
            buttonText: "Watch the 2-Minute Demo",
            videoUrl: "PLACEHOLDER_VIDEO_URL", // Replace with actual Loom/YouTube link
            belowText: "Then decide if you want to talk",
            calendarUrl: "PLACEHOLDER_CALENDAR_URL" // Replace with Calendly/Cal.com link
        },
        calendarFirst: {
            buttonText: "Let's Talk for 15 Minutes",
            belowText: "I'll show you how this works with your actual data. If it's not a fit, I'll tell you in the first 5 minutes.",
            calendarUrl: "PLACEHOLDER_CALENDAR_URL"
        }
    },
    secondary: {
        show: true,
        text: "Not ready yet? Get the one-pager",
        link: "mailto:hello@olynk.ai?subject=Send me the Trita one-pager"
    }
};

// ============================================================================
// DEMO SECTION
// ============================================================================

export const DEMO_CONFIG = {
    type: "placeholder", // "video" | "gif" | "placeholder"
    placeholder: {
        title: "See It In Action",
        description: "A 15-second demo showing:",
        steps: [
            "Real Shopify data flowing in",
            "Trita isolates stockout drivers 10 days out with confidence",
            "Auto-creating a PO when policy matches the causal read",
            "Slack: \"Stockout prevented—here is the driver tree for Blue T-Shirt (M)\""
        ]
    },
    video: {
        url: "", // Loom/YouTube embed URL
        thumbnail: "",
        duration: "2 min"
    }
};

// ============================================================================
// CONTACT INFO
// ============================================================================

export const CONTACT_INFO = {
    email: "hello@olynk.ai",
    phone: "+91-799-335-9150",
    calendly: "PLACEHOLDER_CALENDAR_URL" // Replace with actual Calendly link
};

// ============================================================================
// METADATA
// ============================================================================

export const PAGE_METADATA = {
    title: "Causal Intelligence for Commerce Operations | Trita by Olynk",
    description: "Trita ranks what actually drives stockouts, RTO, cash, and service—then executes governed fixes. Causal intelligence for modern commerce, not chart theater.",
    keywords: "Causal inference, causal AI, commerce operations, stockout drivers, RTO prevention, ROAS monitoring, inventory intelligence, operational AI, Trita, Olynk"
};
