import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validasi
    if (!username || !email || !password || !confirmPassword) {
      setError("Semua field harus diisi!");
      return;
    }
    if (password !== confirmPassword) {
      setError("Password tidak cocok!");
      return;
    }

    setError("");
    setSuccess("");
    setLoading(true);

    // --- SIMULASI REGISTER (FRONTEND ONLY) ---
    setTimeout(() => {
      setSuccess("Akun berhasil dibuat! Silakan Login.");

      // Redirect ke Login setelah 1.5 detik
      setTimeout(() => {
        navigate("/login");
      }, 1500);

      setLoading(false);
    }, 1500);
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h1>E-Read Hub</h1>
          <p>Bergabunglah bersama kami</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
              placeholder="Username"
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="Email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="Password"
            />
          </div>

          <div className="form-group">
            <label>Konfirmasi Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-input"
              placeholder="Ulangi Password"
            />
          </div>

          <button type="submit" className="register-button" disabled={loading}>
            {loading ? "Mendaftar..." : "Daftar Sekarang"}
          </button>

          <div className="form-footer">
            <span>Sudah punya akun?</span>
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="link-button"
            >
              Masuk di sini
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
