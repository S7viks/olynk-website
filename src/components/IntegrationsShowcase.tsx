import { motion } from 'framer-motion';

const ALL_TOOLS = [
    { name: "Shopify", domain: "shopify.com" },
    { name: "Amazon", domain: "amazon.com" },
    { name: "Flipkart", domain: "flipkart.com" },
    { name: "Razorpay", domain: "razorpay.com" },
    { name: "HubSpot", domain: "hubspot.com" },
    { name: "Google Analytics", domain: "analytics.google.com" },
    { name: "Shiprocket", domain: "shiprocket.in" },
    { name: "Zoho Inventory", domain: "zoho.com" },
    { name: "Ajio", domain: "ajio.com" },
    { name: "Amazon Fresh", domain: "amazon.com" },
    { name: "BigBasket", domain: "bigbasket.com" },
    { name: "Blinkit", domain: "blinkit.com" },
    { name: "Blue Dart", domain: "bluedart.com", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Blue_Dart_Logo.svg/1200px-Blue_Dart_Logo.svg.png" },
    { name: "Delhivery", domain: "delhivery.com" },
    { name: "Dunzo", domain: "dunzo.com", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Dunzo_Logo.jpg" },
    { name: "Meesho", domain: "meesho.com" },
    { name: "Myntra", domain: "myntra.com" },
    { name: "NetSuite", domain: "netsuite.com" },
    { name: "Nykaa", domain: "nykaa.com" },
    { name: "Odoo", domain: "odoo.com" },
    { name: "Paytm", domain: "paytm.com" },
    { name: "PayU", domain: "payu.in" },
    { name: "Power BI", domain: "powerbi.com", logo: "https://static.cdnlogo.com/logos/p/28/power-bi_800.png" },
    { name: "Salesforce", domain: "salesforce.com" },
    { name: "Swiggy", domain: "swiggy.com" },
    { name: "Tableau", domain: "tableau.com" },
    { name: "WooCommerce", domain: "woocommerce.com" },
    { name: "Zepto", domain: "zepto.co" },
    { name: "Zoho Books", domain: "zoho.com" },
    { name: "Mailchimp", domain: "mailchimp.com" },
    { name: "Pipedrive", domain: "pipedrive.com" },
    { name: "Zendesk", domain: "zendesk.com" },
    { name: "Stripe", domain: "stripe.com" },
    { name: "WhatsApp", domain: "whatsapp.com" },
    { name: "Figma", domain: "figma.com" },
    { name: "DTDC", domain: "dtdc.in", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e1/DTDC_logo.png" },
    { name: "JioMart", domain: "jiomart.com" },
    { name: "Unicommerce", domain: "unicommerce.com" },
    { name: "Cashfree", domain: "cashfree.com" },
    { name: "Dukaan", domain: "mydukaan.io" },
    { name: "Ecom Express", domain: "ecomexpress.in" },
    { name: "Porter", domain: "porter.in" },
    { name: "Tally", domain: "tallysolutions.com" },
];

const HorizontalMarquee = ({ tools, reverse = false }: { tools: typeof ALL_TOOLS, reverse?: boolean }) => (
    <div className="flex overflow-hidden select-none group relative">
        <motion.div
            className="flex flex-nowrap shrink-0 gap-6 py-4"
            animate={{ x: reverse ? ["0%", "-50%"] : ["-50%", "0%"] }}
            transition={{
                duration: 150,
                repeat: Infinity,
                ease: "linear"
            }}
        >
            {[...tools, ...tools].map((tool, idx) => (
                <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-3 bg-white border border-beige/60 px-6 py-3 rounded-full shadow-sm whitespace-nowrap transition-all"
                >
                    <img
                        src={tool.logo || `https://www.google.com/s2/favicons?domain=${tool.domain}&sz=128`}
                        alt={tool.name}
                        className="w-5 h-5 object-contain filter-none opacity-100 transition-all duration-300"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            const googleUrl = `https://www.google.com/s2/favicons?domain=${tool.domain}&sz=128`;
                            const ddgUrl = `https://icons.duckduckgo.com/ip3/${tool.domain}.ico`;

                            if (target.src === googleUrl) {
                                target.src = ddgUrl;
                            } else if (target.src === tool.logo) {
                                target.src = googleUrl;
                            } else {
                                target.onerror = null;
                                target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(tool.name)}&background=random&color=fff&size=64`;
                            }
                        }}
                    />
                    <span className="text-xs font-black text-navy opacity-80 uppercase tracking-widest">{tool.name}</span>
                </motion.div>
            ))}
        </motion.div>
    </div>
);

const IntegrationsShowcase = () => {
    const row1 = ALL_TOOLS.slice(0, Math.ceil(ALL_TOOLS.length / 2));
    const row2 = ALL_TOOLS.slice(Math.ceil(ALL_TOOLS.length / 2));

    return (
        <section className="group py-20 bg-transparent border-t border-beige relative overflow-hidden">
            {/* 1. Dynamic Background Layer (Blur Blobs) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{ x: [0, 120, 0], y: [0, -60, 0], scale: [1, 1.25, 1] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-[10%] left-[10%] w-[50%] h-[50%] bg-olynk/10 rounded-full blur-[130px]"
                />
                <motion.div
                    animate={{ x: [0, -90, 0], y: [0, 80, 0], scale: [1, 1.15, 1] }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-[0%] right-[5%] w-[45%] h-[45%] bg-navy/5 rounded-full blur-[110px]"
                />
            </div>

            {/* 2. Complex Radial Gradient Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.5),rgba(243,234,224,0.1))]" />

            {/* 3. Subtle Grain Texture */}
            <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

            {/* Background Subtle Labels - Tone-on-Tone Reveal */}
            <div className="absolute top-0 right-0 p-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 select-none pointer-events-none">
                <span className="text-[120px] font-black font-mono text-beige leading-none tracking-tightest uppercase">GRID_ONLINE</span>
            </div>

            {/* 4. Decorative Technical Grid / Nodes */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle, #223148 1px, transparent 1px)',
                    backgroundSize: '60px 60px'
                }}
            />


            <div className="max-w-7xl mx-auto px-4 mb-16 text-center relative z-10">
                <h2 className="text-4xl lg:text-5xl font-black text-navy mb-8 tracking-tighter leading-[0.95]">
                    Olynk connects to your <br />
                    <span className="text-olynk underline decoration-tan decoration-8 underline-offset-8">existing apps in minutes.</span>
                </h2>
            </div>

            <div className="space-y-4 mb-16 relative z-10">
                <HorizontalMarquee tools={row1} />
                <HorizontalMarquee tools={row2} reverse />
            </div>

            {/* Value Props */}
            <div className="max-w-7xl mx-auto px-4 mt-16 relative z-10">
                <div className="flex flex-wrap justify-center gap-x-16 gap-y-12 max-w-6xl mx-auto border-t border-beige/40 pt-16">
                    <div className="text-left space-y-4 max-w-[240px]">
                        <p className="text-base font-black text-navy leading-relaxed">
                            <span className="text-[12px] font-mono text-olynk block mb-2 uppercase tracking-widest">0% Migration</span>
                            No data entry or system changes required. Works on top of your stack.
                        </p>
                    </div>
                    <div className="text-left space-y-4 max-w-[240px]">
                        <p className="text-base font-black text-navy leading-relaxed">
                            <span className="text-[12px] font-mono text-olynk block mb-2 uppercase tracking-widest">Instant Intelligence</span>
                            One unified layer that brings order to your fragmented tools.
                        </p>
                    </div>
                    <div className="text-left space-y-4 max-w-[240px]">
                        <p className="text-base font-black text-navy leading-relaxed">
                            <span className="text-[12px] font-mono text-olynk block mb-2 uppercase tracking-widest">Autonomous Action</span>
                            Decide once. Olynk executes the logic across all your tools automatically.
                        </p>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default IntegrationsShowcase;
