import API from "../services/api";
import { useState } from "react";
import { UploadCloud, Leaf, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export default function DiseaseDetection() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) return;

    setLoading(true);
    setResult("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await API.post("/ai/detect", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setResult(res.data.disease || res.data);
    } catch (err) {
      setResult("Error: " + (err.response?.data || err.message));
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #ecfdf5, #f0fdf4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          background: "#fff",
          borderRadius: "24px",
          padding: "32px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "25px" }}>
          <div
            style={{
              width: "70px",
              height: "70px",
              margin: "0 auto 15px",
              background: "#dcfce7",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Leaf size={34} color="#16a34a" />
          </div>

          <h2
            style={{
              fontSize: "28px",
              marginBottom: "8px",
              color: "#111827",
            }}
          >
            Plant Disease Detection
          </h2>

          <p style={{ color: "#6b7280", fontSize: "15px" }}>
            Upload a plant leaf image and let AI detect diseases instantly.
          </p>
        </div>

        {/* Upload Form */}
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="fileUpload"
            style={{
              border: "2px dashed #86efac",
              borderRadius: "18px",
              padding: "30px",
              display: "block",
              textAlign: "center",
              cursor: "pointer",
              background: "#f9fafb",
              transition: "0.3s",
            }}
          >
            <UploadCloud size={42} color="#16a34a" />
            <p
              style={{
                marginTop: "10px",
                color: "#374151",
                fontWeight: "500",
              }}
            >
              Click to upload image
            </p>

            <span style={{ color: "#9ca3af", fontSize: "13px" }}>
              JPG, PNG or JPEG
            </span>

            <input
              id="fileUpload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              hidden
            />
          </label>

          {/* Preview */}
          {preview && (
            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <img
                src={preview}
                alt="Preview"
                style={{
                  width: "100%",
                  maxHeight: "250px",
                  objectFit: "cover",
                  borderRadius: "16px",
                  border: "1px solid #e5e7eb",
                }}
              />
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              marginTop: "25px",
              padding: "14px",
              border: "none",
              borderRadius: "14px",
              background: loading ? "#86efac" : "#16a34a",
              color: "#fff",
              fontSize: "16px",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              transition: "0.3s",
            }}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Detecting...
              </>
            ) : (
              <>
                <Leaf size={20} />
                Detect Disease
              </>
            )}
          </button>
        </form>

        {/* Result */}
        {result && (
          <div
            style={{
              marginTop: "25px",
              padding: "18px",
              borderRadius: "16px",
              background: result.toLowerCase().includes("error")
                ? "#fef2f2"
                : "#ecfdf5",
              border: result.toLowerCase().includes("error")
                ? "1px solid #fecaca"
                : "1px solid #bbf7d0",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            {result.toLowerCase().includes("error") ? (
              <AlertCircle color="#dc2626" />
            ) : (
              <CheckCircle2 color="#16a34a" />
            )}

            <div>
              <p
                style={{
                  margin: 0,
                  fontWeight: "600",
                  color: "#111827",
                }}
              >
                Detection Result
              </p>

              <span
                style={{
                  color: "#374151",
                  fontSize: "15px",
                }}
              >
                {result}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}