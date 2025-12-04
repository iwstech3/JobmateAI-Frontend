import React from 'react';
import { Users, Briefcase, Calendar, TrendingUp } from 'lucide-react';
import { DashboardStats } from '@/services/hrService';

interface HRStatsProps {
    stats: DashboardStats;
    isLoading?: boolean;
}

export const HRStats: React.FC<HRStatsProps> = ({ stats, isLoading }) => {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-32 bg-gray-100 dark:bg-neutral-800 rounded-xl animate-pulse" />
                ))}
            </div>
        );
    }

    const statItems = [
        {
            label: 'Active Jobs',
            value: stats.activeJobs,
            icon: Briefcase,
            color: 'text-blue-600',
            bg: 'bg-blue-50 dark:bg-blue-500/10',
        },
        {
            label: 'Total Applications',
            value: stats.totalApplications,
            icon: Users,
            color: 'text-purple-600',
            bg: 'bg-purple-50 dark:bg-purple-500/10',
        },
        {
            label: 'Interviews Scheduled',
            value: stats.interviewsScheduled,
            icon: Calendar,
            color: 'text-orange-600',
            bg: 'bg-orange-50 dark:bg-orange-500/10',
        },
        {
            label: 'New This Week',
            value: stats.newApplicationsThisWeek,
            icon: TrendingUp,
            color: 'text-green-600',
            bg: 'bg-green-50 dark:bg-green-500/10',
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {statItems.map((item, index) => (
                <div key={index} className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{item.label}</p>
                            <p className="text-2xl font-bold text-neutral-900 dark:text-white mt-1">{item.value}</p>
                        </div>
                        <div className={`p-3 rounded-lg ${item.bg}`}>
                            <item.icon className={`w-6 h-6 ${item.color}`} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
