import { Pool, type QueryResultRow } from 'pg';

const globalForPg = globalThis as unknown as { pgPool?: Pool };

function createPool() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL is not set');
  }
  return new Pool({ connectionString });
}

export const pool = globalForPg.pgPool ?? createPool();

if (process.env.NODE_ENV !== 'production') {
  globalForPg.pgPool = pool;
}

export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: unknown[],
) {
  return pool.query<T>(text, params);
}
