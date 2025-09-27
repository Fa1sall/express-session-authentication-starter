import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

/**
 * -------------- DATABASE ----------------
 *
 * Example .env:
 * DB_STRING=postgresql://user:password@localhost:5432/mydb
 */

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DB_STRING,
});

export default pool;
