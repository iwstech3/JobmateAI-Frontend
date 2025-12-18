import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
    LayoutDashboard,
    Briefcase,
    FileText,
    Settings,
    LogOut,
    Menu,
    X,
    Zap,
    Bell,
    Search,
    Sun,
    Moon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const sidebarItems = [
    { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
    { icon: Briefcase, label: 'Applications', href: '/dashboard/applications' },
    { icon: FileText, label: 'Resumes', href: '/dashboard/resumes' },
    { icon: FileText, label: 'CV Generator', href: '/dashboard/cv-generator', featured: true },
    { icon: FileText, label: 'Cover Letter', href: '/dashboard/cover-letter', featured: true },
    { icon: Zap, label: 'Auto Apply', href: '/dashboard/auto-apply', featured: true },
    { icon: Search, label: 'Job Matches', href: '/dashboard/job-matches' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

import { UserButton, useUser } from "@clerk/nextjs";

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const router = useRouter();
    const { user, isLoaded } = useUser();
    const { theme, toggleTheme } = useTheme();

    // Role Check & Access Control
    useEffect(() => {
        if (isLoaded && user) {
            const checkRole = async () => {
                let role = user.unsafeMetadata?.role as string;

                // 1. Handle "Pending Role" from SS0/Registration
                if (!role) {
                    const pendingRole = localStorage.getItem('onboarding_role');
                    if (pendingRole) {
                        try {
                            await user.update({
                                unsafeMetadata: { ...user.unsafeMetadata, role: pendingRole }
                            });
                            role = pendingRole;
                            localStorage.removeItem('onboarding_role');
                        } catch (err) {
                            console.error("Error applying pending role:", err);
                        }
                    }
                }

                // 2. Strict Access Control
                const path = router.pathname;

                if (role === 'seeker') {
                    // Seekers cannot access /hr routes
                    if (path.startsWith('/hr')) {
                        router.push('/dashboard');
                    }
                } else if (role === 'employer') {
                    // Employers cannot access /dashboard routes (except maybe settings? checks needed)
                    // User requested strict separation: "if employer, only /hr/dashboard"
                    // We assume /hr/dashboard is their root.
                    if (path.startsWith('/dashboard')) {
                        router.push('/hr/dashboard');
                    }
                } // If no role, we might want to redirect to /register? allow for now.
            };

            checkRole();
        }
    }, [isLoaded, user, router]);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 transition-colors duration-300">
            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 w-full z-40 bg-white dark:bg-neutral-900 border-b border-gray-200 dark:border-white/10 px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <UserButton afterSignOutUrl="/login" />
                    <Link href="/" className="font-bold text-lg text-neutral-900 dark:text-white">JobMate</Link>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 text-gray-600 dark:text-gray-400 transition-colors"
                    >
                        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>
                    <button onClick={toggleSidebar} className="p-2 text-gray-600 dark:text-gray-400">
                        {isSidebarOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-neutral-900 border-r border-gray-200 dark:border-white/10 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } pt-16 lg:pt-0`}
            >
                <div className="h-full flex flex-col">
                    <div className="hidden lg:flex items-center justify-between px-6 h-16 border-b border-gray-200 dark:border-white/10">
                        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <Zap className="w-5 h-5 text-white" fill="currentColor" />
                            </div>
                            <span className="font-bold text-xl text-neutral-900 dark:text-white">JobMate AI</span>
                        </Link>
                    </div>

                    <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                        {sidebarItems.map((item) => {
                            const isActive = router.pathname === item.href;
                            // @ts-ignore
                            const isFeatured = item.featured;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative overflow-hidden ${isActive
                                        ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400'
                                        : isFeatured
                                            ? 'bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-purple-700 dark:text-purple-300 hover:from-purple-500/20 hover:to-blue-500/20 border border-purple-200/50 dark:border-purple-500/20'
                                            : 'text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
                                        }`}
                                >
                                    {isFeatured && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    )}
                                    <item.icon className={`w-5 h-5 relative z-10 ${isActive ? 'text-blue-600 dark:text-blue-400' : isFeatured ? 'text-purple-600 dark:text-purple-400' : 'text-gray-400 dark:text-gray-500'}`} />
                                    <span className="relative z-10">{item.label}</span>
                                    {isFeatured && (
                                        <span className="ml-auto relative z-10 flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                                        </span>
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="p-4 border-t border-gray-200 dark:border-white/10 space-y-2">
                        <button
                            onClick={toggleTheme}
                            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                        >
                            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                        </button>

                        <div className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
                            <UserButton afterSignOutUrl="/login" showName={true} />
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="lg:pl-64 pt-16 lg:pt-0 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {children}
                </div>
            </main>

            {/* Overlay for mobile sidebar */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black/50 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </div>
    );
};
