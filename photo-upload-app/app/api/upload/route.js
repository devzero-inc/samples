import { NextResponse } from "next/server";
import fs from "fs";
import { join } from "path";

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
    
    const byteData = await file.arrayBuffer();
    const buffer = Buffer.from(byteData);

    const uploadDir = "./public/uploads"; // Ensure this directory exists
    const filePath = join(uploadDir, file.name);

    // Save the file
    fs.writeFileSync(filePath, buffer);
    return NextResponse.json(
      { message: "File uploaded successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving file:", error);
    return NextResponse.json({ message: "Error saving file" }, { status: 500 });
  }
}
