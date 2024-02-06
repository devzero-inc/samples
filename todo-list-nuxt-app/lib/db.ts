import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

interface Options {
  query: string;
  values?: any[];
}

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'todo_list',
  password: process.env.DB_PASSWORD
});

export const sql = async (options: Options) => {
  const [rows] = await pool.query(options.query, options.values);
  return rows;
};