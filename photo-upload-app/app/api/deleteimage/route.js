import fs from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";
import pool from "../../../lib/db";

export async function POST(request) {
  const imageName = request.nextUrl.searchParams.get("name");

  if (!imageName) {
    return new Response("Image name is required", { status: 400 });
  }

  try {
    const client = await pool.connect();
    try {
      const res = await client.query("SELECT * FROM images WHERE name = $1", [
        imageName,
      ]);
      const image = res.rows[0];

      if (!image) {
        return NextResponse.json(
          { message: "Image not found", status: 404 },
        );
      }

      await client.query("DELETE FROM images WHERE name = $1", [imageName]);
      const filePath = path.resolve("./public/uploads", image.name); // Construct file path
      await fs.unlink(filePath);

      return NextResponse.json(
        { message: "Image deleted successfully", status: 200 },
      );
    
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", status: 500 },
    );
  }
}