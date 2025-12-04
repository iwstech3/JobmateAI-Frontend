export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Freelance' | 'Internship';
export type JobStatus = 'active' | 'closed' | 'draft';

export interface JobPosting {
    id: string;
    title: string;
    company: string;
    location: string;
    type: JobType;
    salaryRange?: string;
    description: string;
    requirements: string[];
    status: JobStatus;
    postedAt: string;
    updatedAt: string;
    applicationCount: number;
}

export interface JobApplication {
    id: string;
    jobId: string;
    userId: string;
    applicantName: string;
    applicantEmail: string;
    status: 'submitted' | 'screening' | 'interview' | 'offer' | 'rejected' | 'hired';
    appliedAt: string;
    resumeUrl?: string;
    coverLetterUrl?: string;

    // AI Integration Fields
    matchScore?: number; // 0-100 score indicating fit
    aiAnalysis?: {
        strengths: string[];
        weaknesses: string[];
        recommendation: 'strong_hire' | 'hire' | 'consider' | 'reject';
        summary: string;
    };
}

export interface CreateJobDto {
    title: string;
    company: string;
    location: string;
    type: JobType;
    salaryRange?: string;
    description: string;
    requirements: string[];
}

export interface UpdateJobDto extends Partial<CreateJobDto> {
    status?: JobStatus;
}
