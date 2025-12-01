import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    setMessage("");
    setLoading(true);

    // --- SIMULASI KIRIM EMAIL ---
    setTimeout(() => {
      setMessage("Link reset password telah dikirim ke email Anda (Simulasi).");
      setLoading(false);
      setEmail("");
    }, 1500);
  };

  return (
    <div className="forgot-container">
      <div className="forgot-card">
        <div className="forgot-header">
          <h1>Lupa Password?</h1>
          <p>Masukkan email Anda untuk reset password.</p>
        </div>

        {message && <div className="success-message">{message}</div>}

        <form onSubmit={handleSubmit} className="forgot-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              className="form-input"
              disabled={loading}
            />
          </div>

          <button type="submit" className="btn-reset" disabled={loading}>
            {loading ? "Mengirim..." : "Kirim Link Reset"}
          </button>
        </form>

        <div className="form-footer">
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="link-button"
          >
            Kembali ke Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
