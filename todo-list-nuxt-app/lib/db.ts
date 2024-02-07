import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

interface Options {
  query: string;
  values?: any[];
}

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD
});

export const sql = async (options: Options) => {
  const [rows] = await pool.query(options.query, options.values);
  return rows;
};