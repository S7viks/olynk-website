/**
 * Landing Page Content Configuration
 * 
 * This file contains all content for the OLynk customer development landing page.
 * Easy to edit and swap content for A/B testing without touching component code.
 */

// ============================================================================
// HEADLINE VARIATIONS (A/B Testing)
// ============================================================================

export const HEADLINES = {
    // Version A: Shock Value
    A: {
        main: "You're losing ₹8 lakhs every month to stockouts and RTO.",
        emphasis: "You just don't know it yet.",
        subheadline: "OLynk tells you 10 days before a stockout happens—and creates the PO automatically. No dashboards. No firefighting. Just intelligent operations that run themselves."
    },
    // Version B: Empathetic (DEFAULT for V1)
    B: {
        main: "Stop discovering stockouts when",
        emphasis: "your customers do",
        subheadline: "OLynk predicts operational problems 10 days before they happen—and tells you exactly how to fix them. No dashboards to check. No data to reconcile. Just operations that run themselves."
    },
    // Version C: Problem-Focused
    C: {
        main: "Your operations are bleeding money",
        emphasis: "while you sleep",
        subheadline: "Stockouts. RTO failures. Ad budget waste. OLynk catches them before they cost you ₹2-5L monthly. Predictive operations intelligence that actually works."
    },
    // Version D: Relatable
    D: {
        main: "Running a D2C brand shouldn't feel like",
        emphasis: "fighting fires 24/7",
        subheadline: "OLynk watches your Shopify, inventory, shipping, and ads 24/7. When something's about to go wrong, it tells you—or just fixes it. Stop reacting. Start preventing."
    }
};

// Current active headline
export const ACTIVE_HEADLINE = 'B';

// ============================================================================
// TRUST ELEMENTS
// ============================================================================

export const TRUST_MICROCOPY = {
    primary: "Built for D2C founders tired of 12 tabs and reactive ops",
    pilots: "Currently working with pilot brands to validate this approach",
    timeline: "See results in 7-10 days, not months"
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
        quote: "You find out about stockouts when customers do—after they've already bounced to competitors."
    },
    {
        id: 2,
        title: "The RTO Black Hole",
        story: "You're losing 15-30% of every month's revenue to COD returns. Bad addresses. Failed deliveries. Repeat offenders. You know it's happening. You just can't predict which orders will fail.",
        impact: "Average loss: ₹3-8L monthly for ₹50L revenue brands",
        quote: "Every RTO costs you 2X—once for shipping, again for lost sale and customer."
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
        impact: "Time cost: 15-20 hours weekly = ₹80K+ in founder time",
        quote: "I have 12 tabs open just to understand what happened yesterday. Forget about predicting tomorrow."
    }
];

// ============================================================================
// WHAT OLYNK DOES (No fluff, clear explanation)
// ============================================================================

export const CAPABILITIES = [
    {
        id: 1,
        title: "Predicts Stockouts Before They Happen",
        explanation: [
            "Looks at your sales velocity, lead times, current stock",
            "Tells you \"SKU X will stockout in 10 days\"",
            "Creates the PO automatically (if you want)"
        ],
        realExample: "Prevented 3 stockouts in first 2 weeks for pilot brand A"
    },
    {
        id: 2,
        title: "Flags Orders That Will RTO",
        explanation: [
            "Scores every order before you ship it",
            "\"This order has an 85% chance of failing delivery\"",
            "You decide: verify address, switch to prepaid, or don't ship"
        ],
        realExample: "Flagged ₹2.1L in high-risk RTO orders for pilot brand B"
    },
    {
        id: 3,
        title: "Catches ROAS Bleeds in Real-Time",
        explanation: [
            "Monitors your ad spend every hour",
            "\"Campaign Y dropped from 3.2X to 1.8X ROAS—pausing now\"",
            "Reallocates budget to what's working"
        ],
        realExample: "Caught a ROAS bleed before it cost ₹5L for pilot brand C"
    }
];

// ============================================================================
// FAQ (Real objections)
// ============================================================================

export const FAQ_ITEMS = [
    {
        question: "Is this just another dashboard?",
        answer: "No. Dashboards show you what already happened. OLynk tells you what will happen—and fixes it before you have to think about it."
    },
    {
        question: "How is this different from Triple Whale or Northbeam?",
        answer: "Those are analytics tools. They're great at telling you why ROAS dropped. OLynk is an operating system. It prevents the ROAS drop from happening."
    },
    {
        question: "What if the predictions are wrong?",
        answer: "Fair question. Here's how it works: You see the prediction and the reasoning behind it. You decide if you trust it. Once you do, you can automate it. Until then, you're in full control."
    },
    {
        question: "How long until I see results?",
        answer: "Depends what you want to see results in:\n• Stockout predictions: 7 days (after OLynk learns your patterns)\n• RTO flagging: Immediately (works on first order)\n• ROAS monitoring: Real-time (starts the day you connect Meta)"
    },
    {
        question: "Do I need a tech team?",
        answer: "No. If you can connect your Shopify store to a payment gateway, you can set up OLynk. It's 3 clicks per integration."
    },
    {
        question: "What does this actually cost?",
        answer: "Right now, we're working with pilot brands to validate pricing. If you're doing ₹5-50Cr annually and this sounds like your problem, let's talk."
    }
];

// ============================================================================
// SOCIAL PROOF (Brutally honest)
// ============================================================================

export const SOCIAL_PROOF = {
    approach: "pilot", // "pilot" | "testimonials"
    pilotMessage: "We're working with pilot brands to validate this. Here's what they're seeing so far:",
    pilotResults: [
        "Brand A: Prevented 3 stockouts in the first 2 weeks",
        "Brand B: Flagged ₹2.1L in high-risk RTO orders",
        "Brand C: Caught a ROAS bleed before it cost them ₹5L"
    ],
    testimonials: [
        // Will populate as real testimonials come in
        // {
        //   quote: "This thing predicted a stockout 12 days before it happened. I didn't believe it at first. Then it happened exactly when OLynk said it would. That's when I knew this wasn't bullshit.",
        //   author: "Priya",
        //   brand: "Brand Name",
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
        link: "mailto:hello@olynk.ai?subject=Send me the OLynk one-pager"
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
            "OLynk detecting a stockout risk 10 days out",
            "Auto-creating a PO in real-time",
            "Founder getting a Slack notification: \"Stockout prevented for Blue T-Shirt (M)\""
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
    title: "Stop Discovering Stockouts When Your Customers Do | OLynk",
    description: "OLynk predicts operational problems 10 days before they happen. Stop losing ₹2-5L monthly to stockouts, RTO failures, and ad waste. Built for D2C founders.",
    keywords: "D2C operations, stockout prediction, RTO prevention, ROAS monitoring, inventory management, D2C India"
};
