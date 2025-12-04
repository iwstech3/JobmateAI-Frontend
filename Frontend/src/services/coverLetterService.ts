import apiClient from '@/lib/api-client';
import { CoverLetterData, GenerateCoverLetterRequest } from '@/types/coverLetter';

export const coverLetterService = {
    /**
     * Generate a new cover letter
     */
    generate: async (data: GenerateCoverLetterRequest): Promise<CoverLetterData> => {
        const response = await apiClient.post<CoverLetterData>('/cover-letters/generate', data);
        return response.data;
    },

    /**
     * Get all cover letters for the current user
     */
    getAll: async (): Promise<CoverLetterData[]> => {
        const response = await apiClient.get<CoverLetterData[]>('/cover-letters');
        return response.data;
    },

    /**
     * Get a specific cover letter by ID
     */
    getById: async (id: string): Promise<CoverLetterData> => {
        const response = await apiClient.get<CoverLetterData>(`/cover-letters/${id}`);
        return response.data;
    },

    /**
     * Update/Regenerate a cover letter
     */
    update: async (id: string, data: Partial<GenerateCoverLetterRequest>): Promise<CoverLetterData> => {
        const response = await apiClient.patch<CoverLetterData>(`/cover-letters/${id}`, data);
        return response.data;
    },

    /**
     * Delete a cover letter
     */
    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`/cover-letters/${id}`);
    }
};
