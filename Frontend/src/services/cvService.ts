import apiClient from '@/lib/api-client';
import {
    CVData,
    CVGenerationRequest,
    CVGenerationResponse,
    CVTemplate,
} from '@/types/cv';

// Local Storage Keys
const CV_STORAGE_KEY = 'jobmate_current_cv';

// Mock CV Templates (these could also come from backend)
export const CV_TEMPLATES: CVTemplate[] = [
    {
        id: 'professional',
        name: 'Professional',
        style: 'professional',
        description: 'Clean and traditional design perfect for corporate roles',
    },
    {
        id: 'modern',
        name: 'Modern',
        style: 'modern',
        description: 'Contemporary layout with bold typography and colors',
    },
    {
        id: 'creative',
        name: 'Creative',
        style: 'creative',
        description: 'Unique design for creative industries and portfolios',
    },
];

/**
 * Generate CV using backend AI API
 */
export async function generateCV(
    request: CVGenerationRequest
): Promise<CVGenerationResponse> {
    try {
        const response = await apiClient.post<CVData>('/resumes/generate', request);

        return {
            success: true,
            data: response.data,
            message: 'CV generated successfully',
        };
    } catch (error: any) {
        console.error('Error generating CV:', error);
        return {
            success: false,
            error: error.response?.data?.detail || 'Failed to generate CV. Please try again.',
        };
    }
}

/**
 * Regenerate CV with AI improvements
 */
export async function regenerateCV(
    currentCV: CVData
): Promise<CVGenerationResponse> {
    try {
        const response = await apiClient.post<CVData>(`/resumes/${currentCV.id}/regenerate`);

        return {
            success: true,
            data: response.data,
            message: 'CV regenerated successfully',
        };
    } catch (error: any) {
        console.error('Error regenerating CV:', error);
        return {
            success: false,
            error: error.response?.data?.detail || 'Failed to regenerate CV. Please try again.',
        };
    }
}

/**
 * Get all user's CVs from backend
 */
export async function getUserCVs(): Promise<CVData[]> {
    try {
        const response = await apiClient.get<CVData[]>('/resumes');
        return response.data;
    } catch (error) {
        console.error('Error fetching user CVs:', error);
        return [];
    }
}

/**
 * Get a specific CV by ID
 */
export async function getCVById(id: string): Promise<CVData | null> {
    try {
        const response = await apiClient.get<CVData>(`/resumes/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching CV:', error);
        return null;
    }
}

/**
 * Delete a CV
 */
export async function deleteCV(id: string): Promise<boolean> {
    try {
        await apiClient.delete(`/resumes/${id}`);
        return true;
    } catch (error) {
        console.error('Error deleting CV:', error);
        return false;
    }
}

/**
 * Get available CV templates
 */
export function getTemplates(): CVTemplate[] {
    return CV_TEMPLATES;
}

/**
 * Save CV to local storage
 */
export function saveCVToLocalStorage(cvData: CVData): void {
    try {
        localStorage.setItem(CV_STORAGE_KEY, JSON.stringify(cvData));
    } catch (error) {
        console.error('Error saving CV to local storage:', error);
    }
}

/**
 * Load CV from local storage
 */
export function loadCVFromLocalStorage(): CVData | null {
    try {
        const savedCV = localStorage.getItem(CV_STORAGE_KEY);
        return savedCV ? JSON.parse(savedCV) : null;
    } catch (error) {
        console.error('Error loading CV from local storage:', error);
        return null;
    }
}

/**
 * Clear current CV from local storage
 */
export function clearCurrentCV(): void {
    try {
        localStorage.removeItem(CV_STORAGE_KEY);
    } catch (error) {
        console.error('Error clearing CV from local storage:', error);
    }
}

// Helper Functions

/**
 * Generate a unique ID
 */
function generateId(): string {
    return `cv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Mock AI text enhancement
 * In production, this would use actual AI/LLM
 */
function enhanceText(text: string): string {
    // Simple mock enhancement - in production, this would call an AI API
    const enhancements = [
        'Demonstrated strong expertise in',
        'Successfully led and executed',
        'Proven track record of',
        'Effectively managed and optimized',
        'Spearheaded innovative solutions for',
    ];

    // Don't modify if text is already enhanced or too short
    if (text.length < 20 || enhancements.some((e) => text.includes(e))) {
        return text;
    }

    // For demo purposes, just return the original text
    // In production, this would make an API call to enhance the text
    return text;
}

/**
 * Generate a default professional summary based on user data
 */
function generateDefaultSummary(request: CVGenerationRequest): string {
    const { personalInfo, workExperience, skills } = request;

    const yearsOfExperience = workExperience.length;
    const primarySkills = skills.slice(0, 3).join(', ');
    const latestRole = workExperience[0]?.jobTitle || 'Professional';

    return `Experienced ${latestRole} with ${yearsOfExperience}+ years of expertise in ${primarySkills}. Proven track record of delivering high-quality results and driving innovation. Passionate about leveraging technology to solve complex problems and create value.`;
}

/**
 * Export CV data as JSON (for download)
 */
export function exportCVAsJSON(cvData: CVData): void {
    const dataStr = JSON.stringify(cvData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cv_${cvData.personalInfo.fullName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]
        }.json`;
    link.click();
    URL.revokeObjectURL(url);
}

/**
 * Import CV data from JSON file
 */
export async function importCVFromJSON(file: File): Promise<CVData | null> {
    try {
        const text = await file.text();
        const cvData: CVData = JSON.parse(text);

        // Basic validation
        if (!cvData.personalInfo || !cvData.workExperience || !cvData.education) {
            throw new Error('Invalid CV data format');
        }

        return cvData;
    } catch (error) {
        console.error('Error importing CV:', error);
        return null;
    }
}
