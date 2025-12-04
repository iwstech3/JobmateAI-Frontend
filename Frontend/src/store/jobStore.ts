import { create } from 'zustand';
import { JobPosting, CreateJobDto, UpdateJobDto } from '@/types/job';
import { jobService } from '@/services/jobService';

interface JobState {
    jobs: JobPosting[];
    currentJob: JobPosting | null;
    isLoading: boolean;
    error: string | null;

    // Actions
    fetchJobs: (filters?: { status?: string; search?: string }) => Promise<void>;
    fetchJobById: (id: string) => Promise<void>;
    createJob: (data: CreateJobDto) => Promise<void>;
    updateJob: (id: string, data: UpdateJobDto) => Promise<void>;
    deleteJob: (id: string) => Promise<void>;
    setCurrentJob: (job: JobPosting | null) => void;
}

export const useJobStore = create<JobState>((set, get) => ({
    jobs: [],
    currentJob: null,
    isLoading: false,
    error: null,

    fetchJobs: async (filters) => {
        set({ isLoading: true, error: null });
        try {
            const jobs = await jobService.getAll(filters);
            set({ jobs, isLoading: false });
        } catch (error: any) {
            set({
                error: error.response?.data?.detail || 'Failed to fetch jobs',
                isLoading: false
            });
        }
    },

    fetchJobById: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const job = await jobService.getById(id);
            set({ currentJob: job, isLoading: false });
        } catch (error: any) {
            set({
                error: error.response?.data?.detail || 'Failed to fetch job details',
                isLoading: false
            });
        }
    },

    createJob: async (data) => {
        set({ isLoading: true, error: null });
        try {
            const newJob = await jobService.create(data);
            set((state) => ({
                jobs: [newJob, ...state.jobs],
                isLoading: false
            }));
        } catch (error: any) {
            set({
                error: error.response?.data?.detail || 'Failed to create job',
                isLoading: false
            });
            throw error;
        }
    },

    updateJob: async (id, data) => {
        set({ isLoading: true, error: null });
        try {
            const updatedJob = await jobService.update(id, data);
            set((state) => ({
                jobs: state.jobs.map((job) => (job.id === id ? updatedJob : job)),
                currentJob: state.currentJob?.id === id ? updatedJob : state.currentJob,
                isLoading: false
            }));
        } catch (error: any) {
            set({
                error: error.response?.data?.detail || 'Failed to update job',
                isLoading: false
            });
            throw error;
        }
    },

    deleteJob: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await jobService.delete(id);
            set((state) => ({
                jobs: state.jobs.filter((job) => job.id !== id),
                currentJob: state.currentJob?.id === id ? null : state.currentJob,
                isLoading: false
            }));
        } catch (error: any) {
            set({
                error: error.response?.data?.detail || 'Failed to delete job',
                isLoading: false
            });
            throw error;
        }
    },

    setCurrentJob: (job) => set({ currentJob: job }),
}));
