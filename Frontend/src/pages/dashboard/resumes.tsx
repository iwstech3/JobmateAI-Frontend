import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import {
    FileText,
    Plus,
    Download,
    Trash2,
    RefreshCw,
    Calendar,
    File,
    MoreVertical
} from 'lucide-react';
import { cvService } from '@/services/cvService';
import { coverLetterService } from '@/services/coverLetterService';
import { CVData } from '@/types/cv';
import { CoverLetterData } from '@/types/coverLetter';

type TabType = 'cv' | 'cover-letter';

export default function ResumesPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<TabType>('cv');
    const [cvs, setCvs] = useState<CVData[]>([]);
    const [coverLetters, setCoverLetters] = useState<CoverLetterData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [actionId, setActionId] = useState<string | null>(null);

    useEffect(() => {
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        setIsLoading(true);
        try {
            const [cvData, clData] = await Promise.all([
                cvService.getUserCVs(),
                coverLetterService.getAll()
            ]);

            // Sort by date created (newest first)
            const sortedCvs = (cvData || []).sort((a, b) =>
                new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
            );
            const sortedCls = (clData || []).sort((a, b) =>
                new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
            );

            setCvs(sortedCvs);
            setCoverLetters(sortedCls);
        } catch (error) {
            console.error("Failed to fetch documents", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string, type: TabType) => {
        if (!confirm('Are you sure you want to delete this document?')) return;

        setActionId(id);
        try {
            if (type === 'cv') {
                await cvService.deleteCV(id);
                setCvs(cvs.filter(c => c.id !== id));
            } else {
                await coverLetterService.delete(id);
                setCoverLetters(coverLetters.filter(c => c.id !== id));
            }
        } catch (error) {
            console.error("Failed to delete document", error);
        } finally {
            setActionId(null);
        }
    };

    const handleDownload = (doc: CVData) => {
        cvService.exportCVAsJSON(doc);
    };

    return (
        <DashboardLayout>
            <Head>
                <title>My Documents - JobMate AI</title>
            </Head>

            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">My Documents</h1>
                        <p className="text-gray-500 dark:text-gray-400">Manage your resumes and cover letters</p>
                    </div>

                    <Link
                        href={activeTab === 'cv' ? "/dashboard/cv-generator" : "/dashboard/cover-letter"}
                        className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Create New {activeTab === 'cv' ? 'Resume' : 'Cover Letter'}
                    </Link>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200 dark:border-white/10">
                    <div className="flex space-x-8">
                        <button
                            onClick={() => setActiveTab('cv')}
                            className={`pb-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'cv'
                                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                                }`}
                        >
                            Resumes ({cvs.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('cover-letter')}
                            className={`pb-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'cover-letter'
                                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                                }`}
                        >
                            Cover Letters ({coverLetters.length})
                        </button>
                    </div>
                </div>

                {/* Content */}
                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {activeTab === 'cv' ? (
                            cvs.length === 0 ? (
                                <div className="col-span-full py-12 text-center bg-gray-50 dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-white/5 border-dashed">
                                    <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">No resumes yet</h3>
                                    <p className="text-gray-500 dark:text-gray-400 mb-6">Create your first AI-optimized resume to get started.</p>
                                    <Link
                                        href="/dashboard/cv-generator"
                                        className="inline-flex items-center text-blue-600 hover:underline"
                                    >
                                        Create Resume <Plus className="w-4 h-4 ml-1" />
                                    </Link>
                                </div>
                            ) : (
                                cvs.map((cv) => (
                                    <div key={cv.id} className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-white/10 rounded-xl p-6 hover:shadow-md transition-shadow group relative">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                                <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                            </div>
                                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => handleDownload(cv)}
                                                    className="p-2 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5"
                                                    title="Download JSON"
                                                >
                                                    <Download className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(cv.id!, 'cv')}
                                                    className="p-2 text-gray-500 hover:text-red-600 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5"
                                                    disabled={actionId === cv.id}
                                                    title="Delete"
                                                >
                                                    {actionId === cv.id ? (
                                                        <div className="w-4 h-4 border-2 border-red-600/30 border-t-red-600 rounded-full animate-spin" />
                                                    ) : (
                                                        <Trash2 className="w-4 h-4" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                                            {cv.personalInfo.fullName}'s CV
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 capitalize">
                                            {cv.template} Template
                                        </p>

                                        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-white/5 pt-4">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {cv.createdAt ? new Date(cv.createdAt).toLocaleDateString() : 'Just now'}
                                            </div>
                                            <Link
                                                href={`/dashboard/cv-generator?id=${cv.id}`}
                                                className="ml-auto text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                                            >
                                                Edit <RefreshCw className="w-3 h-3" />
                                            </Link>
                                        </div>
                                    </div>
                                ))
                            )
                        ) : (
                            coverLetters.length === 0 ? (
                                <div className="col-span-full py-12 text-center bg-gray-50 dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-white/5 border-dashed">
                                    <File className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">No cover letters yet</h3>
                                    <p className="text-gray-500 dark:text-gray-400 mb-6">Generate a tailored cover letter for your application.</p>
                                    <Link
                                        href="/dashboard/cover-letter"
                                        className="inline-flex items-center text-blue-600 hover:underline"
                                    >
                                        Create Cover Letter <Plus className="w-4 h-4 ml-1" />
                                    </Link>
                                </div>
                            ) : (
                                coverLetters.map((cl) => (
                                    <div key={cl.id} className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-white/10 rounded-xl p-6 hover:shadow-md transition-shadow group relative">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                                <File className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                                            </div>
                                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => handleDelete(cl.id, 'cover-letter')}
                                                    className="p-2 text-gray-500 hover:text-red-600 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5"
                                                    disabled={actionId === cl.id}
                                                    title="Delete"
                                                >
                                                    {actionId === cl.id ? (
                                                        <div className="w-4 h-4 border-2 border-red-600/30 border-t-red-600 rounded-full animate-spin" />
                                                    ) : (
                                                        <Trash2 className="w-4 h-4" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                                            {cl.jobTitle}
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                            {cl.companyName}
                                        </p>

                                        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-white/5 pt-4">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(cl.createdAt).toLocaleDateString()}
                                            </div>
                                            <span className="ml-auto capitalize bg-gray-100 dark:bg-white/10 px-2 py-0.5 rounded text-gray-600 dark:text-gray-300">
                                                {cl.tone}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            )
                        )}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
