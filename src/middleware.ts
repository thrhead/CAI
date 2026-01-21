import NextAuth from "next-auth";
import { authConfig } from "./shared/lib/auth.config";
import { NextResponse } from "next/server";

export default NextAuth(authConfig).auth(async (req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    // Sadece /[orgSlug] ile başlayan route'ları kontrol et
    const pathParts = nextUrl.pathname.split("/").filter(Boolean);

    // İstisnalar: login, api, organizations/new, static files
    const exceptions = ["login", "api", "organizations", "favicon.ico", "_next"];

    if (pathParts.length > 0 && !exceptions.includes(pathParts[0])) {
        if (!isLoggedIn) {
            return NextResponse.redirect(new URL("/login", nextUrl));
        }
        // Organizasyon erişim kontrolü (checkOrgAccess) artık 
        // Edge Runtime kısıtlamaları nedeniyle Server Component (Layout/Page) tarafında yapılacaktır.
    }

    return NextResponse.next();
});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
