// Integration ecosystem that Olynk is built to work with
// Showing emerging commerce brands for credibility
const BRANDS = [
    { name: "Snitch", logo: "https://www.google.com/s2/favicons?domain=snitch.co.in&sz=128", fallback: "SN", color: "bg-slate-600" },
    { name: "Bewakoof", logo: "https://www.google.com/s2/favicons?domain=bewakoof.com&sz=128", fallback: "BW", color: "bg-orange-500" },
    { name: "Beardo", logo: "https://www.google.com/s2/favicons?domain=beardo.in&sz=128", fallback: "BD", color: "bg-amber-600" },
    { name: "mCaffeine", logo: "https://www.google.com/s2/favicons?domain=mcaffeine.com&sz=128", fallback: "MC", color: "bg-purple-600" },
    { name: "Minimalist", logo: "https://www.google.com/s2/favicons?domain=beminimalist.co&sz=128", fallback: "MM", color: "bg-teal-500" },
    { name: "Pee Safe", logo: "https://www.google.com/s2/favicons?domain=peesafe.com&sz=128", fallback: "PS", color: "bg-green-500" },
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
                <span className="text-[10px] font-bold text-tan uppercase tracking-widest">Built for high-growth commerce teams</span>
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
