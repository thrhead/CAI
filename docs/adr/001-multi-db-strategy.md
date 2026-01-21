# ADR 001: Multi-Database Multi-Tenancy Strategy

## Context
User requires strict data isolation where each organization (tenant) has its own separate database.

## Options
1. **Direct Connection Switching:** Dynamically create Prisma clients based on tenant connection strings.
2. **Schema-based Isolation:** Use a single database with multiple schemas (PostgreSQL search_path).
3. **Middleware-based Proxy:** A separate service that routes requests to the correct DB.

## Decision
We will go with **Direct Connection Switching (Option 1)** for the highest level of isolation.

## Implementation Details
- **Central DB:** Stores `Organization` metadata and their corresponding `connectionString`.
- **Tenant Client Factory:** A utility that caches and returns a Prisma client for a specific connection string.
- **Middleware:** Extracts `orgId` from the URL path (`/[orgId]/...`) and attaches the correct client to the request context.

## Consequences
- **Pros:** Maximum isolation, easy to migrate/delete individual tenants.
- **Cons:** Connection pooling overhead, management complexity of many databases, Prisma schema sync required across all DBs.
