"use client";

import React, { useState } from "react";
import { emissionFactors, getFactorById } from "../emission-factors";
import { calculateEmissions } from "../calculation-engine";

export function EmissionWizard() {
    const [step, setStep] = useState(1);
    const [mode, setMode] = useState<"manual" | "excel">("manual");
    const [selectedFactorId, setSelectedFactorId] = useState("");
    const [amount, setAmount] = useState(0);
    const [result, setResult] = useState<any>(null);

    const handleNext = () => {
        if (step === 1 && selectedFactorId) setStep(2);
        if (step === 2 && amount > 0) {
            const calc = calculateEmissions(selectedFactorId, amount);
            setResult(calc);
            setStep(3);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white dark:bg-zinc-900 shadow-xl rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Karbon Veri Girişi</h2>
                    <p className="text-zinc-500 text-sm mt-1">
                        {mode === "manual" ? `Adım ${step} / 3` : "Excel Toplu Yükleme"}
                    </p>
                </div>
                <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg">
                    <button
                        onClick={() => { setMode("manual"); setStep(1); }}
                        className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${mode === "manual" ? "bg-white dark:bg-zinc-700 shadow-sm" : "text-zinc-500"}`}
                    >
                        Manuel
                    </button>
                    <button
                        onClick={() => setMode("excel")}
                        className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${mode === "excel" ? "bg-white dark:bg-zinc-700 shadow-sm" : "text-zinc-500"}`}
                    >
                        Excel
                    </button>
                </div>
            </div>

            {mode === "excel" ? (
                <div className="space-y-6">
                    <div className="border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 text-center hover:border-emerald-500 transition-colors cursor-pointer">
                        <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950/30 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                        <p className="font-semibold text-zinc-900 dark:text-zinc-50">Dosya Yükle</p>
                        <p className="text-xs text-zinc-500 mt-1">.xlsx veya .csv formatında (Maks 10MB)</p>
                    </div>
                    <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl">
                        <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Örnek Format</p>
                        <div className="text-[10px] text-zinc-500 flex justify-between border-b dark:border-zinc-800 pb-1 mb-1">
                            <span>Facility</span>
                            <span>FactorId</span>
                            <span>Amount</span>
                        </div>
                        <div className="text-[10px] text-zinc-400 flex justify-between">
                            <span>Bursa-Fabrika</span>
                            <span>elec-tr-2024</span>
                            <span>1500</span>
                        </div>
                    </div>
                    <button className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-all">
                        Verileri İçe Aktar
                    </button>
                </div>
            ) : (
                <>
                    {step === 1 && (
                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                Emisyon Türü Seçin
                            </label>
                            <select
                                className="w-full p-3 bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
                                value={selectedFactorId}
                                onChange={(e) => setSelectedFactorId(e.target.value)}
                            >
                                <option value="">Seçiniz...</option>
                                {emissionFactors.map((f) => (
                                    <option key={f.id} value={f.id}>
                                        {f.name} ({f.category})
                                    </option>
                                ))}
                            </select>
                            <button
                                disabled={!selectedFactorId}
                                onClick={handleNext}
                                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50"
                            >
                                İlerle
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                Miktarı Girin ({getFactorById(selectedFactorId)?.unit})
                            </label>
                            <input
                                type="number"
                                className="w-full p-3 bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
                                value={amount}
                                onChange={(e) => setAmount(Number(e.target.value))}
                            />
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setStep(1)}
                                    className="flex-1 py-3 bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 font-semibold rounded-lg hover:bg-zinc-300"
                                >
                                    Geri
                                </button>
                                <button
                                    disabled={amount <= 0}
                                    onClick={handleNext}
                                    className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-all"
                                >
                                    Hesapla
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 3 && result && (
                        <div className="space-y-6 text-center">
                            <div className="p-6 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-800 rounded-xl">
                                <p className="text-emerald-700 dark:text-emerald-400 text-sm font-medium">Toplam Emisyon</p>
                                <p className="text-4xl font-black text-emerald-600 mt-2">
                                    {result.tCO2e.toFixed(4)} <span className="text-lg">tCO2e</span>
                                </p>
                            </div>
                            <div className="text-left text-sm space-y-2 text-zinc-600 dark:text-zinc-400">
                                <p><strong>Faktör:</strong> {result.factor.name}</p>
                                <p><strong>Kaynak:</strong> {result.factor.source}</p>
                            </div>
                            <button
                                onClick={() => { setStep(1); setSelectedFactorId(""); setAmount(0); }}
                                className="w-full py-3 border border-emerald-600 text-emerald-600 font-semibold rounded-lg hover:bg-emerald-50 transition-all"
                            >
                                Yeni Kayıt
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
