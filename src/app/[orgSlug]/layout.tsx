import { notFound, redirect } from "next/navigation";
import { auth } from "@/shared/lib/auth";
import { checkOrgAccess } from "@/features/organizations/services";

interface OrgLayoutProps {
    children: React.ReactNode;
    params: Promise<{
        orgSlug: string;
    }>;
}

export default async function OrgLayout({ children, params }: OrgLayoutProps) {
    const session = await auth();
    const { orgSlug } = await params;

    if (!session || !session.user) {
        redirect("/login");
    }

    const hasAccess = await checkOrgAccess(session.user.id!, orgSlug);

    if (!hasAccess) {
        // Kullanıcının bu organizasyona erişim yetkisi yok
        notFound(); // veya redirect('/') yapılabilir
    }

    return (
        <>
            {children}
        </>
    );
}
