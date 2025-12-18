import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
    LayoutDashboard,
    PlusCircle,
    Briefcase,
    Users,
    BarChart,
    Settings,
    Menu,
    X,
    Zap,
    Sun,
    Moon
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { UserButton, useUser } from "@clerk/nextjs";

interface HRDashboardLayoutProps {
    children: React.ReactNode;
}

const sidebarItems = [
    { icon: LayoutDashboard, label: 'Overview', href: '/hr/dashboard' },
    { icon: PlusCircle, label: 'Post a Job', href: '/hr/jobs/new', featured: true },
    { icon: Briefcase, label: 'Manage Jobs', href: '/hr/jobs' },
    { icon: Users, label: 'Candidates', href: '/hr/candidates' },
    { icon: BarChart, label: 'Analytics', href: '/hr/analytics' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' }, // Shared settings for now
];

export const HRDashboardLayout: React.FC<HRDashboardLayoutProps> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const router = useRouter();
    const { user, isLoaded } = useUser();
    const { theme, toggleTheme } = useTheme();

    // Role Check & Strict Access Control for HR
    useEffect(() => {
        if (isLoaded && user) {
            const role = user.unsafeMetadata?.role as string;

            if (role === 'seeker') {
                // Seekers are strictly forbidden here
                router.push('/dashboard');
            }
            // If no role, we wait or let the main layout handle it (or handle it here)
        }
    }, [isLoaded, user, router]);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 transition-colors duration-300">
            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 w-full z-40 bg-white dark:bg-neutral-900 border-b border-gray-200 dark:border-white/10 px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <UserButton afterSignOutUrl="/login" />
                    <span className="font-bold text-lg text-neutral-900 dark:text-white">JobMate HR</span>
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
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                                <Briefcase className="w-5 h-5 text-white" fill="currentColor" />
                            </div>
                            <span className="font-bold text-xl text-neutral-900 dark:text-white">JobMate HR</span>
                        </div>
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
                                        ? 'bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400'
                                        : isFeatured
                                            ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-700 dark:text-blue-300 hover:from-blue-500/20 hover:to-purple-500/20 border border-blue-200/50 dark:border-blue-500/20'
                                            : 'text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
                                        }`}
                                >
                                    {isFeatured && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    )}
                                    <item.icon className={`w-5 h-5 relative z-10 ${isActive ? 'text-purple-600 dark:text-purple-400' : isFeatured ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'}`} />
                                    <span className="relative z-10">{item.label}</span>
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
