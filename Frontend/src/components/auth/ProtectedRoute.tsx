import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuthStore } from '@/store/authStore';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const router = useRouter();
    const { isAuthenticated, isLoading } = useAuthStore();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        // Wait for hydration/loading to finish
        if (!isLoading) {
            if (!isAuthenticated) {
                // Redirect to login if not authenticated
                router.push('/login');
            } else {
                // Allow access if authenticated
                setIsAuthorized(true);
            }
        }
    }, [isAuthenticated, isLoading, router]);

    // Show nothing while checking auth or redirecting
    if (isLoading || !isAuthorized) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-neutral-900">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return <>{children}</>;
};
