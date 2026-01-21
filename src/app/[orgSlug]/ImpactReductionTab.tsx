"use client";

import { useState } from "react";

export function ImpactReductionTab({ orgSlug }: { orgSlug: string }) {
    const [activeSubTab, setActiveSubTab] = useState("targets");

    const subTabs = [
        { id: "targets", label: "Azaltım Hedefleri" },
        { id: "recommendations", label: "Azaltım Önerileri" },
        { id: "offsets", label: "Emisyon Azaltımı" },
    ];

    return (
        <div className="space-y-8">
            {/* Alt Tab Navigasyonu */}
            <div className="flex gap-4 border-b border-slate-200 pb-px">
                {subTabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveSubTab(tab.id)}
                        className={`pb-4 text-sm font-bold transition-all relative ${activeSubTab === tab.id
                                ? "text-primary border-b-2 border-primary"
                                : "text-slate-400 hover:text-slate-600"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* İçerik */}
            <div className="transition-all duration-300">
                {activeSubTab === "targets" && <ReductionTargetsSection />}
                {activeSubTab === "recommendations" && <ReductionRecommendationsSection />}
                {activeSubTab === "offsets" && <RecOffsetSection />}
            </div>
        </div>
    );
}

function ReductionTargetsSection() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="font-bold text-2xl text-slate-900 mb-2">Azaltım Hedefleri</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                Kapsam 1, 2 ve 3 emisyon hedeflerinizi tüm operasyonlarınızda belirleyin ve takip edin.
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-50 p-6 rounded-2xl mb-8 flex items-center justify-between border border-slate-100">
                        <div className="flex items-center gap-4">
                            <span className="text-2xl">🎯</span>
                            <div>
                                <h4 className="font-bold text-slate-900">Karbon Azaltım Hedeflerinizi Belirleyin</h4>
                                <p className="text-xs text-slate-500">Birkaç basit adımda sürdürülebilirlik standartlarına uyumlu hedefler oluşturun.</p>
                            </div>
                        </div>
                        <button className="px-6 py-2.5 bg-emerald-500 text-white rounded-xl font-bold text-sm hover:opacity-90 transition-opacity">
                            Hedef Belirlemeye Başla
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-slate-100">
                                    <th className="pb-4 font-semibold text-slate-500 text-xs uppercase tracking-wider">Hedef Adı</th>
                                    <th className="pb-4 font-semibold text-slate-500 text-xs uppercase tracking-wider text-right">Yıllık Azaltım</th>
                                    <th className="pb-4 font-semibold text-slate-500 text-xs uppercase tracking-wider text-right">Toplam İlerleme</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                <tr className="group">
                                    <td className="py-5">
                                        <p className="font-bold text-slate-900">Marmara Bölgesi SBTi Hedefi</p>
                                        <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded">SBTi</span>
                                    </td>
                                    <td className="py-5 text-right font-bold text-slate-700">4.20%</td>
                                    <td className="py-5 text-right">
                                        <span className="text-sm font-bold text-emerald-600">%25.20</span>
                                        <div className="w-32 h-1.5 bg-slate-100 rounded-full mt-1 ml-auto overflow-hidden">
                                            <div className="w-[25%] h-full bg-emerald-500"></div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                {[
                    { icon: "🌐", title: "Tesis Bazlı Hedefler", desc: "Her tesis için operasyonel farklılıkları yansıtacak özel hedefler tanımlayın." },
                    { icon: "📈", title: "İlerleme Görünürlüğü", desc: "Zaman çizgelge ve Hedefte / Geride gibi durum etiketleriyle takip edin." },
                    { icon: "✓", title: "Hedeflere Uyum", desc: "Takımlarınızı ölçülebilir hedefler etrafında hizalayın, odaklı aksiyon alın." },
                ].map((item, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                        <div className="text-blue-500 text-xl mb-3">{item.icon}</div>
                        <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                        <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ReductionRecommendationsSection() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                    <h3 className="font-bold text-2xl text-slate-900 mb-2">Azaltım Önerileri</h3>
                    <p className="text-slate-500 text-sm mb-8">AI gücünü kullanarak emisyon verilerinizi danışmana gerek kalmadan stratejilere dönüştürün.</p>

                    <div className="flex gap-2 mb-8 border-b border-slate-100 pb-4">
                        <button className="text-sm font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-xl flex items-center gap-2">✨ Önerilenler</button>
                        <button className="text-sm font-bold text-slate-400 px-4 py-2 hover:bg-slate-50 rounded-xl">Yüksek Etki</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 border border-slate-100 rounded-3xl hover:border-primary/30 transition-all group">
                            <span className="text-xs font-bold text-primary uppercase tracking-widest bg-blue-50 px-2 py-1 rounded">Düşük Zorluk</span>
                            <h4 className="font-bold text-slate-900 mt-4 mb-2">Temiz Yakıta Geçiş</h4>
                            <p className="text-xs text-slate-500 mb-6">Fosil yakıtlı araçların biyoyakıt veya elektrikli araçlarla değiştirilmesi.</p>
                            <div className="flex justify-between items-center text-xs">
                                <span className="font-bold text-emerald-600">~3.6 tCO2e Tasarruf</span>
                                <button className="font-bold text-primary group-hover:underline">Detayları Gör →</button>
                            </div>
                        </div>
                        <div className="p-6 border border-slate-100 rounded-3xl hover:border-indigo-500/30 transition-all group">
                            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2 py-1 rounded">Yüksek Etki</span>
                            <h4 className="font-bold text-slate-900 mt-4 mb-2">Güneş Enerjisi Kurulumu</h4>
                            <p className="text-xs text-slate-500 mb-6">Tesis çatılarına GES kurularak şebeke elektriği kullanımının azaltılması.</p>
                            <div className="flex justify-between items-center text-xs">
                                <span className="font-bold text-indigo-600">~24.5 tCO2e Tasarruf</span>
                                <button className="font-bold text-primary group-hover:underline">Detayları Gör →</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                {[
                    { icon: "⚙️", title: "AI Destekli Stratejiler", desc: "Emisyon kaynaklarınıza ve bağlamınıza özel öneriler alın." },
                    { icon: "📝", title: "Özel Aksiyon Planlama", desc: "Kapsam, CO2e hedefi ve zaman çizelgesiyle kendi aksiyonlarınızı tanımlayın." },
                    { icon: "🤖", title: "Uzmanlığa Dayalı Altyapı", desc: "10+ yıllık danışmanlık bilgisinden beslenin." },
                ].map((item, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                        <div className="text-primary text-xl mb-3">{item.icon}</div>
                        <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                        <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

function RecOffsetSection() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="font-bold text-2xl text-slate-900 mb-2">Emisyon Azaltımı (REC & Offset)</h3>
                            <p className="text-slate-500 text-sm">Ofset ve yenilenebilir enerji sertifikalarınızı tek bir yerden yönetin.</p>
                        </div>
                        <button className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-sm">Sertifika Ekle +</button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left font-sans">
                            <thead>
                                <tr className="border-b border-slate-100">
                                    <th className="pb-4 font-semibold text-slate-500 text-xs uppercase tracking-wider">Tesis</th>
                                    <th className="pb-4 font-semibold text-slate-500 text-xs uppercase tracking-wider">Tür</th>
                                    <th className="pb-4 font-semibold text-slate-500 text-xs uppercase tracking-wider text-right">Miktar (MWh)</th>
                                    <th className="pb-4 font-semibold text-slate-500 text-xs uppercase tracking-wider text-right">Yıl</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                <tr className="group">
                                    <td className="py-5 font-bold text-slate-900">İstanbul Genel Merkez</td>
                                    <td className="py-5">
                                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">I-REC</span>
                                    </td>
                                    <td className="py-5 text-right font-bold text-slate-700">5.00</td>
                                    <td className="py-5 text-right text-slate-400 text-sm">2024</td>
                                </tr>
                                <tr className="group">
                                    <td className="py-5 font-bold text-slate-900">Bursa Fabrika</td>
                                    <td className="py-5">
                                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Green-e</span>
                                    </td>
                                    <td className="py-5 text-right font-bold text-slate-700">50.00</td>
                                    <td className="py-5 text-right text-slate-400 text-sm">2024</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                {[
                    { icon: "📥", title: "Sertifika Yönetimi", desc: "Ofset ve REC sertifikalarınızı merkezi olarak yönetin. Belgeler denetime hazır." },
                    { icon: "🖼️", title: "Etkilerinizi Görselleştirin", desc: "Yıllık ofset katkılarınızı net grafiklerle takip edin." },
                    { icon: "📍", title: "Tesis Bazında Doğruluk", desc: "Sertifikaları tesislerle eşleştirerek daha hassas hesaplamalar yapın." },
                ].map((item, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                        <div className="text-emerald-500 text-xl mb-3">{item.icon}</div>
                        <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                        <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
