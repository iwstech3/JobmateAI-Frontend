import React, { useState } from 'react';
import Head from 'next/head';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { CoverLetterForm } from '@/components/cover-letter/CoverLetterForm';
import { CoverLetterPreview } from '@/components/cover-letter/CoverLetterPreview';
import { coverLetterService } from '@/services/coverLetterService';
import { CoverLetterData, GenerateCoverLetterRequest } from '@/types/coverLetter';
import { FileText, Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CoverLetterGeneratorPage() {
    const [coverLetter, setCoverLetter] = useState<CoverLetterData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = async (data: GenerateCoverLetterRequest) => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await coverLetterService.generate(data);
            setCoverLetter(result);
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.detail || 'Failed to generate cover letter. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegenerate = async () => {
        if (!coverLetter) return;
        // Logic to regenerate would go here, possibly re-using the last request data
        // For now, we can just show a message or re-trigger generation if we stored the request
        alert("Regeneration feature coming soon!");
    };

    return (
        <DashboardLayout>
            <Head>
                <title>Cover Letter Generator - JobMate AI</title>
            </Head>

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">AI Cover Letter Generator</h1>
                        <p className="text-gray-500 dark:text-gray-400">Create personalized cover letters in seconds</p>
                    </div>
                </div>

                {/* Error Alert */}
                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl p-4 flex items-start gap-3"
                        >
                            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                                <h3 className="font-semibold text-red-800 dark:text-red-300 mb-1">Error</h3>
                                <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
                            </div>
                            <button onClick={() => setError(null)} className="text-red-600 dark:text-red-400 hover:text-red-800">×</button>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Column: Form */}
                    <div>
                        <CoverLetterForm onSubmit={handleGenerate} isLoading={isLoading} />
                    </div>

                    {/* Right Column: Preview or Placeholder */}
                    <div>
                        {coverLetter ? (
                            <CoverLetterPreview data={coverLetter} onRegenerate={handleRegenerate} />
                        ) : (
                            <div className="bg-gray-50 dark:bg-neutral-900/50 border border-dashed border-gray-300 dark:border-white/10 rounded-xl p-12 flex flex-col items-center justify-center text-center h-full min-h-[400px]">
                                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-4">
                                    <Sparkles className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Ready to Generate</h3>
                                <p className="text-gray-500 dark:text-gray-400 max-w-sm">
                                    Fill out the job details on the left and let our AI craft a perfect cover letter for you.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
