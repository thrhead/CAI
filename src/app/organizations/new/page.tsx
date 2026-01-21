"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewOrganizationPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setName(val);
        // Otomatik slug oluşturma (basit versiyon)
        setSlug(val.toLowerCase().replace(/ /g, "-").replace(/[^\w-]/g, ""));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // Not: Bu kısım gerçek bir API call gerektirir. 
            // Şimdilik client-side simülasyon veya server action eklenebilir.
            const response = await fetch("/api/organizations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, slug }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Organizasyon oluşturulamadı.");
            }

            const data = await response.json();
            router.push(`/${data.slug}`);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-slate-200 border border-slate-100 p-8">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-slate-900">Yeni Organizasyon</h1>
                    <p className="text-slate-500 mt-2">Şirketiniz veya tesisiniz için bir çalışma alanı oluşturun.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Organizasyon Adı</label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={handleNameChange}
                            placeholder="Örn: GreenLedger Lojistik A.Ş."
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">URL Uzantısı (Slug)</label>
                        <div className="relative">
                            <span className="absolute left-4 top-3 text-slate-400">cai.com/</span>
                            <input
                                type="text"
                                required
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                className="w-full pl-[4.5rem] pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all font-mono text-sm"
                            />
                        </div>
                        <p className="text-xs text-slate-400 mt-2">Bu, dashboard adresiniz olacaktır.</p>
                    </div>

                    {error && (
                        <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-bold rounded-xl shadow-lg shadow-emerald-100 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                        {loading ? "Oluşturuluyor..." : "Organizasyonu Oluştur"}
                    </button>
                </form>
            </div>
        </div>
    );
}
