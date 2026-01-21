export interface CBAMData {
    declarantId: string;
    reportingPeriod: string;
    goods: {
        cnCode: string; // Customs Nomenclature code
        directEmissions: number;
        indirectEmissions: number;
        totalEmissions: number;
    }[];
}

/**
 * AB SKDM (CBAM) uyumlu XML çıktısı üretir.
 */
export function generateCBAMXml(data: CBAMData): string {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<CBAMReport>
  <Header>
    <DeclarantId>${data.declarantId}</DeclarantId>
    <ReportingPeriod>${data.reportingPeriod}</ReportingPeriod>
  </Header>
  <EmissionsData>
    ${data.goods.map(g => `
    <Good>
      <CNCode>${g.cnCode}</CNCode>
      <DirectEmissions>${g.directEmissions.toFixed(6)}</DirectEmissions>
      <IndirectEmissions>${g.indirectEmissions.toFixed(6)}</IndirectEmissions>
      <TotalEmissions>${g.totalEmissions.toFixed(6)}</TotalEmissions>
    </Good>`).join("")}
  </EmissionsData>
</CBAMReport>`;

    return xml.trim();
}

/**
 * XML dosyasını tarayıcıda indirmek için yardımcı fonksiyon.
 */
export function downloadXml(content: string, fileName: string) {
    const blob = new Blob([content], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
}
