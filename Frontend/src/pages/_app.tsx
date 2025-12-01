import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { ThemeProvider } from "@/context/ThemeContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();

    // Check if the current route requires authentication
    // All routes under /dashboard are protected
    const isProtectedRoute = router.pathname.startsWith('/dashboard');

    return (
        <ThemeProvider>
            {isProtectedRoute ? (
                <ProtectedRoute>
                    <Component {...pageProps} />
                </ProtectedRoute>
            ) : (
                <Component {...pageProps} />
            )}
        </ThemeProvider>
    );
}
