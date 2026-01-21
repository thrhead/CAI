/**
 * Karbon Emisyonu Anomali Tespiti Servisi
 * Verilerdeki aşırı artış veya azalışları tespit ederek kullanıcıyı uyarır.
 */

export interface Anomaly {
    recordId: string;
    type: "CRITICAL_INCREASE" | "UNUSUAL_DECREASE" | "DATA_GAP";
    severity: "HIGH" | "MEDIUM" | "LOW";
    message: string;
    suggestedAction: string;
}

export function detectAnomalies(newRecord: any, historicalAverage: number): Anomaly | null {
    const deviation = (newRecord.tCO2e - historicalAverage) / historicalAverage;

    if (deviation > 0.5) {
        return {
            recordId: newRecord.id,
            type: "CRITICAL_INCREASE",
            severity: "HIGH",
            message: `Bu ayki emisyonlar ortalamanın %${(deviation * 100).toFixed(0)} üzerinde!`,
            suggestedAction: "Tesis enerji verimliliğini kontrol edin veya veri girişini teyit edin."
        };
    }

    if (deviation < -0.8) {
        return {
            recordId: newRecord.id,
            type: "UNUSUAL_DECREASE",
            severity: "MEDIUM",
            message: "Emisyonlarda beklenmedik derecede düşük bir değer tespit edildi.",
            suggestedAction: "Eksik veri girişi olup olmadığını kontrol edin."
        };
    }

    return null;
}

/**
 * AI tarafından oluşturulan "Aksiyon Önerisi" (CarbonDeck esintili)
 */
export function getAIActionInsight(anomaly: Anomaly) {
    // LLM tabanlı aksiyon planı üretilebilir
    return {
        title: "Daha Temiz Enerjiye Geçiş",
        description: "Enerji tüketimindeki artışı dengelemek için yenilenebilir enerji sertifikası (I-REC) kullanımı planlanabilir.",
        difficulty: "Düşük Zorluk",
        impact: "Yüksek Etki"
    };
}
