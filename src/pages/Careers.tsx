import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock } from 'lucide-react';

const Careers = () => {
    const openings = [
        {
            title: "Senior Backend Engineer",
            department: "Engineering",
            location: "Remote / San Francisco",
            type: "Full-time"
        },
        {
            title: "Product Designer",
            department: "Design",
            location: "Remote / New York",
            type: "Full-time"
        },
        {
            title: "Solutions Architect",
            department: "Customer Success",
            location: "Remote",
            type: "Full-time"
        }
    ];

    return (
        <div className="relative min-h-screen bg-transparent">
            <section className="relative pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-beige rounded-full mb-8 shadow-sm">
                            <Briefcase className="w-3 h-3 text-navy" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-navy font-mono">JOIN_THE_TEAM</span>
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-black text-navy mb-6 tracking-tight">
                            Careers at <span className="text-olynk italic font-serif font-normal">Olynk</span>
                        </h1>
                        <p className="text-xl text-steel font-medium">
                            Build the future of autonomous commerce operations.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-20 px-6 bg-white">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-black text-navy mb-12">Open Positions</h2>
                    <div className="space-y-6">
                        {openings.map((job, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                                className="p-8 rounded-3xl bg-cream border-2 border-beige hover:border-navy hover:shadow-xl transition-all group">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-2xl font-black text-navy mb-3">{job.title}</h3>
                                        <div className="flex flex-wrap gap-4 text-steel">
                                            <div className="flex items-center gap-2">
                                                <Briefcase className="w-4 h-4" />
                                                <span className="text-sm font-medium">{job.department}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4" />
                                                <span className="text-sm font-medium">{job.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4" />
                                                <span className="text-sm font-medium">{job.type}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="bg-navy text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-olynk transition-all">
                                        Apply
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Careers;
