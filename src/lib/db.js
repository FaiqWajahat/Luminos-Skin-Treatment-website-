import { neon, Pool } from "@neondatabase/serverless";

/**
 * Neon Serverless SQL Client
 * Use `sql` tagged template or function for fast, single-roundtrip queries.
 * Example:
 *   const users = await sql`SELECT * FROM users WHERE email = ${email}`;
 */
export const sql = process.env.DATABASE_URL
  ? neon(process.env.DATABASE_URL)
  : () => {
      console.warn("DATABASE_URL is not defined in environment variables.");
      return [];
    };

/**
 * Optional Connection Pool
 * Useful for transactions and multi-statement queries.
 */
let pool;
export function getDbPool() {
  if (!pool && process.env.DATABASE_URL) {
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
  }
  return pool;
}
