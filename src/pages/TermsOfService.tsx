import { motion } from 'framer-motion';
import { Scale, FileCheck, AlertCircle } from 'lucide-react';

const TermsOfService = () => {
    return (
        <div className="relative min-h-screen bg-transparent">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-beige rounded-full mb-8 shadow-sm">
                            <Scale className="w-3 h-3 text-navy" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-navy font-mono">LEGAL_TERMS</span>
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-black text-navy mb-6 tracking-tight">
                            Terms of Service
                        </h1>

                        <p className="text-lg text-steel font-medium">
                            Last updated: December 29, 2024
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-12 px-6 bg-white">
                <div className="max-w-4xl mx-auto">
                    <div className="prose prose-navy max-w-none">

                        {/* Acceptance */}
                        <div className="mb-12">
                            <div className="flex items-center gap-3 mb-4">
                                <FileCheck className="w-5 h-5 text-olynk" />
                                <h2 className="text-3xl font-black text-navy m-0">Acceptance of Terms</h2>
                            </div>
                            <p className="text-steel leading-relaxed">
                                By accessing and using Olynk's website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these Terms of Service, please do not use our services.
                            </p>
                        </div>

                        {/* Use of Services */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-black text-navy mb-4">Use of Services</h2>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-xl font-black text-navy mb-2">Eligibility</h3>
                                    <p className="text-steel leading-relaxed">
                                        You must be at least 18 years old and have the legal authority to enter into these terms on behalf of yourself or the entity you represent.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-black text-navy mb-2">Account Registration</h3>
                                    <p className="text-steel leading-relaxed">
                                        To access certain features of our services, you may be required to register for an account. You agree to:
                                    </p>
                                    <ul className="list-disc pl-6 text-steel space-y-2">
                                        <li>Provide accurate, current, and complete information</li>
                                        <li>Maintain and update your information</li>
                                        <li>Maintain the security of your password and account</li>
                                        <li>Accept responsibility for all activities under your account</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-xl font-black text-navy mb-2">Prohibited Activities</h3>
                                    <p className="text-steel leading-relaxed mb-2">
                                        You may not use our services to:
                                    </p>
                                    <ul className="list-disc pl-6 text-steel space-y-2">
                                        <li>Violate any laws or regulations</li>
                                        <li>Infringe upon intellectual property rights</li>
                                        <li>Distribute malware or harmful code</li>
                                        <li>Attempt to gain unauthorized access to our systems</li>
                                        <li>Engage in any fraudulent or deceptive practices</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Intellectual Property */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-black text-navy mb-4">Intellectual Property</h2>
                            <p className="text-steel leading-relaxed">
                                All content, features, and functionality of our services, including but not limited to text, graphics, logos, software, and design, are the exclusive property of Olynk and are protected by international copyright, trademark, and other intellectual property laws.
                            </p>
                        </div>

                        {/* Service Availability */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-black text-navy mb-4">Service Availability</h2>
                            <p className="text-steel leading-relaxed">
                                We strive to provide continuous service availability, but we do not guarantee that our services will be uninterrupted, secure, or error-free. We reserve the right to modify, suspend, or discontinue any part of our services at any time.
                            </p>
                        </div>

                        {/* Limitation of Liability */}
                        <div className="mb-12">
                            <div className="flex items-center gap-3 mb-4">
                                <AlertCircle className="w-5 h-5 text-olynk" />
                                <h2 className="text-3xl font-black text-navy m-0">Limitation of Liability</h2>
                            </div>
                            <p className="text-steel leading-relaxed">
                                To the maximum extent permitted by law, Olynk shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of our services.
                            </p>
                        </div>

                        {/* Indemnification */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-black text-navy mb-4">Indemnification</h2>
                            <p className="text-steel leading-relaxed">
                                You agree to indemnify and hold harmless Olynk, its affiliates, officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses arising out of your use of our services or violation of these terms.
                            </p>
                        </div>

                        {/* Governing Law */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-black text-navy mb-4">Governing Law</h2>
                            <p className="text-steel leading-relaxed">
                                These Terms shall be governed by and construed in accordance with the laws of [Jurisdiction], without regard to its conflict of law provisions.
                            </p>
                        </div>

                        {/* Changes to Terms */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-black text-navy mb-4">Changes to Terms</h2>
                            <p className="text-steel leading-relaxed">
                                We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on this page and updating the "Last updated" date. Your continued use of our services after such modifications constitutes your acceptance of the updated Terms.
                            </p>
                        </div>

                        {/* Contact */}
                        <div className="mb-12 p-8 bg-cream rounded-3xl border border-beige">
                            <h2 className="text-3xl font-black text-navy mb-4">Contact Us</h2>
                            <p className="text-steel leading-relaxed mb-4">
                                If you have any questions about these Terms of Service, please contact us at:
                            </p>
                            <div className="text-navy font-bold">
                                <p>Email: info@olynk.com</p>
                                <p>Phone: +91 7993359150</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default TermsOfService;
