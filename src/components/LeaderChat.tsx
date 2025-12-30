import { useState, useEffect } from 'react';
import { MessageCircle, TrendingUp, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Leader {
    id: string;
    name: string;
    role: string;
    company: string;
    revenue: string;
    avatar: string;
    stage: 'scaling' | 'optimizing' | 'accelerating' | 'maturing';
    color: string;
    questions: Array<{
        question: string;
        context: string;
        answer: string;
        metrics?: string;
    }>;
}

const LeaderChat = () => {
    const [currentLeader, setCurrentLeader] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);
    const [animationPhase, setAnimationPhase] = useState('question');

    const leaders: Leader[] = [
        {
            id: 'leader1',
            name: 'Operations Director',
            role: 'Head of Supply Chain',
            company: 'Apparel Matrix',
            revenue: '₹25Cr+',
            avatar: '👔',
            stage: 'scaling',
            color: 'bg-navy',
            questions: [
                {
                    question: 'How do we synchronize inventory across 15+ channels before the festive peak?',
                    context: 'We lost ₹40L last season due to overselling on marketplaces while stock sat in offline stores.',
                    answer: 'Olynk creates a unified inventory buffer that dynamically allocates stock based on real-time channel velocity. It prevents overselling while maximizing availability across all touchpoints.',
                    metrics: 'Eliminates overselling penalties + 12% increase in inventory turnover'
                },
                {
                    question: 'Can the AI automate our procurement cycles with cross-border suppliers?',
                    context: 'Our lead times are 45 days. We often miss the demand window because of manual reordering lags.',
                    answer: 'Yes. Olynk predicts demand 60 days out and auto-generates purchase orders based on supplier lead times and minimum order quantities. It moves your procurement from reactive to predictive.',
                    metrics: '60-day prediction horizon + 80% reduction in manual PO effort'
                }
            ]
        },
        {
            id: 'leader2',
            name: 'Commerce Executive',
            role: 'VP of Digital Commerce',
            company: 'HomeStyle Global',
            revenue: '₹50Cr+',
            avatar: '💼',
            stage: 'accelerating',
            color: 'bg-olynk',
            questions: [
                {
                    question: 'How do we identify revenue leakage in our RTO and returns process?',
                    context: 'Our return rate is 30%. We need to know which products and regions are bleeding cash.',
                    answer: 'Olynk’s RTO Intelligence engine identifies patterns in high-return demographics and products. It provides automated mitigation strategies, like adjusting COD availability for high-risk segments.',
                    metrics: 'Typically reduces RTO by 18-25% through predictive tiering'
                },
                {
                    question: 'Does the system integrate with legacy ERPs and modern WMS?',
                    context: 'We use SAP for core finance and various WMS for local warehouses. Data is fragmented.',
                    answer: 'Olynk acts as the intelligence layer that sits above your existing stack. We connect legacy ERP data with real-time WMS signals to give you one source of operational truth.',
                    metrics: 'Unified data fabric across disconnected legacy systems'
                }
            ]
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            if (animationPhase === 'question' && !isTyping) {
                setIsTyping(true);
                setTimeout(() => {
                    setIsTyping(false);
                    setShowAnswer(true);
                    setAnimationPhase('answer');
                }, 2000);
            } else if (animationPhase === 'answer') {
                setTimeout(() => {
                    setShowAnswer(false);
                    setAnimationPhase('question');

                    if (currentQuestion < leaders[currentLeader].questions.length - 1) {
                        setCurrentQuestion(currentQuestion + 1);
                    } else {
                        setCurrentQuestion(0);
                        setCurrentLeader((currentLeader + 1) % leaders.length);
                    }
                }, 5000);
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [currentLeader, currentQuestion, animationPhase, isTyping, leaders]);

    const currentLeaderData = leaders[currentLeader];
    const currentQuestionData = currentLeaderData.questions[currentQuestion];

    const getStageIcon = (stage: string) => {
        switch (stage) {
            case 'scaling': return <TrendingUp className="w-4 h-4 text-white" />;
            case 'accelerating': return <CheckCircle2 className="w-4 h-4 text-white" />;
            default: return <MessageCircle className="w-4 h-4 text-white" />;
        }
    };

    return (
        <section className="py-24 lg:py-32 bg-cream border-t border-beige relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-[0.05] select-none pointer-events-none">
                <span className="text-[120px] font-black font-mono text-navy uppercase">OPERATIONAL_FEEDBACK</span>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center mb-6">
                        <div className="flex -space-x-3">
                            <div className="w-14 h-14 bg-navy rounded-full flex items-center justify-center text-white font-bold text-xl shadow-xl border-4 border-cream">
                                👔
                            </div>
                            <div className="w-14 h-14 bg-olynk rounded-full flex items-center justify-center text-white font-bold text-xl shadow-xl border-4 border-cream">
                                💼
                            </div>
                        </div>
                        <div className="ml-6 flex items-center gap-2">
                            <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
                            <span className="text-xs font-black text-navy uppercase tracking-widest font-mono">Live Operation_Log</span>
                        </div>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-black text-navy mb-6 tracking-tightest leading-tight">
                        Conversations with <br />
                        <span className="text-olynk italic font-serif font-normal">Commerce Leaders.</span>
                    </h2>
                    <p className="text-lg lg:text-xl text-steel font-medium max-w-2xl mx-auto">
                        How operational architects use Olynk to solve multi-channel complexity.
                    </p>
                </div>

                {/* Chat Interface */}
                <div className="max-w-4xl mx-auto">
                    {/* Leader Profile Card */}
                    <div className={`${currentLeaderData.color} rounded-[32px] p-8 mb-12 text-white shadow-2xl relative overflow-hidden group transition-all duration-500`}>
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                            <MessageCircle className="w-24 h-24" />
                        </div>
                        <div className="flex items-center justify-between relative z-10">
                            <div className="flex items-center space-x-6">
                                <div className="text-5xl bg-white/20 p-4 rounded-2xl backdrop-blur-md">{currentLeaderData.avatar}</div>
                                <div>
                                    <h3 className="text-2xl font-black tracking-tight">{currentLeaderData.name}</h3>
                                    <p className="text-white/70 font-bold uppercase text-xs tracking-widest">{currentLeaderData.role} @ {currentLeaderData.company}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="flex items-center justify-end gap-2 mb-2">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/50">{currentLeaderData.stage}</span>
                                    {getStageIcon(currentLeaderData.stage)}
                                </div>
                                <div className="text-3xl font-black tracking-tighter">{currentLeaderData.revenue}</div>
                                <div className="text-white/50 text-[10px] font-black uppercase tracking-widest">Annual Operational Scale</div>
                            </div>
                        </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="bg-white rounded-[40px] border border-beige shadow-2xl p-8 lg:p-12 mb-12 min-h-[450px] relative overflow-hidden">
                        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(circle_at_2px_2px,navy_1px,transparent_0)] bg-[size:24px_24px]" />

                        {/* Context Message */}
                        <div className="mb-10 animate-fadeIn">
                            <div className="flex items-start gap-4">
                                <div className="text-2xl bg-cream p-2 rounded-lg">{currentLeaderData.avatar}</div>
                                <div className="bg-cream/50 border border-beige/60 rounded-2xl p-5 max-w-md">
                                    <p className="text-steel text-sm font-medium italic">
                                        "{currentQuestionData.context}"
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Question */}
                        <div className="mb-10">
                            <div className="flex items-start gap-4">
                                <div className="text-2xl bg-cream p-2 rounded-lg">{currentLeaderData.avatar}</div>
                                <div className={`${currentLeaderData.color} rounded-2xl p-6 lg:p-8 max-w-xl text-white shadow-lg`}>
                                    <p className="max-w-2xl text-xl lg:text-2xl font-black tracking-tight leading-tight">
                                        {currentQuestionData.question}
                                    </p>
                                    {isTyping && (
                                        <div className="flex items-center gap-1.5 mt-6">
                                            <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></div>
                                            <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                            <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* AI Response */}
                        {showAnswer && (
                            <div className="mb-10 animate-slideUp">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-navy rounded-full flex items-center justify-center text-white font-black text-xs shadow-md">
                                        AI
                                    </div>
                                    <div className="bg-white border border-beige rounded-2xl p-6 lg:p-8 max-w-2xl shadow-sm">
                                        <p className="text-navy text-lg font-medium leading-relaxed mb-6">
                                            {currentQuestionData.answer}
                                        </p>
                                        {currentQuestionData.metrics && (
                                            <div className="bg-cream border border-beige rounded-xl p-4 flex items-center gap-4">
                                                <div className="p-2 bg-olynk/10 rounded-lg">
                                                    <TrendingUp className="w-4 h-4 text-olynk" />
                                                </div>
                                                <p className="text-navy text-sm font-black tracking-tight">
                                                    {currentQuestionData.metrics}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Progress Dots */}
                    <div className="flex justify-center gap-3 mb-12">
                        {currentLeaderData.questions.map((_, index) => (
                            <div
                                key={index}
                                className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${index === currentQuestion
                                    ? `w-8 bg-navy shadow-md`
                                    : 'bg-beige hover:bg-tan'
                                    }`}
                            />
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="bg-navy rounded-[40px] p-10 lg:p-16 text-center text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 opacity-[0.05] transition-transform duration-700 group-hover:scale-125">
                            <TrendingUp className="w-64 h-64" />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-3xl lg:text-5xl font-black mb-6 tracking-tightest leading-tight">
                                Solve Your Specific <br /> Operational Bottlenecks.
                            </h3>
                            <p className="text-xl text-white/70 font-medium mb-12 max-w-2xl mx-auto">
                                Join high-growth enterprises that have moved beyond spreadsheets to autonomous operations.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                <Link
                                    to="/waitlist"
                                    className="px-12 py-5 bg-white text-navy rounded-xl font-black uppercase tracking-widest text-sm hover:bg-cream transition-all duration-300 shadow-xl"
                                >
                                    Request Deployment Protocol
                                </Link>
                                <Link
                                    to="/platform"
                                    className="px-12 py-5 bg-transparent border-2 border-white/20 text-white rounded-xl font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all duration-300"
                                >
                                    Explore Mechanism
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LeaderChat;
