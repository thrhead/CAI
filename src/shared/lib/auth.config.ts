import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    providers: [], // Providers are defined in auth.ts for full app, but empty here for middleware if not using specific providers in middleware logic
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard'); // Example check

            // Basic example: just return true to let middleware handle logic or boolean
            return true;
        },
        async session({ session, user, token }) {
            if (session.user && token?.sub) {
                session.user.id = token.sub;
            }
            return session;
        },
    },
    session: { strategy: "jwt" }, // Edge friendly strategy
} satisfies NextAuthConfig;
