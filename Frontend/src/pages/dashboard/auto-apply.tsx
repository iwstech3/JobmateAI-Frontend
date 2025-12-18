import { useState, useEffect } from 'react';
import Head from 'next/head';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import {
    Zap,
    Settings,
    History,
    AlertCircle,
    Check,
    Play,
    Pause,
    Plus,
    X,
    XCircle
} from 'lucide-react';

interface AutoApplySettings {
    enabled: boolean;
    dailyLimit: number;
    jobTitles: string[];
    locations: string[];
    jobTypes: string[];
    minSalary: string;
}

interface ActivityLog {
    id: string;
    jobTitle: string;
    company: string;
    status: 'Applied' | 'Skipped' | 'Failed';
    timestamp: string;
    reason?: string;
}

export default function AutoApplyPage() {
    const [settings, setSettings] = useState<AutoApplySettings>({
        enabled: false,
        dailyLimit: 10,
        jobTitles: ['Frontend Developer', 'React Developer'],
        locations: ['Remote', 'New York, NY'],
        jobTypes: ['Full-time', 'Contract'],
        minSalary: '80000'
    });

    const [logs, setLogs] = useState<ActivityLog[]>([]);
    const [newTitle, setNewTitle] = useState('');
    const [newLocation, setNewLocation] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        // Mock fetching logs
        const mockLogs: ActivityLog[] = [
            { id: '1', jobTitle: 'Senior Frontend Engineer', company: 'TechCorp', status: 'Applied', timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString() },
            { id: '2', jobTitle: 'React Developer', company: 'StartupInc', status: 'Skipped', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), reason: 'Salary below threshold' },
            { id: '3', jobTitle: 'UI Engineer', company: 'DesignCo', status: 'Applied', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString() },
            { id: '4', jobTitle: 'Software Engineer', company: 'BigBiz', status: 'Failed', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), reason: 'Application form timeout' },
        ];
        setLogs(mockLogs);
    }, []);

    const handleSave = () => {
        setIsSaving(true);
        // Simulate API call
        setTimeout(() => {
            setIsSaving(false);
            // alert('Settings saved!'); 
        }, 1000);
    };

    const toggleEnabled = () => {
        setSettings(prev => ({ ...prev, enabled: !prev.enabled }));
    };

    const addTitle = () => {
        if (newTitle && !settings.jobTitles.includes(newTitle)) {
            setSettings(prev => ({ ...prev, jobTitles: [...prev.jobTitles, newTitle] }));
            setNewTitle('');
        }
    };

    const removeTitle = (title: string) => {
        setSettings(prev => ({ ...prev, jobTitles: prev.jobTitles.filter(t => t !== title) }));
    };

    const addLocation = () => {
        if (newLocation && !settings.locations.includes(newLocation)) {
            setSettings(prev => ({ ...prev, locations: [...prev.locations, newLocation] }));
            setNewLocation('');
        }
    };

    const removeLocation = (loc: string) => {
        setSettings(prev => ({ ...prev, locations: prev.locations.filter(l => l !== loc) }));
    };

    return (
        <DashboardLayout>
            <Head>
                <title>Auto Apply | JobMate AI</title>
            </Head>

            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                            <Zap className="w-6 h-6 text-yellow-500" />
                            Auto Apply Agent
                        </h1>
                        <p className="text-neutral-600 dark:text-neutral-400 mt-1">
                            Configure your AI agent to automatically find and apply to jobs for you.
                        </p>
                    </div>

                    <button
                        onClick={toggleEnabled}
                        className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${settings.enabled
                            ? 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300'
                            }`}
                    >
                        {settings.enabled ? (
                            <>
                                <Pause className="w-4 h-4 mr-2" />
                                Agent Active
                            </>
                        ) : (
                            <>
                                <Play className="w-4 h-4 mr-2" />
                                Agent Paused
                            </>
                        )}
                    </button>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Settings Panel */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-sm">
                            <div className="flex items-center gap-2 mb-6 text-lg font-semibold text-neutral-900 dark:text-white">
                                <Settings className="w-5 h-5" />
                                <h2>Configuration</h2>
                            </div>

                            <div className="space-y-6">
                                {/* Job Titles */}
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                        Target Job Titles
                                    </label>
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {settings.jobTitles.map(title => (
                                            <span key={title} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 border border-blue-100 dark:border-blue-800">
                                                {title}
                                                <button onClick={() => removeTitle(title)} className="ml-1 hover:text-blue-900 dark:hover:text-blue-100">
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={newTitle}
                                            onChange={(e) => setNewTitle(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && addTitle()}
                                            placeholder="Add job title..."
                                            className="flex-1 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                        />
                                        <button onClick={addTitle} className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700">
                                            <Plus className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                                        </button>
                                    </div>
                                </div>

                                {/* Locations */}
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                        Locations
                                    </label>
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {settings.locations.map(loc => (
                                            <span key={loc} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300 border border-purple-100 dark:border-purple-800">
                                                {loc}
                                                <button onClick={() => removeLocation(loc)} className="ml-1 hover:text-purple-900 dark:hover:text-purple-100">
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={newLocation}
                                            onChange={(e) => setNewLocation(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && addLocation()}
                                            placeholder="Add location (e.g. Remote, London)..."
                                            className="flex-1 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                        />
                                        <button onClick={addLocation} className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700">
                                            <Plus className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                                        </button>
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-6">
                                    {/* Daily Limit */}
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                            Daily Application Limit
                                        </label>
                                        <input
                                            type="number"
                                            value={settings.dailyLimit}
                                            onChange={(e) => setSettings({ ...settings, dailyLimit: parseInt(e.target.value) || 0 })}
                                            className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                        />
                                    </div>

                                    {/* Min Salary */}
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                            Min. Salary Expectation ($)
                                        </label>
                                        <input
                                            type="number"
                                            value={settings.minSalary}
                                            onChange={(e) => setSettings({ ...settings, minSalary: e.target.value })}
                                            className="w-full bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-end">
                                <button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="btn-primary bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 flex items-center"
                                >
                                    {isSaving ? <span className="animate-pulse">Saving...</span> : 'Save Configuration'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Activity Feed */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-sm h-full">
                            <div className="flex items-center gap-2 mb-6 text-lg font-semibold text-neutral-900 dark:text-white">
                                <History className="w-5 h-5" />
                                <h2>Activity Log</h2>
                            </div>

                            <div className="space-y-4">
                                {logs.map(log => (
                                    <div key={log.id} className="flex items-start gap-3 p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/50">
                                        <div className="mt-0.5">
                                            {log.status === 'Applied' && <Check className="w-4 h-4 text-green-500" />}
                                            {log.status === 'Skipped' && <AlertCircle className="w-4 h-4 text-orange-500" />}
                                            {log.status === 'Failed' && <XCircle className="w-4 h-4 text-red-500" />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-neutral-900 dark:text-white truncate">
                                                {log.jobTitle}
                                            </p>
                                            <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                                {log.company}
                                            </p>
                                            {log.reason && (
                                                <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                                                    {log.reason}
                                                </p>
                                            )}
                                            <p className="text-[10px] text-neutral-400 mt-1">
                                                {new Date(log.timestamp).toLocaleTimeString()} • {new Date(log.timestamp).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button className="w-full mt-4 text-xs text-center text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 py-2">
                                View Full History
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
