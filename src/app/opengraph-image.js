import { ImageResponse } from "next/og";

export const alt = "Кирилл Мирончук — Портфолио";
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
          background: "linear-gradient(135deg, #0a0a0f 0%, #1e3a8a 100%)",
          padding: "60px",
        }}
      >
        {/* Иконка КМ */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "120px",
            height: "120px",
            borderRadius: "24px",
            background: "linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)",
            color: "white",
            fontSize: "56px",
            fontWeight: "bold",
            marginBottom: "40px",
          }}
        >
          KM
        </div>

        {/* Имя */}
        <div
          style={{
            fontSize: "72px",
            fontWeight: "bold",
            color: "white",
            marginBottom: "20px",
            textAlign: "center",
            lineHeight: 1.1,
          }}
        >
          Кирилл Мирончук
        </div>

        {/* Подзаголовок */}
        <div
          style={{
            fontSize: "32px",
            color: "#94a3b8",
            marginBottom: "40px",
            textAlign: "center",
          }}
        >
          Менеджер проектов | Коуч | Мотиватор
        </div>

        {/* URL */}
        <div
          style={{
            fontSize: "24px",
            color: "#3b82f6",
            fontWeight: "bold",
          }}
        >
          kirillmironchuk.ru
        </div>
      </div>
    ),
    { ...size }
  );
}
