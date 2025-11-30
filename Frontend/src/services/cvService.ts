import { CVData, CVGenerationRequest, CVGenerationResponse, CVTemplate } from '@/types/cv';

// Mock CV Templates
export const CV_TEMPLATES: CVTemplate[] = [
    {
        id: 'professional',
        name: 'Professional',
        style: 'professional',
        description: 'Clean and traditional layout perfect for corporate roles',
    },
    {
        id: 'modern',
        name: 'Modern',
        style: 'modern',
        description: 'Contemporary design with bold typography and colors',
    },
    {
        id: 'creative',
        name: 'Creative',
        style: 'creative',
        description: 'Unique layout ideal for creative industries',
    },
];

// Mock generation messages for progress indicator
const GENERATION_MESSAGES = [
    'Analyzing your experience...',
    'Crafting professional summary...',
    'Optimizing content structure...',
    'Applying AI enhancements...',
    'Finalizing your CV...',
];

// Simulate AI CV generation with realistic delay
export const generateCV = async (request: CVGenerationRequest): Promise<CVGenerationResponse> => {
    // Simulate API delay (1.5-3 seconds)
    const delay = 1500 + Math.random() * 1500;
    await new Promise(resolve => setTimeout(resolve, delay));

    // Simulate occasional errors (5% chance)
    if (Math.random() < 0.05) {
        return {
            success: false,
            error: 'Failed to generate CV. Please try again.',
        };
    }

    // Generate enhanced CV data
    const cvData: CVData = {
        id: `cv-${Date.now()}`,
        personalInfo: request.personalInfo,
        professionalSummary: request.professionalSummary || generateProfessionalSummary(request),
        workExperience: request.workExperience,
        education: request.education,
        skills: request.skills,
        certifications: request.certifications || [],
        languages: request.languages || [],
        achievements: request.achievements || [],
        template: request.templateId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    return {
        success: true,
        data: cvData,
        message: 'CV generated successfully!',
    };
};

// Regenerate CV with variations
export const regenerateCV = async (cvData: CVData): Promise<CVGenerationResponse> => {
    // Simulate API delay
    const delay = 1000 + Math.random() * 1000;
    await new Promise(resolve => setTimeout(resolve, delay));

    // Simulate occasional errors (5% chance)
    if (Math.random() < 0.05) {
        return {
            success: false,
            error: 'Failed to regenerate CV. Please try again.',
        };
    }

    // Create variation with slightly different professional summary
    const regeneratedData: CVData = {
        ...cvData,
        id: `cv-${Date.now()}`,
        professionalSummary: generateProfessionalSummaryVariation(cvData.professionalSummary),
        updatedAt: new Date().toISOString(),
    };

    return {
        success: true,
        data: regeneratedData,
        message: 'CV regenerated successfully!',
    };
};

// Get available templates
export const getTemplates = async (): Promise<CVTemplate[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return CV_TEMPLATES;
};

// Helper: Generate professional summary from experience
const generateProfessionalSummary = (request: CVGenerationRequest): string => {
    const yearsOfExperience = request.workExperience.length * 2; // Rough estimate
    const topSkills = request.skills.slice(0, 3).join(', ');
    const latestRole = request.workExperience[0]?.jobTitle || 'Professional';

    const summaries = [
        `Results-driven ${latestRole} with ${yearsOfExperience}+ years of experience in ${topSkills}. Proven track record of delivering high-impact solutions and driving business growth through innovative approaches and technical excellence.`,
        `Accomplished ${latestRole} with extensive expertise in ${topSkills}. Demonstrated ability to lead cross-functional teams and deliver complex projects on time and within budget. Passionate about leveraging technology to solve real-world problems.`,
        `Dynamic ${latestRole} specializing in ${topSkills} with ${yearsOfExperience}+ years of progressive experience. Known for exceptional problem-solving skills and ability to translate business requirements into technical solutions.`,
    ];

    return summaries[Math.floor(Math.random() * summaries.length)];
};

// Helper: Generate variation of professional summary
const generateProfessionalSummaryVariation = (original: string): string => {
    const variations = [
        original.replace('Results-driven', 'Innovative').replace('Proven track record', 'Strong history'),
        original.replace('Accomplished', 'Experienced').replace('Demonstrated ability', 'Proven capability'),
        original.replace('Dynamic', 'Strategic').replace('Known for', 'Recognized for'),
        original, // Sometimes keep it the same but with minor tweaks
    ];

    return variations[Math.floor(Math.random() * variations.length)];
};

// Download CV as PDF (using browser print)
export const downloadCV = (cvData: CVData): void => {
    // Trigger browser print dialog
    window.print();
};

// Save CV to localStorage
export const saveCVToLocalStorage = (cvData: CVData): void => {
    try {
        localStorage.setItem('currentCV', JSON.stringify(cvData));
        localStorage.setItem('cvHistory', JSON.stringify([
            cvData,
            ...getCVHistory().filter(cv => cv.id !== cvData.id).slice(0, 4), // Keep last 5
        ]));
    } catch (error) {
        console.error('Failed to save CV to localStorage:', error);
    }
};

// Load CV from localStorage
export const loadCVFromLocalStorage = (): CVData | null => {
    try {
        const saved = localStorage.getItem('currentCV');
        return saved ? JSON.parse(saved) : null;
    } catch (error) {
        console.error('Failed to load CV from localStorage:', error);
        return null;
    }
};

// Get CV history
export const getCVHistory = (): CVData[] => {
    try {
        const history = localStorage.getItem('cvHistory');
        return history ? JSON.parse(history) : [];
    } catch (error) {
        console.error('Failed to load CV history:', error);
        return [];
    }
};

// Clear current CV
export const clearCurrentCV = (): void => {
    try {
        localStorage.removeItem('currentCV');
    } catch (error) {
        console.error('Failed to clear CV:', error);
    }
};

export { GENERATION_MESSAGES };
