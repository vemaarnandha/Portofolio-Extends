import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const portfolio = sqliteTable("portfolio", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  namaProject: text("nama_project", { length: 255 }).notNull(),
  photoUrl: text("photo_url", { length: 500 }).notNull(),
  jobdesk: text("jobdesk", { length: 255 }).notNull(),
  deskripsi: text("deskripsi").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const adminUsers = sqliteTable("admin_users", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  email: text("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash", { length: 255 }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export type Portfolio = typeof portfolio.$inferSelect;
export type NewPortfolio = typeof portfolio.$inferInsert;
export type AdminUser = typeof adminUsers.$inferSelect;
