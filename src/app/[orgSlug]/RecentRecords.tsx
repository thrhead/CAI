"use client";

import { formatCarbon } from "../../shared/utils/utils";
import { detectAnomalies } from "../../features/automation/anomaly-detector";

interface Record {
    id: string;
    category: string;
    periodStart: Date | string;
    periodEnd: Date | string;
    tCO2e: number;
    amount: number;
    unit: string;
}

export function RecentRecords({ initialRecords }: { initialRecords: Record[] }) {
    if (initialRecords.length === 0) {
        return (
            <div className="text-center py-20 bg-slate-50/50 rounded-3xl border border-dashed border-slate-200">
                <p className="text-slate-400 font-medium">Henüz analiz edilecek veri bulunamadı.</p>
                <button className="mt-4 text-sm font-bold text-primary hover:underline">İlk Veriyi Ekle →</button>
            </div>
        );
    }

    return (
        <div className="overflow-hidden">
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b border-slate-100">
                        <th className="pb-4 font-semibold text-slate-500 text-xs uppercase tracking-wider">Kategori / Dönem</th>
                        <th className="pb-4 font-semibold text-slate-500 text-xs uppercase tracking-wider">GHG</th>
                        <th className="pb-4 font-semibold text-slate-500 text-xs uppercase tracking-wider">ISO-14064-1</th>
                        <th className="pb-4 font-semibold text-slate-500 text-xs uppercase tracking-wider text-right">Miktar</th>
                        <th className="pb-4 font-semibold text-slate-500 text-xs uppercase tracking-wider text-right">Etki (tCO2e)</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    {initialRecords.slice(0, 5).map((record) => {
                        const isScope2 = record.category.toLowerCase().includes("electricity");
                        // Anomali simülasyonu: Eğer emisyon 1000'den büyükse anomali var sayalım
                        const anomaly = detectAnomalies(record, 500);

                        return (
                            <tr key={record.id} className="group hover:bg-slate-50/50 transition-colors">
                                <td className="py-5">
                                    <div className="flex items-center gap-2">
                                        <p className="font-bold text-slate-900 group-hover:text-primary transition-colors">{record.category}</p>
                                        {anomaly && (
                                            <span title={anomaly.message} className="text-amber-500 cursor-help" key="anomaly-icon">⚠️</span>
                                        )}
                                    </div>
                                    <p className="text-xs text-slate-400 mt-0.5">
                                        {new Date(record.periodStart).toLocaleDateString('tr-TR')} - {new Date(record.periodEnd).toLocaleDateString('tr-TR')}
                                    </p>
                                </td>
                                <td className="py-5">
                                    <span className="text-xs font-semibold px-2 py-0.5 bg-slate-100 rounded text-slate-600">
                                        {isScope2 ? "Kapsam 2" : "Kapsam 1"}
                                    </span>
                                </td>
                                <td className="py-5">
                                    <span className="text-xs text-slate-500">
                                        {isScope2 ? "Kategori 2.1" : "Kategori 1.1"}
                                    </span>
                                </td>
                                <td className="py-5 text-right">
                                    <p className="font-semibold text-slate-700">{record.amount} <span className="text-slate-400 font-normal">{record.unit}</span></p>
                                </td>
                                <td className="py-5 text-right">
                                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full transition-colors ${anomaly ? "bg-amber-50 group-hover:bg-amber-100" : "bg-slate-100 group-hover:bg-primary"
                                        }`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${anomaly ? "bg-amber-500" : "bg-primary group-hover:bg-white"
                                            }`}></span>
                                        <span className={`font-bold text-sm transition-colors ${anomaly ? "text-amber-700" : "text-slate-900 group-hover:text-white"
                                            }`}>{formatCarbon(record.tCO2e)}</span>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
