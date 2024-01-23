import { NextResponse } from "next/server";
import fs from "fs";
import { join } from "path";
import pool from "../../../lib/db";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req) {
  try {
    const data = await req.formData();
    const file = data.get("file");
    if (!file) {
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 }
      );
    }

    const validMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validMimeTypes.includes(file.type)) {
      return NextResponse.json(
        { message: "File is not a valid image" },
        { status: 400 }
      );
    }
    
    const byteData = await file.arrayBuffer();
    const buffer = Buffer.from(byteData);

    const uniqueFileName =  uuidv4() + "-" + file.name;
    
    const uploadDir = "./public/uploads";
    const filePath = join(uploadDir, uniqueFileName);

    // Save the file
    fs.writeFileSync(filePath, buffer);

    const query = 'INSERT INTO images (name, path, type) VALUES ($1, $2, $3)';
    const values = [uniqueFileName, filePath, file.type];
    await pool.query(query, values);

    return NextResponse.json(
      { message: "File uploaded successfully", name: uniqueFileName, status: 200 },
    );
  } catch (error) {
    console.error("Error saving file:", error);
    return NextResponse.json({ message: "Error saving file", status: 500 });
  }
}