import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Application, ApplicationStatus } from '@/types/application';
import { ArrowLeft, Building, MapPin, Calendar, DollarSign, Clock, ExternalLink, Edit, Trash2 } from 'lucide-react';

// Mock Data (Same as in applications.tsx for consistency)
const MOCK_APPLICATION: Application = {
    id: 'app-1',
    jobTitle: 'Senior Frontend Engineer',
    company: 'TechCorp',
    location: 'Remote',
    type: 'Full-time',
    status: 'Interview Scheduled',
    appliedDate: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
    salaryRange: '$120k - $150k',
};

export default function ApplicationDetailsPage() {
    const router = useRouter();
    const { id } = router.query;
    const [application, setApplication] = useState<Application | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        // Simulate fetch
        setIsLoading(true);
        setTimeout(() => {
            setApplication({
                ...MOCK_APPLICATION,
                id: id as string,
            });
            setIsLoading(false);
        }, 1000);
    }, [id]);

    if (isLoading) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            </DashboardLayout>
        );
    }

    if (!application) {
        return (
            <DashboardLayout>
                <div className="text-center py-20">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Application not found</h2>
                    <Link href="/dashboard/applications" className="text-blue-600 hover:underline mt-4 inline-block">
                        Return to Applications
                    </Link>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <Head>
                <title>{application.jobTitle} at {application.company} - JobMate AI</title>
            </Head>

            <div className="max-w-4xl mx-auto space-y-6">
                {/* Navigation */}
                <Link
                    href="/dashboard/applications"
                    className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Applications
                </Link>

                {/* Header Card */}
                <div className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-white/10 p-6 shadow-sm">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">{application.jobTitle}</h1>
                                <StatusBadge status={application.status} />
                            </div>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                <div className="flex items-center gap-1">
                                    <Building className="w-4 h-4" />
                                    {application.company}
                                </div>
                                <div className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    {application.location}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {application.type}
                                </div>
                                {application.salaryRange && (
                                    <div className="flex items-center gap-1">
                                        <DollarSign className="w-4 h-4" />
                                        {application.salaryRange}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex gap-3 w-full md:w-auto">
                            <button className="flex-1 md:flex-none inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-white/10 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-neutral-800 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                            </button>
                            <button className="flex-1 md:flex-none inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                            </button>
                        </div>
                    </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-white/10 p-6 shadow-sm">
                            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Job Description</h2>
                            <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                                <p>
                                    This is a placeholder for the job description. In a real application, this would contain the full details of the job posting, responsibilities, and requirements.
                                </p>
                                <p className="mt-4">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-white/10 p-6 shadow-sm">
                            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Notes</h2>
                            <textarea
                                className="w-full h-32 p-3 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                                placeholder="Add your personal notes about this application here..."
                            />
                        </div>
                    </div>

                    {/* Sidebar Info */}
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-white/10 p-6 shadow-sm">
                            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Timeline</h2>
                            <div className="space-y-4">
                                <div className="relative pl-4 border-l-2 border-blue-600">
                                    <div className="text-sm font-medium text-neutral-900 dark:text-white">Applied</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">{new Date(application.appliedDate).toLocaleDateString()}</div>
                                </div>
                                <div className="relative pl-4 border-l-2 border-gray-200 dark:border-white/10">
                                    <div className="text-sm font-medium text-neutral-900 dark:text-white">Last Updated</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">{new Date(application.lastUpdated).toLocaleDateString()}</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-white/10 p-6 shadow-sm">
                            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Quick Actions</h2>
                            <div className="space-y-3">
                                <button className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-neutral-800 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
                                    <span>View Job Posting</span>
                                    <ExternalLink className="w-4 h-4" />
                                </button>
                                <button className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-neutral-800 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
                                    <span>Add to Calendar</span>
                                    <Calendar className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
