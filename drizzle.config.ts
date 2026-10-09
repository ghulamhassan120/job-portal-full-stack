import 'dotenv/config';
import { defineConfig } from "drizzle-kit";

console.log( process.env.DATABASE_URL);

export default defineConfig({
  out: "./src/drizzle/migration",
  schema: "./src/drizzle/schema.ts",
  dialect: "mysql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});