
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { UserProfile } from '@/types/settings';

interface AuthState {
    user: UserProfile | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;

    // Actions
    setAuth: (user: UserProfile, token: string) => void;
    logout: () => void;
    updateUser: (user: Partial<UserProfile>) => void;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            setAuth: (user, token) => set({
                user,
                token,
                isAuthenticated: true,
                error: null
            }),

            logout: () => set({
                user: null,
                token: null,
                isAuthenticated: false,
                error: null
            }),

            updateUser: (userData) => set((state) => ({
                user: state.user ? { ...state.user, ...userData } : null
            })),

            setLoading: (isLoading) => set({ isLoading }),

            setError: (error) => set({ error }),
        }),
        {
            name: 'jobmate-auth-storage', // unique name for localStorage key
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                user: state.user,
                token: state.token,
                isAuthenticated: state.isAuthenticated
            }), // Only persist these fields
        }
    )
);
