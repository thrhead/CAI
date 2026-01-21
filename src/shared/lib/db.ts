import { PrismaClient as CentralClient } from "../../../prisma/generated/central-client";
import { PrismaClient as TenantClient } from "../../../prisma/generated/tenant-client";

export const centralDb = new CentralClient();

const tenantClients: Record<string, TenantClient> = {};

export function getTenantDb(connectionString: string) {
    if (!tenantClients[connectionString]) {
        tenantClients[connectionString] = new TenantClient({
            datasources: {
                db: {
                    url: connectionString,
                },
            },
        });
    }
    return tenantClients[connectionString];
}
