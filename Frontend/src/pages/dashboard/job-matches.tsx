import { useState, useEffect } from 'react';
import Head from 'next/head';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { 
    Briefcase, 
    MapPin, 
    DollarSign, 
    Star, 
    CheckCircle, 
    XCircle,
    ArrowRight,
    TrendingUp,
    Filter
} from 'lucide-react';
import { JobPosting } from '@/types/job';
import { jobService } from '@/services/jobService';

// Extended type for matched jobs with score
interface MatchedJob extends JobPosting {
    matchScore: number;
    matchReasons: string[];
}

export default function JobMatchesPage() {
    const [matches, setMatches] = useState<MatchedJob[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, high, medium

    useEffect(() => {
        // Simulating fetching matched jobs
        const fetchMatches = async () => {
            try {
                // In a real app, this would be a specific endpoint like /jobs/matches
                const jobs = await jobService.getAll({ status: 'active' });
                
                // Mocking match matching logic since backend might not support it yet
                const mockedMatches: MatchedJob[] = jobs.map(job => ({
                    ...job,
                    matchScore: Math.floor(Math.random() * (99 - 70) + 70), // Random score 70-99
                    matchReasons: [
                        'Skills match your profile',
                        'Preferred location',
                        'Within salary expectations'
                    ].slice(0, Math.floor(Math.random() * 3) + 1)
                })).sort((a, b) => b.matchScore - a.matchScore);

                setMatches(mockedMatches);
            } catch (error) {
                console.error("Failed to fetch matches:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMatches();
    }, []);

    const filteredMatches = matches.filter(job => {
        if (filter === 'high') return job.matchScore >= 90;
        if (filter === 'medium') return job.matchScore >= 80 && job.matchScore < 90;
        return true;
    });

    const getScoreColor = (score: number) => {
        if (score >= 90) return 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400';
        if (score >= 80) return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400';
        return 'text-orange-600 bg-orange-50 dark:bg-orange-900/20 dark:text-orange-400';
    };

    return (
        <DashboardLayout>
            <Head>
                <title>Job Matches | JobMate AI</title>
            </Head>

            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
                            AI Job Matches
                        </h1>
                        <p className="text-neutral-600 dark:text-neutral-400 mt-1">
                            Jobs hand-picked for you based on your profile and preferences.
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-neutral-500" />
                        <select 
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                        >
                            <option value="all">All Matches</option>
                            <option value="high">High Match (90%+)</option>
                            <option value="medium">Good Match (80-89%)</option>
                        </select>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {filteredMatches.length === 0 ? (
                            <div className="text-center py-12 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800">
                                <TrendingUp className="w-12 h-12 mx-auto text-neutral-300 mb-4" />
                                <h3 className="text-lg font-medium text-neutral-900 dark:text-white">No matches found</h3>
                                <p className="text-neutral-500">Try adjusting your profile or preferences to see more jobs.</p>
                            </div>
                        ) : (
                            filteredMatches.map((job) => (
                                <div key={job.id} className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 hover:shadow-md transition-all duration-200 group">
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between mb-2">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-12 w-12 bg-neutral-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center font-bold text-xl text-neutral-600 dark:text-neutral-400">
                                                        {job.company.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-lg text-neutral-900 dark:text-white group-hover:text-blue-600 transition-colors">
                                                            {job.title}
                                                        </h3>
                                                        <p className="text-neutral-500 dark:text-neutral-400">
                                                            {job.company} • {new Date(job.postedAt).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className={`px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${getScoreColor(job.matchScore)}`}>
                                                    {job.matchScore}% Match
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-4 mt-4">
                                                <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                                                    <MapPin className="w-4 h-4 mr-2" />
                                                    {job.location}
                                                </div>
                                                <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                                                    <Briefcase className="w-4 h-4 mr-2" />
                                                    {job.type}
                                                </div>
                                                {job.salaryRange && (
                                                    <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
                                                        <DollarSign className="w-4 h-4 mr-2" />
                                                        {job.salaryRange}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="mt-4 flex flex-wrap gap-2">
                                                {job.matchReasons.map((reason, idx) => (
                                                    <span key={idx} className="inline-flex items-center px-2 py-1 bg-neutral-50 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 text-xs rounded border border-neutral-200 dark:border-neutral-700">
                                                        <Star className="w-3 h-3 mr-1 text-yellow-500" />
                                                        {reason}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex md:flex-col justify-center gap-3 min-w-[140px] pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-neutral-100 dark:border-neutral-800">
                                            <button className="flex-1 md:flex-none btn-primary bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center">
                                                Apply Now
                                                <ArrowRight className="w-4 h-4 ml-2" />
                                            </button>
                                            <button className="flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-medium text-neutral-600 hover:bg-neutral-50 dark:text-neutral-400 dark:hover:bg-neutral-800 transition-colors">
                                                Not Interested
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
