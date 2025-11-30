import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { CVInputForm } from '@/components/cv/CVInputForm';
import { CVPreview } from '@/components/cv/CVPreview';
import { CVTemplateSelector } from '@/components/cv/CVTemplateSelector';
import { CVActions } from '@/components/cv/CVActions';
import { CVGenerationProgress } from '@/components/cv/CVGenerationProgress';
import { CVData, CVGenerationRequest, CVGenerationStatus } from '@/types/cv';
import {
    generateCV,
    regenerateCV,
    getTemplates,
    saveCVToLocalStorage,
    loadCVFromLocalStorage,
    clearCurrentCV,
    CV_TEMPLATES,
} from '@/services/cvService';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowLeft, AlertCircle } from 'lucide-react';

export default function CVGeneratorPage() {
    const [cvData, setCvData] = useState<CVData | null>(null);
    const [status, setStatus] = useState<CVGenerationStatus>('idle');
    const [error, setError] = useState<string | null>(null);
    const [isRegenerating, setIsRegenerating] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState('professional');
    const [showForm, setShowForm] = useState(true);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    // Load saved CV on mount
    useEffect(() => {
        const savedCV = loadCVFromLocalStorage();
        if (savedCV) {
            setCvData(savedCV);
            setSelectedTemplate(savedCV.template);
            setShowForm(false);
            setStatus('success');
        }
    }, []);

    const handleGenerateCV = async (formData: Omit<CVGenerationRequest, 'templateId'>) => {
        setStatus('generating');
        setError(null);

        try {
            const request: CVGenerationRequest = {
                ...formData,
                templateId: selectedTemplate,
            };

            const response = await generateCV(request);

            if (response.success && response.data) {
                setCvData(response.data);
                saveCVToLocalStorage(response.data);
                setStatus('success');
                setShowForm(false);
                showSuccessToast('CV generated successfully! 🎉');
            } else {
                setStatus('error');
                setError(response.error || 'Failed to generate CV');
            }
        } catch (err) {
            setStatus('error');
            setError('An unexpected error occurred. Please try again.');
        }
    };

    const handleRegenerateCV = async () => {
        if (!cvData) return;

        setIsRegenerating(true);
        setError(null);

        try {
            const response = await regenerateCV(cvData);

            if (response.success && response.data) {
                setCvData(response.data);
                saveCVToLocalStorage(response.data);
                showSuccessToast('CV regenerated successfully! ✨');
            } else {
                setError(response.error || 'Failed to regenerate CV');
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setIsRegenerating(false);
        }
    };

    const handleEditCV = () => {
        setShowForm(true);
        setStatus('idle');
    };

    const handleStartNew = () => {
        setCvData(null);
        setStatus('idle');
        setShowForm(true);
        setError(null);
        clearCurrentCV();
    };

    const handleTemplateChange = (templateId: string) => {
        setSelectedTemplate(templateId);
        if (cvData) {
            const updatedCV = { ...cvData, template: templateId };
            setCvData(updatedCV);
            saveCVToLocalStorage(updatedCV);
        }
    };

    const showSuccessToast = (message: string) => {
        setToastMessage(message);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const isGenerating = status === 'generating';

    return (
        <DashboardLayout>
            <Head>
                <title>CV Generator - JobMate AI</title>
            </Head>

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <Sparkles className="w-6 h-6 text-white" />
                            </div>
                            <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">AI CV Generator</h1>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400">
                            Create professional CVs powered by AI in minutes
                        </p>
                    </div>
                    {cvData && !showForm && (
                        <button
                            onClick={handleStartNew}
                            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-white/10 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-neutral-800 hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Start New CV
                        </button>
                    )}
                </div>

                {/* Error Alert */}
                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl p-4"
                        >
                            <div className="flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                                <div className="flex-1">
                                    <h3 className="font-semibold text-red-800 dark:text-red-300 mb-1">Error</h3>
                                    <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
                                </div>
                                <button
                                    onClick={() => setError(null)}
                                    className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                                >
                                    ×
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Template Selector - Show when form is visible or CV is generated */}
                {(showForm || cvData) && (
                    <CVTemplateSelector
                        templates={CV_TEMPLATES}
                        selectedTemplate={selectedTemplate}
                        onSelectTemplate={handleTemplateChange}
                    />
                )}

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Column - Form or Actions */}
                    <div className="space-y-6">
                        {showForm ? (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <CVInputForm onSubmit={handleGenerateCV} isLoading={isGenerating} />
                            </motion.div>
                        ) : cvData ? (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-6"
                            >
                                <CVActions
                                    cvData={cvData}
                                    onRegenerate={handleRegenerateCV}
                                    onEdit={handleEditCV}
                                    isRegenerating={isRegenerating}
                                />

                                {/* CV Stats */}
                                <div className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-white/10 p-6">
                                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
                                        CV Statistics
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="text-center p-4 bg-blue-50 dark:bg-blue-500/10 rounded-lg">
                                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                                {cvData.workExperience.length}
                                            </div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                                Work Experience
                                            </div>
                                        </div>
                                        <div className="text-center p-4 bg-purple-50 dark:bg-purple-500/10 rounded-lg">
                                            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                                {cvData.education.length}
                                            </div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">Education</div>
                                        </div>
                                        <div className="text-center p-4 bg-green-50 dark:bg-green-500/10 rounded-lg">
                                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                                {cvData.skills.length}
                                            </div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">Skills</div>
                                        </div>
                                        <div className="text-center p-4 bg-orange-50 dark:bg-orange-500/10 rounded-lg">
                                            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                                                {cvData.certifications?.length || 0}
                                            </div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                                Certifications
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ) : null}
                    </div>

                    {/* Right Column - Preview or Progress */}
                    <div className="lg:sticky lg:top-6 lg:self-start">
                        {isGenerating ? (
                            <CVGenerationProgress isGenerating={isGenerating} />
                        ) : (
                            <CVPreview cvData={cvData} isLoading={isRegenerating} />
                        )}
                    </div>
                </div>
            </div>

            {/* Success Toast */}
            <AnimatePresence>
                {showToast && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="fixed bottom-4 right-4 z-50"
                    >
                        <div className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                            <span className="font-medium">{toastMessage}</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </DashboardLayout>
    );
}
