import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Shield, Zap, Globe, MessageSquare } from 'lucide-react';

const RequestDemo = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-transparent">
      {/* Hero Section */}
      <section className="pt-40 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-20 right-10 opacity-[0.03] select-none pointer-events-none">
          <span className="text-[150px] font-black font-mono text-navy tracking-tighter uppercase whitespace-nowrap">ACCESS_REQUEST</span>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl lg:text-8xl font-black text-navy leading-[1.05] tracking-tightest mb-8">
              Initialize<br />
              <span className="text-olynk">Deployment.</span>
            </h1>
            <p className="text-xl lg:text-2xl text-steel max-w-3xl mx-auto leading-relaxed font-medium">
              Request a live protocol simulation with your actual data nodes.
              Experience the future of autonomous commerce.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form & Info Section */}
      <section className="py-24 lg:py-32 px-4 border-t border-beige bg-white/40 backdrop-blur-xl relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-stretch">
            {/* Info Column */}
            <div className="space-y-12">
              <div className="space-y-6">
                <h2 className="text-4xl lg:text-6xl font-black text-navy tracking-tightest leading-[0.95]">
                  What to<br />
                  <span className="text-navy/40 italic font-serif font-normal text-3xl lg:text-5xl">Expect.</span>
                </h2>
              </div>

              <div className="space-y-8">
                {[
                  { icon: Globe, title: "Data Audit", desc: "A clinical assessment of your current operational silos and fragmentation." },
                  { icon: Zap, title: "Live Simulation", desc: "We run your data through our 4-engine core to show immediate ROI." },
                  { icon: Shield, title: "Security Scoping", desc: "A review of our data-isolation architecture and compliance mapping." }
                ].map((step, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-cream flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <step.icon className="w-6 h-6 text-navy" />
                    </div>
                    <div className="space-y-1">
                      <div className="text-xl font-black text-navy tracking-tight">{step.title}</div>
                      <div className="text-steel font-medium leading-relaxed">{step.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-8 rounded-[40px] border border-beige/60 bg-white/60">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-cream flex items-center justify-center">
                        <span className="text-[10px] font-black text-navy">NODE_{i}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-xs font-black text-tan uppercase tracking-widest">Active Pilots: 124</div>
                </div>
                <p className="text-sm text-steel font-bold">
                  "OLynk's data audit alone saved us 4 months of engineering time."
                </p>
              </div>
            </div>

            {/* Form Column */}
            <div className="relative">
              <div className="sticky top-40 bg-white p-10 lg:p-14 rounded-[48px] border border-beige shadow-2xl space-y-8">
                {!isSubmitted ? (
                  <>
                    <div className="space-y-2 text-center lg:text-left">
                      <h3 className="text-3xl font-black text-navy tracking-tight">Access Protocol</h3>
                      <p className="text-steel font-medium">Deployment window: Next 24-48 hours</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-tan uppercase tracking-widest ml-1">Operator_Name</label>
                          <input required type="text" className="w-full px-6 py-4 rounded-2xl bg-cream border-2 border-transparent focus:border-olynk focus:bg-white outline-none transition-all font-bold text-navy" placeholder="John Doe" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-tan uppercase tracking-widest ml-1">Entity_Name</label>
                          <input required type="text" className="w-full px-6 py-4 rounded-2xl bg-cream border-2 border-transparent focus:border-olynk focus:bg-white outline-none transition-all font-bold text-navy" placeholder="Acme Corp" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-tan uppercase tracking-widest ml-1">Secure_Endpoint (Email)</label>
                        <input required type="email" className="w-full px-6 py-4 rounded-2xl bg-cream border-2 border-transparent focus:border-olynk focus:bg-white outline-none transition-all font-bold text-navy" placeholder="john@acme.com" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-tan uppercase tracking-widest ml-1">Network_Volume (Monthly Orders)</label>
                        <select className="w-full px-6 py-4 rounded-2xl bg-cream border-2 border-transparent focus:border-olynk focus:bg-white outline-none transition-all font-bold text-navy appearance-none cursor-pointer">
                          <option>5,000 - 10,000</option>
                          <option>10,000 - 50,000</option>
                          <option>50,000 - 100,000</option>
                          <option>100,000+</option>
                        </select>
                      </div>
                      <button type="submit" className="w-full py-6 bg-navy text-white rounded-2xl font-black text-xl hover:shadow-2xl hover:bg-olynk transition-all flex items-center justify-center gap-4 group">
                        Authorize Deployment
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </form>
                    <p className="text-[10px] text-center text-steel font-mono uppercase tracking-widest">
                                            // SECURE_CONNECTION: AES_256_ACTIVE
                    </p>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-20 space-y-8"
                  >
                    <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-3xl font-black text-navy tracking-tight">Request Logged.</h3>
                      <p className="text-steel font-medium leading-relaxed">
                        An intelligence officer will reach out within 24 hours to begin
                        your protocol simulation.
                      </p>
                    </div>
                    <div className="pt-8 border-t border-beige">
                      <div className="text-[10px] font-black text-tan uppercase tracking-widest mb-2 font-mono">Reference_ID</div>
                      <div className="text-navy font-mono font-bold">REQ_2948_XJ_01</div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Trust Section */}
      <section className="py-24 px-4 bg-navy text-white text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <MessageSquare className="w-12 h-12 text-olynk mx-auto" />
          <h4 className="text-2xl font-black">Direct Access</h4>
          <p className="text-white/60 font-medium">
            Prefer a direct uplink? Email our deployment team at <span className="text-white font-bold underline">ops@olynk.ai</span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default RequestDemo;
