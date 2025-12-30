import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Cpu, Microscope, GraduationCap, ShoppingCart, ArrowRight, Activity, ShieldCheck } from 'lucide-react';
import CommerceSection from '../../components/CommerceSection';
import FixMechanismModal from '../../components/FixMechanismModal';

const industriesData: Record<string, any> = {
    commerce: {
        title: "Commerce",
        role: "Operational OS for Retail",
        desc: "Autonomous inventory logic and real-time demand forecasting for high-velocity commerce entities.",
        icon: ShoppingCart,
        accent: "text-olynk",
        bg: "bg-white",
        layers: [
            {
                id: "INVENTORY_AUTONOMY",
                title: "Inventory Autonomy",
                desc: "Unified cognitive layer that creates a single source of truth across all operational endpoints."
            },
            {
                id: "MULTI_CHANNEL_SYNC",
                title: "Multi-Channel Sync",
                desc: "Real-time orchestration of digital channels, physical nodes, and ERP systems."
            },
            {
                id: "DEMAND_PREDICTION",
                title: "Demand Prediction",
                desc: "Predictive inference engines that identify disruption patterns before they affect service levels."
            }
        ],
        tools: [
            { name: "Shopify", domain: "shopify.com" },
            { name: "Salesforce", domain: "salesforce.com" },
            { name: "NetSuite", domain: "netsuite.com" },
            { name: "Klaviyo", domain: "klaviyo.com" },
            { name: "Gorgias", domain: "gorgias.com" },
            { name: "ShipStation", domain: "shipstation.com" },
            { name: "Recharge", domain: "rechargepayments.com" },
            { name: "Loop", domain: "loopreturns.com" }
        ],
        headline: {
            top: "Demand intelligence.",
            bottom: "Supply autonomy."
        },
        bgLabel: "SYSTEM_CORE // COMMERCE",
        heroStats: [
            {
                label: "Global Stock",
                value: "99.9%",
                subLabel: "Sync Accuracy: ACTIVE",
                color: "bg-emerald-500",
                icon: "activity"
            },
            {
                label: "Revenue/Min",
                value: "$4,280",
                subLabel: "+12.4% PERFORMANCE",
                color: "bg-olynk",
                icon: "trending"
            },
            {
                label: "Margin Risk",
                value: "PROTECTED",
                subLabel: "0 LEAKS DETECTED",
                color: "text-navy",
                icon: "shield"
            }
        ]
    },
    manufacturing: {
        title: "Manufacturing",
        role: "Industrial Intelligence",
        desc: "Unified operational visibility and predictive maintenance logic for complex industrial workflows.",
        icon: Cpu,
        accent: "text-steel",
        bg: "bg-white",
        layers: [
            {
                id: "SUPPLY_CHAIN_LOGIC",
                title: "Supply Chain Logic",
                desc: "Intelligent orchestration of supply chain variables for maximum throughput."
            },
            {
                id: "FLOW_OPTIMIZATION",
                title: "Flow Optimization",
                desc: "Real-time adjustments to production flows based on predictive demand models."
            },
            {
                id: "DOWNTIME_PREVENTION",
                title: "Downtime Prevention",
                desc: "Sensor-fused technical diagnostics to intercept maintenance needs."
            }
        ],
        tools: [
            { name: "SAP", domain: "sap.com" },
            { name: "Oracle", domain: "oracle.com" },
            { name: "Siemens", domain: "siemens.com" },
            { name: "Rockwell", domain: "rockwellautomation.com" },
            { name: "Honeywell", domain: "honeywell.com" },
            { name: "GE Digital", domain: "ge.com" },
            { name: "Plex", domain: "plex.com" },
            { name: "Infor", domain: "infor.com" }
        ],
        headline: {
            top: "Factory reasoning.",
            bottom: "Flow orchestration."
        },
        bgLabel: "SYSTEM_CORE // MFG",
        heroStats: [
            {
                label: "OEE Score",
                value: "85.2%",
                subLabel: "Efficiency: OPTIMAL",
                color: "bg-emerald-500",
                icon: "activity"
            },
            {
                label: "Downtime",
                value: "-85%",
                subLabel: "vs. Standard Operations",
                color: "bg-blue-500",
                icon: "trending"
            },
            {
                label: "Safety Scan",
                value: "ACTIVE",
                subLabel: "Predictive Monitoring",
                color: "text-navy",
                icon: "shield"
            }
        ]
    },
    healthcare: {
        title: "Healthcare",
        role: "Clinical Operational Layer",
        desc: "Secure, real-time data orchestration for clinical research and healthcare logistics management.",
        icon: Microscope,
        accent: "text-emerald-600",
        bg: "bg-white",
        layers: [
            {
                id: "PROTOCOL_COMPLIANCE",
                title: "Protocol Compliance",
                desc: "Automated verification of clinical protocols across distributed nodes."
            },
            {
                id: "REAL_TIME_ORCHESTRATION",
                title: "Orchestration",
                desc: "Precision timing for specimen logistics and clinical resource allocation."
            },
            {
                id: "DATA_INTEGRITY",
                title: "Data Integrity",
                desc: "Immutable audit trails for high-compliance operational data streams."
            }
        ],
        tools: [
            { name: "Epic", domain: "epic.com" },
            { name: "Cerner", domain: "cerner.com" },
            { name: "Athena", domain: "athenahealth.com" },
            { name: "Allscripts", domain: "allscripts.com" },
            { name: "Meditech", domain: "meditech.com" },
            { name: "GE Health", domain: "gehealthcare.com" },
            { name: "Philips", domain: "philips.com" },
            { name: "DrChrono", domain: "drchrono.com" }
        ],
        headline: {
            top: "Clinical causal.",
            bottom: "Data integrity."
        },
        bgLabel: "SYSTEM_CORE // CLINICAL",
        heroStats: [
            {
                label: "Protocol Match",
                value: "100%",
                subLabel: "Compliance: VERIFIED",
                color: "bg-emerald-500",
                icon: "activity"
            },
            {
                label: "Resource Util",
                value: "94%",
                subLabel: "Allocation Efficiency",
                color: "bg-emerald-600",
                icon: "trending"
            },
            {
                label: "Data Privacy",
                value: "SECURE",
                subLabel: "HIPAA/GDPR Active",
                color: "text-navy",
                icon: "shield"
            }
        ]
    },
    edtech: {
        title: "EdTech",
        role: "Adaptive Learning Infrastructure",
        desc: "Intelligent data frameworks for adaptive learning systems and institutional operational efficiency.",
        icon: GraduationCap,
        accent: "text-olynk",
        bg: "bg-white",
        layers: [
            {
                id: "LEARNING_LOGIC",
                title: "Learning Logic",
                desc: "Autonomous content delivery based on real-time student performance vectors."
            },
            {
                id: "INSTITUTIONAL_SYNC",
                title: "Institutional Sync",
                desc: "Seamless integration between administrative systems and learning environments."
            },
            {
                id: "SUCCESS_METRICS",
                title: "Success Metrics",
                desc: "Predictive analytics for student retention and academic performance."
            }
        ],
        tools: [
            { name: "Canvas", domain: "instructure.com" },
            { name: "Blackboard", domain: "blackboard.com" },
            { name: "Moodle", domain: "moodle.org" },
            { name: "Google", domain: "edu.google.com" },
            { name: "Coursera", domain: "coursera.org" },
            { name: "Udemy", domain: "udemy.com" },
            { name: "Schoology", domain: "schoology.com" },
            { name: "PowerSchool", domain: "powerschool.com" }
        ],
        headline: {
            top: "Instructional logic.",
            bottom: "Adaptive sync."
        },
        bgLabel: "SYSTEM_CORE // EDTECH",
        heroStats: [
            {
                label: "Engagement",
                value: "High",
                subLabel: "Student Participation",
                color: "bg-emerald-500",
                icon: "activity"
            },
            {
                label: "Retention",
                value: "+15%",
                subLabel: "vs. Previous Term",
                color: "bg-olynk",
                icon: "trending"
            },
            {
                label: "Data Integrity",
                value: "SYNCED",
                subLabel: "SIS/LMS Unified",
                color: "text-navy",
                icon: "shield"
            }
        ]
    },
};

