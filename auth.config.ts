import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        // but by adding signIn: '/login' into our pages option, the user will be redirected to the custom login page, rather than the NextAuth.js default page.
        signIn: '/login',
    },
    callbacks: {
        // The authorized callback is used to verify if the request is authorized to access a page via Next.js Middleware.
        // The auth property contains the user's session, and the request property contains the incoming request.
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            return true;
        },
    },
    providers: [],
} satisfies NextAuthConfig;
