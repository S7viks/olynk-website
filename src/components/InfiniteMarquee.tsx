// Realistic Indian D2C brands that use Olynk
// Logos fetched via Clearbit API for demo purposes
const BRANDS = [
    { name: "Mamaearth", logo: "https://www.google.com/s2/favicons?domain=mamaearth.in&sz=128", fallback: "ME", color: "bg-emerald-500" },
    { name: "Sugar Cosmetics", logo: "https://www.google.com/s2/favicons?domain=sugarcosmetics.com&sz=128", fallback: "SC", color: "bg-pink-500" },
    { name: "Boat", logo: "https://www.google.com/s2/favicons?domain=boat-lifestyle.com&sz=128", fallback: "BT", color: "bg-blue-500" },
    { name: "Wakefit", logo: "https://www.google.com/s2/favicons?domain=wakefit.co&sz=128", fallback: "WF", color: "bg-indigo-500" },
    { name: "Plum", logo: "https://www.google.com/s2/favicons?domain=plumgoodness.com&sz=128", fallback: "PL", color: "bg-purple-500" },
    { name: "WOW Skin Science", logo: "https://www.google.com/s2/favicons?domain=buywow.in&sz=128", fallback: "WS", color: "bg-teal-500" },
    { name: "The Man Company", logo: "https://www.google.com/s2/favicons?domain=themancompany.com&sz=128", fallback: "MC", color: "bg-slate-600" },
    { name: "Bombay Shaving Company", logo: "https://www.google.com/s2/favicons?domain=bombayshavingcompany.com&sz=128", fallback: "BS", color: "bg-amber-600" },
    { name: "Lenskart", logo: "https://www.google.com/s2/favicons?domain=lenskart.com&sz=128", fallback: "LK", color: "bg-cyan-500" },
    { name: "Nykaa", logo: "https://www.google.com/s2/favicons?domain=nykaa.com&sz=128", fallback: "NK", color: "bg-rose-500" },
    { name: "Purplle", logo: "https://www.google.com/s2/favicons?domain=purplle.com&sz=128", fallback: "PP", color: "bg-violet-500" },
];

const InfiniteMarquee = () => {
    return (
        <div className="w-full bg-cream overflow-hidden py-10 relative border-y border-beige">
            {/* Gradient Masks */}
            <div className="absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r from-cream to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l from-cream to-transparent z-10 pointer-events-none" />

            <div className="relative flex overflow-x-hidden group">
                {/* Rolling Track 1 */}
                <div className="py-2 animate-marquee whitespace-nowrap flex space-x-12 md:space-x-24 px-12 md:px-24">
                    {BRANDS.map((brand, i) => (
                        <BrandItem key={i} brand={brand} />
                    ))}
                    {/* Duplicate */}
                    {BRANDS.map((brand, i) => (
                        <BrandItem key={`dup-${i}`} brand={brand} />
                    ))}
                </div>

                {/* Rolling Track 2 (Overlay for seamless loop) */}
                <div className="absolute top-0 py-2 animate-marquee2 whitespace-nowrap flex space-x-12 md:space-x-24 px-12 md:px-24">
                    {BRANDS.map((brand, i) => (
                        <BrandItem key={`track2-${i}`} brand={brand} />
                    ))}
                    {BRANDS.map((brand, i) => (
                        <BrandItem key={`track2-dup-${i}`} brand={brand} />
                    ))}
                </div>
            </div>

            {/* Label */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white px-4 py-1 rounded-full border border-beige shadow-sm z-20">
                <span className="text-[10px] font-bold text-tan uppercase tracking-widest">Trusted by innovative commerce leaders</span>
            </div>
        </div>
    );
};

// Subcomponent for cleaner mapping
const BrandItem = ({ brand }: { brand: typeof BRANDS[0] }) => {
    return (
        <div className="flex items-center gap-4 grayscale group-hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100 cursor-default flex-shrink-0 hover:scale-105 transform">
            <div className={`w-12 h-12 rounded-xl bg-white border border-beige flex items-center justify-center shadow-sm overflow-hidden p-2`}>
                <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                        // Fallback to text if image fails
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement?.classList.add(brand.color);
                        e.currentTarget.parentElement?.classList.remove('bg-white', 'p-2');
                        const span = document.createElement('span');
                        span.className = 'text-white font-bold text-sm';
                        span.innerText = brand.fallback;
                        e.currentTarget.parentElement?.appendChild(span);
                    }}
                />
            </div>
            <span className="text-lg font-semibold text-navy tracking-tight">{brand.name}</span>
        </div>
    );
}

export default InfiniteMarquee;
