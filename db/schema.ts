import {sql} from "drizzle-orm";
import {index,integer,sqliteTable,text} from "drizzle-orm/sqlite-core";
export const progress=sqliteTable("progress",{userId:text("user_id").primaryKey(),email:text("email").notNull(),displayName:text("display_name").notNull(),state:text("state").notNull().default("{}"),updatedAt:text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`)});
export const admins=sqliteTable("admins",{userId:text("user_id").primaryKey(),email:text("email").notNull(),createdAt:text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`)});
export const usageSessions=sqliteTable("usage_sessions",{
  sessionId:text("session_id").primaryKey(),
  userId:text("user_id").notNull(),
  email:text("email").notNull(),
  displayName:text("display_name").notNull(),
  loginAt:text("login_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  lastSeenAt:text("last_seen_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  activeSeconds:integer("active_seconds").notNull().default(0),
},table=>[index("idx_usage_user").on(table.userId),index("idx_usage_login").on(table.loginAt)]);

