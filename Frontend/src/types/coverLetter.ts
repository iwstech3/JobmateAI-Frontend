export interface CoverLetterData {
    id: string;
    userId?: string;
    jobTitle: string;
    companyName: string;
    jobDescription?: string;
    content: string;
    tone: 'professional' | 'enthusiastic' | 'confident' | 'formal';
    createdAt: string;
    updatedAt: string;
}

export interface GenerateCoverLetterRequest {
    jobTitle: string;
    companyName: string;
    jobDescription: string;
    resumeId?: string; // Optional: generate based on a specific resume
    tone?: 'professional' | 'enthusiastic' | 'confident' | 'formal';
    personalInfo?: {
        fullName: string;
        email: string;
        phone: string;
        address?: string;
    };
}

export interface CoverLetterTemplate {
    id: string;
    name: string;
    description: string;
}
