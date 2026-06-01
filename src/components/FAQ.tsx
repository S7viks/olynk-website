import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Lock, ShieldCheck, Zap, Database, Cpu, Fingerprint } from 'lucide-react';

type FAQCategory = 'Overview' | 'Integration' | 'Security';

type IndustryFilter = 'all' | 'retail' | 'manufacturing' | 'chemicals' | 'pharma';

type FAQQuestion = {
  q: string;
  a: string;
  industries?: IndustryFilter[];
};

const INDUSTRY_FILTERS: Array<{ id: IndustryFilter; label: string }> = [
  { id: 'all', label: 'All verticals' },
  { id: 'retail', label: 'Retail & E-commerce' },
  { id: 'manufacturing', label: 'Manufacturing' },
  { id: 'chemicals', label: 'Chemicals' },
  { id: 'pharma', label: 'Pharma' },
];

const FAQ_CATEGORIES: Record<FAQCategory, { label: string; icon: any; questions: FAQQuestion[] }> = {
  Overview: {
    label: "Capability overview",
    icon: Cpu,
    questions: [
      {
        q: "How is causal intelligence different from forecasting or BI dashboards?",
        a: "Dashboards and many ML models show what moved together; causal views estimate what would change if you pulled a specific lever, holding confounders explicit. Olynk ships ranked drivers, counterfactuals, and confidence with lineage so finance and ops can agree on interventions, not debate charts."
      },
      {
        q: "What if the AI makes wrong recommendations?",
        a: "Each suggestion includes causal rationale, data lineage, and policy context. Tiered approvals apply to material decisions while routine, low-risk actions can run within guardrails you define. Commercial terms are aligned during enterprise onboarding, including success criteria and escalation paths."
      },
      {
        q: "How does AI learn our specific business?",
        a: "We learn your seasonality, constraints, and business rules, then refine causal structure with feedback from decisions and outcomes, so recommendations reflect your policies and service targets, not generic benchmarks."
      }
    ]
  },
  Integration: {
    label: "Integration & Data",
    icon: Database,
    questions: [
      {
        q: "How does AI handle data conflicts between systems?",
        a: "Our AI applies your business rules to resolve conflicts automatically. For example, if one system shows 50 units but WMS shows 45, we use the most recent/reliable source and surface the reconciliation logic with lineage. You can see exactly how decisions are made."
      },
      {
        q: "What if our systems can't integrate?",
        a: "We connect to common platforms via APIs, webhooks, and smart data sync. For systems without direct integration, we can set up automated flows through files (CSV/SFTP), database replication, or custom connectors."
      },
      {
        q: "How long does integration setup take?",
        a: "Most teams are connected within days for standard stacks; enterprise ERPs and plant systems typically take 1–2 sprints. We handle the technical setup while you validate policies, roles, and thresholds."
      },
      {
        q: "What happens if integration breaks?",
        a: "AI monitors all connections 24/7 and fixes most issues automatically. If manual intervention is needed, we're alerted immediately and fix within 2 hours. You get real-time status updates throughout."
      }
    ]
  },
  Security: {
    label: "Security & Trust",
    icon: Fingerprint,
    questions: [
      {
        q: "What about data security and privacy?",
        a: "Enterprise-grade security with end-to-end encryption. Your data trains models specifically for your business and is never shared. We maintain strict security protocols with regular internal and external audits."
      },
      {
        q: "Do you own our data?",
        a: "No. You retain 100% ownership of your data and insights. Our models are trained on your data to serve you, but the underlying intellectual property of your business operations remains yours."
      },
      {
        q: "Can we export our data if we leave?",
        a: "Absolutely. We believe in zero lock-in. You can export your cleaned, unified data history at any time in standard formats (CSV, JSON, SQL dump) with a single click."
      }
    ]
  }
};

