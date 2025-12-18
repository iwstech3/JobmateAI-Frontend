import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { HRDashboardLayout } from '@/components/layout/HRDashboardLayout';
import { useUser } from '@clerk/nextjs';
import { HRStats } from '@/components/hr/HRStats';
import { hrService, DashboardStats } from '@/services/hrService';
import { Plus, Users, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function HRDashboardPage() {
    const { user, isLoaded: isUserLoaded } = useUser();
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await hrService.getDashboardStats();
                setStats(data);
            } catch (error) {
                console.error('Failed to fetch stats:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, []);

    return (
        <HRDashboardLayout>
            <Head>
                <title>HR Dashboard - JobMate AI</title>
            </Head>

            <div className="space-y-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
                            Welcome back, {user?.firstName || 'HR'}! 👋
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400">Here's what's happening today.</p>
                    </div>
                    <Link href="/hr/jobs/new">
                        <Button className="w-full sm:w-auto">
                            <Plus className="w-4 h-4 mr-2" />
                            Post New Job
                        </Button>
                    </Link>
                </div>

                {/* Stats */}
                {stats && <HRStats stats={stats} isLoading={isLoading} />}

                {/* Quick Actions & Recent Activity Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Quick Actions */}
                    <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
                        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Quick Actions</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <Link href="/hr/jobs" className="flex flex-col items-center justify-center p-6 rounded-lg border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                    <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <span className="font-medium text-neutral-900 dark:text-white">Manage Jobs</span>
                            </Link>
                            <Link href="/hr/candidates" className="flex flex-col items-center justify-center p-6 rounded-lg border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                    <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                                </div>
                                <span className="font-medium text-neutral-900 dark:text-white">View Candidates</span>
                            </Link>
                        </div>
                    </div>

                    {/* Recent Activity Placeholder */}
                    <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
                        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Recent Activity</h2>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-start gap-3 pb-4 border-b border-gray-100 dark:border-white/5 last:border-0 last:pb-0">
                                    <div className="w-2 h-2 mt-2 rounded-full bg-blue-500" />
                                    <div>
                                        <p className="text-sm text-neutral-900 dark:text-white">
                                            <span className="font-medium">John Doe</span> applied for <span className="font-medium">Senior Frontend Engineer</span>
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">2 hours ago</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </HRDashboardLayout>
    );
}
