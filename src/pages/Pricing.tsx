import { Link } from 'react-router-dom';
import PricingSection from '../components/PricingSection';

const Pricing = () => {
  return (
    <div className="relative z-10 min-h-screen bg-transparent">
      {/* Hero Header */}
      <section className="relative pt-32 lg:pt-40 pb-16 lg:pb-24 px-4 overflow-hidden border-b border-beige/40">
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-4 mb-4">
            <div className="w-8 h-[1px] bg-olynk/40 font-mono" />
            <span className="text-[10px] font-black text-olynk uppercase tracking-[0.5em] font-mono">Commercials</span>
            <div className="w-8 h-[1px] bg-olynk/40 font-mono" />
          </div>
          <h1 className="page-hero-title">
            Pricing that matches <br />
            <span className="page-hero-accent">how you operate.</span>
          </h1>
          <p className="text-steel text-lg lg:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
            Every deployment is scoped to your GMV, stack complexity, and execution surface. <span className="text-navy font-bold">Commercials align to outcomes</span> - not seats.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
            <Link
              to="/waitlist"
              className="inline-flex items-center justify-center px-10 py-5 rounded-xl bg-olynk text-white text-sm font-black uppercase tracking-widest hover:bg-navy transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Book a Scoping Call
            </Link>
            <Link
              to="/resources/impact-studies"
              className="inline-flex items-center justify-center px-10 py-5 rounded-xl border-2 border-beige bg-white/50 backdrop-blur-sm text-navy text-sm font-black uppercase tracking-widest hover:border-navy transition-all hover:bg-white"
            >
              Read Impact Studies
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <PricingSection />
    </div>
  );
};

export default Pricing;
