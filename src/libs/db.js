
import "server-only";
import { Pool } from "pg";

const globalForPg = globalThis;

export const pool =
    globalForPg.pgPool ??
    new Pool({
        connectionString: process.env.DATABASE_URL,
    });

if (process.env.NODE_ENV !== "production") {
    globalForPg.pgPool = pool;
}