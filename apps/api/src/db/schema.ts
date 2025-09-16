import { sql } from "drizzle-orm";
import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";


export const notes = sqliteTable("notes", {
  id: integer().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  content: text().notNull(),
  createdAt: integer({ mode: "timestamp" }).notNull().default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: integer({ mode: "timestamp" }).notNull().default(sql`(CURRENT_TIMESTAMP)`),
})
