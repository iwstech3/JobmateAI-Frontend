export type ApplicationStatus =
    | 'Submitted'
    | 'Screening'
    | 'Shortlisted'
    | 'Interview Scheduled'
    | 'Rejected'
    | 'Accepted';

export interface Application {
    id: string;
    jobTitle: string;
    company: string;
    location: string;
    type: string; // e.g., Full-time, Remote
    status: ApplicationStatus;
    appliedDate: string; // ISO date string
    lastUpdated: string; // ISO date string
    salaryRange?: string;
    logo?: string; // URL to company logo
}
