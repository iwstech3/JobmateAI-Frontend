import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@/context/ThemeContext";
import { ClerkProvider } from "@clerk/nextjs";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ClerkProvider>
            <ThemeProvider>
                <Component {...pageProps} />
            </ThemeProvider>
        </ClerkProvider>
    );
}
