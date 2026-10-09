// import mysql2 from 'mysql2/promise'
import { drizzle } from "drizzle-orm/mysql2";

export const db = drizzle({
  connection: {
    uri: process.env.DATABASE_URL!,
  },
});
