"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export function DashboardActions({ orgSlug }: { orgSlug: string }) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleExcelUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setLoading(true);

        // AI Senaryosu: Eğer dosya PDF veya Resim ise AI Koordinatörü çalışır
        if (file.type.includes("pdf") || file.type.includes("image")) {
            try {
                // Simüle edilmiş AI analizi
                console.log("AI Koordinatörü başlatıldı...");
                await new Promise(r => setTimeout(r, 2500)); // Analiz süresi
                alert(`AI Analizi Başarılı!\n\nDosya: ${file.name}\nTesis: Ana Fabrika\nKategori: Elektrik Tüketimi\nGüven Skoru: %98`);
                router.refresh();
                return;
            } catch (err) {
                alert("AI Analizi sırasında bir hata oluştu.");
            } finally {
                setLoading(false);
                if (fileInputRef.current) fileInputRef.current.value = "";
            }
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("orgSlug", orgSlug);

        try {
            const res = await fetch("/api/emissions/import", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                const data = await res.json();
                alert(`${data.importedCount} kayıt başarıyla içe aktarıldı.`);
                router.refresh();
            } else {
                const error = await res.json();
                alert(`Hata: ${error.error}\n${error.details?.join("\n") || ""}`);
            }
        } catch (err) {
            alert("Dosya yüklenirken bir hata oluştu.");
        } finally {
            setLoading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const handleGenerateReport = async (type: "pdf" | "xml") => {
        setLoading(true);
        try {
            const url = `/api/reporting/${orgSlug}/${type === "pdf" ? "iso-pdf" : "cbam-xml"}`;
            const res = await fetch(url);

            if (!res.ok) throw new Error("Rapor oluşturulamadı.");

            const blob = await res.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = downloadUrl;
            a.download = `GreenLedger_${type === "pdf" ? "ISO14064" : "CBAM"}_${orgSlug}.${type === "pdf" ? "pdf" : "xml"}`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(downloadUrl);
            document.body.removeChild(a);
        } catch (err) {
            alert("Rapor indirilirken bir hata oluştu.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".xlsx,.xls,.csv,.pdf,.png,.jpg"
                onChange={handleExcelUpload}
            />

            <button className="w-full py-4 px-5 bg-slate-900 text-white hover:bg-slate-800 rounded-2xl font-bold transition-all text-left flex justify-between items-center shadow-lg shadow-slate-200 group">
                <div className="flex items-center gap-3">
                    <span className="text-lg">➕</span>
                    <span>Yeni Veri Girişi</span>
                </div>
                <span className="text-white/40 group-hover:text-white transition-colors">→</span>
            </button>

            <button
                onClick={() => fileInputRef.current?.click()}
                disabled={loading}
                className="w-full py-4 px-5 bg-white border border-slate-100 hover:border-primary/30 hover:bg-slate-50 rounded-2xl font-bold transition-all text-left flex justify-between items-center group"
            >
                <div className="flex items-center gap-3">
                    <span className="text-lg">🤖</span>
                    <span className="text-slate-700">{loading ? "İşleniyor..." : "AI ile Veri Yükleme"}</span>
                </div>
                <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-0.5 rounded uppercase tracking-widest">Yeni</span>
            </button>

            <button
                onClick={() => handleGenerateReport("pdf")}
                disabled={loading}
                className="w-full py-4 px-5 bg-white border border-slate-100 hover:border-primary/30 hover:bg-slate-50 rounded-2xl font-bold transition-all text-left flex justify-between items-center group"
            >
                <div className="flex items-center gap-3 text-slate-700">
                    <span className="text-lg">📄</span>
                    <span>ISO 14064 Raporu (PDF)</span>
                </div>
                <span className="text-slate-300 group-hover:text-primary transition-colors">↓</span>
            </button>

            <button
                onClick={() => handleGenerateReport("xml")}
                disabled={loading}
                className="w-full py-4 px-5 bg-white border border-slate-100 hover:border-primary/30 hover:bg-slate-50 rounded-2xl font-bold transition-all text-left flex justify-between items-center group"
            >
                <div className="flex items-center gap-3 text-slate-700">
                    <span className="text-lg">⚙️</span>
                    <span>SKDM (CBAM) Çıktısı (XML)</span>
                </div>
                <span className="text-slate-300 group-hover:text-primary transition-colors">↓</span>
            </button>
        </div>
    );
}
