import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, X } from 'lucide-react';

const bscFrames = [
  '/images/comics/bombay-shirt-company/imagined/1.jpeg',
  '/images/comics/bombay-shirt-company/imagined/2.jpeg',
  '/images/comics/bombay-shirt-company/imagined/3.jpeg',
  '/images/comics/bombay-shirt-company/imagined/4.jpeg',
  '/images/comics/bombay-shirt-company/imagined/5.jpeg',
  '/images/comics/bombay-shirt-company/imagined/6.jpeg',
  '/images/comics/bombay-shirt-company/imagined/7.jpeg',
  '/images/comics/bombay-shirt-company/imagined/8.jpeg',
] as const;

const TritaImagined = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const isOpen = activeIndex !== null;

  const safeIndex = useMemo(() => {
    if (activeIndex === null) return 0;
    return Math.min(Math.max(activeIndex, 0), bscFrames.length - 1);
  }, [activeIndex]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveIndex(null);
      if (e.key === 'ArrowLeft') setActiveIndex((prev) => (prev === null ? 0 : Math.max(prev - 1, 0)));
      if (e.key === 'ArrowRight')
        setActiveIndex((prev) => (prev === null ? 0 : Math.min(prev + 1, bscFrames.length - 1)));
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  return (
    <main className="pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        {/* Header Section */}
        <div className="max-w-4xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-10 h-10 rounded-full bg-olynk/10 flex items-center justify-center border border-olynk/20 text-olynk">
              <Sparkles size={20} />
            </div>
            <span className="text-[11px] font-black text-tan uppercase tracking-[0.3em]">Visionary Series</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl sm:text-7xl lg:text-8xl font-black text-navy tracking-tightest leading-[0.9] mb-8"
          >
            TRITA <span className="text-olynk">IMAGINED</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl sm:text-2xl text-steel font-medium leading-relaxed max-w-2xl"
          >
            A horizontal, scrollable comic strip. Click any frame to expand.
          </motion.p>
        </div>

        {/* One-row scrollable comic */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="flex items-center justify-between gap-6 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-black text-tan uppercase tracking-[0.3em]">Bombay Shirt Company</span>
              <span className="text-[11px] font-black text-olynk uppercase tracking-[0.3em]">× TRITA</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-[11px] font-black text-steel uppercase tracking-[0.25em]">
              <span>Scroll</span>
              <span className="w-1 h-1 rounded-full bg-steel/40" />
              <span>Click to expand</span>
            </div>
          </div>

          <div className="overflow-x-auto pb-6 -mx-4 sm:-mx-6 px-4 sm:px-6">
            <div className="flex gap-6 min-w-max snap-x snap-mandatory">
              {bscFrames.map((src, idx) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className="snap-start group relative rounded-3xl overflow-hidden border border-beige bg-white shadow-xl shadow-navy/5 focus:outline-none focus-visible:ring-4 focus-visible:ring-olynk/30"
                  style={{ width: 320 }}
                  aria-label={`Open frame ${idx + 1}`}
                >
                  <div className="aspect-[4/3] w-full bg-cream">
                    <img
                      src={src}
                      alt={`Bombay Shirt Company comic frame ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 via-black/10 to-transparent text-white">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black uppercase tracking-[0.25em]">Frame {idx + 1}</span>
                      <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/80">Expand</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      {isOpen ? (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Comic frame viewer"
          onClick={() => setActiveIndex(null)}
        >
          <div className="absolute top-6 right-6 flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex(null);
              }}
              className="w-11 h-11 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/15 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/30"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>

          <div
            className="absolute inset-0 flex items-center justify-center px-4 sm:px-10 py-10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveIndex((prev) => (prev === null ? 0 : Math.max(prev - 1, 0)))}
              className="hidden sm:flex mr-4 w-12 h-12 rounded-full bg-white/10 border border-white/20 text-white items-center justify-center hover:bg-white/15 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/30 disabled:opacity-30 disabled:hover:bg-white/10"
              disabled={safeIndex <= 0}
              aria-label="Previous frame"
            >
              <ChevronLeft size={22} />
            </button>

            <div className="w-full max-w-6xl">
              <div className="flex items-center justify-between mb-3 text-white/80 text-[11px] font-black uppercase tracking-[0.25em]">
                <span>Frame {safeIndex + 1} / {bscFrames.length}</span>
                <span className="hidden sm:inline">Esc to close • ← / → to navigate</span>
              </div>
              <div className="rounded-3xl overflow-hidden border border-white/15 bg-black/20 shadow-2xl">
                <img
                  src={bscFrames[safeIndex]}
                  alt={`Bombay Shirt Company comic frame ${safeIndex + 1}`}
                  className="w-full h-auto max-h-[78vh] object-contain bg-black"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                setActiveIndex((prev) => (prev === null ? 0 : Math.min(prev + 1, bscFrames.length - 1)))
              }
              className="hidden sm:flex ml-4 w-12 h-12 rounded-full bg-white/10 border border-white/20 text-white items-center justify-center hover:bg-white/15 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/30 disabled:opacity-30 disabled:hover:bg-white/10"
              disabled={safeIndex >= bscFrames.length - 1}
              aria-label="Next frame"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>
      ) : null}
    </main>
  );
};

export default TritaImagined;

