import { NextResponse } from "next/server";
import { auth } from "@/shared/lib/auth";
import { getOrganizationBySlug } from "@/features/organizations/services";
import { getTenantDb } from "@/shared/lib/db";
import { summarizeEmissions } from "@/features/emissions/calculation-engine";
import { generateCBAMXml } from "@/features/reporting/xml-exporter";

export async function GET(
    req: Request,
    props: { params: Promise<{ orgSlug: string }> }
) {
    const params = await props.params;
    const session = await auth();
    const { orgSlug } = params;

    if (!session || !session.user) {
        return new Response("Unauthorized", { status: 401 });
    }

    try {
        const org = await getOrganizationBySlug(orgSlug);
        if (!org || !org.connectionString) {
            return new Response("Organization not found", { status: 404 });
        }

        const tenantDb = getTenantDb(org.connectionString);
        const records = await tenantDb.emissionRecord.findMany();

        // CBAM verisi için basitleştirilmiş gruplama (CN Kodları şimdilik statik)
        const stats = summarizeEmissions(records);

        const xml = generateCBAMXml({
            declarantId: orgSlug.toUpperCase(),
            reportingPeriod: "2024-Q1",
            goods: [
                {
                    cnCode: "7201", // Örnek: Demir/Çelik
                    directEmissions: stats.scope1,
                    indirectEmissions: stats.scope2,
                    totalEmissions: stats.total,
                }
            ]
        });

        return new Response(xml, {
            headers: {
                "Content-Type": "application/xml",
                "Content-Disposition": `attachment; filename=GreenLedger_CBAM_${orgSlug}.xml`,
            },
        });

    } catch (error: any) {
        console.error("XML Generation Error:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
