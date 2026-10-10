import { ImageResponse } from "next/og";

export const alt = "IT Transition Stories — Карта переходов в IT";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0514 0%, #1a0f30 50%, #2d1458 100%)",
          padding: "60px",
          position: "relative",
        }}
      >
        {/* Иконка IT */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "120px",
            height: "120px",
            borderRadius: "24px",
            background: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
            color: "white",
            fontSize: "56px",
            fontWeight: "bold",
            marginBottom: "40px",
            boxShadow: "0 0 60px rgba(168, 85, 247, 0.6)",
          }}
        >
          IT
        </div>

        {/* Название */}
        <div
          style={{
            fontSize: "72px",
            fontWeight: "bold",
            background: "linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "20px",
            textAlign: "center",
            lineHeight: 1.1,
          }}
        >
          IT Transition Stories
        </div>

        {/* Подзаголовок */}
        <div
          style={{
            fontSize: "28px",
            color: "#a78bfa",
            marginBottom: "40px",
            textAlign: "center",
          }}
        >
          Карта реальных переходов в IT
        </div>

        {/* URL */}
        <div
          style={{
            fontSize: "22px",
            color: "#a855f7",
            fontWeight: "bold",
            fontFamily: "monospace",
          }}
        >
          kirillmironchuk.ru/projects/it-stories
        </div>
      </div>
    ),
    { ...size }
  );
}