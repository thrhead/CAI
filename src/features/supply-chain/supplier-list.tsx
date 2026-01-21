"use client";

import { useState } from "react";
import { formatCarbon } from "@/shared/utils/utils";

interface Supplier {
    id: string;
    name: string;
    category: string;
    status: "Verified" | "Pending" | "Unresponsive";
    lastEmission: number;
}

export function SupplierList() {
    const [suppliers] = useState<Supplier[]>([
        { id: "1", name: "Lojistik A.Ş.", category: "Taşımacılık", status: "Verified", lastEmission: 125.40 },
        { id: "2", name: "Enerji Çözümleri", category: "Elektrik", status: "Verified", lastEmission: 450.20 },
        { id: "3", name: "Hammadde Ltd.", category: "Satın Alınan Ürünler", status: "Pending", lastEmission: 0 },
    ]);

    return (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h3 className="font-bold text-2xl text-slate-900">Tedarik Zinciri (Kapsam 3)</h3>
                    <p className="text-slate-500 text-sm mt-1">Tedarikçilerinizin karbon performansını izleyin.</p>
                </div>
                <button className="bg-primary text-white px-6 py-2.5 rounded-2xl font-bold text-sm hover:opacity-90 transition-opacity">
                    Tedarikçi Davet Et +
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {suppliers.map(supplier => (
                    <div key={supplier.id} className="p-6 rounded-2xl border border-slate-100 hover:border-primary/20 transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md ${supplier.status === 'Verified' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'
                                }`}>
                                {supplier.status}
                            </span>
                            <span className="text-primary font-bold">{formatCarbon(supplier.lastEmission)}</span>
                        </div>
                        <h4 className="font-bold text-slate-900 group-hover:text-primary transition-colors">{supplier.name}</h4>
                        <p className="text-xs text-slate-400 mt-1">{supplier.category}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
