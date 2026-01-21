"use client";

import { useState } from "react";

const activityLog = [
    { date: "03/12/2025", type: "Created", name: "Warehouses Analysis Report", author: "Tahir B.", status: "Success" },
    { date: "02/12/2025", type: "Edited", name: "Emission Summary Report", author: "System AI", status: "Updated" },
    { date: "10/05/2025", type: "Downloaded", name: "Marmara Region Detailed Analytical", author: "Tahir B.", status: "PDF Export" },
];

export function ReportingCenter({ orgSlug }: { orgSlug: string }) {
    return (
        <div className="space-y-8">
            {/* Üst Kısım: Rapor Oluşturma */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="max-w-md">
                    <h3 className="font-bold text-2xl text-slate-900 mb-2">Raporlama ve Otomasyon</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                        Emisyon raporlamasını kolaylaştırın; manuel işleri en aza indirin, tutarlılığı artırın ve denetime hazır çıktılar alın.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                    <button className="px-8 py-3 bg-primary text-white rounded-2xl font-bold text-sm hover:opacity-90 transition-opacity whitespace-nowrap">
                        Rapor Oluştur 📄
                    </button>
                    <button className="px-8 py-3 bg-slate-50 text-slate-700 border border-slate-100 rounded-2xl font-bold text-sm hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
                        <span>✨</span> AI ile Oluştur
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Aktivite Logu */}
                <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="font-bold text-xl text-slate-900">İşlem Kaydı (Activity Log)</h3>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Rapor ara..."
                                className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-64"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-slate-100">
                                    <th className="pb-4 font-semibold text-slate-500 text-xs uppercase tracking-wider">İşlem Tarihi</th>
                                    <th className="pb-4 font-semibold text-slate-500 text-xs uppercase tracking-wider">Tür</th>
                                    <th className="pb-4 font-semibold text-slate-500 text-xs uppercase tracking-wider">Rapor Adı</th>
                                    <th className="pb-4 font-semibold text-slate-500 text-xs uppercase tracking-wider text-right">Durum</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {activityLog.map((log, i) => (
                                    <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                                        <td className="py-5 text-sm text-slate-600 font-medium">{log.date}</td>
                                        <td className="py-5">
                                            <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md ${log.type === 'Created' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'
                                                }`}>
                                                {log.type}
                                            </span>
                                        </td>
                                        <td className="py-5">
                                            <p className="font-bold text-slate-800 group-hover:text-primary transition-colors">{log.name}</p>
                                            <p className="text-[10px] text-slate-400 mt-1">Yazar: {log.author}</p>
                                        </td>
                                        <td className="py-5 text-right">
                                            <span className="text-xs font-semibold text-slate-400 group-hover:text-emerald-500 transition-colors">{log.status}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Yan Panel: Uyum ve Kontrol */}
                <div className="space-y-6">
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                        <h4 className="font-bold text-lg text-slate-900 mb-6 flex items-center gap-2">
                            <span className="text-primary">🛡️</span> Uyum ve Kontrol
                        </h4>
                        <ul className="space-y-6">
                            <li className="flex gap-4">
                                <div className="text-emerald-500 mt-1">✓</div>
                                <div>
                                    <h5 className="font-bold text-sm text-slate-900">ISO 14064 Uyumu</h5>
                                    <p className="text-xs text-slate-500 mt-1">Verileriniz izlenebilir ve doğrulanabilir formatta raporlanır.</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <div className="text-emerald-500 mt-1">✓</div>
                                <div>
                                    <h5 className="font-bold text-sm text-slate-900">Küresel Standartlar</h5>
                                    <p className="text-xs text-slate-500 mt-1">CDP, SBTi ve IFRS S2 ile uyumluluğunuzu koruyun.</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 border-dashed flex flex-wrap gap-4 justify-center items-center opacity-70">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ISO 14064-1</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">GHG PROTOCOL</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">SBTi</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">IFRS</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
