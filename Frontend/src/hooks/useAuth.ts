import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthStore } from '@/store/authStore';
import { authService } from '@/services/auth';
import { LoginCredentials, RegisterCredentials } from '@/types/auth';

export const useAuth = (requireAuth = true) => {
    const router = useRouter();
    const { user, token, isAuthenticated, isLoading, logout, setAuth, setLoading, setError } = useAuthStore();

    useEffect(() => {
        if (!isLoading && requireAuth && !isAuthenticated) {
            router.push('/login');
        }
    }, [isLoading, isAuthenticated, requireAuth, router]);

    const login = async (credentials: LoginCredentials) => {
        setLoading(true);
        setError(null);
        try {
            const response = await authService.login(credentials);
            // Assuming response.user exists, if not we might need to fetch it
            // For now, let's assume the backend returns the user object or we fetch it
            let userProfile = response.user;

            if (!userProfile) {
                // If login doesn't return user, fetch it
                // This depends on backend implementation
                // userProfile = await authService.getCurrentUser();
                // For now, mock it or handle it
            }

            if (response.access_token && userProfile) {
                setAuth(userProfile, response.access_token);
                router.push('/dashboard');
            }
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Login failed');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const register = async (credentials: RegisterCredentials) => {
        setLoading(true);
        setError(null);
        try {
            const response = await authService.register(credentials);
            if (response.access_token) {
                // Auto login after register
                // setAuth(response.user, response.access_token);
                router.push('/dashboard/settings'); // Redirect to profile setup
            }
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Registration failed');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        user,
        token,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
        setAuth
    };
};
