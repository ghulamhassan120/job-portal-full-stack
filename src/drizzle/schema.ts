    import {
        int,
        mysqlEnum,
        mysqlTable,
        text,
        timestamp,
        varchar,
    } from "drizzle-orm/mysql-core";

    export const usersTable = mysqlTable("users_table", {
        id: int("id").autoincrement().primaryKey(),
        name: varchar("name", { length: 255 }).notNull(),
        userName: varchar("userName", { length: 255 }).unique().notNull(),
        password: text("password").notNull(),
        email: varchar("email", { length: 255 }).notNull().unique(),
        role:mysqlEnum("role",["admin","applicant","employee"]).default(
            "applicant"
        ),
        phoneNumber: varchar("phoneNumber", { length: 255 }),
        deletedAt: timestamp("deleted_at"),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    });

    export const session = mysqlTable("session", {
        id: varchar("id", { length: 255 }).primaryKey(),
        userId: int("user_id")
            .notNull()
            .references(() => usersTable.id, { onDelete: "cascade" }),
        userAgent: text("user_agent").notNull(),
        ip: varchar("ip", { length: 255 }).notNull(),
        expiresAt: timestamp("expires_at").notNull(),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
    });
