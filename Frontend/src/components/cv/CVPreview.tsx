import React from 'react';
import { CVData } from '@/types/cv';
import { formatDate, calculateDuration } from '@/utils/cvUtils';
import { Mail, Phone, MapPin, Linkedin, Globe, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface CVPreviewProps {
    cvData: CVData | null;
    isLoading?: boolean;
}

export const CVPreview: React.FC<CVPreviewProps> = ({ cvData, isLoading }) => {
    if (isLoading) {
        return (
            <div className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-white/10 p-8 min-h-[600px] flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">Generating your CV...</p>
                </div>
            </div>
        );
    }

    if (!cvData) {
        return (
            <div className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-white/10 p-8 min-h-[600px] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-24 h-24 bg-gray-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">No CV Generated Yet</h3>
                    <p className="text-gray-500 dark:text-gray-400">Fill in the form and click "Generate CV with AI" to see your preview here</p>
                </div>
            </div>
        );
    }

    const template = cvData.template || 'professional';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-white/10 overflow-hidden shadow-lg cv-preview"
            id="cv-preview-content"
        >
            {/* CV Content - Professional Template */}
            {template === 'professional' && (
                <div className="p-8 space-y-6">
                    {/* Header */}
                    <div className="border-b border-gray-200 dark:border-white/10 pb-6">
                        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
                            {cvData.personalInfo.fullName}
                        </h1>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                            {cvData.personalInfo.email && (
                                <div className="flex items-center gap-1">
                                    <Mail className="w-4 h-4" />
                                    {cvData.personalInfo.email}
                                </div>
                            )}
                            {cvData.personalInfo.phone && (
                                <div className="flex items-center gap-1">
                                    <Phone className="w-4 h-4" />
                                    {cvData.personalInfo.phone}
                                </div>
                            )}
                            {cvData.personalInfo.location && (
                                <div className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    {cvData.personalInfo.location}
                                </div>
                            )}
                            {cvData.personalInfo.linkedin && (
                                <div className="flex items-center gap-1">
                                    <Linkedin className="w-4 h-4" />
                                    LinkedIn
                                </div>
                            )}
                            {cvData.personalInfo.website && (
                                <div className="flex items-center gap-1">
                                    <Globe className="w-4 h-4" />
                                    Portfolio
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Professional Summary */}
                    {cvData.professionalSummary && (
                        <div>
                            <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3">Professional Summary</h2>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                {cvData.professionalSummary}
                            </p>
                        </div>
                    )}

                    {/* Work Experience */}
                    {cvData.workExperience.length > 0 && (
                        <div>
                            <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">Work Experience</h2>
                            <div className="space-y-4">
                                {cvData.workExperience.map((exp) => (
                                    <div key={exp.id} className="border-l-2 border-blue-500 pl-4">
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="font-semibold text-lg text-neutral-900 dark:text-white">
                                                {exp.jobTitle}
                                            </h3>
                                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                                {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400 mb-2">
                                            {exp.company} • {exp.location}
                                        </p>
                                        {exp.description && (
                                            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                                                {exp.description}
                                            </p>
                                        )}
                                        {exp.achievements && exp.achievements.length > 0 && exp.achievements[0] && (
                                            <ul className="mt-2 space-y-1">
                                                {exp.achievements.map((achievement, idx) => (
                                                    achievement && (
                                                        <li key={idx} className="text-sm text-gray-700 dark:text-gray-300 flex items-start">
                                                            <span className="text-blue-500 mr-2">•</span>
                                                            {achievement}
                                                        </li>
                                                    )
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Education */}
                    {cvData.education.length > 0 && (
                        <div>
                            <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">Education</h2>
                            <div className="space-y-3">
                                {cvData.education.map((edu) => (
                                    <div key={edu.id}>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-semibold text-neutral-900 dark:text-white">
                                                    {edu.degree}
                                                </h3>
                                                <p className="text-gray-600 dark:text-gray-400">
                                                    {edu.institution}
                                                    {edu.gpa && ` • GPA: ${edu.gpa}`}
                                                </p>
                                            </div>
                                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                                {formatDate(edu.graduationDate)}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Skills */}
                    {cvData.skills.length > 0 && (
                        <div>
                            <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3">Skills</h2>
                            <div className="flex flex-wrap gap-2">
                                {cvData.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-3 py-1.5 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Certifications */}
                    {cvData.certifications && cvData.certifications.length > 0 && (
                        <div>
                            <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3">Certifications</h2>
                            <div className="space-y-2">
                                {cvData.certifications.map((cert) => (
                                    <div key={cert.id} className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-medium text-neutral-900 dark:text-white">{cert.name}</h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{cert.issuer}</p>
                                        </div>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                            {formatDate(cert.date)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Modern Template */}
            {template === 'modern' && (
                <div className="p-8 space-y-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
                    {/* Header with gradient */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 -m-8 mb-6 rounded-t-xl">
                        <h1 className="text-4xl font-bold mb-2">
                            {cvData.personalInfo.fullName}
                        </h1>
                        <div className="flex flex-wrap gap-4 text-sm opacity-90">
                            {cvData.personalInfo.email && <span>{cvData.personalInfo.email}</span>}
                            {cvData.personalInfo.phone && <span>{cvData.personalInfo.phone}</span>}
                            {cvData.personalInfo.location && <span>{cvData.personalInfo.location}</span>}
                        </div>
                    </div>

                    {/* Rest of content similar to professional but with modern styling */}
                    {cvData.professionalSummary && (
                        <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg">
                            <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-3">
                                Professional Summary
                            </h2>
                            <p className="text-gray-700 dark:text-gray-300">{cvData.professionalSummary}</p>
                        </div>
                    )}

                    {/* Similar sections as professional template with modern styling */}
                </div>
            )}

            {/* Creative Template */}
            {template === 'creative' && (
                <div className="p-8">
                    {/* Creative layout implementation */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-2">
                            {cvData.personalInfo.fullName}
                        </h1>
                        <div className="flex justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                            {cvData.personalInfo.email && <span>{cvData.personalInfo.email}</span>}
                            {cvData.personalInfo.phone && <span>{cvData.personalInfo.phone}</span>}
                        </div>
                    </div>
                    {/* Rest of creative template */}
                </div>
            )}
        </motion.div>
    );
};
