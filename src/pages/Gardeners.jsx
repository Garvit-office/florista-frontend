import { useEffect, useState } from "react";
import API from "../services/api";

export default function Gardeners() {
  const [gardeners, setGardeners] = useState([]);

  useEffect(() => {
    API.get("/gardeners").then((res) => setGardeners(res.data));
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #f0fdf4, #ecfeff)",
        padding: "40px 20px",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1
          style={{
            fontSize: "36px",
            fontWeight: "700",
            color: "#14532d",
            marginBottom: "10px",
          }}
        >
          👨‍🌾 Available Gardeners
        </h1>

        <p
          style={{
            color: "#4b5563",
            fontSize: "16px",
          }}
        >
          Find professional gardeners for your plants and garden care.
        </p>
      </div>

      {/* Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "25px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {gardeners.map((g) => (
          <div
            key={g.id}
            style={{
              background: "#fff",
              borderRadius: "22px",
              padding: "25px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
              transition: "0.3s",
              border: "1px solid #f3f4f6",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow =
                "0 15px 35px rgba(0,0,0,0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0px)";
              e.currentTarget.style.boxShadow =
                "0 10px 25px rgba(0,0,0,0.08)";
            }}
          >
            {/* Avatar */}
            <div
              style={{
                width: "75px",
                height: "75px",
                borderRadius: "50%",
                background: "#dcfce7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "30px",
                marginBottom: "20px",
              }}
            >
              🌿
            </div>

            {/* Name */}
            <h2
              style={{
                fontSize: "22px",
                fontWeight: "700",
                color: "#111827",
                marginBottom: "10px",
              }}
            >
              {g.name}
            </h2>

            {/* Expertise */}
            <div
              style={{
                display: "inline-block",
                background: "#ecfdf5",
                color: "#15803d",
                padding: "6px 12px",
                borderRadius: "999px",
                fontSize: "14px",
                fontWeight: "600",
                marginBottom: "15px",
              }}
            >
              {g.expertise}
            </div>

            {/* Location */}
            <p
              style={{
                color: "#6b7280",
                marginBottom: "25px",
                fontSize: "15px",
              }}
            >
              📍 {g.location}
            </p>

            {/* Button */}
            <button
              style={{
                width: "100%",
                padding: "14px",
                border: "none",
                borderRadius: "14px",
                background: "linear-gradient(to right, #16a34a, #22c55e)",
                color: "#fff",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "0.3s",
              }}
              onMouseEnter={(e) => {
                e.target.style.opacity = "0.9";
              }}
              onMouseLeave={(e) => {
                e.target.style.opacity = "1";
              }}
            >
              Book Gardener
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}