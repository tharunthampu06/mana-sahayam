import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const text = req.nextUrl.searchParams.get("text") || "";
  const lang = req.nextUrl.searchParams.get("lang") || "te";
  if (!text.trim()) {
    return NextResponse.json({ error: "Missing text" }, { status: 400 });
  }

  const url = `https://translate.googleapis.com/translate_tts?ie=UTF-8&client=gtx&tl=${encodeURIComponent(
    lang
  )}&q=${encodeURIComponent(text.slice(0, 200))}`;

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122.0.0.0 Safari/537.36",
      },
    });
    if (!res.ok) {
      return NextResponse.json({ error: "TTS upstream error" }, { status: 502 });
    }
    const audioBuffer = await res.arrayBuffer();
    return new NextResponse(audioBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return NextResponse.json({ error: "TTS fetch failed" }, { status: 500 });
  }
}
