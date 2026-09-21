import { ImageResponse } from "next/og";

export const alt = "StorenTech AI — Newport Beach / Corona Del Mar";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#f4efe6",
          padding: "80px 88px",
          color: "#0e1c2f",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 6, color: "#9b7a4b", textTransform: "uppercase" }}>
          Newport Beach / Corona Del Mar
        </div>
        <div style={{ display: "flex", fontSize: 72, marginTop: 28, lineHeight: 1.05, maxWidth: 900 }}>
          StorenTech AI finds where time or revenue leaks, then fixes what pays — human touch stays.
        </div>
        <div
          style={{
            width: 72,
            height: 2,
            background: "#9b7a4b",
            marginTop: 36,
          }}
        />
        <div style={{ display: "flex", marginTop: 28, fontSize: 28, letterSpacing: 1 }}>
          StorenTech AI
        </div>
      </div>
    ),
    { ...size },
  );
}
