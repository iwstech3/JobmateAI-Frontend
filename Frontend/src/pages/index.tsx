import Head from "next/head";
import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from "framer-motion";
import { ArrowRight, CheckCircle, Briefcase, Users, Zap, Shield, Menu, X, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, MouseEvent } from "react";
import { useTheme } from "@/context/ThemeContext";

export default function Home() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Avoid hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    // Cursor Spotlight Logic
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
            },
        },
    };

    const spotlightColor = theme === 'dark' ? 'rgba(29, 78, 216, 0.15)' : 'rgba(59, 130, 246, 0.1)';
    const background = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 80%)`;

    if (!mounted) return null;

    return (
        <div
            className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white selection:bg-blue-500/30 relative overflow-hidden transition-colors duration-300"
            onMouseMove={handleMouseMove}
        >
            <Head>
                <title>JobMate AI - The Future of Hiring</title>
                <meta name="description" content="AI-powered job matching platform" />
            </Head>

            {/* Cursor Spotlight */}
            <motion.div
                className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
                style={{ background }}
            />

            {/* Aurora Background Effect */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-60 dark:opacity-100 transition-opacity duration-500">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                        x: [0, 100, 0],
                        y: [0, -50, 0]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-400/30 dark:bg-purple-600/30 rounded-full blur-[128px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.2, 0.4, 0.2],
                        x: [0, -100, 0],
                        y: [0, 50, 0]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-400/20 dark:bg-blue-600/20 rounded-full blur-[128px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 5 }}
                    className="absolute top-[40%] left-[30%] w-[400px] h-[400px] bg-indigo-400/20 dark:bg-indigo-500/20 rounded-full blur-[96px]"
                />
            </div>

            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 border-b border-neutral-200 dark:border-white/10 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <Zap className="w-5 h-5 text-white" fill="currentColor" />
                        </div>
                        <span className="font-bold text-xl tracking-tight">JobMate AI</span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600 dark:text-neutral-400">
                        <a href="#features" className="hover:text-blue-600 dark:hover:text-white transition-colors">Features</a>
                        <a href="#roles" className="hover:text-blue-600 dark:hover:text-white transition-colors">For Candidates</a>
                        <a href="#roles" className="hover:text-blue-600 dark:hover:text-white transition-colors">For Employers</a>
                    </div>
                    <div className="hidden md:flex items-center gap-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 transition-colors"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                        <Link href="/login" className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-white transition-colors">
                            Log in
                        </Link>
                        <Link
                            href="/signup"
                            className="text-sm font-medium bg-neutral-900 dark:bg-white text-white dark:text-black px-4 py-2 rounded-full hover:bg-neutral-700 dark:hover:bg-neutral-200 transition-colors"
                        >
                            Sign up
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="flex items-center gap-4 md:hidden">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 transition-colors"
                        >
                            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                        <button
                            className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="md:hidden border-t border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-950 overflow-hidden"
                        >
                            <div className="p-6 space-y-4 flex flex-col">
                                <a href="#features" className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Features</a>
                                <a href="#roles" className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors" onClick={() => setIsMobileMenuOpen(false)}>For Candidates</a>
                                <a href="#roles" className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors" onClick={() => setIsMobileMenuOpen(false)}>For Employers</a>
                                <hr className="border-neutral-200 dark:border-white/10" />
                                <Link href="/login" className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                                    Log in
                                </Link>
                                <Link
                                    href="/signup"
                                    className="bg-neutral-900 dark:bg-white text-white dark:text-black px-4 py-2 rounded-full text-center hover:bg-neutral-700 dark:hover:bg-neutral-200 transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Sign up
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            <main className="pt-24 pb-16 relative z-10">
                {/* Hero Section */}
                <section className="relative px-6 py-20 md:py-32 max-w-7xl mx-auto flex flex-col items-center text-center">
                    {/* Grid Background */}
                    <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#3b82f622_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50 dark:opacity-100"></div>

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        className="max-w-4xl mx-auto space-y-8"
                    >
                        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-medium uppercase tracking-wider">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            Now Live: AI Resume Analysis
                        </motion.div>

                        <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold tracking-tight text-neutral-900 dark:text-white">
                            The Future of Hiring <br /> is <span className="text-blue-600 dark:text-blue-500">AI-Powered</span>
                        </motion.h1>

                        <motion.p variants={itemVariants} className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                            Connect with top talent or find your dream job instantly using our advanced AI matching algorithms. Say goodbye to endless searching.
                        </motion.p>

                        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <Link href="/dashboard/applications" className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-blue-600 px-8 font-medium text-white transition-all duration-300 hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-neutral-900">
                                <span className="mr-2">Find a Job</span>
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                            <Link href="/hr/dashboard" className="inline-flex h-12 items-center justify-center rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 px-8 font-medium text-neutral-700 dark:text-neutral-300 transition-all duration-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-black dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-neutral-700 focus:ring-offset-2 focus:ring-offset-neutral-900">
                                Post a Job
                            </Link>
                        </motion.div>
                    </motion.div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-24 bg-neutral-50/50 dark:bg-neutral-900/30 border-y border-neutral-200 dark:border-white/5 backdrop-blur-sm transition-colors duration-300">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold mb-4 text-neutral-900 dark:text-white">Why Choose JobMate AI?</h2>
                            <p className="text-neutral-600 dark:text-neutral-400">Built for the modern workforce, powered by next-gen technology.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: <Zap className="w-6 h-6 text-yellow-500 dark:text-yellow-400" />,
                                    title: "Instant Matching",
                                    desc: "Our AI analyzes thousands of data points to match candidates with roles instantly."
                                },
                                {
                                    icon: <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />,
                                    title: "Verified Profiles",
                                    desc: "Every candidate and company is verified to ensure a safe and trusted ecosystem."
                                },
                                {
                                    icon: <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
                                    title: "Smart Analytics",
                                    desc: "Get deep insights into market trends, salary benchmarks, and skill gaps."
                                }
                            ].map((feature, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ y: -5 }}
                                    className="p-8 rounded-2xl bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-white/5 hover:border-blue-200 dark:hover:border-white/10 shadow-sm dark:shadow-none transition-all backdrop-blur-sm"
                                >
                                    <div className="w-12 h-12 bg-neutral-100 dark:bg-white/5 rounded-xl flex items-center justify-center mb-6">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3 text-neutral-900 dark:text-white">{feature.title}</h3>
                                    <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                        {feature.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Role Selection */}
                <section id="roles" className="py-24 max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Candidate Card */}
                        <div className="group relative overflow-hidden rounded-3xl bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-white/10 p-10 backdrop-blur-sm shadow-lg dark:shadow-none transition-all">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Briefcase className="w-48 h-48 text-neutral-900 dark:text-white" />
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold mb-2 text-neutral-900 dark:text-white">For Job Seekers</h3>
                                <p className="text-neutral-600 dark:text-neutral-400 mb-8 max-w-sm">
                                    Build your profile, upload your resume, and let opportunities come to you.
                                </p>
                                <ul className="space-y-3 mb-8 text-neutral-600 dark:text-neutral-300">
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-500" /> AI Resume Optimization
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-500" /> One-Click Apply
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-500" /> Salary Insights
                                    </li>
                                </ul>
                                <Link href="/dashboard/applications" className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:text-blue-500 dark:hover:text-blue-300 transition-colors">
                                    Get Started <ArrowRight className="w-4 h-4 ml-2" />
                                </Link>
                            </div>
                        </div>

                        {/* Employer Card */}
                        <div className="group relative overflow-hidden rounded-3xl bg-white dark:bg-neutral-900/50 border border-neutral-200 dark:border-white/10 p-10 backdrop-blur-sm shadow-lg dark:shadow-none transition-all">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Users className="w-48 h-48 text-neutral-900 dark:text-white" />
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold mb-2 text-neutral-900 dark:text-white">For Employers</h3>
                                <p className="text-neutral-600 dark:text-neutral-400 mb-8 max-w-sm">
                                    Streamline your hiring process and find the perfect fit in record time.
                                </p>
                                <ul className="space-y-3 mb-8 text-neutral-600 dark:text-neutral-300">
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-500" /> Automated Screening
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-500" /> Smart Scheduling
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-500" /> Collaborative Hiring
                                    </li>
                                </ul>
                                <Link href="/hr/dashboard" className="inline-flex items-center text-purple-600 dark:text-purple-400 font-medium hover:text-purple-500 dark:hover:text-purple-300 transition-colors">
                                    Post a Job <ArrowRight className="w-4 h-4 ml-2" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t border-neutral-200 dark:border-white/10 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md py-12 relative z-10 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
                            <Zap className="w-3 h-3 text-white" fill="currentColor" />
                        </div>
                        <span className="font-bold text-lg tracking-tight text-neutral-900 dark:text-white">JobMate AI</span>
                    </div>
                    <div className="text-neutral-500 text-sm">
                        © {new Date().getFullYear()} JobMate AI. All rights reserved.
                    </div>
                    <div className="flex gap-6 text-neutral-500 dark:text-neutral-400">
                        <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Terms</a>
                        <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Contact</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
