import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");

  const [newProduct, setNewProduct] = useState({
    name: "",
    type: "",
    price: "",
  });

  const [role, setRole] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const storedUser = JSON.parse(
      localStorage.getItem("user") || "null"
    );

    if (storedUser) {
      setUser(storedUser);
      setRole(storedUser.role);

      if (storedUser.role === "user") {
        API.get("/orders")
          .then((res) => setOrders(res.data))
          .catch(() => {});
      }

      if (storedUser.role === "gardener") {
        API.get("/products")
          .then((res) => setProducts(res.data))
          .catch(() => {});
      }
    }
  }, [navigate]);

  // Plant Reminder
  useEffect(() => {
    if (role === "user") {
      const timer = setTimeout(() => {
        alert("🌱 Time to water your plant!");
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [role]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const handleProductAdd = async (e) => {
    e.preventDefault();

    await API.post("/products/add", newProduct);

    setNewProduct({
      name: "",
      type: "",
      price: "",
    });

    const res = await API.get("/products");

    setProducts(res.data);
  };

  const handleGardenerUpdate = async (e) => {
    e.preventDefault();

    await API.post("/gardeners/update", {
      location,
      price,
    });

    alert("✅ Profile updated!");
  };

  if (!role) return null;

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom right, #ecfdf5, #dbeafe)",
        padding: "30px",
      }}
    >
      <div
        style={{
          maxWidth: "1250px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "320px 1fr",
          gap: "25px",
        }}
      >
        {/* Sidebar */}
        <div
          style={{
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(14px)",
            borderRadius: "30px",
            padding: "30px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            height: "fit-content",
          }}
        >
          {/* Profile */}
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: "110px",
                height: "110px",
                borderRadius: "50%",
                background:
                  "linear-gradient(to bottom right, #86efac, #16a34a)",
                margin: "0 auto 18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "42px",
                color: "#fff",
                fontWeight: "700",
              }}
            >
              {user?.name?.charAt(0) || "U"}
            </div>

            <h2
              style={{
                margin: 0,
                color: "#14532d",
              }}
            >
              {user?.name || "User"}
            </h2>

            <p
              style={{
                color: "#6b7280",
                marginTop: "8px",
                textTransform: "capitalize",
              }}
            >
              {role === "gardener"
                ? "👨‍🌾 Professional Gardener"
                : "🌱 Plant Lover"}
            </p>
          </div>

          {/* Plant Animation */}
          <div
            style={{
              marginTop: "30px",
              background: "#f9fafb",
              borderRadius: "24px",
              padding: "22px",
              textAlign: "center",
            }}
          >
            <svg viewBox="0 0 200 240" width="170" height="200">
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
                d="M100 180 C100 150,100 120,100 70"
                stroke="#15803d"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
              />

              {/* Leaves */}
              <ellipse
                cx="80"
                cy="135"
                rx="25"
                ry="12"
                fill="#22c55e"
                transform="rotate(-25 80 135)"
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

            <p
              style={{
                color: "#374151",
                marginTop: "10px",
              }}
            >
              Your garden journey is blooming 🌸
            </p>
          </div>

          {/* Extra Info */}
          <div style={{ marginTop: "22px" }}>
            <div style={infoCard}>
              📍 {location || "Punjab, India"}
            </div>

            {role === "gardener" && (
              <div style={infoCard}>
                💰 ₹{price || "500"} / hour
              </div>
            )}

            <div style={infoCard}>
              ⭐ 4.9 Rating
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              marginTop: "25px",
              padding: "15px",
              border: "none",
              borderRadius: "16px",
              background: "#dc2626",
              color: "#fff",
              fontSize: "16px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>

        {/* Main Content */}
        <div>
          {/* User Orders */}
          {role === "user" && (
            <>
              <h1
                style={{
                  color: "#14532d",
                  marginBottom: "20px",
                }}
              >
                📦 Previous Orders
              </h1>

              <div
                style={{
                  display: "grid",
                  gap: "18px",
                }}
              >
                {orders.map((order, i) => (
                  <div
                    key={i}
                    style={{
                      background: "rgba(255,255,255,0.9)",
                      backdropFilter: "blur(12px)",
                      borderRadius: "24px",
                      padding: "25px",
                      boxShadow:
                        "0 10px 25px rgba(0,0,0,0.08)",
                    }}
                  >
                    <h3
                      style={{
                        margin: 0,
                        color: "#111827",
                      }}
                    >
                      🌿 Order #{i + 1}
                    </h3>

                    <p
                      style={{
                        color: "#6b7280",
                        marginTop: "10px",
                      }}
                    >
                      {order.details ||
                        JSON.stringify(order)}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Gardener Dashboard */}
          {role === "gardener" && (
            <>
              {/* Update Profile */}
              <div
                style={{
                  background: "rgba(255,255,255,0.9)",
                  borderRadius: "28px",
                  padding: "30px",
                  marginBottom: "25px",
                  boxShadow:
                    "0 10px 25px rgba(0,0,0,0.08)",
                }}
              >
                <h2
                  style={{
                    color: "#14532d",
                    marginBottom: "20px",
                  }}
                >
                  👨‍🌾 Update Gardener Profile
                </h2>

                <form
                  onSubmit={handleGardenerUpdate}
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(240px, 1fr))",
                    gap: "18px",
                  }}
                >
                  <input
                    placeholder="Location"
                    value={location}
                    onChange={(e) =>
                      setLocation(e.target.value)
                    }
                    required
                    style={inputStyle}
                  />

                  <input
                    type="number"
                    placeholder="Price per hour"
                    value={price}
                    onChange={(e) =>
                      setPrice(e.target.value)
                    }
                    required
                    style={inputStyle}
                  />

                  <button
                    type="submit"
                    style={buttonStyle}
                  >
                    Update Profile
                  </button>
                </form>
              </div>

              {/* Add Product */}
              <div
                style={{
                  background: "rgba(255,255,255,0.9)",
                  borderRadius: "28px",
                  padding: "30px",
                  marginBottom: "25px",
                  boxShadow:
                    "0 10px 25px rgba(0,0,0,0.08)",
                }}
              >
                <h2
                  style={{
                    color: "#14532d",
                    marginBottom: "20px",
                  }}
                >
                  ➕ Add Product
                </h2>

                <form
                  onSubmit={handleProductAdd}
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "18px",
                  }}
                >
                  <input
                    placeholder="Plant Name"
                    value={newProduct.name}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        name: e.target.value,
                      })
                    }
                    required
                    style={inputStyle}
                  />

                  <input
                    placeholder="Plant Type"
                    value={newProduct.type}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        type: e.target.value,
                      })
                    }
                    required
                    style={inputStyle}
                  />

                  <input
                    type="number"
                    placeholder="Price"
                    value={newProduct.price}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        price: e.target.value,
                      })
                    }
                    required
                    style={inputStyle}
                  />

                  <button
                    type="submit"
                    style={buttonStyle}
                  >
                    Add Product
                  </button>
                </form>
              </div>

              {/* Products */}
              <h2
                style={{
                  color: "#14532d",
                  marginBottom: "20px",
                }}
              >
                🌿 Your Products
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(260px, 1fr))",
                  gap: "22px",
                }}
              >
                {products.map((p, i) => (
                  <div
                    key={i}
                    style={{
                      background:
                        "rgba(255,255,255,0.9)",
                      borderRadius: "24px",
                      padding: "24px",
                      boxShadow:
                        "0 10px 25px rgba(0,0,0,0.08)",
                    }}
                  >
                    <div
                      style={{
                        height: "180px",
                        borderRadius: "18px",
                        background:
                          "linear-gradient(to bottom right, #bbf7d0, #86efac)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "60px",
                        marginBottom: "18px",
                      }}
                    >
                      🌱
                    </div>

                    <h3
                      style={{
                        margin: 0,
                        color: "#111827",
                      }}
                    >
                      {p.name}
                    </h3>

                    <p
                      style={{
                        color: "#6b7280",
                        marginTop: "8px",
                      }}
                    >
                      {p.type}
                    </p>

                    <div
                      style={{
                        marginTop: "15px",
                        fontSize: "24px",
                        fontWeight: "700",
                        color: "#16a34a",
                      }}
                    >
                      ₹{p.price}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
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
  fontSize: "15px",
  outline: "none",
  background: "#fff",
  boxSizing: "border-box",
};

const buttonStyle = {
  border: "none",
  borderRadius: "16px",
  background:
    "linear-gradient(to right, #16a34a, #22c55e)",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "700",
  cursor: "pointer",
  padding: "14px",
};

const infoCard = {
  background: "#f9fafb",
  padding: "14px",
  borderRadius: "16px",
  marginBottom: "12px",
  color: "#374151",
  fontWeight: "500",
};