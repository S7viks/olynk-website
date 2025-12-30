import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

const PrivacyPolicy = () => {
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
                            <Shield className="w-3 h-3 text-navy" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-navy font-mono">LEGAL_DOCUMENTATION</span>
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-black text-navy mb-6 tracking-tight">
                            Privacy Policy
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

                        {/* Introduction */}
                        <div className="mb-12">
                            <div className="flex items-center gap-3 mb-4">
                                <Eye className="w-5 h-5 text-olynk" />
                                <h2 className="text-3xl font-black text-navy m-0">Introduction</h2>
                            </div>
                            <p className="text-steel leading-relaxed">
                                At Olynk, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. Please read this privacy policy carefully.
                            </p>
                        </div>

                        {/* Information We Collect */}
                        <div className="mb-12">
                            <div className="flex items-center gap-3 mb-4">
                                <FileText className="w-5 h-5 text-olynk" />
                                <h2 className="text-3xl font-black text-navy m-0">Information We Collect</h2>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-xl font-black text-navy mb-2">Personal Data</h3>
                                    <p className="text-steel leading-relaxed">
                                        We may collect personally identifiable information that you voluntarily provide to us when you:
                                    </p>
                                    <ul className="list-disc pl-6 text-steel space-y-2">
                                        <li>Register for our services or newsletter</li>
                                        <li>Request a demo or contact our sales team</li>
                                        <li>Submit inquiries through our contact forms</li>
                                        <li>Participate in surveys or feedback sessions</li>
                                    </ul>
                                    <p className="text-steel leading-relaxed mt-4">
                                        This may include: name, email address, company name, job title, phone number, and other business contact information.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-black text-navy mb-2">Usage Data</h3>
                                    <p className="text-steel leading-relaxed">
                                        We automatically collect certain information when you visit our website, including:
                                    </p>
                                    <ul className="list-disc pl-6 text-steel space-y-2">
                                        <li>IP address and device information</li>
                                        <li>Browser type and version</li>
                                        <li>Pages visited and time spent on pages</li>
                                        <li>Referring website addresses</li>
                                        <li>Operating system and platform</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* How We Use Your Information */}
                        <div className="mb-12">
                            <div className="flex items-center gap-3 mb-4">
                                <Lock className="w-5 h-5 text-olynk" />
                                <h2 className="text-3xl font-black text-navy m-0">How We Use Your Information</h2>
                            </div>

                            <p className="text-steel leading-relaxed mb-4">
                                We use the information we collect to:
                            </p>
                            <ul className="list-disc pl-6 text-steel space-y-2">
                                <li>Provide, operate, and maintain our services</li>
                                <li>Improve, personalize, and expand our website and services</li>
                                <li>Understand and analyze how you use our website</li>
                                <li>Develop new products, services, features, and functionality</li>
                                <li>Communicate with you for customer service, updates, and marketing purposes</li>
                                <li>Send you emails and newsletters (with your consent)</li>
                                <li>Find and prevent fraud and security threats</li>
                            </ul>
                        </div>

                        {/* Data Security */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-black text-navy mb-4">Data Security</h2>
                            <p className="text-steel leading-relaxed">
                                We use industry-standard security measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. However, no method of transmission over the internet or electronic storage is 100% secure.
                            </p>
                        </div>

                        {/* Your Rights */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-black text-navy mb-4">Your Rights</h2>
                            <p className="text-steel leading-relaxed mb-4">
                                Depending on your location, you may have certain rights regarding your personal information:
                            </p>
                            <ul className="list-disc pl-6 text-steel space-y-2">
                                <li>Access, update, or delete your personal information</li>
                                <li>Object to or restrict processing of your data</li>
                                <li>Request data portability</li>
                                <li>Withdraw consent at any time</li>
                                <li>Lodge a complaint with a data protection authority</li>
                            </ul>
                        </div>

                        {/* Cookies */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-black text-navy mb-4">Cookies and Tracking</h2>
                            <p className="text-steel leading-relaxed">
                                We use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                            </p>
                        </div>

                        {/* Contact */}
                        <div className="mb-12 p-8 bg-cream rounded-3xl border border-beige">
                            <h2 className="text-3xl font-black text-navy mb-4">Contact Us</h2>
                            <p className="text-steel leading-relaxed mb-4">
                                If you have questions or comments about this Privacy Policy, please contact us at:
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

export default PrivacyPolicy;
