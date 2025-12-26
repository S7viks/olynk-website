import { motion } from 'framer-motion';
import { Heart, MessageCircle, Instagram, Facebook } from 'lucide-react';
import arjunImg from '../assets/testimonials/arjun.png';
import priyaImg from '../assets/testimonials/priya.png';
import vikramImg from '../assets/testimonials/vikram.png';
import ananyaImg from '../assets/testimonials/ananya.png';
import rahulImg from '../assets/testimonials/rahul.png';
import siddharthImg from '../assets/testimonials/siddharth.png';
import ishitaImg from '../assets/testimonials/ishita.png';
import karanImg from '../assets/testimonials/karan.png';

const TESTIMONIALS_ROW_1 = [
    {
        id: 1,
        content: "Honestly, @olynk is the only tool that actually helps me track my D2C margins accurately. No more spreadsheet hell.",
        author: "Arjun Mehta",
        handle: "@arjun_m",
        avatar: arjunImg,
        likes: "1.2k",
        comments: "84",
        date: "10:20 AM | 12 Nov 2024",
        platform: "instagram",
        color: "bg-[#FF0050]"
    },
    {
        id: 2,
        content: "The stockout alerts on @olynk saved us during the festive season. Highly recommended for any e-commerce founder.",
        author: "Priya Sharma",
        handle: "@priya_ecommerce",
        avatar: priyaImg,
        likes: "850",
        comments: "42",
        date: "02:15 PM | 15 Oct 2024",
        platform: "facebook",
        color: "bg-[#1877F2]"
    },
    {
        id: 3,
        content: "We switched from manual tracking to @olynk and our operations leg-work dropped by 60%. It's wild.",
        author: "Vikram Singh",
        handle: "@vikkys",
        avatar: vikramImg,
        likes: "2k",
        comments: "150",
        date: "09:00 PM | 01 Dec 2024",
        platform: "x",
        color: "bg-black"
    },
    {
        id: 4,
        content: "Finally an AI tool that actually 'does' things instead of just showing charts. Great work @olynk team.",
        author: "Ananya Iyer",
        handle: "@ananya_i",
        avatar: ananyaImg,
        likes: "1.1k",
        comments: "56",
        date: "11:45 AM | 20 Nov 2024",
        platform: "instagram",
        color: "bg-[#E4405F]"
    }
];

const TESTIMONIALS_ROW_2 = [
    {
        id: 5,
        content: "Managing 3 brands was a nightmare until @olynk. The unified view is exactly what we needed.",
        author: "Rahul Kapoor",
        handle: "@rahul_k",
        avatar: rahulImg,
        likes: "900",
        comments: "38",
        date: "04:30 PM | 05 Dec 2024",
        platform: "facebook",
        color: "bg-[#1877F2]"
    },
    {
        id: 6,
        content: "The ROI we've seen since implementing @olynk is insane. It paid for itself in the first month.",
        author: "Siddharth Jha",
        handle: "@sid_jha",
        avatar: siddharthImg,
        likes: "1.5k",
        comments: "92",
        date: "08:10 PM | 18 Nov 2024",
        platform: "x",
        color: "bg-black"
    },
    {
        id: 7,
        content: "Simple, powerful, and very intuitive. @olynk is definitely the future of operations.",
        author: "Ishita Gupta",
        handle: "@ishita_g",
        avatar: ishitaImg,
        likes: "2.3k",
        comments: "210",
        date: "01:20 PM | 10 Dec 2024",
        platform: "instagram",
        color: "bg-[#FF0050]"
    },
    {
        id: 8,
        content: "@olynk dashboard is my first check every morning now. Can't imagine running the business without it.",
        author: "Karan Verma",
        handle: "@karan_v",
        avatar: karanImg,
        likes: "1.2k",
        comments: "65",
        date: "07:50 AM | 25 Nov 2024",
        platform: "facebook",
        color: "bg-[#1877F2]"
    }
];



