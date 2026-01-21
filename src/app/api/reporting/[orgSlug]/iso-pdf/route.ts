import { NextResponse } from "next/server";
import { auth } from "@/shared/lib/auth";
import { getOrganizationBySlug } from "@/features/organizations/services";
import { getTenantDb } from "@/shared/lib/db";
import { summarizeEmissions } from "@/features/emissions/calculation-engine";
import { generateISO14064Report } from "@/features/reporting/pdf-generator";

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
        const facilitiesList = await tenantDb.facility.findMany();

        const stats = summarizeEmissions(records);

        // Tesis bazlı dağılımı hesapla
        const facilityEmissions = facilitiesList.map(f => {
            const fRecords = records.filter(r => r.facilityId === f.id);
            const fStats = summarizeEmissions(fRecords);
            return { name: f.name, emissions: fStats.total };
        });

        const doc = await generateISO14064Report({
            organizationName: org.name,
            period: "2024 (Yıllık)", // Statik şimdilik, dinamikleştirilebilir
            totalEmissions: stats.total,
            scope1: stats.scope1,
            scope2: stats.scope2,
            facilities: facilityEmissions,
        });

        const pdfOutput = doc.output("arraybuffer");

        return new Response(pdfOutput, {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename=GreenLedger_ISO14064_${orgSlug}.pdf`,
            },
        });

    } catch (error: any) {
        console.error("PDF Generation Error:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
