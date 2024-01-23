import { NextResponse } from 'next/server';
import pool from '../../../lib/db'; // Adjust the path as necessary

export async function GET() {
  try {
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * FROM images');
      return NextResponse.json(result.rows);
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Error fetching data from database:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}