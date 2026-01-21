import { NextResponse } from "next/server";
import { auth } from "../../../../shared/lib/auth";
import { getOrganizationBySlug } from "../../../../features/organizations/services";
import { getTenantDb } from "../../../../shared/lib/db";
import { parseEmissionsExcel } from "../../../../features/emissions/excel-service";

export async function POST(req: Request) {
    const session = await auth();

    if (!session || !session.user) {
        return NextResponse.json({ error: "Yetkisiz işlem." }, { status: 401 });
    }

    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;
        const orgSlug = formData.get("orgSlug") as string;

        if (!file || !orgSlug) {
            return NextResponse.json({ error: "Dosya ve organizasyon bilgisi zorunludur." }, { status: 400 });
        }

        // 1. Organizasyon ve Tenant DB kontrolü
        const org = await getOrganizationBySlug(orgSlug);
        if (!org || !org.connectionString) {
            return NextResponse.json({ error: "Organizasyon bulunamadı." }, { status: 404 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const importResult = await parseEmissionsExcel(buffer);

        if (!importResult.success && importResult.records.length === 0) {
            return NextResponse.json({ error: "Excel ayrıştırılamadı.", details: importResult.errors }, { status: 400 });
        }

        const tenantDb = getTenantDb(org.connectionString);
        let importedCount = 0;

        // 2. Kayıtları veritabanına işle (Tesis kontrolü ile)
        for (const record of importResult.records) {
            // Tesis var mı kontrol et veya oluştur
            let facility = await tenantDb.facility.findFirst({
                where: { name: record.facilityName }
            });

            if (!facility) {
                facility = await tenantDb.facility.create({
                    data: { name: record.facilityName, sector: "Genel" }
                });
            }

            // Emisyon kaydını oluştur
            await tenantDb.emissionRecord.create({
                data: {
                    facilityId: facility.id,
                    category: record.category,
                    factorId: record.factorId,
                    amount: record.amount,
                    unit: record.unit,
                    tCO2e: record.tCO2e,
                    periodStart: record.periodStart,
                    periodEnd: record.periodEnd,
                }
            });
            importedCount++;
        }

        return NextResponse.json({
            success: true,
            importedCount,
            errors: importResult.errors
        });

    } catch (error: any) {
        console.error("Excel Import Error:", error);
        return NextResponse.json({ error: "İçe aktarma sırasında sunucu hatası oluştu." }, { status: 500 });
    }
}
