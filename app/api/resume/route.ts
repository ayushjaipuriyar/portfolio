import { NextResponse } from "next/server";

const url =
    "https://github.com/ayushjaipuriyar/resume/releases/latest/download/Ayush_Jaipuriyar.pdf";

export async function GET() {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            let bodyText: string | null = null;
            try {
                bodyText = await response.text();
            } catch (e) {
                /* ignore */
            }
            console.error("resume fetch failed", response.status, bodyText);
            return new NextResponse(bodyText ?? "Resume not found", {
                status: response.status || 502,
            });
        }

        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        return new NextResponse(buffer, {
            status: 200,
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": "inline; filename=Ayush_Jaipuriyar_Resume.pdf",
                "Cache-Control": "public, max-age=3600, stale-while-revalidate=60",
            },
        });
    } catch (error) {
        console.error("resume proxy error", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
