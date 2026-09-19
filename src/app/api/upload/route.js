import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const mime = file.type || "image/jpeg";
    const base64Fallback = `data:${mime};base64,${buffer.toString("base64")}`;

    // If Cloudinary credentials are not configured
    if (!process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME === "your_cloud_name") {
      return NextResponse.json(
        { error: "Cloudinary credentials (CLOUDINARY_CLOUD_NAME) are not configured in .env.local." },
        { status: 500 }
      );
    }

    try {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "luminous_clinic",
            resource_type: "image",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(buffer);
      });

      return NextResponse.json({
        success: true,
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
        format: uploadResult.format,
      });
    } catch (cloudErr) {
      console.error("Cloudinary upload failed:", cloudErr.message || cloudErr);

      let errorMessage = cloudErr.message || "Failed to upload to Cloudinary";
      if (cloudErr.http_code === 403 || String(cloudErr.message || "").includes("permissions")) {
        errorMessage = `Cloudinary 403 Permission Error: ${cloudErr.message}. Your API Key in Cloudinary lacks 'create' (Upload) permissions. In Cloudinary Console -> Settings -> Access Keys, ensure 'Create / Full Access' is enabled or use the Master API Key.`;
      }

      return NextResponse.json(
        {
          error: errorMessage,
          cloudinaryError: cloudErr.message || String(cloudErr),
          httpCode: cloudErr.http_code || 403,
        },
        { status: cloudErr.http_code || 500 }
      );
    }
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message || "Failed to upload image" }, { status: 500 });
  }
}