const IndustryDetail = () => {
    const { id } = useParams();
    const data = industriesData[id || 'commerce'] || industriesData.commerce;
    const isCommerce = (id || 'commerce') === 'commerce';
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null);

    const openModalWithLayer = (layerId: string | null = null) => {
        setSelectedLayerId(layerId);
        setIsModalOpen(true);
    };

    return (
        <div className="relative min-h-screen bg-transparent">

            {/* Signature Background Label Pattern - Subtle/Small */}
            <div className="absolute top-20 left-0 w-full flex justify-center opacity-[0.03] select-none pointer-events-none z-0 overflow-hidden">
                <span className="text-[40px] lg:text-[72px] font-black font-mono text-navy tracking-widest uppercase whitespace-nowrap">{data.bgLabel}</span>
            </div>

            {/* Hero Section - Centered Architectural Redesign */}
            <section className="relative pt-20 pb-20 lg:pt-32 lg:pb-24 px-6">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0" />
                </div>
                <div className="max-w-7xl mx-auto relative z-10">

                    {/* Background Connection Lines (SVG) */}
                    <div className="absolute inset-0 pointer-events-none -z-10 overflow-visible">
                        <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Central Path Left */}
                            <motion.path
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 0.15 }}
                                transition={{ duration: 2, delay: 0.5 }}
                                d="M 600 700 V 500 H 200 V 200"
                                stroke="#223148" strokeWidth="1" strokeDasharray="4 4"
                            />
                            {/* Central Path Right */}
                            <motion.path
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 0.15 }}
                                transition={{ duration: 2, delay: 0.7 }}
                                d="M 600 700 V 500 H 1000 V 200"
                                stroke="#223148" strokeWidth="1" strokeDasharray="4 4"
                            />
                            {/* Branching Lines */}
                            <motion.path
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 0.1 }}
                                transition={{ duration: 2, delay: 0.9 }}
                                d="M 600 600 H 400 V 350"
                                stroke="#223148" strokeWidth="1"
                            />
                            <motion.path
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 0.1 }}
                                transition={{ duration: 2, delay: 1.1 }}
                                d="M 600 600 H 800 V 350"
                                stroke="#223148" strokeWidth="1"
                            />
                        </svg>
                    </div>

                    <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col items-center"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-beige rounded-full mb-8 shadow-sm">
                                <Activity className={`w-3 h-3 ${data.accent}`} />
                                <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${data.accent} font-mono`}>VERTICAL_CORE // {id?.toUpperCase() || 'COMMERCE'}</span>
                            </div>

                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy leading-[1.1] tracking-tight mb-8">
                                {data.headline.top} <br />
                                <span className="text-olynk">{data.headline.bottom}</span>
                            </h1>

                            <p className="text-xl text-steel font-medium leading-relaxed max-w-2xl mb-10">
                                {data.desc} Specifically architected to provide an <span className="text-navy font-bold">irreducible layer</span> of operational intelligence.
                            </p>

                            <div className="flex flex-wrap justify-center gap-4 mb-2">
                                <button className="bg-navy text-white px-10 py-5 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-olynk transition-all shadow-xl hover:-translate-y-1">
                                    Register for Demo
                                </button>
                                <button className="bg-white border border-beige text-navy px-10 py-5 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-cream transition-all">
                                    Technical Specs
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Dynamic Hero Elements - Industry Specific */}
                    <div className="relative w-full mt-12 lg:mt-0">
                        
                        {/* Mobile Stats Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-4 mb-12">
                            {data.heroStats?.map((stat: any, i: number) => (
                                <div key={i} className="p-5 border border-beige rounded-2xl bg-white shadow-sm flex items-center justify-between">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <div className={`w-1.5 h-1.5 rounded-full ${stat.color} animate-pulse`} />
                                            <span className="text-[9px] font-black text-tan uppercase tracking-widest">{stat.label}</span>
                                        </div>
                                        <div className="text-xl font-black text-navy tracking-tight">{stat.value}</div>
                                    </div>
                                    <div className="text-[9px] font-mono text-steel uppercase tracking-tighter text-right">{stat.subLabel}</div>
                                </div>
                            ))}
                        </div>

                        {/* Desktop Stats (Floating) */}
                        <div className="hidden lg:block">
                            {/* Stat 1: Top Left */}
                            {data.heroStats?.[0] && (
                                <motion.div
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="absolute top-[-380px] left-[5%] p-6 border border-beige rounded-3xl bg-white shadow-xl z-20 min-w-[180px]"
                                >
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className={`w-2 h-2 rounded-full ${data.heroStats[0].color} animate-pulse`} />
                                        <span className="text-[10px] font-black text-tan uppercase tracking-widest">{data.heroStats[0].label}</span>
                                    </div>
                                    <div className="text-3xl font-black text-navy tracking-tight mb-1">{data.heroStats[0].value}</div>
                                    <div className="text-[10px] font-mono text-steel uppercase tracking-tighter">{data.heroStats[0].subLabel}</div>
                                </motion.div>
                            )}

                            {/* Stat 2: Top Right */}
                            {data.heroStats?.[1] && (
                                <motion.div
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.7 }}
                                    className="absolute top-[-380px] right-[5%] p-6 border border-beige rounded-3xl bg-white shadow-xl z-20 min-w-[180px] text-right"
                                >
                                    <div className="flex items-center gap-2 mb-3 justify-end">
                                        <span className="text-[10px] font-black text-tan uppercase tracking-widest">{data.heroStats[1].label}</span>
                                        <div className={`w-2 h-2 rounded-full ${data.heroStats[1].color} animate-pulse`} />
                                    </div>
                                    <div className="text-3xl font-black text-navy tracking-tight mb-1">{data.heroStats[1].value}</div>
                                    <div className="text-[10px] font-medium text-emerald-600 flex items-center justify-end gap-1 font-mono uppercase">
                                        <Activity className="w-3 h-3" />
                                        {data.heroStats[1].subLabel}
                                    </div>
                                </motion.div>
                            )}

                            {/* Stat 3: Middle Left */}
                            {data.heroStats?.[2] && (
                                <motion.div
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.9 }}
                                    className="absolute top-[-150px] left-[0%] p-5 border border-beige rounded-3xl bg-white shadow-xl z-20 min-w-[170px]"
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <ShieldCheck className={`w-3 h-3 ${data.heroStats[2].color}`} />
                                        <span className="text-[10px] font-black text-tan uppercase tracking-widest">{data.heroStats[2].label}</span>
                                    </div>
                                    <div className="text-xl font-black text-navy tracking-tight uppercase">{data.heroStats[2].value}</div>
                                    <div className="text-[10px] font-mono text-steel mt-1 uppercase">{data.heroStats[2].subLabel}</div>
                                </motion.div>
                            )}
                        </div>

                        {/* Tool Grid: Middle Right (Responsive) */}
                        {data.tools && (
                            <div className="lg:absolute lg:top-[-150px] lg:right-[0%] grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-4 gap-2 p-4 border border-beige rounded-3xl bg-white shadow-sm lg:shadow-xl z-20">
                                {data.tools.map((tool: any, i: number) => (
                                    <div key={i} className="w-10 h-10 rounded-xl bg-cream border border-beige flex items-center justify-center grayscale hover:grayscale-0 transition-all cursor-crosshair">
                                        <img src={`https://www.google.com/s2/favicons?domain=${tool.domain}&sz=64`} alt={tool.name} className="w-5 h-5 object-contain" />
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>

                </div>
            </section>

            {/* Special Commerce Intelligence Section */}
            {isCommerce && (
                <div className="border-t border-beige">
                    <CommerceSection />
                </div>
            )}

            {/* Layers Section - Structural Refinement - Using Card Style from Platform.tsx */}
            <section className="py-24 lg:py-32 px-6 bg-white border-y border-beige relative">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-20 flex items-end justify-between">
                        <div>
                            <span className="text-[10px] font-mono font-black text-tan uppercase tracking-[0.3em] block mb-4">SYSTEM_ARCHITECTURE</span>
                            <h2 className="text-4xl lg:text-5xl font-black text-navy uppercase tracking-tightest">The Operational Layers</h2>
                        </div>
                        <button
                            onClick={() => openModalWithLayer(null)}
                            className="flex items-center gap-3 group/btn text-navy font-black text-[12px] uppercase tracking-widest pt-4 border-b border-navy/20 hover:border-navy w-fit pb-1 hover:gap-5 transition-all"
                        >
                            Review Fix Mechanism
                            <ArrowRight className="w-4 h-4 transition-transform" />
                        </button>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {data.layers.map((layer: any, i: number) => (
                            <motion.div
                                key={layer.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="p-10 rounded-3xl bg-cream border border-beige hover:border-navy hover:shadow-2xl transition-all duration-500 group"
                            >
                                <div className="text-[10px] font-mono font-black text-tan uppercase tracking-[0.3em] mb-6">NODE_0{i + 1}</div>
                                <h3 className="text-2xl font-black text-navy mb-6 uppercase tracking-tight">{layer.title}</h3>
                                <p className="text-steel font-medium leading-relaxed mb-10">
                                    {layer.desc}
                                </p>
                                <button
                                    onClick={() => openModalWithLayer(layer.id)}
                                    className="flex items-center gap-2 text-navy font-black text-[10px] uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity hover:gap-3 transition-all"
                                >
                                    View Protocol <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final Sector CTA */}
            <section className="py-24 lg:py-40 px-6 bg-cream text-center relative overflow-hidden">
                <div className="max-w-4xl mx-auto relative z-10">
                    <h2 className="text-5xl lg:text-7xl font-black text-navy mb-10 tracking-tightest leading-[1.05]">
                        Deploy Intelligence <br />
                        <span className="text-olynk italic font-serif font-normal">in minutes.</span>
                    </h2>
                    <p className="text-xl text-steel font-medium mb-12 max-w-2xl mx-auto">
                        Olynk integrates with your existing {data.title} infrastructure to start identifying leakage immediately.
                    </p>
                    <button className="bg-olynk text-white px-12 py-6 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-navy transition-all shadow-2xl hover:-translate-y-1">
                        Start Industry-Specific Pilot
                    </button>
                </div>
            </section>

            {/* Fix Mechanism Modal */}
            <FixMechanismModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                layers={data.layers}
                industryTitle={data.title}
                selectedLayerId={selectedLayerId}
            />

        </div>
    );
};

export default IndustryDetail;
