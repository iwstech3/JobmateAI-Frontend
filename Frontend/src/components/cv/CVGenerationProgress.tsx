import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Sparkles } from 'lucide-react';
import { GENERATION_MESSAGES } from '@/services/cvService';

interface CVGenerationProgressProps {
    isGenerating: boolean;
}

export const CVGenerationProgress: React.FC<CVGenerationProgressProps> = ({ isGenerating }) => {
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!isGenerating) {
            setCurrentMessageIndex(0);
            setProgress(0);
            return;
        }

        // Cycle through messages
        const messageInterval = setInterval(() => {
            setCurrentMessageIndex((prev) => (prev + 1) % GENERATION_MESSAGES.length);
        }, 1000);

        // Simulate progress
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 95) return prev;
                return prev + Math.random() * 10;
            });
        }, 300);

        return () => {
            clearInterval(messageInterval);
            clearInterval(progressInterval);
        };
    }, [isGenerating]);

    if (!isGenerating) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-white/10 p-8 shadow-lg"
            >
                <div className="text-center space-y-6">
                    {/* Animated Icon */}
                    <div className="relative inline-block">
                        <motion.div
                            animate={{
                                rotate: 360,
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: 'linear',
                            }}
                            className="w-16 h-16 mx-auto"
                        >
                            <Sparkles className="w-16 h-16 text-blue-600" />
                        </motion.div>
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                            className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl"
                        />
                    </div>

                    {/* Status Message */}
                    <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
                            Generating Your CV
                        </h3>
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={currentMessageIndex}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="text-gray-600 dark:text-gray-400"
                            >
                                {GENERATION_MESSAGES[currentMessageIndex]}
                            </motion.p>
                        </AnimatePresence>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full max-w-md mx-auto">
                        <div className="h-2 bg-gray-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
                                initial={{ width: '0%' }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                            {Math.round(progress)}% Complete
                        </p>
                    </div>

                    {/* AI Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-500/10 dark:to-purple-500/10 rounded-full">
                        <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                        <span className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                            AI-Powered Generation
                        </span>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};
