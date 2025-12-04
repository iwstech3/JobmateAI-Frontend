import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { hrService } from '@/services/hrService';
import { JobApplication } from '@/types/job';
import { Search, Filter, Download, Star, ExternalLink } from 'lucide-react';
import { StatusBadge } from '@/components/common/StatusBadge';

export default function CandidateListPage() {
    const router = useRouter();
    const { jobId } = router.query;
    const [candidates, setCandidates] = useState<JobApplication[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCandidates = async () => {
            setIsLoading(true);
            try {
                // In a real app, fetch from API
                // const data = await hrService.getCandidates(jobId as string);

                // Mock data for UI development
                const mockCandidates: JobApplication[] = [
                    {
                        id: 'app-1',
                        jobId: 'job-1',
                        userId: 'user-1',
                        applicantName: 'Alice Johnson',
                        applicantEmail: 'alice@example.com',
                        status: 'screening',
                        appliedAt: new Date().toISOString(),
                        matchScore: 92,
                        aiAnalysis: {
                            strengths: ['React', 'TypeScript', 'Next.js'],
                            weaknesses: ['AWS'],
                            recommendation: 'strong_hire',
                            summary: 'Strong candidate with relevant experience.'
                        }
                    },
                    {
                        id: 'app-2',
                        jobId: 'job-1',
                        userId: 'user-2',
                        applicantName: 'Bob Smith',
                        applicantEmail: 'bob@example.com',
                        status: 'submitted',
                        appliedAt: new Date(Date.now() - 86400000).toISOString(),
                        matchScore: 78,
                        aiAnalysis: {
                            strengths: ['JavaScript', 'HTML/CSS'],
                            weaknesses: ['No TypeScript'],
                            recommendation: 'consider',
                            summary: 'Good frontend basics but lacks TypeScript experience.'
                        }
                    },
                    {
                        id: 'app-3',
                        jobId: 'job-2',
                        userId: 'user-3',
                        applicantName: 'Charlie Brown',
                        applicantEmail: 'charlie@example.com',
                        status: 'interview',
                        appliedAt: new Date(Date.now() - 172800000).toISOString(),
                        matchScore: 85,
                        aiAnalysis: {
                            strengths: ['Communication', 'Project Management'],
                            weaknesses: ['Technical depth'],
                            recommendation: 'hire',
                            summary: 'Great cultural fit and soft skills.'
                        }
                    }
                ];

                // Filter mock data if jobId is present
                const filtered = jobId
                    ? mockCandidates.filter(c => c.jobId === jobId)
                    : mockCandidates;

                // Simulate API delay
                await new Promise(resolve => setTimeout(resolve, 800));
                setCandidates(filtered);
            } catch (error) {
                console.error('Failed to fetch candidates:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (router.isReady) {
            fetchCandidates();
        }
    }, [router.isReady, jobId]);

    const getScoreColor = (score?: number) => {
        if (!score) return 'text-gray-400';
        if (score >= 90) return 'text-green-600';
        if (score >= 70) return 'text-blue-600';
        return 'text-orange-600';
    };

    return (
        <DashboardLayout>
            <Head>
                <title>Candidates - JobMate AI</title>
            </Head>

            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Candidates</h1>
                        <p className="text-gray-500 dark:text-gray-400">
                            {jobId ? 'Viewing applicants for selected job' : 'View and manage all candidates'}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline">
                            <Download className="w-4 h-4 mr-2" />
                            Export
                        </Button>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 bg-white dark:bg-neutral-900 p-4 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search candidates..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                    </div>
                    <div className="flex gap-2">
                        <select className="p-2 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                            <option value="all">All Status</option>
                            <option value="submitted">Submitted</option>
                            <option value="screening">Screening</option>
                            <option value="interview">Interview</option>
                            <option value="offer">Offer</option>
                            <option value="rejected">Rejected</option>
                            <option value="hired">Hired</option>
                        </select>
                        <Button variant="outline" size="icon">
                            <Filter className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                {/* Candidate List */}
                {isLoading ? (
                    <div className="space-y-4">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="h-24 bg-gray-100 dark:bg-neutral-800 rounded-xl animate-pulse" />
                        ))}
                    </div>
                ) : candidates.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-500 dark:text-gray-400">No candidates found matching your criteria.</p>
                    </div>
                ) : (
                    <div className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 dark:bg-neutral-800 border-b border-gray-200 dark:border-white/10">
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Candidate</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Applied Date</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            <div className="flex items-center gap-1">
                                                AI Match
                                                <Star className="w-3 h-3" />
                                            </div>
                                        </th>
                                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-white/10">
                                    {candidates.map((candidate) => (
                                        <tr key={candidate.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                                                        {candidate.applicantName.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-neutral-900 dark:text-white">{candidate.applicantName}</p>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">{candidate.applicantEmail}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <StatusBadge status={candidate.status} />
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                                {new Date(candidate.appliedAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                {candidate.matchScore ? (
                                                    <div className="flex items-center gap-2">
                                                        <div className={`text-lg font-bold ${getScoreColor(candidate.matchScore)}`}>
                                                            {candidate.matchScore}%
                                                        </div>
                                                        {candidate.aiAnalysis?.recommendation === 'strong_hire' && (
                                                            <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                                                                Top Pick
                                                            </span>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <span className="text-sm text-gray-400">Pending AI Analysis</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Button variant="ghost" size="sm">
                                                    View Profile
                                                    <ExternalLink className="w-3 h-3 ml-2" />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
