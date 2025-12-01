import { create } from 'zustand';
import { Application, ApplicationStatus } from '@/types/application';

interface ApplicationFilters {
    search: string;
    status: ApplicationStatus | 'all';
    dateRange: 'all' | 'week' | 'month' | 'year';
}

interface ApplicationState {
    applications: Application[];
    isLoading: boolean;
    error: string | null;
    filters: ApplicationFilters;

    // Actions
    setApplications: (applications: Application[]) => void;
    addApplication: (application: Application) => void;
    updateApplication: (id: string, data: Partial<Application>) => void;
    deleteApplication: (id: string) => void;

    setFilters: (filters: Partial<ApplicationFilters>) => void;
    resetFilters: () => void;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
}

const initialFilters: ApplicationFilters = {
    search: '',
    status: 'all',
    dateRange: 'all',
};

export const useApplicationStore = create<ApplicationState>((set) => ({
    applications: [],
    isLoading: false,
    error: null,
    filters: initialFilters,

    setApplications: (applications) => set({ applications }),

    addApplication: (application) => set((state) => ({
        applications: [application, ...state.applications]
    })),

    updateApplication: (id, data) => set((state) => ({
        applications: state.applications.map((app) =>
            app.id === id ? { ...app, ...data } : app
        )
    })),

    deleteApplication: (id) => set((state) => ({
        applications: state.applications.filter((app) => app.id !== id)
    })),

    setFilters: (newFilters) => set((state) => ({
        filters: { ...state.filters, ...newFilters }
    })),

    resetFilters: () => set({ filters: initialFilters }),

    setLoading: (isLoading) => set({ isLoading }),

    setError: (error) => set({ error }),
}));
