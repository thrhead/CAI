import { notFound } from "next/navigation";
import { getOrganizationBySlug } from "../../features/organizations/services";
import { getTenantDb } from "../../shared/lib/db";
import { summarizeEmissions } from "../../features/emissions/calculation-engine";
import { formatCarbon } from "../../shared/utils/utils";
import { DashboardTabs } from "./DashboardTabs";

interface OrgPageProps {
    params: Promise<{
        orgSlug: string;
    }>;
}

export default async function OrgDashboard({ params }: OrgPageProps) {
    const { orgSlug } = await params;

    // 1. Merkezi veritabanından organizasyon bilgilerini al
    const org = await getOrganizationBySlug(orgSlug);

    if (!org || !org.connectionString) {
        notFound();
    }

    // 2. Tenant veritabanına bağlan ve emisyon kayıtlarını çek
    const tenantDb = getTenantDb(org.connectionString);
    const records = await tenantDb.emissionRecord.findMany();

    // 3. Hesaplama motoru ile verileri grupla
    const stats = summarizeEmissions(records);

    return (
        <div className="min-h-screen bg-slate-50/50 p-6 lg:p-10">
            {/* Header Bölümü */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                <div>
                    <div className="flex items-center gap-2 text-slate-500 text-sm mb-1 uppercase tracking-wider font-semibold">
                        <span>Organizasyonlar</span>
                        <span>/</span>
                        <span className="text-primary">{org.name}</span>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-slate-900 font-sans">Kurumsal Karbon Paneli</h1>
                </div>
                <div className="flex items-center gap-4">
                    <div className="bg-white px-5 py-3 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
                        <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-semibold text-slate-600 tracking-tight">Sistem Bağlantısı Aktif</span>
                    </div>
                    <button className="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors">
                        ⚙️
                    </button>
                </div>
            </div>

            {/* Özet Kartlar */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group hover:border-primary/20 transition-all">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-primary/20 group-hover:bg-primary transition-colors"></div>
                    <p className="text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wide">Toplam Emisyon</p>
                    <h2 className="text-4xl font-bold text-slate-900 mb-2">{formatCarbon(stats.total)}</h2>
                    <p className="text-xs font-medium text-slate-400">tCO2e (Yıllık Tahmin)</p>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group hover:border-emerald-500/20 transition-all">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500/20 group-hover:bg-emerald-500 transition-colors"></div>
                    <p className="text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wide">Analitik Hedef</p>
                    <div className="flex items-end gap-2 mb-2">
                        <h2 className="text-4xl font-bold text-slate-900">%70</h2>
                        <span className="text-xs font-bold text-emerald-600 pb-1 mb-1">-%12 ↓</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[70%]"></div>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group hover:border-indigo-500/20 transition-all">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-500/20 group-hover:bg-indigo-500 transition-colors"></div>
                    <p className="text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wide">Kapsam 1 & 2</p>
                    <h2 className="text-4xl font-bold text-slate-900 mb-2">{formatCarbon(stats.scope1 + stats.scope2)}</h2>
                    <p className="text-xs font-medium text-slate-400">Operasyonel Etki</p>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group hover:border-violet-500/20 transition-all">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-violet-500/20 group-hover:bg-violet-500 transition-colors"></div>
                    <p className="text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wide">Tedarik Zinciri</p>
                    <h2 className="text-4xl font-bold text-slate-900 mb-2">{formatCarbon(stats.scope3 || 0)}</h2>
                    <p className="text-xs font-medium text-slate-400">Kapsam 3 Etkisi</p>
                </div>
            </div>

            {/* Tabbed İçerik */}
            <DashboardTabs orgSlug={orgSlug} records={records} stats={stats} />
        </div>
    );
}

