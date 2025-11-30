import React from 'react';
import { CVTemplate } from '@/types/cv';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface CVTemplateSelectorProps {
    templates: CVTemplate[];
    selectedTemplate: string;
    onSelectTemplate: (templateId: string) => void;
}

export const CVTemplateSelector: React.FC<CVTemplateSelectorProps> = ({
    templates,
    selectedTemplate,
    onSelectTemplate,
}) => {
    return (
        <div className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-white/10 p-6">
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">Choose Template</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {templates.map((template) => {
                    const isSelected = selectedTemplate === template.id;
                    return (
                        <motion.button
                            key={template.id}
                            type="button"
                            onClick={() => onSelectTemplate(template.id)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`relative p-4 rounded-lg border-2 transition-all text-left ${isSelected
                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/10'
                                    : 'border-gray-200 dark:border-white/10 hover:border-blue-300 dark:hover:border-blue-500/50'
                                }`}
                        >
                            {isSelected && (
                                <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                    <Check className="w-4 h-4 text-white" />
                                </div>
                            )}

                            {/* Template Preview */}
                            <div className={`w-full h-32 rounded-lg mb-3 flex items-center justify-center ${template.style === 'professional'
                                    ? 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-neutral-800 dark:to-neutral-700'
                                    : template.style === 'modern'
                                        ? 'bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30'
                                        : 'bg-gradient-to-br from-orange-100 to-pink-100 dark:from-orange-900/30 dark:to-pink-900/30'
                                }`}>
                                <div className="text-center">
                                    <div className="w-16 h-2 bg-white dark:bg-neutral-600 rounded mb-2 mx-auto"></div>
                                    <div className="w-12 h-1 bg-white/70 dark:bg-neutral-600/70 rounded mb-3 mx-auto"></div>
                                    <div className="space-y-1">
                                        <div className="w-20 h-1 bg-white/50 dark:bg-neutral-600/50 rounded mx-auto"></div>
                                        <div className="w-16 h-1 bg-white/50 dark:bg-neutral-600/50 rounded mx-auto"></div>
                                    </div>
                                </div>
                            </div>

                            <h3 className="font-semibold text-neutral-900 dark:text-white mb-1">
                                {template.name}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {template.description}
                            </p>
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
};
