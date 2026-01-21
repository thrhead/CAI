# GreenLedger TR - Karbon Ayak İzi Yönetim Platformu

[Turkish section below / Türkçe bölümü aşağıdadır]

## English

GreenLedger TR is a comprehensive B2B SaaS platform designed to help Turkish SMEs and industrial facilities calculate their carbon footprint without requiring deep technical knowledge. It ensures compliance with the Turkish Climate Law and EU CBAM (Carbon Border Adjustment Mechanism) regulations.

### 🌟 Vision
To enable businesses to perform carbon calculations easily and generate audit-ready reports (ISO 14064) and EU-compliant XML exports for seamless international trade.

### 🚀 Key Features
- **Data Input Wizard:** Step-by-step guidance for entering energy, fuel, and raw material data.
- **Calculation Engine:** Robust algorithms using IPCC, DEFRA, and Turkish Grid emission factors.
- **Advanced Reporting:**
    - ISO 14064-1 compliant PDF reports.
    - CBAM (SKDM) XML exports for EU customs.
- **Dynamic Dashboard:** Real-time visualization of Scope 1 & 2 emissions, including intuitive metrics like "Tree Equivalence".
- **Multi-Tenant Architecture:** Secure data isolation using a multi-database approach via Prisma 6.

### 🏗️ Technical Stack
- **Framework:** Next.js 15 (App Router)
- **Database:** PostgreSQL (Multi-tenant isolation)
- **ORM:** Prisma
- **Styling:** Tailwind CSS v4 & Shadcn/UI
- **Auth:** NextAuth.js v5

### 📖 Documentation
- [ADR 001: Multi-DB Strategy](./docs/adr/001-multi-db-strategy.md)
- [.agent/](./.agent/): AI Operational rules and specialized instructions.

---

## Türkçe

GreenLedger TR, Türkiye'deki KOBİ'lerin ve sanayi kuruluşlarının, teknik bilgiye ihtiyaç duymadan karbon ayak izi hesaplamalarını yapabilmelerini sağlayan kapsamlı bir B2B SaaS platformudur. İklim Kanunu ve AB SKDM (CBAM) uyumluluğu için tasarlanmıştır.

### 🌟 Vizyon
İşletmelerin karbon hesaplamalarını kolayca yapmalarını, denetime hazır raporlar (ISO 14064) ve AB uyumlu XML çıktıları oluşturarak uluslararası ticarette rekabet avantajı kazanmalarını sağlamak.

### 🚀 Temel Özellikler
- **Veri Giriş Sihirbazı:** Elektrik, doğalgaz ve yakıt verileri için adım adım yönlendirme.
- **Hesaplama Motoru:** IPCC, DEFRA ve Türkiye Şebeke Elektriği emisyon faktörlerini kullanan gelişmiş algoritmalar.
- **Gelişmiş Raporlama:**
    - ISO 14064-1 standartlarına uygun PDF raporları.
    - AB gümrük sistemleri için SKDM (CBAM) XML çıktıları.
- **Dinamik Dashboard:** Kapsam 1 ve 2 emisyonlarının anlık takibi ve "Ağaç Eşdeğeri" gibi anlaşılır metrikler.
- **Çoklu Kiracı (Multi-Tenant) Mimarisi:** Prisma 6 ile her organizasyon için teknik veritabanı izolasyonu.

### 🏗️ Teknik Yığın
- **Framework:** Next.js 15 (App Router)
- **Veritabanı:** PostgreSQL (Multi-tenant izolasyon)
- **ORM:** Prisma
- **Tasarım:** Tailwind CSS v4 & Shadcn/UI
- **Kimlik Doğrulama:** NextAuth.js v5

### 📖 Dökümantasyon
- [ADR 001: Multi-DB Stratejisi](./docs/adr/001-multi-db-strategy.md)
- [.agent/](./.agent/): Yapay zeka operasyon kuralları ve uzmanlaşmış talimatlar.

---

## License
MIT
