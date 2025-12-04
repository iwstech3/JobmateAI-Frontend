import apiClient from '@/lib/api-client';
import { JobApplication } from '@/types/job';

export interface DashboardStats {
    activeJobs: number;
    totalApplications: number;
    interviewsScheduled: number;
    newApplicationsThisWeek: number;
}

export const hrService = {
    /**
     * Get HR Dashboard statistics
     */
    getDashboardStats: async (): Promise<DashboardStats> => {
        const response = await apiClient.get<DashboardStats>('/hr/stats');
        return response.data;
    },

    /**
     * Get candidates (applications) with optional filtering by job
     */
    getCandidates: async (jobId?: string): Promise<JobApplication[]> => {
        const params = jobId ? { jobId } : {};
        const response = await apiClient.get<JobApplication[]>('/hr/candidates', { params });
        return response.data;
    },

    /**
     * Get AI-suggested candidates for a specific job
     * This endpoint would return candidates ranked by match score
     */
    getSuggestedCandidates: async (jobId: string): Promise<JobApplication[]> => {
        const response = await apiClient.get<JobApplication[]>(`/hr/jobs/${jobId}/suggestions`);
        return response.data;
    },

    /**
     * Screen a candidate (update status, add notes, etc.)
     */
    screenCandidate: async (applicationId: string, data: { status: string; notes?: string }): Promise<JobApplication> => {
        const response = await apiClient.patch<JobApplication>(`/hr/applications/${applicationId}/screen`, data);
        return response.data;
    },

    /**
     * Get analytics data with optional filters
     */
    getAnalytics: async (filters?: { startDate?: string; endDate?: string; jobId?: string }) => {
        const response = await apiClient.get('/hr/analytics', { params: filters });
        return response.data;
    }
};
