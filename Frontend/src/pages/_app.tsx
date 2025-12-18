import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@/context/ThemeContext";
import { ClerkProvider } from "@clerk/nextjs";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ClerkProvider
            appearance={{
                layout: {
                    socialButtonsPlacement: "bottom",
                    socialButtonsVariant: "iconButton",
                },
            }}
            signInFallbackRedirectUrl="/dashboard"
            signUpFallbackRedirectUrl="/dashboard"
        >
            <ThemeProvider>
                <Component {...pageProps} />
            </ThemeProvider>
        </ClerkProvider>
    );
}
