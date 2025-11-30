import React from 'react';
import { Download, RefreshCw, Edit, Share2 } from 'lucide-react';
import { CVData } from '@/types/cv';
import { downloadCV } from '@/services/cvService';
import { motion } from 'framer-motion';

interface CVActionsProps {
    cvData: CVData;
    onRegenerate: () => void;
    onEdit: () => void;
    isRegenerating?: boolean;
}

export const CVActions: React.FC<CVActionsProps> = ({
    cvData,
    onRegenerate,
    onEdit,
    isRegenerating = false,
}) => {
    const handleDownload = () => {
        downloadCV(cvData);
    };

    return (
        <div className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-white/10 p-6">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* Download Button */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleDownload}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                >
                    <Download className="w-5 h-5" />
                    Download PDF
                </motion.button>

                {/* Regenerate Button */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onRegenerate}
                    disabled={isRegenerating}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <RefreshCw className={`w-5 h-5 ${isRegenerating ? 'animate-spin' : ''}`} />
                    {isRegenerating ? 'Regenerating...' : 'Regenerate'}
                </motion.button>

                {/* Edit Button */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onEdit}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-600 dark:bg-neutral-700 text-white rounded-lg font-medium hover:bg-gray-700 dark:hover:bg-neutral-600 transition-colors shadow-md hover:shadow-lg"
                >
                    <Edit className="w-5 h-5" />
                    Edit
                </motion.button>

                {/* Share Button (Future Feature) */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-200 dark:bg-neutral-800 text-gray-400 dark:text-gray-500 rounded-lg font-medium cursor-not-allowed"
                    title="Coming soon"
                >
                    <Share2 className="w-5 h-5" />
                    Share
                </motion.button>
            </div>

            {/* Tips */}
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-500/10 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                    <strong>💡 Tip:</strong> Click "Download PDF" to save your CV. Use "Regenerate" to get a different AI variation.
                </p>
            </div>
        </div>
    );
};
