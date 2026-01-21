"use client";

import { useState } from "react";
import { PerformanceDistribution } from "./PerformanceDistribution";
import { ComparativeAnalytics } from "./ComparativeAnalytics";
import { SupplierAnalyticsTab } from "./SupplierAnalyticsTab";
import { ReportingCenter } from "./ReportingCenter";

import { ImpactReductionTab } from "./ImpactReductionTab";

interface DashboardTabsProps {
    orgSlug: string;
    records: any[];
    stats: any;
}

export function DashboardTabs({ orgSlug, records, stats }: DashboardTabsProps) {
    const [activeTab, setActiveTab] = useState("distribution");

    const tabs = [
        { id: "distribution", label: "Performans Dağılımı", icon: "📊" },
        { id: "comparison", label: "Karşılaştırma ve Kalite", icon: "⚖️" },
        { id: "supplier", label: "Tedarikçi Analizi", icon: "🚚" },
        { id: "impact", label: "Etki ve Azaltım", icon: "🎯" },
        { id: "reporting", label: "Raporlama & Otomasyon", icon: "📄" },
    ];

    return (
        <div className="space-y-8">
            {/* Tab Navigasyonu */}
            <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 rounded-2xl w-fit">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeTab === tab.id
                            ? "bg-white text-primary shadow-sm"
                            : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                            }`}
                    >
                        <span>{tab.icon}</span>
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab İçeriği */}
            <div className="transition-all duration-300">
                {activeTab === "distribution" && <PerformanceDistribution records={records} stats={stats} />}
                {activeTab === "comparison" && <ComparativeAnalytics records={records} />}
                {activeTab === "supplier" && <SupplierAnalyticsTab orgSlug={orgSlug} />}
                {activeTab === "impact" && <ImpactReductionTab orgSlug={orgSlug} />}
                {activeTab === "reporting" && <ReportingCenter orgSlug={orgSlug} />}
            </div>
        </div>
    );
}