const FAQItem = ({ question, answer, isOpen, onClick, idx }: { question: string, answer: string, isOpen: boolean, onClick: () => void, idx: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className={`border-b border-beige transition-all duration-500 rounded-xl lg:rounded-2xl mb-2 lg:mb-3 overflow-hidden ${isOpen ? 'bg-noir shadow-sm' : 'hover:bg-noir bg-noir/40'}`}
    >
      <button
        onClick={onClick}
        className="w-full py-4 lg:py-6 flex items-start lg:items-center justify-between text-left group px-4 lg:px-8"
      >
        <div className="flex items-start lg:items-center gap-3 lg:gap-6 flex-1 min-w-0">
          <span className={`text-[8px] lg:text-[9px] font-black font-mono transition-colors duration-500 mt-1 lg:mt-0 ${isOpen ? 'text-olynk' : 'text-tan'}`}>
            0{idx + 1}
          </span>
          <h3 className={`text-sm lg:text-lg font-black transition-colors duration-500 break-words flex-1 ${isOpen ? 'text-navy' : 'text-steel group-hover:text-navy'} pr-4 lg:pr-0`}>
            {question}
          </h3>
        </div>
        <div className={`shrink-0 p-1.5 lg:p-2 rounded-full border transition-all duration-500 mt-0.5 lg:mt-0 ${isOpen ? 'bg-navy border-navy text-white rotate-180' : 'bg-transparent border-beige text-tan group-hover:border-tan'}`}>
          {isOpen ? <Minus className="w-3 h-3 lg:w-4 lg:h-4" /> : <Plus className="w-3 h-3 lg:w-4 lg:h-4" />}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-6 lg:pb-8 px-4 lg:px-8 pl-8 lg:pl-20 pr-4 lg:pr-32">
              <p className="text-xs lg:text-base text-steel leading-relaxed font-medium break-words">
                {answer}
              </p>

              <div className="mt-6 lg:mt-8 flex items-center gap-3 lg:gap-4">
                <div className="w-6 lg:w-8 h-[1px] bg-tan" />
                <span className="text-[8px] lg:text-[10px] font-black text-tan uppercase tracking-[0.2em] font-mono">Response_Validated_Active</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  const [activeTab, setActiveTab] = useState<FAQCategory>('Overview');
  const [activeIndustry, setActiveIndustry] = useState<IndustryFilter>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const visibleQuestions = FAQ_CATEGORIES[activeTab].questions.filter((q) => {
    if (activeIndustry === 'all') return true;
    if (!q.industries || q.industries.length === 0) return true;
    return q.industries.includes(activeIndustry);
  });

  return (
    <section className="group py-16 lg:py-32 bg-cream relative overflow-hidden border-t border-beige">
      {/* ... dynamic background ... */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, -100, 0], y: [0, -50, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[5%] -right-[10%] w-[45%] h-[45%] bg-olynk/5 rounded-full blur-[110px]"
        />
        <motion.div
          animate={{ x: [0, 60, 0], y: [0, 80, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[10%] -left-[5%] w-[40%] h-[40%] bg-navy/5 rounded-full blur-[120px]"
        />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.5),rgba(243,234,224,0.1))]" />

      <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none z-0"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

      <div className="absolute top-0 right-0 p-6 lg:p-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 select-none pointer-events-none">
        <span className="text-4xl lg:text-[120px] font-black font-mono text-beige leading-none tracking-tightest uppercase">QUERY_ONLINE</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header Block */}
        <div className="mb-12 lg:mb-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 lg:gap-4 mb-4 lg:mb-6">
              <div className="w-8 lg:w-12 h-[1px] bg-tan" />
              <span className="text-[8px] lg:text-[10px] font-black text-olynk uppercase tracking-[0.4em] font-mono">Knowledge Base</span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-black text-navy tracking-tightest leading-tight mb-4 lg:mb-6">
              Questions from <br />
              <span className="text-olynk text-2xl lg:text-5xl">modern operations leaders.</span>
            </h2>
            <p className="text-base lg:text-xl text-steel font-medium leading-relaxed max-w-2xl">
              Everything you need to know about running <span className="text-navy font-bold">causal intelligence</span> on top of your existing operations stack.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="p-4 lg:p-6 bg-noir border border-beige rounded-xl lg:rounded-2xl shadow-sm flex items-center gap-4 lg:gap-6 w-fit lg:w-auto">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg lg:rounded-xl bg-cream flex items-center justify-center text-navy font-bold border border-beige/40">
                <ShieldCheck className="w-5 h-5 lg:w-6 h-6" />
              </div>
              <div className="space-y-0.5 lg:space-y-1">
                <span className="text-[8px] lg:text-[10px] font-black text-tan uppercase tracking-[0.2em] font-mono block">Security_Protocol</span>
                <span className="text-xs lg:text-sm font-bold text-navy">Enterprise Security Ready</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs & Content Container */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-24">

          {/* Tab Navigation */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-4">
              <div className="flex lg:flex-col gap-3 overflow-x-auto pb-4 lg:pb-0 no-scrollbar">
                {(Object.keys(FAQ_CATEGORIES) as FAQCategory[]).map((category) => {
                  const isActive = activeTab === category;
                  const Icon = FAQ_CATEGORIES[category].icon;
                  return (
                    <button
                      key={category}
                      onClick={() => {
                        setActiveTab(category);
                        setOpenIndex(0);
                      }}
                      className={`
                          shrink-0 flex items-center gap-3 lg:gap-4 px-4 lg:px-6 py-3 lg:py-4 rounded-xl border transition-all duration-300 w-auto lg:w-full text-left group/tab
                          ${isActive
                          ? 'bg-navy border-navy shadow-lg text-white'
                          : 'bg-noir/40 border-beige text-navy hover:bg-noir hover:border-tan/50'
                        }
                        `}
                    >
                      <div className={`
                          w-8 h-8 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center transition-colors duration-300
                          ${isActive ? 'bg-noir/10 text-white' : 'bg-cream text-navy/40 group-hover/tab:text-navy'}
                        `}>
                        <Icon className="w-4 h-4 lg:w-5 h-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className={`text-[8px] lg:text-[10px] font-black uppercase tracking-widest font-mono mb-0.5 transition-colors duration-300 ${isActive ? 'text-white/40' : 'text-tan'}`}>
                          {isActive ? 'Active' : 'Category'}
                        </span>
                        <span className={`text-xs lg:text-sm font-bold transition-colors duration-300`}>
                          {category}
                        </span>
                      </div>
                      {isActive && (
                        <div className="ml-auto hidden lg:block">
                          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Desktop-only Context Box */}
              <div className="hidden lg:block mt-8 p-8 bg-noir/40 border border-beige/40 rounded-3xl backdrop-blur-sm">
                <p className="text-sm text-steel leading-relaxed mb-4">
                  Can&apos;t find what you&apos;re looking for? Documentation covers APIs, lineage hooks, and how Fabric through Orbit fit your stack.
                </p>
                <Link to="/documentation" className="text-xs font-black text-navy uppercase tracking-widest border-b border-navy/20 hover:border-navy pb-1 transition-all inline-block">
                  View_Documentation
                </Link>
              </div>
            </div>
          </div>

          {/* Questions Panel */}
          <div className="lg:col-span-8">
            <div className="space-y-2 lg:space-y-4 min-h-0 lg:min-h-[500px]">
              {/* Industry Filters */}
              <div className="flex flex-wrap items-center gap-2 pb-3">
                {INDUSTRY_FILTERS.map((filter) => {
                  const isActive = activeIndustry === filter.id;
                  return (
                    <button
                      key={filter.id}
                      type="button"
                      onClick={() => {
                        setActiveIndustry(filter.id);
                        setOpenIndex(0);
                      }}
                      className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${
                        isActive
                          ? 'bg-navy text-white border-navy'
                          : 'bg-noir/40 text-navy/70 border-beige hover:bg-noir hover:border-tan'
                      }`}
                    >
                      {filter.label}
                    </button>
                  );
                })}
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeTab}-${activeIndustry}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {visibleQuestions.map((faq, index) => (
                    <FAQItem
                      key={`${activeTab}-${activeIndustry}-${index}`}
                      idx={index}
                      question={faq.q}
                      answer={faq.a}
                      isOpen={openIndex === index}
                      onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Bottom CTA / Help */}
        <div className="mt-16 lg:mt-24 p-8 lg:p-14 bg-navy rounded-3xl lg:rounded-[40px] relative overflow-hidden group">
          <div className="absolute top-0 right-0 opacity-5 lg:opacity-10 transition-transform duration-700 group-hover:scale-125">
            <Zap className="w-48 h-48 lg:w-64 lg:h-64 text-white" />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
            <div className="max-w-2xl space-y-4 lg:space-y-6">
              <h3 className="text-2xl lg:text-4xl font-black text-white tracking-tightest">Still have questions?</h3>
              <p className="text-lg lg:text-xl text-cream font-medium">
                Our operations experts are ready to walk you through Olynk OS with your own data.
              </p>
            </div>
            <button className="w-full lg:w-auto px-8 py-4 lg:px-10 lg:py-5 bg-noir text-navy rounded-xl font-black text-[11px] lg:text-[13px] uppercase tracking-widest hover:bg-cream transition-all duration-300 shadow-2xl active:scale-95 flex items-center justify-center lg:justify-start gap-3 lg:gap-4">
              Speak to an Expert
              <Plus className="w-4 h-4 rotate-45" />
            </button>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 lg:mt-16 flex flex-wrap items-center justify-center gap-6 lg:gap-12 text-[8px] lg:text-[11px] font-black text-tan uppercase tracking-[0.3em] font-mono">
          <div className="flex items-center gap-2 lg:gap-3">
            <Lock className="w-3 h-3" />
            <span>AES_256_ENCRYPTION</span>
          </div>
          <div className="flex items-center gap-2 lg:gap-3">
            <div className="w-1.5 lg:w-2 h-1.5 lg:h-2 rounded-full bg-emerald-500" />
            <span>99.9%_SYSTEM_UPTIME</span>
          </div>
          <div className="flex items-center gap-2 lg:gap-3">
            <ShieldCheck className="w-3 h-3" />
            <span>DATA_TRAINING_ISOLATION</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