const TestimonialCard = ({ testimonial }: { testimonial: typeof TESTIMONIALS_ROW_1[0] }) => {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-beige flex flex-col gap-4 relative group hover:shadow-xl transition-all duration-300 w-[350px] shrink-0">
            {/* Meta Info */}
            <div className="flex items-center justify-between text-[11px] font-bold text-steel/60">
                <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" /> {testimonial.likes}</span>
                    <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5" /> {testimonial.comments}</span>
                </div>
                <span>{testimonial.date}</span>
            </div>

            {/* Content */}
            <p className="text-[15px] leading-relaxed text-navy h-[80px] overflow-hidden">
                {testimonial.content.split(/(@\w+)/g).map((part, i) => (
                    part.startsWith('@') ? <span key={i} className="text-olynk font-semibold">{part}</span> : part
                ))}
            </p>

            {/* Profile */}
            <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-3">
                    <img src={testimonial.avatar} alt={testimonial.author} className="w-10 h-10 rounded-full border border-beige" />
                    <div className="flex flex-col">
                        <span className="text-[14px] font-black text-navy leading-none">{testimonial.author}</span>
                        <span className="text-[12px] text-tan">{testimonial.handle}</span>
                    </div>
                </div>

                {/* Platform Icon */}
                <div className={`p-2 rounded-lg text-white ${testimonial.color}`}>
                    {testimonial.platform === 'x' && (
                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                    )}
                    {testimonial.platform === 'instagram' && <Instagram className="w-3.5 h-3.5" />}
                    {testimonial.platform === 'facebook' && <Facebook className="w-3.5 h-3.5" />}
                </div>
            </div>
        </div>
    );
};

const MarqueeRow = ({ items, direction = 'left' }: { items: typeof TESTIMONIALS_ROW_1, direction?: 'left' | 'right' }) => {
    return (
        <div className="flex overflow-hidden group py-4">
            <motion.div
                className="flex gap-6 pr-6"
                animate={{
                    x: direction === 'left' ? [0, -1000] : [-1000, 0]
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >
                {[...items, ...items, ...items, ...items].map((t, idx) => (
                    <TestimonialCard key={`${t.id}-${idx}`} testimonial={t} />
                ))}
            </motion.div>
        </div>
    );
};

const TestimonialsGrid = () => {
    return (
        <section className="group py-20 lg:py-32 bg-cream border-t border-beige relative overflow-hidden">
            {/* 1. Dynamic Background Layer (Blur Blobs) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{ x: [0, -70, 0], y: [0, 90, 0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[15%] right-[10%] w-[45%] h-[45%] bg-steel/5 rounded-full blur-[115px]"
                />
                <motion.div
                    animate={{ x: [0, 90, 0], y: [0, -40, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-[5%] left-[5%] w-[38%] h-[38%] bg-navy/5 rounded-full blur-[95px]"
                />
            </div>

            {/* 2. Complex Radial Gradient Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.45),rgba(243,234,224,0.1))]" />

            {/* 3. Subtle Grain Texture */}
            <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none z-0"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

            {/* Background Subtle Labels - Tone-on-Tone Reveal */}
            <div className="absolute top-0 left-0 p-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 select-none pointer-events-none">
                <span className="text-[120px] font-black font-mono text-beige leading-none tracking-tightest uppercase">SUCCESS_METRICS_LOGGED</span>
            </div>

            {/* Subtle Grid Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#001B3D 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

            <div className="relative z-20">
                {/* Header */}
                <div className="text-center mb-20 space-y-6 px-4">
                    <h2 className="text-4xl lg:text-5xl font-black text-navy tracking-tighter leading-tight max-w-4xl mx-auto">
                        Trusted by founders running <br />
                        <span className="text-olynk">high-scale operations.</span>
                    </h2>
                </div>

                {/* Marquee Rows */}
                <div className="space-y-6">
                    <MarqueeRow items={TESTIMONIALS_ROW_1} direction="left" />
                    <MarqueeRow items={TESTIMONIALS_ROW_2} direction="right" />
                </div>
            </div>

            {/* Decorative Edge Fades */}
            {/* Decorative Edge Fades - Transparent to Cream Blend */}
            <div className="absolute top-0 left-0 bottom-0 w-48 bg-gradient-to-r from-cream/90 via-cream/40 to-transparent z-30 pointer-events-none" />
            <div className="absolute top-0 right-0 bottom-0 w-48 bg-gradient-to-l from-cream/90 via-cream/40 to-transparent z-30 pointer-events-none" />
        </section>
    );
};

export default TestimonialsGrid;
