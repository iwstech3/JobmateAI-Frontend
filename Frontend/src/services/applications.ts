import apiClient from '@/lib/api-client';
import { Application } from '@/types/application';

export type CreateApplicationDto = Omit<Application, 'id' | 'appliedDate' | 'lastUpdated'>;
export type UpdateApplicationDto = Partial<CreateApplicationDto>;

export const applicationService = {
    getAll: async () => {
        const response = await apiClient.get<Application[]>('/applications');
        return response.data;
    },

    getById: async (id: string) => {
        const response = await apiClient.get<Application>(`/applications/${id}`);
        return response.data;
    },

    create: async (data: CreateApplicationDto) => {
        const response = await apiClient.post<Application>('/applications', data);
        return response.data;
    },

    update: async (id: string, data: UpdateApplicationDto) => {
        const response = await apiClient.patch<Application>(`/applications/${id}`, data);
        return response.data;
    },

    delete: async (id: string) => {
        await apiClient.delete(`/applications/${id}`);
    }
};
