import { NextResponse } from "next/server";
import { auth } from "../../../shared/lib/auth";
import { createOrganization, getOrganizationBySlug } from "../../../features/organizations/services";

export async function POST(req: Request) {
    const session = await auth();

    if (!session || !session.user) {
        return NextResponse.json({ error: "Yetkisiz işlem." }, { status: 401 });
    }

    try {
        const { name, slug } = await req.json();

        if (!name || !slug) {
            return NextResponse.json({ error: "İsim ve slug zorunludur." }, { status: 400 });
        }

        // Slug benzersizlik kontrolü
        const existing = await getOrganizationBySlug(slug);
        if (existing) {
            return NextResponse.json({ error: "Bu URL uzantısı zaten kullanımda." }, { status: 400 });
        }

        // Organizasyonu oluştur (services.ts userId beklediği için session.user.id gönderiyoruz)
        // Not: auth.ts güncellememiz ile session.user.id artık mevcut.
        const org = await createOrganization({
            name,
            slug,
            userId: (session.user as any).id,
        });

        return NextResponse.json(org);
    } catch (error: any) {
        console.error("Org Create Error:", error);
        return NextResponse.json({ error: "Sunucu hatası oluştu." }, { status: 500 });
    }
}
