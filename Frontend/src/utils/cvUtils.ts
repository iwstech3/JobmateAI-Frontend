import { CVData } from '@/types/cv';

// Format CV data for print/PDF export
export const formatCVForPrint = (cvData: CVData): void => {
    // Add print-specific class to body
    document.body.classList.add('cv-print-mode');

    // Remove after print
    window.addEventListener('afterprint', () => {
        document.body.classList.remove('cv-print-mode');
    });
};

// Validate CV data completeness
export const validateCVData = (cvData: Partial<CVData>): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!cvData.personalInfo?.fullName) {
        errors.push('Full name is required');
    }
    if (!cvData.personalInfo?.email) {
        errors.push('Email is required');
    }
    if (!cvData.workExperience || cvData.workExperience.length === 0) {
        errors.push('At least one work experience is required');
    }
    if (!cvData.education || cvData.education.length === 0) {
        errors.push('At least one education entry is required');
    }
    if (!cvData.skills || cvData.skills.length === 0) {
        errors.push('At least one skill is required');
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
};

// Generate preview text from CV
export const generateCVPreviewText = (cvData: CVData): string => {
    const { personalInfo, professionalSummary, workExperience } = cvData;
    const latestJob = workExperience[0];

    return `${personalInfo.fullName} - ${latestJob?.jobTitle || 'Professional'} | ${professionalSummary.substring(0, 100)}...`;
};

// Calculate CV quality score (0-100)
export const calculateCVScore = (cvData: CVData): number => {
    let score = 0;

    // Personal info completeness (20 points)
    if (cvData.personalInfo.fullName) score += 5;
    if (cvData.personalInfo.email) score += 5;
    if (cvData.personalInfo.phone) score += 3;
    if (cvData.personalInfo.location) score += 3;
    if (cvData.personalInfo.linkedin) score += 2;
    if (cvData.personalInfo.website || cvData.personalInfo.github) score += 2;

    // Professional summary (15 points)
    if (cvData.professionalSummary) {
        const length = cvData.professionalSummary.length;
        if (length > 100 && length < 300) score += 15;
        else if (length >= 50) score += 10;
        else score += 5;
    }

    // Work experience (25 points)
    const expCount = cvData.workExperience.length;
    if (expCount >= 3) score += 25;
    else if (expCount >= 2) score += 20;
    else if (expCount >= 1) score += 15;

    // Education (15 points)
    const eduCount = cvData.education.length;
    if (eduCount >= 2) score += 15;
    else if (eduCount >= 1) score += 10;

    // Skills (15 points)
    const skillCount = cvData.skills.length;
    if (skillCount >= 8) score += 15;
    else if (skillCount >= 5) score += 12;
    else if (skillCount >= 3) score += 8;

    // Certifications (5 points)
    if (cvData.certifications && cvData.certifications.length > 0) {
        score += Math.min(cvData.certifications.length * 2, 5);
    }

    // Languages (5 points)
    if (cvData.languages && cvData.languages.length > 0) {
        score += Math.min(cvData.languages.length * 2, 5);
    }

    return Math.min(score, 100);
};

// Format date for display
export const formatDate = (dateString: string | null): string => {
    if (!dateString) return 'Present';

    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

// Calculate duration between dates
export const calculateDuration = (startDate: string, endDate: string | null): string => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();

    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    if (years === 0) {
        return `${remainingMonths} ${remainingMonths === 1 ? 'month' : 'months'}`;
    } else if (remainingMonths === 0) {
        return `${years} ${years === 1 ? 'year' : 'years'}`;
    } else {
        return `${years} ${years === 1 ? 'year' : 'years'} ${remainingMonths} ${remainingMonths === 1 ? 'month' : 'months'}`;
    }
};
