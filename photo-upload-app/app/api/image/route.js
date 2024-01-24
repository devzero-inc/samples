import { NextResponse } from "next/server";
import fs from "fs";
import { join, resolve } from "path";
import pool from "../../../lib/db";
import { v4 as uuidv4 } from "uuid";
import sharp from 'sharp';

export async function GET(request) {
  const imageId = request.nextUrl.searchParams.get("id");
  const info = request.nextUrl.searchParams.get("info");

  try {
    const client = await pool.connect();
    console.log(client);
    try {
      if (info && imageId) {
        const result = await client.query(
          "SELECT * FROM images WHERE id = $1",
          [imageId]
        );
        const image = result.rows[0];

        if (!image) {
            return NextResponse.json({ message: "Image not found", status: 404 });
        }
        return NextResponse.json({ data: result.rows[0], status: 200 });
      } else if (imageId) {
        const queryResult = await client.query(
          "SELECT * FROM images WHERE id = $1",
          [imageId]
        );
        const image = queryResult.rows[0];

        if (!image) {
            return NextResponse.json({ message: "Image not found", status: 404 });
        }

        const filePath = resolve("./public/uploads", image.name);

        if (!fs.existsSync(filePath)) {
            return NextResponse.json({ message: "File does not exist", status: 404 });
        }

        const fileBuffer = await fs.promises.readFile(filePath);
        const response = new Response(fileBuffer);
        response.headers.set("Content-Type", image.type);
        return response;
      } else {
        // Logic to return all images
        const result = await client.query("SELECT * FROM images");
        return NextResponse.json({ data: result.rows, status: 200 });
      }
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Internal Server Error", status: 500 });
  }
}

// ____________________

export async function POST(req) {
  try {
    const data = await req.formData();
    const file = data.get("file");
    if (!file) {
      return NextResponse.json(
        { message: "No file uploaded" , status: 400 }
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
        { message: "File is not a valid image", status: 400 }
      );
    }

    const byteData = await file.arrayBuffer();
    const buffer = Buffer.from(byteData);

    const uniqueId = uuidv4();
    const uniqueFileName = uniqueId + "-" + file.name;

    const uploadDir = "./public/uploads";
    const filePath = join(uploadDir, uniqueFileName);

    // Save the file
    fs.writeFileSync(filePath, buffer);

    const image = sharp(buffer);
    const metadata = await image.metadata();
    const dimensions = { width: metadata.width, height: metadata.height };

    const query = "INSERT INTO images (id, name, path, type, width, height, createdAt, updatedAt) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";
    const now = new Date();
    const values = [uniqueId, uniqueFileName, filePath, file.type, dimensions.width, dimensions.height, now, now];
    await pool.query(query, values);

    return NextResponse.json({
        message: "File uploaded successfully",
        data: {
          name: uniqueFileName,
          id: uniqueId
        },
        status: 200
      });
  } catch (error) {
    console.error("Error saving file:", error);
    return NextResponse.json({ message: "Error saving file", status: 500 });
  }
}

// ____________________

export async function DELETE(request) {
  const imageId = request.nextUrl.searchParams.get("id");

  if (!imageId) {
    return NextResponse.json({ message: "Image ID is required", status: 400 });
  }

  try {
    const client = await pool.connect();
    try {
      const res = await client.query("SELECT * FROM images WHERE id = $1", [
        imageId,
      ]);
      const image = res.rows[0];

      if (!image) {
        return NextResponse.json({ message: "Image not found", status: 404 });
      }

      const filePath = resolve("./public/uploads", image.name); // Use the path from the database
      await fs.promises.unlink(filePath);

      await client.query("DELETE FROM images WHERE id = $1", [imageId]);

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