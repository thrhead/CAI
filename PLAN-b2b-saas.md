# PLAN-b2b-saas: B2B SaaS Platform (Team-Based)

## 📋 Overview
A scalable B2B SaaS application featuring team-based multi-tenancy, granular RBAC permissions, and a hybrid UI capable of handling both data-dense dashboards and complex operational workflows.

**Project Type:** WEB (Next.js)
**Architecture:** Features-based Modular Monolith

---

## 🎯 Success Criteria
- [ ] Users can create and switch between Organizations (Teams).
- [ ] RBAC enforces permissions (Owner vs Viewer) on API and UI.
- [ ] Data tables support filtering/sorting for large datasets.
- [ ] Complex forms handle multi-step operations efficiently.
- [ ] Security audit passes with no critical issues.

---

## 🛠️ Tech Stack
| Component | Choice | Rationale |
|-----------|--------|-----------|
| **Framework** | Next.js 15 (App Router) | Standard for React apps, Server Components efficiency. |
| **Language** | TypeScript | Type safety for complex business logic. |
| **Styling** | Tailwind CSS v4 | Performance, design system integration. |
| **UI Library** | shadcn/ui | Accessible, customizable components. |
| **Database** | PostgreSQL | Relational integrity for multi-tenant data. |
| **ORM** | Prisma | Type-safe database access and migrations. |
| **Auth** | NextAuth.js (v5) | Flexible auth with custom organization support. |
| **State** | React Query + URL State | Server state management and shareable UI state. |
| **Tables** | TanStack Table | Headless control for complex data grids. |

---

## 📂 File Structure (Feature-Based)
```
src/
├── app/                        # Routes (Thin layer)
│   ├── (auth)/                 # Login, Register
│   ├── (dashboard)/            # App Layout (Sidebar, Header)
│   │   ├── [orgId]/            # Tenant context
│   │   │   ├── dashboard/
│   │   │   ├── settings/
│   │   │   └── users/
│   └── api/
├── features/                   # Business Logic Modules
│   ├── auth/                   # Authentication logic
│   ├── organization/           # Team management, switching
│   ├── rbac/                   # Permission guards, roles
│   ├── data-view/              # Reusable table components
│   └── operations/             # Wizards, complex forms
├── shared/                     # Global Utilities
│   ├── components/ui/          # shadcn primitives
│   ├── db/                     # Prisma client
│   └── lib/                    # Utils
└── prisma/
    └── schema.prisma           # DB Schema
```

---

## 📝 Task Breakdown

### 🟢 Phase 1: Foundation & Infrastructure (P0)
- [ ] **Task 1.1: Scaffolding**
  - Run `create-next-app`, install `prisma`, `zod`, `shadcn-ui`.
  - **Verify:** `npm run dev` loads default page.
- [ ] **Task 1.2: Database Schema (Multi-Tenant)**
  - Define `User`, `Organization`, `Member` (join table with role), `Role` models.
  - **Verify:** `npx prisma db push` creates tables successfully.
- [ ] **Task 1.3: Authentication Setup**
  - Configure NextAuth v5 with credentials/OAuth.
  - **Verify:** Can sign up and sign in, session contains `userId`.

### 🟡 Phase 2: Core SaaS Logic (P1)
- [ ] **Task 2.1: Organization Management**
  - Create "Create Org" and "Switch Org" logic.
  - **Verify:** User can create an org and it appears in their list.
- [ ] **Task 2.2: RBAC Middleware**
  - Implement `withPermission` utility and API guards.
  - **Verify:** 'Viewer' role cannot access 'Settings' API endpoint (403).
- [ ] **Task 2.3: Dashboard Layout**
  - Build App Shell with Sidebar (Org switcher, Nav).
  - **Verify:** Sidebar shows active Org name.

### 🔵 Phase 3: Hybrid UI Implementation (P2)
- [ ] **Task 3.1: Data Table System**
  - Create reusable `DataTable` component (pagination, sort, filter) using TanStack Table.
  - **Verify:** Can render a dummy list of 100 users with sorting.
- [ ] **Task 3.2: Operations Wizard**
  - Build a multi-step form prototype (e.g., "Add New Project").
  - **Verify:** Data persists between steps and submits correctly.

### 🟣 Phase 4: Polish & Production (P3)
- [ ] **Task 4.1: Error Handling**
  - Add global Error Boundary and Toast notifications.
  - **Verify:** Triggering an error shows a user-friendly toast.
- [ ] **Task 4.2: Performance Audit**
  - Run `lighthouse_audit.py`.
  - **Verify:** Performance score > 90.

---

## ❌ Phase X: Final Verification
*Run these commands before marking project complete:*

- [ ] **Lint & Type Check:** `npm run lint && npx tsc --noEmit`
- [ ] **Security Scan:** `python ~/.claude/skills/vulnerability-scanner/scripts/security_scan.py .`
- [ ] **UX Audit:** `python ~/.claude/skills/frontend-design/scripts/ux_audit.py src/app`
- [ ] **Build Check:** `npm run build`

## 📅 Status
- **Current Phase:** PLANNING
- **Next Step:** User Approval
