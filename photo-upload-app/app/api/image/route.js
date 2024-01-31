import fs from "fs";
import { join, resolve } from "path";
import pool from "../../../lib/db";
import { v4 as uuidv4 } from "uuid";
import sharp from 'sharp';
import { jsonResponse } from "@utils/apiResponse";

export async function GET(request) {
  const imageId = request.nextUrl.searchParams.get("id");
  const info = request.nextUrl.searchParams.get("info");
  let client;
  try {
      client = await pool.connect();
      if (info && imageId) {
        const result = await client.query(
          "SELECT * FROM images WHERE id = $1",
          [imageId]
        );
        const image = result.rows[0];

        if (!image) {
          return jsonResponse({ message: "Image not found", status: 404 });
        }
        return jsonResponse({ data: result.rows[0], status: 200 });
      } else if (imageId) {
        const queryResult = await client.query(
          "SELECT * FROM images WHERE id = $1",
          [imageId]
        );
        const image = queryResult.rows[0];

        if (!image) {
          return jsonResponse({ message: "Image not found", status: 404 });
        }

        const filePath = resolve("./public/uploads", image.name);

        if (!fs.existsSync(filePath)) {
          return jsonResponse({ message: "File does not exist", status: 404 });
        }

        const fileBuffer = await fs.promises.readFile(filePath);
        const response = new Response(fileBuffer);
        response.headers.set("Content-Type", image.type);
        return response;
      } else {
        const result = await client.query("SELECT * FROM images");
        return jsonResponse({ data: result.rows, status: 200 });
    } 
  } catch (error) {
    console.error("Error:", error);
    return jsonResponse({ message: "Internal Server Error", status: 500 });
  }finally {
    if(client)client.release();
  }
}

export async function POST(req) {
  let client;
  try {
    client = await pool.connect();
      const data = await req.formData();
      const file = data.get("file");
      if (!file) {
        return jsonResponse(
          { message: "No file uploaded", status: 400 }
        );
      }
  
      const validMimeTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      if (!validMimeTypes.includes(file.type)) {
        return jsonResponse(
          { message: "File is not a valid image", status: 400 }
        );
      }
  
      const byteData = await file.arrayBuffer();
      const buffer = Buffer.from(byteData);
  
      const uniqueId = uuidv4();
      const uniqueFileName = uniqueId + "-" + file.name;
  
      const uploadDir = "./public/uploads";
      const filePath = join(uploadDir, uniqueFileName);
  
      fs.writeFileSync(filePath, buffer);
  
      const image = sharp(buffer);
      const metadata = await image.metadata();
      const dimensions = { width: metadata.width, height: metadata.height };
  
      const query = "INSERT INTO images (id, name, path, type, width, height, createdAt, updatedAt) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";
      const now = new Date();
      const values = [uniqueId, uniqueFileName, filePath, file.type, dimensions.width, dimensions.height, now, now];
      await client.query(query, values);
  
      return jsonResponse({
        message: "File uploaded successfully",
        data: {
          name: uniqueFileName,
          id: uniqueId
        },
        status: 200
      });
     
  } catch (error) {
    console.error("Error:", error);
    return jsonResponse({ message: "Internal Server Error", status: 500 });
  }finally {
    if(client)client.release();
  }
}

export async function DELETE(request) {
  const imageId = request.nextUrl.searchParams.get("id");

  if (!imageId) {
    return jsonResponse({ message: "Image ID is required", status: 400 });
  }
  let client;
  try {
    client = await pool.connect();
      const res = await client.query("SELECT * FROM images WHERE id = $1", [
        imageId,
      ]);
      const image = res.rows[0];

      if (!image) {
        return jsonResponse({ message: "Image not found", status: 404 });
      }

      const filePath = resolve("./public/uploads", image.name);
      await fs.promises.unlink(filePath);

      await client.query("DELETE FROM images WHERE id = $1", [imageId]);

      return jsonResponse({
        message: "Image deleted successfully",
        status: 200,
      });
     
  } catch (error) {
    console.error("Error:", error);
    return jsonResponse({ message: "Internal Server Error", status: 500 });
  }finally {
    if(client)client.release();
  }
}