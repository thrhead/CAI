"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line } from "recharts";
import { formatCarbon } from "../../shared/utils/utils";

const supplierData = [
    { name: "Lojistik A.Ş.", value: 334 },
    { name: "Enerji Çözüm", value: 275 },
    { name: "Hammadde Ltd.", value: 248 },
    { name: "Paketleme Co.", value: 182 },
    { name: "Boya Sanayi", value: 124 },
];

const trendData = [
    { month: "Oca", value: 400 },
    { month: "Şub", value: 300 },
    { month: "Mar", value: 500 },
    { month: "Nis", value: 450 },
    { month: "May", value: 600 },
    { month: "Haz", value: 550 },
];

export function SupplierAnalyticsTab({ orgSlug }: { orgSlug: string }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                {/* Üst Grafik */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="font-bold text-xl text-slate-900">En Çok Emisyon Üreten Tedarikçiler</h3>
                            <p className="text-sm text-slate-500">Kapsam 3 emisyonlarının odak noktaları</p>
                        </div>
                        <button className="text-sm font-bold text-primary hover:underline">Detaylı Liste</button>
                    </div>

                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={supplierData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
                                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                <Bar dataKey="value" fill="#0C4FFF" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Alt Grafik (Trend) */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="font-bold text-xl text-slate-900">Zaman İçindeki Trend</h3>
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">-%3.2 Geçen Yıla Göre</span>
                    </div>
                    <div className="h-[200px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={trendData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
                                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                <Line type="monotone" dataKey="value" stroke="#0C4FFF" strokeWidth={3} dot={{ r: 4, fill: '#0C4FFF' }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Sağ Panel */}
            <div className="space-y-6">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                    <h4 className="font-bold text-lg text-slate-900 mb-6">Tedarikçi Analiz Paneli</h4>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-blue-50 rounded-lg text-primary">✨</div>
                            <div>
                                <h5 className="font-bold text-sm text-slate-900">Otomatik Atama</h5>
                                <p className="text-xs text-slate-500 mt-1">Dökümanlardan çıkarılan emisyonlar otomatik olarak doğru tedarikçiye atanır.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">📊</div>
                            <div>
                                <h5 className="font-bold text-sm text-slate-900">Gerçek Zamanlı Takip</h5>
                                <p className="text-xs text-slate-500 mt-1">E-posta veya form kovalamaya gerek yok; faturalar tüm veriyi içerir.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-primary to-indigo-700 p-8 rounded-3xl text-white">
                    <h4 className="font-bold text-lg mb-4 leading-tight">Sürdürülebilirlik Ekibinizi Güçlendirin</h4>
                    <p className="text-blue-100 text-sm mb-6">AI Agents Planı ile manuel işleri otomatize edin ve standartlaşın.</p>
                    <button className="w-full py-3 bg-white text-primary rounded-2xl font-bold text-sm hover:bg-blue-50 transition-colors">
                        Hemen Yükseltin →
                    </button>
                </div>
            </div>
        </div>
    );
}
