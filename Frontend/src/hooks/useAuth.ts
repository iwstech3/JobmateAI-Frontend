import { useAuth as useClerkAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const useAuth = (requireAuth = true) => {
    const { isLoaded, isSignedIn, signOut } = useClerkAuth();
    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (isLoaded && requireAuth && !isSignedIn) {
            router.push("/login");
        }
    }, [isLoaded, requireAuth, isSignedIn, router]);

    return {
        user: user,
        token: null, // Clerk handles tokens internally usually
        isAuthenticated: isSignedIn,
        isLoading: !isLoaded,
        login: async () => { }, // Handled by Clerk UI
        register: async () => { }, // Handled by Clerk UI
        logout: signOut,
        setAuth: () => { }, // Handled by Clerk
    };
};
