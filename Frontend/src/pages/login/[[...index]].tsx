import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
    return (
        <div
            className="flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat px-4 py-12 sm:px-6 lg:px-8"
            style={{ backgroundImage: "url('/images/auth-background.png')" }}
        >
            <div className="w-full max-w-md">
                <SignIn path="/login" />
            </div>
        </div>
    );
}
