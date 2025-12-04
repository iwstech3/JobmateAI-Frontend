import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { useJobStore } from '@/store/jobStore';
import { Plus, Search, MapPin, Clock, Users, MoreVertical } from 'lucide-react';
import { StatusBadge } from '@/components/common/StatusBadge'; // We might need a specific JobStatusBadge
import { JobStatus } from '@/types/job';

// Temporary JobStatusBadge component until we make a shared one more generic
const JobStatusBadge = ({ status }: { status: JobStatus }) => {
    const styles = {
        active: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
        closed: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400',
        draft: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    };

    return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
};

export default function JobListPage() {
    const { jobs, fetchJobs, isLoading } = useJobStore();

    useEffect(() => {
        fetchJobs();
    }, [fetchJobs]);

    return (
        <DashboardLayout>
            <Head>
                <title>Manage Jobs - JobMate AI</title>
            </Head>

            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Jobs</h1>
                        <p className="text-gray-500 dark:text-gray-400">Manage your job postings and view applications.</p>
                    </div>
                    <Link href="/hr/jobs/new">
                        <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            Post New Job
                        </Button>
                    </Link>
                </div>

                {/* Filters & Search */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search jobs..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                    </div>
                    <select className="p-2 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="closed">Closed</option>
                        <option value="draft">Draft</option>
                    </select>
                </div>

                {/* Job List */}
                {isLoading ? (
                    <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-32 bg-gray-100 dark:bg-neutral-800 rounded-xl animate-pulse" />
                        ))}
                    </div>
                ) : jobs.length === 0 ? (
                    <div className="text-center py-20 bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-white/10">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Briefcase className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-neutral-900 dark:text-white">No jobs posted yet</h3>
                        <p className="text-gray-500 dark:text-gray-400 mt-1 mb-6">Get started by creating your first job listing.</p>
                        <Link href="/hr/jobs/new">
                            <Button variant="outline">Post a Job</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {jobs.map((job) => (
                            <div key={job.id} className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm hover:border-blue-500/50 transition-colors">
                                <div className="flex flex-col md:flex-row justify-between gap-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3">
                                            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                                                {job.title}
                                            </h3>
                                            <JobStatusBadge status={job.status} />
                                        </div>
                                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                            <div className="flex items-center gap-1">
                                                <MapPin className="w-4 h-4" />
                                                {job.location}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                {job.type}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Users className="w-4 h-4" />
                                                {job.applicationCount || 0} Applications
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Link href={`/hr/candidates?jobId=${job.id}`}>
                                            <Button variant="outline" size="sm">
                                                View Candidates
                                            </Button>
                                        </Link>
                                        <Button variant="ghost" size="icon">
                                            <MoreVertical className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
