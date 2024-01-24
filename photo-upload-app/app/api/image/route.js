import { NextResponse } from "next/server";
import fs from "fs";
import { join, resolve } from "path";
import pool from "../../../lib/db";
import { v4 as uuidv4 } from "uuid";
import path from "path";


export async function GET(request) {
    const imageName = request.nextUrl.searchParams.get("name");
  
    try {
      const client = await pool.connect();
      try {
        if (imageName) {
            const queryResult = await client.query('SELECT * FROM images WHERE name = $1', [imageName]);
            const image = queryResult.rows[0];
      
            if (!image) {
              return new Response('Image not found', { status: 404 });
            }
      
            const filePath = resolve('./public/uploads', image.name);
            
            // Ensure the file exists
            if (!fs.existsSync(filePath)) {
              return new Response('File does not exist', { status: 404 });
            }
      
            const fileBuffer = await fs.promises.readFile(filePath);
            const response = new Response(fileBuffer);
            response.headers.set('Content-Type', image.type);
            return response;
        } else {
          // Logic to return all images
          const result = await client.query("SELECT * FROM images");
          return NextResponse.json(result.rows);
        }
      } finally {
        client.release();
      }
    } catch (error) {
      console.error("Error:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  }

// ____________________

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

    const validMimeTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    if (!validMimeTypes.includes(file.type)) {
      return NextResponse.json(
        { message: "File is not a valid image" },
        { status: 400 }
      );
    }

    const byteData = await file.arrayBuffer();
    const buffer = Buffer.from(byteData);

    const uniqueFileName = uuidv4() + "-" + file.name;

    const uploadDir = "./public/uploads";
    const filePath = join(uploadDir, uniqueFileName);

    // Save the file
    fs.writeFileSync(filePath, buffer);

    const query = "INSERT INTO images (name, path, type) VALUES ($1, $2, $3)";
    const values = [uniqueFileName, filePath, file.type];
    await pool.query(query, values);

    return NextResponse.json({
      message: "File uploaded successfully",
      name: uniqueFileName,
      status: 200,
    });
  } catch (error) {
    console.error("Error saving file:", error);
    return NextResponse.json({ message: "Error saving file", status: 500 });
  }
}

// ____________________

export async function DELETE(request) {
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
        return NextResponse.json({ message: "Image not found", status: 404 });
      }

      await client.query("DELETE FROM images WHERE name = $1", [imageName]);
      const filePath = resolve("./public/uploads", image.name); // Construct file path
      await fs.promises.unlink(filePath);

      return NextResponse.json({
        message: "Image deleted successfully",
        status: 200,
      });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Internal Server Error", status: 500 });
  }
}