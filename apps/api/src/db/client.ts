import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client/sqlite3';


const sqlite = createClient({ url: "file:./data.db" });
export const db = drizzle({ client: sqlite });


