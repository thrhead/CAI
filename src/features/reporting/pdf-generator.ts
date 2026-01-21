import { jsPDF } from "jspdf";
import "jspdf-autotable";

export interface ReportData {
    organizationName: string;
    period: string;
    totalEmissions: number;
    scope1: number;
    scope2: number;
    facilities: { name: string; emissions: number }[];
}

/**
 * ISO 14064-1 Standartlarına uygun PDF raporu oluşturur.
 */
export async function generateISO14064Report(data: ReportData) {
    const doc = new jsPDF() as any;

    // Başlık
    doc.setFontSize(22);
    doc.text("Sera Gazı Emisyon Raporu", 105, 20, { align: "center" });

    doc.setFontSize(12);
    doc.text(`ISO 14064-1 Standartlarına Uygun`, 105, 30, { align: "center" });

    // Kurum Bilgileri
    doc.setFontSize(14);
    doc.text("Kurum Bilgileri", 20, 50);
    doc.setFontSize(10);
    doc.text(`Kurum Adı: ${data.organizationName}`, 20, 60);
    doc.text(`Raporlama Dönemi: ${data.period}`, 20, 65);

    // Özet Tablo
    doc.autoTable({
        startY: 80,
        head: [["Kategori", "Emisyon (tCO2e)"]],
        body: [
            ["Kapsam 1 (Doğrudan Emisyonlar)", data.scope1.toFixed(2)],
            ["Kapsam 2 (Enerji Dolaylı Emisyonlar)", data.scope2.toFixed(2)],
            ["TOPLAM", data.totalEmissions.toFixed(2)],
        ],
        theme: "striped",
        headStyles: { fillStyle: [16, 185, 129] }, // Emerald-600
    });

    // Tesis Dağılımı
    doc.text("Tesis Bazlı Dağılım", 20, doc.lastAutoTable.finalY + 20);
    doc.autoTable({
        startY: doc.lastAutoTable.finalY + 30,
        head: [["Tesis Adı", "Emisyon (tCO2e)"]],
        body: data.facilities.map(f => [f.name, f.emissions.toFixed(2)]),
    });

    // Alt Bilgi
    doc.setFontSize(8);
    doc.text("Bu rapor GreenLedger TR tarafından otomatik olarak oluşturulmuştur.", 105, 280, { align: "center" });

    return doc;
}
