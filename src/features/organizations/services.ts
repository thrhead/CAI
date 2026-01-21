import { centralDb } from "../../shared/lib/db";

export interface CreateOrganizationData {
    name: string;
    slug: string;
    userId: string;
}

/**
 * Slug üzerinden organizasyon bilgilerini getirir.
 */
export async function getOrganizationBySlug(slug: string) {
    return await centralDb.organization.findUnique({
        where: { slug },
        include: {
            members: true,
        },
    });
}

/**
 * Yeni bir organizasyon oluşturur ve oluşturan kullanıcıyı OWNER olarak atar.
 */
export async function createOrganization({ name, slug, userId }: CreateOrganizationData) {
    return await centralDb.organization.create({
        data: {
            name,
            slug,
            members: {
                create: {
                    userId: userId,
                    role: "OWNER",
                },
            },
        },
    });
}

/**
 * Bir kullanıcının üye olduğu organizasyonları listeler.
 */
export async function getUserOrganizations(userId: string) {
    const memberships = await centralDb.membership.findMany({
        where: { userId },
        include: {
            organization: true,
        },
    });

    return memberships.map((m) => m.organization);
}

/**
 * Kullanıcının organizasyona erişim yetkisini kontrol eder.
 */
export async function checkOrgAccess(userId: string, orgSlug: string) {
    const org = await getOrganizationBySlug(orgSlug);
    if (!org) return false;

    const membership = await centralDb.membership.findUnique({
        where: {
            userId_organizationId: {
                userId,
                organizationId: org.id,
            },
        },
    });

    return !!membership;
}
