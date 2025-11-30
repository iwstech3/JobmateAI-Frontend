// CV Generation Types

export interface PersonalInfo {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    website?: string;
    github?: string;
}

export interface WorkExperience {
    id: string;
    jobTitle: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string | null; // null means current job
    description: string;
    achievements: string[];
}

export interface Education {
    id: string;
    degree: string;
    institution: string;
    location: string;
    graduationDate: string;
    gpa?: string;
    honors?: string;
}

export interface Certification {
    id: string;
    name: string;
    issuer: string;
    date: string;
    credentialId?: string;
}

export interface CVData {
    id?: string;
    personalInfo: PersonalInfo;
    professionalSummary: string;
    workExperience: WorkExperience[];
    education: Education[];
    skills: string[];
    certifications: Certification[];
    languages?: string[];
    achievements?: string[];
    template: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface CVTemplate {
    id: string;
    name: string;
    style: 'professional' | 'modern' | 'creative';
    description: string;
    previewImage?: string;
}

export interface CVGenerationRequest {
    personalInfo: PersonalInfo;
    professionalSummary?: string;
    workExperience: WorkExperience[];
    education: Education[];
    skills: string[];
    certifications?: Certification[];
    languages?: string[];
    achievements?: string[];
    templateId: string;
}

export interface CVGenerationResponse {
    success: boolean;
    data?: CVData;
    error?: string;
    message?: string;
}

export type CVGenerationStatus = 'idle' | 'generating' | 'success' | 'error';

export interface CVState {
    cvData: CVData | null;
    status: CVGenerationStatus;
    error: string | null;
    isRegenerating: boolean;
}
