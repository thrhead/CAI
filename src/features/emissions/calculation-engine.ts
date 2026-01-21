import { getFactorById, EmissionFactor } from "./emission-factors";

export interface CalculationResult {
    tCO2e: number;
    inputAmount: number;
    factor: EmissionFactor;
    timestamp: string;
}

/**
 * GreenLedger TR Hesaplama Motoru
 * Verilen miktar ve faktör ID'sine göre tCO2e (ton karbon eşdeğeri) hesaplar.
 */
export function calculateEmissions(factorId: string, amount: number): CalculationResult {
    const factor = getFactorById(factorId);

    if (!factor) {
        throw new Error(`Emisyon faktörü bulunamadı: ${factorId}`);
    }

    const tCO2e = amount * factor.factor;

    return {
        tCO2e,
        inputAmount: amount,
        factor,
        timestamp: new Date().toISOString(),
    };
}

/**
 * Emisyon kayıtlarını kapsamlara ve ISO 14064-1 kategorilerine göre gruplar.
 */
export function summarizeEmissions(records: { tCO2e: number; category: string }[]) {
    return records.reduce(
        (acc, cur) => {
            const cat = cur.category.toLowerCase();

            if (cat.includes("electricity") || cat.includes("enerji")) {
                acc.scope2 += cur.tCO2e;
                acc.isoCategory = "Kategori 2 (Dolaylı Enerji)";
            } else if (cat.includes("supply") || cat.includes("transport") || cat.includes("lojistik") || cat.includes("kapsam 3")) {
                acc.scope3 += cur.tCO2e;
                acc.isoCategory = "Kategori 3-6 (Diğer Dolaylı)";
            } else {
                acc.scope1 += cur.tCO2e;
                acc.isoCategory = "Kategori 1 (Doğrudan)";
            }

            acc.total += cur.tCO2e;
            return acc;
        },
        { scope1: 0, scope2: 0, scope3: 0, total: 0, isoCategory: "" }
    );
}

/**
 * @deprecated summarizeEmissions kullanın.
 */
export function groupByScope(results: any[]) {
    return summarizeEmissions(results);
}
