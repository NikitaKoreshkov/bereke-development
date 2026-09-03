import { readFileSync } from 'fs';
import { join } from 'path';
import { Pool } from 'pg';
import { buildDefaultContent } from '../lib/default-content';

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL is not set. Copy .env.example to .env');
  }

  const pool = new Pool({ connectionString });
  const schema = readFileSync(join(process.cwd(), 'db/schema.sql'), 'utf8');
  await pool.query(schema);

  const data = buildDefaultContent();
  await pool.query(
    `INSERT INTO site_content (id, data, updated_at)
     VALUES ('main', $1::jsonb, NOW())
     ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()`,
    [JSON.stringify(data)],
  );

  console.log('PostgreSQL ready: schema + seed OK');
  await pool.end();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
