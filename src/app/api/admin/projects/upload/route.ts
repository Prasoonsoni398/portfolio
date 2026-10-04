import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  // Expect multipart/form-data with a file field named 'image'
  const formData = await request.formData();
  const file: File | null = formData.get("image") as any;
  if (!file) {
    return NextResponse.json({ error: "No image file provided" }, { status: 400 });
  }
  // Validate file type (basic check)
  const allowed = ["image/png", "image/jpeg", "image/svg+xml", "image/webp"];
  if (!allowed.includes(file.type)) {
    return NextResponse.json({ error: "Unsupported file type" }, { status: 415 });
  }
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  // Generate unique filename
  const ext = path.extname(file.name) || ".png";
  const filename = `${uuidv4()}${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "images", "projects");
  await fs.mkdir(uploadDir, { recursive: true });
  const filePath = path.join(uploadDir, filename);
  await fs.writeFile(filePath, buffer);
  // Return the public URL path
  const publicPath = `/images/projects/${filename}`;
  return NextResponse.json({ success: true, path: publicPath });
}
