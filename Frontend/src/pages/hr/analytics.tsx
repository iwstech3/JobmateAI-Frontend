import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { HRDashboardLayout } from '@/components/layout/HRDashboardLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { hrService } from '@/services/hrService';
import { AnalyticsData } from '@/types/analytics';
import { Download, Calendar, TrendingUp, Users, Clock, DollarSign, Zap } from 'lucide-react';
import {
    BarChart, Bar, PieChart, Pie, LineChart, Line,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    ResponsiveContainer, Cell
} from 'recharts';

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#6366f1'];

export default function AnalyticsPage() {
    const [data, setData] = useState<AnalyticsData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState({
        startDate: '',
        endDate: '',
        jobId: ''
    });

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        setIsLoading(true);
        try {
            const analyticsData = await hrService.getAnalytics(filters);
            setData(analyticsData);
        } catch (error) {
            console.error('Failed to fetch analytics:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleExportCSV = () => {
        if (!data) return;

        // Simple CSV export logic
        const csvContent = `Metric,Value\nTotal Applications,${data.metrics.totalApplications}\nScreening Rate,${data.metrics.screeningCompletionRate}%\nShortlist Rate,${data.metrics.shortlistRate}%\nInterview Rate,${data.metrics.interviewRate}%\nOffer Rate,${data.metrics.offerRate}%\nAvg Time to Hire,${data.metrics.averageTimeToHire} days\nAvg Screening Time,${data.metrics.averageScreeningTime}s`;

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'hr-analytics.csv';
        a.click();
    };

    if (isLoading) {
        return (
            <HRDashboardLayout>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            </HRDashboardLayout>
        );
    }

    if (!data) {
        return (
            <HRDashboardLayout>
                <div className="text-center py-20">
                    <p className="text-gray-500 dark:text-gray-400">Failed to load analytics data.</p>
                </div>
            </HRDashboardLayout>
        );
    }

    return (
        <HRDashboardLayout>
            <Head>
                <title>Analytics - JobMate AI</title>
            </Head>

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">HR Analytics</h1>
                        <p className="text-gray-500 dark:text-gray-400">Track your recruitment performance and AI costs.</p>
                    </div>
                    <Button onClick={handleExportCSV} variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Export CSV
                    </Button>
                </div>

                {/* Filters */}
                <div className="bg-white dark:bg-neutral-900 p-4 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="startDate">Start Date</Label>
                            <Input
                                id="startDate"
                                type="date"
                                value={filters.startDate}
                                onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="endDate">End Date</Label>
                            <Input
                                id="endDate"
                                type="date"
                                value={filters.endDate}
                                onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="jobId">Job Posting</Label>
                            <select
                                id="jobId"
                                className="w-full p-2 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                value={filters.jobId}
                                onChange={(e) => setFilters({ ...filters, jobId: e.target.value })}
                            >
                                <option value="">All Jobs</option>
                            </select>
                        </div>
                    </div>
                    <div className="mt-4">
                        <Button onClick={fetchAnalytics} size="sm">Apply Filters</Button>
                    </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <MetricCard
                        icon={Users}
                        label="Total Applications"
                        value={data.metrics.totalApplications.toString()}
                        color="blue"
                    />
                    <MetricCard
                        icon={TrendingUp}
                        label="Screening Rate"
                        value={`${data.metrics.screeningCompletionRate}%`}
                        color="purple"
                    />
                    <MetricCard
                        icon={TrendingUp}
                        label="Shortlist Rate"
                        value={`${data.metrics.shortlistRate}%`}
                        color="green"
                    />
                    <MetricCard
                        icon={TrendingUp}
                        label="Interview Rate"
                        value={`${data.metrics.interviewRate}%`}
                        color="orange"
                    />
                    <MetricCard
                        icon={TrendingUp}
                        label="Offer Rate"
                        value={`${data.metrics.offerRate}%`}
                        color="pink"
                    />
                    <MetricCard
                        icon={Clock}
                        label="Avg Time to Hire"
                        value={`${data.metrics.averageTimeToHire} days`}
                        color="indigo"
                    />
                    <MetricCard
                        icon={Clock}
                        label="Avg Screening Time"
                        value={`${data.metrics.averageScreeningTime}s`}
                        color="cyan"
                    />
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Bar Chart */}
                    <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
                        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Applications by Status</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={data.applicationsByStatus}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis dataKey="status" stroke="#9ca3af" />
                                <YAxis stroke="#9ca3af" />
                                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }} />
                                <Bar dataKey="count" fill="#3b82f6" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Pie Chart */}
                    <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
                        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Offer Distribution</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={data.offerDistribution}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={(entry) => entry.category}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {data.offerDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Line Chart */}
                    <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm lg:col-span-2">
                        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Applications Over Time</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={data.applicationsOverTime}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis dataKey="date" stroke="#9ca3af" />
                                <YAxis stroke="#9ca3af" />
                                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }} />
                                <Legend />
                                <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* AI Cost Tracking */}
                <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 dark:from-purple-500/20 dark:to-blue-500/20 p-6 rounded-xl border border-purple-200 dark:border-purple-500/30 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                        <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">AI Cost Tracking</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white/50 dark:bg-neutral-900/50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-1">
                                <DollarSign className="w-4 h-4" />
                                <span>LLM API Spend</span>
                            </div>
                            <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                                ${data.aiCost.llmApiSpend.toFixed(2)}
                            </p>
                        </div>
                        <div className="bg-white/50 dark:bg-neutral-900/50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-1">
                                <Zap className="w-4 h-4" />
                                <span>Tokens Used</span>
                            </div>
                            <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                                {data.aiCost.tokensUsed.toLocaleString()}
                            </p>
                        </div>
                        <div className="bg-white/50 dark:bg-neutral-900/50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-1">
                                <DollarSign className="w-4 h-4" />
                                <span>Cost per Application</span>
                            </div>
                            <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                                ${data.aiCost.costPerApplication.toFixed(4)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </HRDashboardLayout>
    );
}

interface MetricCardProps {
    icon: React.ElementType;
    label: string;
    value: string;
    color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ icon: Icon, label, value, color }) => {
    const colorClasses = {
        blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
        purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
        green: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
        orange: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
        pink: 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400',
        indigo: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400',
        cyan: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400',
    };

    return (
        <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
                    <p className="text-2xl font-bold text-neutral-900 dark:text-white mt-1">{value}</p>
                </div>
                <div className={`p-3 rounded-lg ${colorClasses[color as keyof typeof colorClasses]}`}>
                    <Icon className="w-6 h-6" />
                </div>
            </div>
        </div>
    );
};
