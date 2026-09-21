import { ImageResponse } from "next/og";

export const alt = "StorenTech AI";
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
          StorenTech AI
        </div>
        <div style={{ display: "flex", fontSize: 72, marginTop: 28, lineHeight: 1.05, maxWidth: 900 }}>
          Most operators can’t see the leaks until someone maps them. We find where time or revenue hides — then fix what pays. Human touch stays.
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
