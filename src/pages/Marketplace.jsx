import { useEffect, useState } from "react";
import API from "../services/api";

function isGardener() {
  // Example: decode token or use a user role from localStorage (adjust as per your backend)
  const user = JSON.parse(localStorage.getItem("user") || "null");
  return user && user.role === "gardener";
}

export default function Marketplace() {
  const [plants, setPlants] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    API.get("/plants")
      .then(res => setPlants(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    try {
      const token = localStorage.getItem("token");
      const res = await API.post("/plants/add", { name, type, price }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess("Product added!");
      setName(""); setType(""); setPrice("");
      // Refresh list
      API.get("/plants").then(res => setPlants(res.data));
    } catch (err) {
      setError("Failed to add product");
    }
  };

  return (
    <div className="container">
      <h2>🌿 Plant Marketplace</h2>

      {isGardener() && (
        <form onSubmit={handleAddProduct} style={{marginBottom: "2rem", display: "flex", gap: "1rem", alignItems: "center"}}>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" required style={{padding: "0.5rem"}} />
          <input value={type} onChange={e => setType(e.target.value)} placeholder="Type" required style={{padding: "0.5rem"}} />
          <input value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" type="number" required style={{padding: "0.5rem", width: "90px"}} />
          <button className="pill" type="submit">Add Product</button>
          {success && <span style={{color: '#22c55e'}}>{success}</span>}
          {error && <span style={{color: '#e53935'}}>{error}</span>}
        </form>
      )}

      <div style={{display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"20px"}}>
        {plants.map(p => (
          <div className="card" key={p.id}>
            <h3>{p.name}</h3>
            <p>{p.type}</p>
            <p>₹{p.price}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}