import { useState } from "react";

export default function Plants() {
  const [fertilized, setFertilized] = useState(false);
  const [watered, setWatered] = useState(false);

  const growthStage = fertilized
    ? "fully-grown"
    : watered
    ? "growing"
    : "seedling";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #ecfdf5, #dbeafe)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "520px",
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(14px)",
          borderRadius: "28px",
          padding: "35px",
          boxShadow: "0 15px 35px rgba(0,0,0,0.12)",
          textAlign: "center",
          border: "1px solid rgba(255,255,255,0.4)",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "25px" }}>
          <h1
            style={{
              fontSize: "34px",
              fontWeight: "700",
              color: "#14532d",
              marginBottom: "10px",
            }}
          >
            🌱 Smart Plant Care
          </h1>

          <p
            style={{
              color: "#6b7280",
              fontSize: "15px",
              lineHeight: "1.6",
            }}
          >
            Take care of your virtual plant by watering and fertilizing it.
          </p>
        </div>

        {/* Plant Card */}
        <div
          style={{
            background: "#f9fafb",
            borderRadius: "24px",
            padding: "25px",
            border: "1px solid #e5e7eb",
            marginBottom: "25px",
          }}
        >
          {/* Plant Animation */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <svg
              viewBox="0 0 200 240"
              width="220"
              height="260"
              style={{
                transform:
                  growthStage === "fully-grown"
                    ? "scale(1.1)"
                    : growthStage === "growing"
                    ? "scale(1)"
                    : "scale(0.9)",
                transition: "all 0.5s ease",
              }}
            >
              {/* Pot */}
              <rect
                x="65"
                y="190"
                width="70"
                height="40"
                rx="10"
                fill="#b45309"
              />

              {/* Stem */}
              <path
                d="M100 190 C100 160,100 120,100 70"
                stroke="#15803d"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
              />

              {/* Leaves */}
              <ellipse
                cx="80"
                cy="145"
                rx="25"
                ry="12"
                fill="#22c55e"
                transform="rotate(-25 80 145)"
              />

              <ellipse
                cx="120"
                cy="120"
                rx="25"
                ry="12"
                fill="#16a34a"
                transform="rotate(25 120 120)"
              />

              {watered && (
                <>
                  <ellipse
                    cx="80"
                    cy="100"
                    rx="20"
                    ry="10"
                    fill="#4ade80"
                    transform="rotate(-20 80 100)"
                  />

                  <ellipse
                    cx="120"
                    cy="85"
                    rx="20"
                    ry="10"
                    fill="#4ade80"
                    transform="rotate(20 120 85)"
                  />
                </>
              )}

              {/* Flower */}
              {fertilized && (
                <>
                  <circle cx="100" cy="55" r="10" fill="#facc15" />

                  <circle cx="100" cy="35" r="12" fill="#f472b6" />
                  <circle cx="120" cy="55" r="12" fill="#f472b6" />
                  <circle cx="100" cy="75" r="12" fill="#f472b6" />
                  <circle cx="80" cy="55" r="12" fill="#f472b6" />
                </>
              )}
            </svg>
          </div>

          {/* Status */}
          <div
            style={{
              padding: "15px",
              borderRadius: "16px",
              background:
                growthStage === "fully-grown"
                  ? "#dcfce7"
                  : growthStage === "growing"
                  ? "#dbeafe"
                  : "#f3f4f6",
              color:
                growthStage === "fully-grown"
                  ? "#166534"
                  : growthStage === "growing"
                  ? "#1d4ed8"
                  : "#374151",
              fontWeight: "600",
              fontSize: "16px",
            }}
          >
            {fertilized
              ? "🌸 Your plant is fully grown and blooming!"
              : watered
              ? "🌿 Your plant is healthy and growing!"
              : "💧 Give your plant some care to help it grow."}
          </div>
        </div>

        {/* Buttons */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "15px",
          }}
        >
          <button
            onClick={() => setWatered(true)}
            style={{
              padding: "14px",
              border: "none",
              borderRadius: "16px",
              background: "#3b82f6",
              color: "#fff",
              fontWeight: "600",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            💧 Water
          </button>

          <button
            onClick={() => setFertilized(true)}
            style={{
              padding: "14px",
              border: "none",
              borderRadius: "16px",
              background: "#16a34a",
              color: "#fff",
              fontWeight: "600",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            🧪 Fertilize
          </button>

          <button
            onClick={() => {
              setWatered(false);
              setFertilized(false);
            }}
            style={{
              padding: "14px",
              border: "1px solid #d1d5db",
              borderRadius: "16px",
              background: "#fff",
              color: "#374151",
              fontWeight: "600",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            ↺ Reset
          </button>
        </div>
      </div>
    </div>
  );
}