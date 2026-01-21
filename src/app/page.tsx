import Image from "next/image";
import { EmissionWizard } from "@/features/emissions/components/EmissionWizard";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 sm:p-20 font-sans">
      <header className="w-full max-w-4xl flex items-center justify-between mb-12">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-black">G</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">GreenLedger TR</h1>
        </div>
        <nav className="flex gap-6 text-sm font-medium text-zinc-500">
          <a href="#" className="hover:text-emerald-600">Hesapla</a>
          <a href="#" className="hover:text-emerald-600">Raporlar</a>
          <a href="#" className="hover:text-emerald-600">Hakkında</a>
        </nav>
      </header>

      <main className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight text-zinc-900 dark:text-zinc-50">
            Karbon Ayak İzinizi <span className="text-emerald-600 underline decoration-emerald-200">Saniyeler</span> İçinde Hesaplayın.
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            KOBİ'ler için basitleştirilmiş veri girişi, anlık emisyon sonuçları ve ISO 14064-1 uyumlu raporlama.
          </p>
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 font-bold rounded-xl shadow-lg hover:opacity-90 transition-all">
              Hemen Başlayın
            </button>
            <button className="px-6 py-3 border border-zinc-200 dark:border-zinc-800 font-bold rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all">
              Demo İzle
            </button>
          </div>

          <div className="pt-8 flex items-center gap-4 text-xs font-semibold text-zinc-400 uppercase tracking-widest">
            <span>Uyumlu:</span>
            <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-900 rounded">ISO 14064</span>
            <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-900 rounded">AB SKDM (CBAM)</span>
          </div>
        </div>

        <div>
          <EmissionWizard />
        </div>
      </main>

      <footer className="w-full max-w-4xl mt-24 pt-8 border-t border-zinc-200 dark:border-zinc-800 text-sm text-zinc-500 flex justify-between">
        <p>© 2026 GreenLedger TR. Tüm hakları saklıdır.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:underline">Gizlilik</a>
          <a href="#" className="hover:underline">Kullanım Şartları</a>
        </div>
      </footer>
    </div>
  );
}
