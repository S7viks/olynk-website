import { motion } from 'framer-motion';
import { Shield, Target, Users, Heart, Award, Globe, Briefcase } from 'lucide-react';

const Company = () => {
  return (
    <div className="min-h-screen bg-transparent">
      {/* Hero Section */}
      <section className="pt-40 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-20 left-10 opacity-[0.03] select-none pointer-events-none">
          <span className="text-[150px] font-black font-mono text-navy tracking-tighter uppercase whitespace-nowrap">MISSION_STATEMENT</span>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl lg:text-8xl font-black text-navy leading-[1.05] tracking-tightest mb-8">
              The Operating System<br />
              <span className="text-olynk">for Global Commerce.</span>
            </h1>
            <p className="text-xl lg:text-2xl text-steel max-w-3xl mx-auto leading-relaxed font-medium">
              We believe that every business deserves a digital nervous system as intelligent
              as the people who built it.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Mission/Vision Grid */}
      <section className="py-24 lg:py-32 px-4 border-t border-beige bg-white/40 backdrop-blur-xl relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-12">
              <div className="space-y-6">
                <h2 className="text-4xl lg:text-6xl font-black text-navy tracking-tightest leading-[0.95]">
                  Why we<br />
                  <span className="text-navy/40 italic font-serif font-normal text-3xl lg:text-5xl">Exist.</span>
                </h2>
                <p className="text-lg text-steel leading-relaxed font-medium">
                  Modern commerce has become too complex for humans to manage alone.
                  Data is everywhere, yet clarity is nowhere. We started OLynk to
                  bridge the gap between information and action.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-cream flex items-center justify-center">
                    <Target className="w-6 h-6 text-navy" />
                  </div>
                  <h3 className="text-xl font-black text-navy tracking-tight">Focus</h3>
                  <p className="text-sm text-steel font-medium leading-relaxed">
                    Eliminating operational noise so leaders can focus on creation.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-cream flex items-center justify-center">
                    <Globe className="w-6 h-6 text-olynk" />
                  </div>
                  <h3 className="text-xl font-black text-navy tracking-tight">Scale</h3>
                  <p className="text-sm text-steel font-medium leading-relaxed">
                    Enabling high-growth enterprises to reach global markets without adding global overhead.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-12 rounded-[48px] bg-navy text-white space-y-8 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-8 opacity-[0.05] text-white select-none pointer-events-none">
                <Briefcase className="w-40 h-40" />
              </div>
              <h3 className="text-3xl font-black tracking-tight relative z-10">Our Principles</h3>
              <div className="space-y-6 relative z-10">
                {[
                  { title: "Clinical Objectivity", desc: "Decisions based on hard data, not intuition." },
                  { title: "Deep Integration", desc: "Never a patch, always a foundational link." },
                  { title: "Privacy First", desc: "Your data is your competitive advantage. Always." },
                  { title: "Hyper-Velocity", desc: "Minutes, not months, to see operational impact." }
                ].map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="text-olynk font-black font-mono text-sm">{String(i + 1).padStart(2, '0')}</div>
                    <div className="space-y-1">
                      <div className="font-black text-white">{step.title}</div>
                      <div className="text-white/60 text-sm font-medium">{step.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Trust Section */}
      <section className="py-24 lg:py-32 px-4 border-t border-beige relative">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 opacity-[0.02] select-none pointer-events-none">
          <span className="text-[120px] font-black font-mono text-navy uppercase">TRUST_ARCHITECTURE</span>
        </div>

        <div className="max-w-7xl mx-auto text-center mb-20 relative z-10">
          <h2 className="text-4xl lg:text-7xl font-black text-navy tracking-tightest leading-[0.95] mb-6">
            Built for<br />
            <span className="text-olynk">Enterprise Trust.</span>
          </h2>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 relative z-10">
          {[
            { icon: Shield, title: "Data Sovereignty", desc: "Your data is never used to train models for other customers." },
            { icon: Award, title: "Global Compliance", desc: "Strict adherence to GDPR, SOC 2 Type II, and local privacy laws." },
            { icon: Heart, title: "Reliability", desc: "99.99% system uptime via decentralized compute infrastructure." }
          ].map((item, i) => (
            <div key={i} className="p-10 rounded-[40px] border border-beige/60 bg-white hover:shadow-xl transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-cream flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <item.icon className="w-7 h-7 text-navy" />
              </div>
              <h4 className="text-xl font-black text-navy mb-4 tracking-tight">{item.title}</h4>
              <p className="text-sm text-steel leading-relaxed font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Hiring/Culture Section */}
      <section className="py-24 lg:py-40 px-4 border-t border-beige bg-navy relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <Users className="w-16 h-16 text-olynk mx-auto mb-10" />
          <h2 className="text-4xl lg:text-7xl font-black text-white tracking-tightest leading-[0.95] mb-12">
            Help us build the neural bridge.
          </h2>
          <p className="text-xl text-white/60 font-medium max-w-3xl mx-auto mb-12 leading-relaxed">
            We are a distributed team of engineers, operations experts, and AI researchers
            reimagining the future of commerce.
          </p>
          <a
            href="mailto:careers@olynk.ai?subject=Interested in Open Positions"
            className="inline-block px-12 py-6 bg-white text-navy rounded-2xl font-black text-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
          >
            View Open Deployments
          </a>
          <p className="mt-8 text-white/20 font-mono text-[10px] uppercase tracking-widest">
            NODE_STATUS: RECRUITING // LOCATION: DISTRIBUTED
          </p>
        </div>
      </section>
    </div>
  );
};

export default Company;
