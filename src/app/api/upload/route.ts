import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");

  if (!filename) {
    return NextResponse.json({ error: "filename is required" }, { status: 400 });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "BLOB_READ_WRITE_TOKEN not configured. Enable Vercel Blob in your project dashboard." },
      { status: 503 }
    );
  }

  const blob = await put(filename, request.body!, {
    access: "public",
    contentType: request.headers.get("content-type") ?? "audio/mpeg",
  });

  return NextResponse.json({ url: blob.url });
}
