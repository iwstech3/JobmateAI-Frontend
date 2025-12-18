import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/router";
import Link from "next/link";
import { Briefcase, User, Eye, EyeOff, CheckCircle, Zap, Sun, Moon } from "lucide-react";
import Head from "next/head";
import { useTheme } from "@/context/ThemeContext";

export default function RegisterPage() {
    const { isLoaded, signUp, setActive } = useSignUp();
    const router = useRouter();
    const { theme, toggleTheme } = useTheme();

    const [role, setRole] = useState<'seeker' | 'employer'>('seeker');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [pendingVerification, setPendingVerification] = useState(false);
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    if (!isLoaded) return null;

    const handleGoogleSignUp = async () => {
        if (!isLoaded) return;

        // Save role preference
        localStorage.setItem('onboarding_role', role);

        try {
            await signUp.authenticateWithRedirect({
                strategy: "oauth_google",
                redirectUrl: "/sso-callback",
                redirectUrlComplete: "/dashboard"
            });
        } catch (err: any) {
            console.error("Google Sign Up Error:", err);
            setError(err.errors?.[0]?.message || "Failed to start Google Sign Up");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isLoaded) return;
        setError("");
        setIsLoading(true);

        try {
            await signUp.create({
                emailAddress: email,
                password,
            });

            // Prepare email verification
            await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
            setPendingVerification(true);
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2));
            setError(err.errors?.[0]?.message || "Something went wrong during sign up");
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isLoaded) return;
        setError("");
        setIsLoading(true);

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code,
            });

            if (completeSignUp.status !== "complete") {
                console.log(JSON.stringify(completeSignUp, null, 2));
                setError("Verification failed. Please try again.");
                setIsLoading(false);
                return;
            }

            if (completeSignUp.status === "complete") {
                await setActive({ session: completeSignUp.createdSessionId });

                localStorage.setItem('onboarding_role', role);

                // Redirect based on role
                if (role === 'seeker') router.push('/dashboard');
                else router.push('/hr/dashboard');
            }
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2));
            setError(err.errors?.[0]?.message || "Verification code incorrect");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-300 relative">
            <Head>
                <title>Sign Up - JobMate AI</title>
            </Head>

            {/* Theme Toggle */}
            <div className="absolute top-4 right-4">
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-neutral-800 text-gray-600 dark:text-gray-400 transition-colors"
                >
                    {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                <div className="flex justify-center mb-6">
                    <Link href="/" className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center hover:bg-blue-700 transition-colors">
                        <Zap className="w-7 h-7 text-white" fill="currentColor" />
                    </Link>
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Create your account
                </h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Already have an account?{" "}
                    <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                        Sign in
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white dark:bg-neutral-900 py-8 px-4 shadow sm:rounded-2xl sm:px-10 border border-gray-100 dark:border-white/5">

                    {!pendingVerification ? (
                        /* Step 1: Sign Up Form */
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {/* Role Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                    I am a...
                                </label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setRole('seeker')}
                                        className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${role === 'seeker'
                                            ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                                            : 'border-gray-200 dark:border-white/10 text-gray-500 hover:border-blue-200 dark:hover:border-blue-900'
                                            }`}
                                    >
                                        <User className="w-6 h-6 mb-2" />
                                        <span className="text-sm font-medium">Job Seeker</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setRole('employer')}
                                        className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${role === 'employer'
                                            ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400'
                                            : 'border-gray-200 dark:border-white/10 text-gray-500 hover:border-purple-200 dark:hover:border-purple-900'
                                            }`}
                                    >
                                        <Briefcase className="w-6 h-6 mb-2" />
                                        <span className="text-sm font-medium">Employer</span>
                                    </button>
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Password
                                </label>
                                <div className="mt-1 relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="new-password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    Must be at least 8 characters long
                                </p>
                            </div>

                            {error && (
                                <div className="text-red-600 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg flex items-center gap-2">
                                    <span className="block sm:inline">{error}</span>
                                </div>
                            )}

                            <div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="flex w-full justify-center rounded-lg border border-transparent bg-blue-600 py-2.5 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    {isLoading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        "Sign up"
                                    )}
                                </button>
                            </div>
                        </form>
                    ) : (
                        /* Step 2: Verification Form */
                        <form className="space-y-6" onSubmit={handleVerify}>
                            <div className="text-center mb-6">
                                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/20 mb-4">
                                    <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Verify your email</h3>
                                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                    We sent a code to <span className="font-medium text-gray-900 dark:text-white">{email}</span>
                                </p>
                            </div>

                            <div>
                                <label htmlFor="code" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Verification Code
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="code"
                                        name="code"
                                        type="text"
                                        required
                                        placeholder="Enter 6-digit code"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                        className="block w-full text-center tracking-widest text-lg rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="text-red-600 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg text-center">
                                    {error}
                                </div>
                            )}

                            <div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="flex w-full justify-center rounded-lg border border-transparent bg-blue-600 py-2.5 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    {isLoading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        "Verify & Create Account"
                                    )}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
