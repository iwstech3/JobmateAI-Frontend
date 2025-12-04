import apiClient from '@/lib/api-client';
import { JobPosting, CreateJobDto, UpdateJobDto } from '@/types/job';

export const jobService = {
    /**
     * Get all jobs (with optional filters)
     */
    getAll: async (params?: { status?: string; search?: string }): Promise<JobPosting[]> => {
        const response = await apiClient.get<JobPosting[]>('/jobs', { params });
        return response.data;
    },

    /**
     * Get a specific job by ID
     */
    getById: async (id: string): Promise<JobPosting> => {
        const response = await apiClient.get<JobPosting>(`/jobs/${id}`);
        return response.data;
    },

    /**
     * Create a new job posting
     */
    create: async (data: CreateJobDto): Promise<JobPosting> => {
        const response = await apiClient.post<JobPosting>('/jobs', data);
        return response.data;
    },

    /**
     * Update an existing job
     */
    update: async (id: string, data: UpdateJobDto): Promise<JobPosting> => {
        const response = await apiClient.patch<JobPosting>(`/jobs/${id}`, data);
        return response.data;
    },

    /**
     * Delete a job
     */
    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`/jobs/${id}`);
    }
};
