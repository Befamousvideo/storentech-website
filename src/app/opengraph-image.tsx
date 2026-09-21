import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = "StorenTech AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const mark = await readFile(join(process.cwd(), "public/orbit-mark.png"));
  const markSrc = `data:image/png;base64,${mark.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#070d18",
          padding: "80px 88px",
          color: "#f7f1e6",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <img src={markSrc} width={120} height={120} alt="" />
          <div
            style={{
              display: "flex",
              fontSize: 44,
              letterSpacing: 2,
              fontWeight: 600,
            }}
          >
            StorenTech AI
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 44,
            marginTop: 36,
            lineHeight: 1.15,
            maxWidth: 920,
          }}
        >
          {site.tagline}
        </div>
      </div>
    ),
    { ...size },
  );
}
