import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const imagesDir = path.join(process.cwd(), "public", "images", "o-nas");
    const files = fs.readdirSync(imagesDir);

    const imageFiles = files
      .filter((file) => /\.(png|jpg|jpeg|gif|webp)$/i.test(file))
      .sort()
      .map((file) => `/images/o-nas/${file}`);

    const response = NextResponse.json({ images: imageFiles });
    // Cache for 24 hours
    response.headers.set(
      "Cache-Control",
      "public, max-age=86400, stale-while-revalidate=604800",
    );
    return response;
  } catch (error) {
    console.error("Error reading images directory:", error);
    return NextResponse.json({ images: [] }, { status: 500 });
  }
}
