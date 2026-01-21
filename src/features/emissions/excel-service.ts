import * as XLSX from "xlsx";
import { getFactorById, EmissionFactor } from "./emission-factors";
import { calculateEmissions } from "./calculation-engine";

export interface ExcelRow {
    Facility: string;
    Category: string;
    FactorId: string;
    Amount: number;
    Date: string | Date;
}

export interface ImportResult {
    success: boolean;
    records: any[];
    errors: string[];
}

/**
 * Excel dosyasını parse eder ve emisyon kayıtlarına dönüştürür.
 */
export async function parseEmissionsExcel(fileBuffer: Buffer): Promise<ImportResult> {
    const workbook = XLSX.read(fileBuffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const data = XLSX.utils.sheet_to_json<ExcelRow>(sheet);
    const records: any[] = [];
    const errors: string[] = [];

    data.forEach((row, index) => {
        try {
            const factor = getFactorById(row.FactorId);
            if (!factor) {
                errors.push(`Satır ${index + 2}: Geçersiz Faktör ID - ${row.FactorId}`);
                return;
            }

            const calculation = calculateEmissions(row.FactorId, row.Amount);

            // Basit tarih ayrıştırma - Gerçekte daha karmaşık olabilir
            const startDate = new Date(row.Date);
            const endDate = new Date(startDate);
            endDate.setMonth(startDate.getMonth() + 1); // Varsayılan 1 ay

            records.push({
                facilityName: row.Facility,
                category: row.Category,
                factorId: row.FactorId,
                amount: row.Amount,
                unit: factor.unit,
                tCO2e: calculation.tCO2e,
                periodStart: startDate,
                periodEnd: endDate,
            });
        } catch (err: any) {
            errors.push(`Satır ${index + 2}: ${err.message}`);
        }
    });

    return {
        success: errors.length === 0,
        records,
        errors,
    };
}
