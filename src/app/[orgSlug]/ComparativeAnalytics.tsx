"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const mockData = [
    { name: "Ana Fabrika", scope1: 4500, scope2: 2100, scope3: 1200 },
    { name: "Bursa Depo", scope1: 1200, scope2: 800, scope3: 600 },
    { name: "İzmir Lojistik", scope1: 2800, scope2: 1200, scope3: 3100 },
    { name: "Ankara Ofis", scope1: 300, scope2: 1400, scope3: 400 },
];

export function ComparativeAnalytics({ records }: { records: any[] }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="font-bold text-xl text-slate-900">Tesis Karşılaştırması</h3>
                            <p className="text-sm text-slate-500">Tesisler bazında kapsam dağılımı</p>
                        </div>
                        <div className="flex gap-2">
                            <button className="px-3 py-1.5 bg-slate-100 rounded-lg text-xs font-bold text-primary">Tesis Bazlı</button>
                            <button className="px-3 py-1.5 text-xs font-bold text-slate-400 hover:bg-slate-50 rounded-lg">Zaman Bazlı</button>
                        </div>
                    </div>

                    <div className="h-[400px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={mockData} layout="vertical" margin={{ left: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                                <XAxis type="number" hide />
                                <YAxis
                                    dataKey="name"
                                    type="category"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
                                />
                                <Tooltip
                                    cursor={{ fill: '#f8fafc' }}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                />
                                <Bar dataKey="scope1" stackId="a" fill="#0C4FFF" radius={[0, 0, 0, 0]} barSize={24} />
                                <Bar dataKey="scope2" stackId="a" fill="#10B981" radius={[0, 0, 0, 0]} barSize={24} />
                                <Bar dataKey="scope3" stackId="a" fill="#6366F1" radius={[0, 4, 4, 0]} barSize={24} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                        <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <span className="text-indigo-500">📍</span> Tesis Karşılaştırması
                        </h4>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            Emisyonları tesis bazında yan yana kıyaslayın; performans farklarını görün ve iyileştirmeleri standartlaştırın.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                        <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <span className="text-amber-500">⏱️</span> Zaman Karşılaştırması
                        </h4>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            Emisyonları zaman içinde analiz edin; eğilimleri ortaya çıkarın ve azaltım çalışmalarınızın etkisini ölçün.
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                    <h4 className="font-bold text-slate-900 mb-4">Operasyonel Odak</h4>
                    <ul className="space-y-4">
                        <li className="flex gap-3">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                            <span className="text-sm text-slate-600">Farklı tesisler arasındaki tutarsızlıkları belirleyin.</span>
                        </li>
                        <li className="flex gap-3">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                            <span className="text-sm text-slate-600">Azaltım çalışmalarını en kritik noktalara yönlendirin.</span>
                        </li>
                    </ul>
                </div>
                <div className="bg-slate-900 p-8 rounded-3xl text-white">
                    <h4 className="font-bold text-lg mb-2">Veri Kalitesi</h4>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">
                        IPCC tabanlı katmanlama yöntemiyle veri güvenilirliğine göre sıralayın.
                    </p>
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                        <span>✓ Yüksek Güvenilirlik Skoruna Sahip</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
