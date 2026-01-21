"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { formatCarbon } from "../../shared/utils/utils";
import { RecentRecords } from "./RecentRecords";

interface PerformanceDistributionProps {
    records: any[];
    stats: any;
}

export function PerformanceDistribution({ records, stats }: PerformanceDistributionProps) {
    const data = [
        { name: "Kapsam 1", value: stats.scope1, color: "#0C4FFF" },
        { name: "Kapsam 2", value: stats.scope2, color: "#10B981" },
        { name: "Kapsam 3", value: stats.scope3 || 0, color: "#6366F1" },
    ].filter(item => item.value > 0);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                {/* Grafik Kartı */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="font-bold text-xl text-slate-900">Emisyon Dağılımı</h3>
                            <p className="text-sm text-slate-500">Kapsam bazlı emisyon ağırlıkları</p>
                        </div>
                        <div className="flex gap-2">
                            <button className="px-3 py-1.5 bg-slate-100 rounded-lg text-xs font-bold text-primary">GHG-Based</button>
                            <button className="px-3 py-1.5 text-xs font-bold text-slate-400 hover:bg-slate-50 rounded-lg">ISO-Based</button>
                        </div>
                    </div>

                    <div className="h-[300px] w-full flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={110}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    formatter={(value: any) => [`${formatCarbon(Number(value) || 0)} tCO2e`, 'Emisyon']}
                                />
                                <Legend verticalAlign="middle" align="right" layout="vertical" />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute flex flex-col items-center">
                            <span className="text-3xl font-bold text-slate-900">{formatCarbon(stats.total)}</span>
                            <span className="text-xs text-slate-400 font-medium tracking-wider uppercase">Toplam tCO2e</span>
                        </div>
                    </div>
                </div>

                {/* Detaylı Liste */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-xl text-slate-900">Veri Analizi</h3>
                    </div>
                    <RecentRecords initialRecords={records} />
                </div>
            </div>

            {/* Yan Bilgi Kartları */}
            <div className="space-y-6">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-xl mb-4 text-primary">📈</div>
                    <h4 className="font-bold text-slate-900 mb-1">Kapsam Analizi</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">
                        Kapsam 1-2-3 emisyonlarını inceleyin; operasyonlarınızın hangi bölümlerinin en büyük etkiyi yarattığını görün.
                    </p>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                    <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-xl mb-4 text-emerald-600">📑</div>
                    <h4 className="font-bold text-slate-900 mb-1">Kategori Analizi</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">
                        Yakıt tüketimi, elektrik, ulaşım gibi emisyon kategorilerine derinlemesine bakın; farklı faaliyet türlerini keşfedin.
                    </p>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                    <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-xl mb-4 text-indigo-600">⛓️</div>
                    <h4 className="font-bold text-slate-900 mb-1">Kaynak Analizi</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">
                        Dizel jeneratör, elektrik şebekesi gibi belirli emisyon kaynaklarını tespit edin ve harekete geçin.
                    </p>
                </div>
            </div>
        </div>
    );
}
