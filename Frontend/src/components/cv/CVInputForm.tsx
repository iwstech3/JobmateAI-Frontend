import React, { useState } from 'react';
import { PersonalInfo, WorkExperience, Education, Certification } from '@/types/cv';
import { Plus, Trash2, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

interface CVInputFormProps {
    onSubmit: (data: {
        personalInfo: PersonalInfo;
        professionalSummary: string;
        workExperience: WorkExperience[];
        education: Education[];
        skills: string[];
        certifications: Certification[];
    }) => void;
    isLoading?: boolean;
}

export const CVInputForm: React.FC<CVInputFormProps> = ({ onSubmit, isLoading }) => {
    // Personal Info State
    const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
        fullName: '',
        email: '',
        phone: '',
        location: '',
        linkedin: '',
        website: '',
        github: '',
    });

    // Professional Summary
    const [professionalSummary, setProfessionalSummary] = useState('');

    // Work Experience State
    const [workExperience, setWorkExperience] = useState<WorkExperience[]>([
        {
            id: '1',
            jobTitle: '',
            company: '',
            location: '',
            startDate: '',
            endDate: null,
            description: '',
            achievements: [''],
        },
    ]);

    // Education State
    const [education, setEducation] = useState<Education[]>([
        {
            id: '1',
            degree: '',
            institution: '',
            location: '',
            graduationDate: '',
            gpa: '',
            honors: '',
        },
    ]);

    // Skills State
    const [skillInput, setSkillInput] = useState('');
    const [skills, setSkills] = useState<string[]>([]);

    // Certifications State
    const [certifications, setCertifications] = useState<Certification[]>([]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            personalInfo,
            professionalSummary,
            workExperience: workExperience.filter(exp => exp.jobTitle && exp.company),
            education: education.filter(edu => edu.degree && edu.institution),
            skills,
            certifications,
        });
    };

    const addWorkExperience = () => {
        setWorkExperience([
            ...workExperience,
            {
                id: Date.now().toString(),
                jobTitle: '',
                company: '',
                location: '',
                startDate: '',
                endDate: null,
                description: '',
                achievements: [''],
            },
        ]);
    };

    const removeWorkExperience = (id: string) => {
        setWorkExperience(workExperience.filter(exp => exp.id !== id));
    };

    const updateWorkExperience = (id: string, field: keyof WorkExperience, value: any) => {
        setWorkExperience(workExperience.map(exp =>
            exp.id === id ? { ...exp, [field]: value } : exp
        ));
    };

    const addEducation = () => {
        setEducation([
            ...education,
            {
                id: Date.now().toString(),
                degree: '',
                institution: '',
                location: '',
                graduationDate: '',
                gpa: '',
                honors: '',
            },
        ]);
    };

    const removeEducation = (id: string) => {
        setEducation(education.filter(edu => edu.id !== id));
    };

    const updateEducation = (id: string, field: keyof Education, value: any) => {
        setEducation(education.map(edu =>
            edu.id === id ? { ...edu, [field]: value } : edu
        ));
    };

    const addSkill = () => {
        if (skillInput.trim() && !skills.includes(skillInput.trim())) {
            setSkills([...skills, skillInput.trim()]);
            setSkillInput('');
        }
    };

    const removeSkill = (skill: string) => {
        setSkills(skills.filter(s => s !== skill));
    };

    const handleSkillKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addSkill();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-white/10 p-6">
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            value={personalInfo.fullName}
                            onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            placeholder="John Doe"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            required
                            value={personalInfo.email}
                            onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            placeholder="john@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Phone
                        </label>
                        <input
                            type="tel"
                            value={personalInfo.phone}
                            onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            placeholder="+1 (555) 123-4567"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Location
                        </label>
                        <input
                            type="text"
                            value={personalInfo.location}
                            onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            placeholder="San Francisco, CA"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            LinkedIn
                        </label>
                        <input
                            type="url"
                            value={personalInfo.linkedin}
                            onChange={(e) => setPersonalInfo({ ...personalInfo, linkedin: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            placeholder="linkedin.com/in/johndoe"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Website / Portfolio
                        </label>
                        <input
                            type="url"
                            value={personalInfo.website}
                            onChange={(e) => setPersonalInfo({ ...personalInfo, website: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            placeholder="johndoe.com"
                        />
                    </div>
                </div>
            </div>

            {/* Professional Summary */}
            <div className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-white/10 p-6">
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">Professional Summary</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    Leave blank to let AI generate a summary based on your experience
                </p>
                <textarea
                    value={professionalSummary}
                    onChange={(e) => setProfessionalSummary(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="A brief overview of your professional background and key achievements..."
                />
            </div>

            {/* Work Experience */}
            <div className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-white/10 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">Work Experience</h2>
                    <button
                        type="button"
                        onClick={addWorkExperience}
                        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Add Experience
                    </button>
                </div>
                <div className="space-y-6">
                    {workExperience.map((exp, index) => (
                        <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 border border-gray-200 dark:border-white/10 rounded-lg space-y-4"
                        >
                            <div className="flex items-center justify-between">
                                <h3 className="font-medium text-neutral-900 dark:text-white">Experience {index + 1}</h3>
                                {workExperience.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeWorkExperience(exp.id)}
                                        className="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Job Title <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={exp.jobTitle}
                                        onChange={(e) => updateWorkExperience(exp.id, 'jobTitle', e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                        placeholder="Senior Software Engineer"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Company <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={exp.company}
                                        onChange={(e) => updateWorkExperience(exp.id, 'company', e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                        placeholder="TechCorp Inc."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Start Date
                                    </label>
                                    <input
                                        type="month"
                                        value={exp.startDate}
                                        onChange={(e) => updateWorkExperience(exp.id, 'startDate', e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        End Date
                                    </label>
                                    <input
                                        type="month"
                                        value={exp.endDate || ''}
                                        onChange={(e) => updateWorkExperience(exp.id, 'endDate', e.target.value || null)}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                        placeholder="Leave blank if current"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        value={exp.description}
                                        onChange={(e) => updateWorkExperience(exp.id, 'description', e.target.value)}
                                        rows={3}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                                        placeholder="Describe your role and responsibilities..."
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Education */}
            <div className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-white/10 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">Education</h2>
                    <button
                        type="button"
                        onClick={addEducation}
                        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Add Education
                    </button>
                </div>
                <div className="space-y-6">
                    {education.map((edu, index) => (
                        <motion.div
                            key={edu.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 border border-gray-200 dark:border-white/10 rounded-lg space-y-4"
                        >
                            <div className="flex items-center justify-between">
                                <h3 className="font-medium text-neutral-900 dark:text-white">Education {index + 1}</h3>
                                {education.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeEducation(edu.id)}
                                        className="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Degree <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={edu.degree}
                                        onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                        placeholder="Bachelor of Science in Computer Science"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Institution <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={edu.institution}
                                        onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                        placeholder="University of California"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Graduation Date
                                    </label>
                                    <input
                                        type="month"
                                        value={edu.graduationDate}
                                        onChange={(e) => updateEducation(edu.id, 'graduationDate', e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        GPA (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        value={edu.gpa}
                                        onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                        placeholder="3.8/4.0"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Skills */}
            <div className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-white/10 p-6">
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">Skills</h2>
                <div className="space-y-4">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={skillInput}
                            onChange={(e) => setSkillInput(e.target.value)}
                            onKeyPress={handleSkillKeyPress}
                            className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            placeholder="Type a skill and press Enter"
                        />
                        <button
                            type="button"
                            onClick={addSkill}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Add
                        </button>
                    </div>
                    {skills.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium"
                                >
                                    {skill}
                                    <button
                                        type="button"
                                        onClick={() => removeSkill(skill)}
                                        className="hover:text-blue-900 dark:hover:text-blue-100 transition-colors"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
                >
                    {isLoading ? 'Generating...' : 'Generate CV with AI'}
                </button>
            </div>
        </form>
    );
};
