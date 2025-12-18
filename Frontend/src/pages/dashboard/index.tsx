import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useUser } from '@clerk/nextjs';
import {
    Briefcase,
    FileText,
    Calendar,
    TrendingUp,
    Clock,
    ArrowRight,
    CheckCircle,
    Building2,
    MapPin,
    DollarSign
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { applicationService } from '@/services/applications';
import { jobService } from '@/services/jobService';
import { Application } from '@/types/application';
import { JobPosting } from '@/types/job';

export default function DashboardPage() {
    const { user, isLoaded } = useUser();
    const router = useRouter();
    const [applications, setApplications] = useState<Application[]>([]);
    const [recentJobs, setRecentJobs] = useState<JobPosting[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            if (!isLoaded || !user) return;

            try {
                // Fetch applications and jobs in parallel
                const [appsData, jobsData] = await Promise.all([
                    applicationService.getAll(),
                    jobService.getAll({ status: 'active' }) // Assuming we want active jobs
                ]);

                setApplications(appsData || []);
                setRecentJobs(jobsData?.slice(0, 4) || []); // Take top 4 jobs
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, [isLoaded, user]);

    // Calculate stats
    const stats = [
        {
            label: 'Total Applications',
            value: applications.length,
            icon: FileText,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50 dark:bg-blue-900/20'
        },
        {
            label: 'Interviews',
            value: applications.filter(a => a.status === 'Interview Scheduled').length,
            icon: Calendar,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50 dark:bg-purple-900/20'
        },
        {
            label: 'Offers',
            value: applications.filter(a => a.status === 'Accepted').length,
            icon: CheckCircle,
            color: 'text-green-600',
            bgColor: 'bg-green-50 dark:bg-green-900/20'
        },
        {
            label: 'Response Rate',
            value: applications.length > 0
                ? `${Math.round((applications.filter(a => a.status !== 'Submitted').length / applications.length) * 100)}%`
                : '0%',
            icon: TrendingUp,
            color: 'text-orange-600',
            bgColor: 'bg-orange-50 dark:bg-orange-900/20'
        }
    ];

    if (!isLoaded || isLoading) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center h-96">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <Head>
                <title>Dashboard | JobMate AI</title>
            </Head>

            <div className="space-y-8">
                {/* Welcome Section */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
                            Welcome back, {user?.firstName || 'User'}! 👋
                        </h1>
                        <p className="text-neutral-600 dark:text-neutral-400 mt-1">
                            Here's what's happening with your job search today.
                        </p>
                    </div>
                    <Link
                        href="/dashboard/applications"
                        className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                        <Briefcase className="w-4 h-4 mr-2" />
                        Find Jobs
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                                        {stat.label}
                                    </p>
                                    <p className="text-2xl font-bold text-neutral-900 dark:text-white mt-2">
                                        {stat.value}
                                    </p>
                                </div>
                                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Recent Applications */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
                                Recent Applications
                            </h2>
                            <Link
                                href="/dashboard/applications"
                                className="text-sm text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center"
                            >
                                View All <ArrowRight className="w-4 h-4 ml-1" />
                            </Link>
                        </div>

                        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-sm overflow-hidden">
                            {applications.length === 0 ? (
                                <div className="p-8 text-center text-neutral-500 dark:text-neutral-400">
                                    <FileText className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                    <p>No applications yet. Start applying!</p>
                                </div>
                            ) : (
                                <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
                                    {applications.slice(0, 5).map((app) => (
                                        <div key={app.id} className="p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-10 w-10 bg-neutral-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center font-bold text-lg text-neutral-600 dark:text-neutral-400">
                                                        {app.company.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-medium text-neutral-900 dark:text-white text-sm">
                                                            {app.jobTitle}
                                                        </h3>
                                                        <p className="text-neutral-500 dark:text-neutral-400 text-xs">
                                                            {app.company}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border
                                                        ${app.status === 'Submitted' ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800' : ''}
                                                        ${app.status === 'Interview Scheduled' ? 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800' : ''}
                                                        ${app.status === 'Accepted' ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800' : ''}
                                                        ${app.status === 'Rejected' ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800' : ''}
                                                    `}>
                                                        {app.status}
                                                    </span>
                                                    <span className="text-xs text-neutral-400 hidden sm:block">
                                                        {new Date(app.appliedDate).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Recommended Jobs */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
                                Recommended for You
                            </h2>
                        </div>

                        <div className="space-y-3">
                            {recentJobs.length === 0 ? (
                                <div className="p-8 text-center bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl text-neutral-500 dark:text-neutral-400">
                                    <Briefcase className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                    <p>No jobs found.</p>
                                </div>
                            ) : (
                                recentJobs.map((job) => (
                                    <div key={job.id} className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-4 rounded-xl hover:shadow-md transition-shadow">
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="h-8 w-8 bg-neutral-100 dark:bg-neutral-800 rounded flex items-center justify-center text-xs font-bold">
                                                {job.company.charAt(0)}
                                            </div>
                                            <span className="text-xs text-neutral-400">
                                                {new Date(job.postedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                            </span>
                                        </div>
                                        <h3 className="font-medium text-neutral-900 dark:text-white text-sm line-clamp-1" title={job.title}>
                                            {job.title}
                                        </h3>
                                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-3">
                                            {job.company}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {job.location && (
                                                <span className="flex items-center text-[10px] text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                                                    <MapPin className="w-3 h-3 mr-1" />
                                                    {job.location}
                                                </span>
                                            )}
                                            {job.salaryRange && (
                                                <span className="flex items-center text-[10px] text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded">
                                                    <DollarSign className="w-3 h-3 mr-1" />
                                                    {job.salaryRange}
                                                </span>
                                            )}
                                        </div>

                                        <button className="w-full text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 py-2 rounded-lg transition-colors">
                                            View Details
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
