import { useState } from "react";

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [name, setName] = useState("");
  const [role, setRole] = useState("user");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (isRegister) {
        const res = await fetch("http://localhost:8080/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            role,
          }),
        });

        const data = await res.json();

        if (data.message?.toLowerCase().includes("success")) {
          setSuccess("🎉 Registration successful! Please login.");
          setIsRegister(false);

          setName("");
          setEmail("");
          setPassword("");
          setRole("user");
        } else {
          setError(data.message || "Registration failed");
        }
      } else {
        const res = await fetch("http://localhost:8080/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        const data = await res.json();

        if (data.token) {
          localStorage.setItem("token", data.token);

          setSuccess("✅ Login successful!");

          setTimeout(() => {
            window.location.href = "/";
          }, 1200);
        } else {
          setError("Invalid credentials");
        }
      }
    } catch (err) {
      setError("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom right, #dcfce7, #dbeafe, #f0fdf4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "430px",
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(14px)",
          borderRadius: "30px",
          padding: "35px",
          boxShadow: "0 15px 40px rgba(0,0,0,0.12)",
          border: "1px solid rgba(255,255,255,0.3)",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          {/* Animated Plant */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "18px",
            }}
          >
            <svg viewBox="0 0 200 240" width="140" height="160">
              {/* Pot */}
              <rect
                x="65"
                y="180"
                width="70"
                height="40"
                rx="10"
                fill="#b45309"
              />

              {/* Stem */}
              <path
                d="M100 180 C100 150,100 110,100 70"
                stroke="#15803d"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
              />

              {/* Leaves */}
              <ellipse
                cx="80"
                cy="130"
                rx="25"
                ry="12"
                fill="#22c55e"
                transform="rotate(-25 80 130)"
              />

              <ellipse
                cx="120"
                cy="110"
                rx="25"
                ry="12"
                fill="#16a34a"
                transform="rotate(25 120 110)"
              />

              {/* Flower */}
              <circle cx="100" cy="55" r="10" fill="#facc15" />
              <circle cx="100" cy="35" r="12" fill="#f472b6" />
              <circle cx="120" cy="55" r="12" fill="#f472b6" />
              <circle cx="100" cy="75" r="12" fill="#f472b6" />
              <circle cx="80" cy="55" r="12" fill="#f472b6" />
            </svg>
          </div>

          <h1
            style={{
              fontSize: "32px",
              color: "#14532d",
              marginBottom: "8px",
            }}
          >
            Florista
          </h1>

          <p
            style={{
              color: "#6b7280",
              fontSize: "15px",
            }}
          >
            Smart Gardening & Plant Care Platform 🌿
          </p>
        </div>

        {/* Toggle */}
        <div
          style={{
            display: "flex",
            background: "#f3f4f6",
            borderRadius: "16px",
            padding: "5px",
            marginBottom: "25px",
          }}
        >
          <button
            onClick={() => {
              setIsRegister(false);
              setError("");
              setSuccess("");
            }}
            style={{
              flex: 1,
              padding: "12px",
              border: "none",
              borderRadius: "12px",
              background: !isRegister ? "#16a34a" : "transparent",
              color: !isRegister ? "#fff" : "#374151",
              fontWeight: "600",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            Login
          </button>

          <button
            onClick={() => {
              setIsRegister(true);
              setError("");
              setSuccess("");
            }}
            style={{
              flex: 1,
              padding: "12px",
              border: "none",
              borderRadius: "12px",
              background: isRegister ? "#16a34a" : "transparent",
              color: isRegister ? "#fff" : "#374151",
              fontWeight: "600",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={inputStyle}
              />

              {/* Role Selection */}
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  marginBottom: "18px",
                }}
              >
                <button
                  type="button"
                  onClick={() => setRole("user")}
                  style={{
                    ...roleStyle,
                    background:
                      role === "user" ? "#dcfce7" : "#f9fafb",
                    border:
                      role === "user"
                        ? "2px solid #16a34a"
                        : "1px solid #e5e7eb",
                  }}
                >
                  👤 User
                </button>

                <button
                  type="button"
                  onClick={() => setRole("gardener")}
                  style={{
                    ...roleStyle,
                    background:
                      role === "gardener" ? "#dcfce7" : "#f9fafb",
                    border:
                      role === "gardener"
                        ? "2px solid #16a34a"
                        : "1px solid #e5e7eb",
                  }}
                >
                  👨‍🌾 Gardener
                </button>
              </div>
            </>
          )}

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />

          {/* Messages */}
          {error && (
            <div
              style={{
                background: "#fef2f2",
                color: "#dc2626",
                padding: "12px",
                borderRadius: "12px",
                marginBottom: "15px",
                fontSize: "14px",
              }}
            >
              {error}
            </div>
          )}

          {success && (
            <div
              style={{
                background: "#ecfdf5",
                color: "#166534",
                padding: "12px",
                borderRadius: "12px",
                marginBottom: "15px",
                fontSize: "14px",
              }}
            >
              {success}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "15px",
              border: "none",
              borderRadius: "16px",
              background:
                "linear-gradient(to right, #16a34a, #22c55e)",
              color: "#fff",
              fontSize: "16px",
              fontWeight: "700",
              cursor: "pointer",
              transition: "0.3s",
              opacity: loading ? 0.8 : 1,
            }}
          >
            {loading
              ? "Please wait..."
              : isRegister
              ? "Create Account"
              : "Login"}
          </button>
        </form>

        {/* Footer */}
        <div
          style={{
            textAlign: "center",
            marginTop: "25px",
            color: "#6b7280",
            fontSize: "14px",
          }}
        >
          {isRegister
            ? "Already have an account?"
            : "New to Florista?"}

          <span
            onClick={() => setIsRegister(!isRegister)}
            style={{
              color: "#16a34a",
              fontWeight: "600",
              marginLeft: "6px",
              cursor: "pointer",
            }}
          >
            {isRegister ? "Login" : "Register"}
          </span>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "15px",
  borderRadius: "16px",
  border: "1px solid #d1d5db",
  marginBottom: "18px",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box",
  background: "#fff",
};

const roleStyle = {
  flex: 1,
  padding: "14px",
  borderRadius: "14px",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "15px",
  transition: "0.3s",
};