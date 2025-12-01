import React, { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Application, ApplicationStatus } from '@/types/application';
import { Search, Filter, ArrowUpDown, ChevronLeft, ChevronRight, Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock Data
const MOCK_APPLICATIONS: Application[] = Array.from({ length: 25 }).map((_, i) => ({
    id: `app-${i + 1}`,
    jobTitle: ['Senior Frontend Engineer', 'Product Designer', 'Full Stack Developer', 'UX Researcher'][i % 4],
    company: ['TechCorp', 'DesignStudio', 'WebSolutions', 'InnovateAI'][i % 4],
    location: ['Remote', 'New York, NY', 'San Francisco, CA', 'London, UK'][i % 4],
    type: ['Full-time', 'Contract', 'Full-time', 'Part-time'][i % 4],
    status: ['Submitted', 'Screening', 'Shortlisted', 'Interview Scheduled', 'Rejected', 'Accepted'][i % 6] as ApplicationStatus,
    appliedDate: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
    lastUpdated: new Date(Date.now() - Math.random() * 1000000000).toISOString(),
    salaryRange: ['$120k - $150k', '$90k - $110k', '$130k - $160k', '$100k - $130k'][i % 4],
}));

export default function ApplicationsPage() {
    const [applications, setApplications] = useState<Application[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Filters & Sort
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<ApplicationStatus | 'All'>('All');
    const [sortBy, setSortBy] = useState<'appliedDate' | 'lastUpdated' | 'status'>('appliedDate');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Simulate Fetching
    const fetchApplications = () => {
        setIsLoading(true);
        setError(null);
        setTimeout(() => {
            // Simulate random error (10% chance)
            if (Math.random() < 0.1) {
                setError('Failed to load applications. Please try again.');
                setIsLoading(false);
            } else {
                setApplications(MOCK_APPLICATIONS);
                setIsLoading(false);
            }
        }, 1500);
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    // Filter & Sort Logic
    const filteredApplications = useMemo(() => {
        let result = [...applications];

        // Search
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(app =>
                app.jobTitle.toLowerCase().includes(query) ||
                app.company.toLowerCase().includes(query)
            );
        }

        // Status Filter
        if (statusFilter !== 'All') {
            result = result.filter(app => app.status === statusFilter);
        }

        // Sort
        result.sort((a, b) => {
            if (sortBy === 'appliedDate' || sortBy === 'lastUpdated') {
                const dateA = new Date(a[sortBy]).getTime();
                const dateB = new Date(b[sortBy]).getTime();
                return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
            }
            if (sortBy === 'status') {
                return sortOrder === 'asc'
                    ? a.status.localeCompare(b.status)
                    : b.status.localeCompare(a.status);
            }
            return 0;
        });

        return result;
    }, [applications, searchQuery, statusFilter, sortBy, sortOrder]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
    const paginatedApplications = filteredApplications.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <DashboardLayout>
            <Head>
                <title>My Applications - JobMate AI</title>
            </Head>

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">My Applications</h1>
                        <p className="text-gray-500 dark:text-gray-400">Track and manage your job applications</p>
                    </div>
                    <button className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                        Find More Jobs
                    </button>
                </div>

                {/* Filters */}
                <div className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-white/10 p-4 shadow-sm">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by job title or company..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            />
                        </div>
                        <div className="flex gap-4">
                            <div className="relative min-w-[160px]">
                                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value as ApplicationStatus | 'All')}
                                    className="w-full pl-10 pr-8 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none cursor-pointer transition-all"
                                >
                                    <option value="All">All Statuses</option>
                                    <option value="Submitted">Submitted</option>
                                    <option value="Screening">Screening</option>
                                    <option value="Shortlisted">Shortlisted</option>
                                    <option value="Interview Scheduled">Interview</option>
                                    <option value="Rejected">Rejected</option>
                                    <option value="Accepted">Accepted</option>
                                </select>
                            </div>
                            <div className="relative min-w-[160px]">
                                <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as any)}
                                    className="w-full pl-10 pr-8 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none cursor-pointer transition-all"
                                >
                                    <option value="appliedDate">Applied Date</option>
                                    <option value="lastUpdated">Last Updated</option>
                                    <option value="status">Status</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
                        <p className="text-gray-500 dark:text-gray-400">Loading your applications...</p>
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Oops! Something went wrong</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">{error}</p>
                        <button
                            onClick={fetchApplications}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                ) : filteredApplications.length === 0 ? (
                    <div className="text-center py-20 bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-white/10">
                        <p className="text-gray-500 dark:text-gray-400">No applications found matching your criteria.</p>
                    </div>
                ) : (
                    <>
                        {/* Desktop Table View */}
                        <div className="hidden md:block bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-white/10 overflow-hidden shadow-sm">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 dark:bg-neutral-800/50 border-b border-gray-200 dark:border-white/10">
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Job Role</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Company</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Applied Date</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last Updated</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-white/10">
                                    {paginatedApplications.map((app) => (
                                        <tr key={app.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group cursor-pointer">
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-neutral-900 dark:text-white">{app.jobTitle}</div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">{app.type}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-neutral-900 dark:text-white">{app.company}</div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">{app.location}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <StatusBadge status={app.status} />
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                                {new Date(app.appliedDate).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                                {new Date(app.lastUpdated).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Link
                                                    href={`/dashboard/applications/${app.id}`}
                                                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    View Details
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Card View */}
                        <div className="md:hidden space-y-4">
                            {paginatedApplications.map((app) => (
                                <div key={app.id} className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-white/10 p-4 shadow-sm">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="font-semibold text-neutral-900 dark:text-white">{app.jobTitle}</h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{app.company}</p>
                                        </div>
                                        <StatusBadge status={app.status} />
                                    </div>
                                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-4">
                                        <div className="flex justify-between">
                                            <span>Applied:</span>
                                            <span className="text-neutral-900 dark:text-white">{new Date(app.appliedDate).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Location:</span>
                                            <span className="text-neutral-900 dark:text-white">{app.location}</span>
                                        </div>
                                    </div>
                                    <Link
                                        href={`/dashboard/applications/${app.id}`}
                                        className="block w-full py-2 text-center text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex items-center justify-between border-t border-gray-200 dark:border-white/10 pt-4">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-white/10 rounded-md hover:bg-gray-50 dark:hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4" />
                                Previous
                            </button>
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-white/10 rounded-md hover:bg-gray-50 dark:hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Next
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </>
                )}
            </div>
        </DashboardLayout>
    );
}
