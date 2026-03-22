import pg from "pg";

const DATABASE_URL = process.env.DATABASE_URL;

const usesPlaceholderUsername = DATABASE_URL
  ? /:\/\/username(?::[^@]*)?@/.test(DATABASE_URL)
  : false;

const databaseConfig =
  DATABASE_URL && !usesPlaceholderUsername
    ? DATABASE_URL
    : {
        database: "fullstack_employees",
        host: process.env.PGHOST ?? "/tmp",
        port: Number(process.env.PGPORT ?? 5432),
        user: process.env.PGUSER ?? process.env.USER,
      };

const db = new pg.Client(databaseConfig);

export default db;
