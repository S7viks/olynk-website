import { Link } from 'react-router-dom';
import { ArrowRight, Factory, ShoppingBag } from 'lucide-react';

const verticals = [
  {
    id: 'commerce',
    title: 'D2C & commerce',
    desc: 'RTO, SLAs, promos, and inventory truth across marketplaces and your own store - built for Indian fulfilment reality.',
    icon: ShoppingBag,
    href: '/industries/commerce',
  },
  {
    id: 'manufacturing',
    title: 'Manufacturing',
    desc: 'Procurement, network inventory, and plant-to-DC alignment with governed execution trails.',
    icon: Factory,
    href: '/industries/manufacturing',
  },
];

const Industries = () => {
  return (
    <main className="relative z-10 pt-24 lg:pt-28 pb-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto text-center mb-14 space-y-4">
        <p className="text-[11px] font-black text-tan uppercase tracking-[0.25em]">Industries</p>
        <h1 className="text-4xl sm:text-5xl font-black text-navy tracking-tightest leading-[1.05]">
          Built for <span className="text-olynk">Indian operations</span> first
        </h1>
        <p className="text-steel text-lg font-medium leading-relaxed">
          Pick a vertical to see how OLynk maps pain to decisions - from COD & RTO in commerce to supply shocks in manufacturing.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-6">
        {verticals.map((v) => (
          <Link
            key={v.id}
            to={v.href}
            className="group rounded-3xl border border-beige bg-white p-8 shadow-sm hover:shadow-xl hover:border-olynk/30 transition-all flex flex-col"
          >
            <div className="w-12 h-12 rounded-2xl bg-cream border border-beige flex items-center justify-center mb-6 group-hover:bg-olynk/10 transition-colors">
              <v.icon className="w-6 h-6 text-navy" strokeWidth={2} />
            </div>
            <h2 className="text-xl font-black text-navy tracking-tight mb-3">{v.title}</h2>
            <p className="text-steel text-sm font-medium leading-relaxed flex-1">{v.desc}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-olynk font-black text-[11px] uppercase tracking-widest">
              View playbook
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        ))}
      </div>

      <div className="max-w-5xl mx-auto mt-32">
        <div className="rounded-[40px] bg-navy p-10 lg:p-16 relative overflow-hidden group">
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center group-hover:scale-110 transition-transform duration-1000" />
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="max-w-xl">
              <span className="text-olynk font-black text-[11px] uppercase tracking-[0.3em] mb-4 block">The Visionary Series</span>
              <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tightest leading-tight mb-6">
                See your brand <br /> <span className="text-olynk">Imagined</span> with OLynk
              </h2>
              <p className="text-white/60 text-lg font-medium leading-relaxed">
                Explore our comic series where we visualize how the world's most iconic brands operate with Olynk's Intelligence OS.
              </p>
            </div>
            <Link
              to="/imagined"
              className="bg-white text-navy px-8 py-4 rounded-full font-black text-[12px] uppercase tracking-widest hover:bg-olynk hover:text-white transition-all flex items-center gap-3 shrink-0"
            >
              Explore the Comics
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Industries;
