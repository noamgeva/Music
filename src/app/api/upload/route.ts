import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export const maxDuration = 60; // allow up to 60s for large files

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get("filename");

    if (!filename) {
      return NextResponse.json({ error: "filename is required" }, { status: 400 });
    }

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json(
        { error: "Blob storage not connected. Go to vercel.com → your project → Storage → Create Blob Store → Connect to project." },
        { status: 503 }
      );
    }

    /* Read full body as buffer — more reliable than streaming request.body */
    const arrayBuffer = await request.arrayBuffer();
    const buffer      = Buffer.from(arrayBuffer);

    const blob = await put(filename, buffer, {
      access:      "public",
      contentType: request.headers.get("content-type") ?? "audio/mpeg",
    });

    return NextResponse.json({ url: blob.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[upload]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
