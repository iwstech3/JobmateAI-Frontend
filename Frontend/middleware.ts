import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
    "/dashboard(.*)",
    "/hr(.*)"
]);

const isAuthRoute = createRouteMatcher([
    "/login(.*)",
    "/register(.*)"
]);

export default clerkMiddleware(async (auth, req) => {
    const { userId, sessionClaims } = await auth();

    // Redirect authenticated users away from login/register
    if (userId && isAuthRoute(req)) {
        const role = (sessionClaims?.metadata as any)?.role || 'seeker';
        const dashboardUrl = role === 'employer' ? '/hr/dashboard' : '/dashboard';
        return NextResponse.redirect(new URL(dashboardUrl, req.url));
    }

    if (isProtectedRoute(req) && !userId) {
        return (await auth()).redirectToSignIn();
    }
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
