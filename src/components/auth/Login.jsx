import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

// --- IMPORT FIREBASE ---
// Pastikan path './firebase' sesuai dengan lokasi file firebase.js kamu
import { auth, googleProvider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
// -----------------------

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // --- FUNGSI LOGIN GOOGLE ---
  const handleGoogleLogin = async () => {
    setError(""); // Bersihkan error sebelumnya
    setLoading(true);

    try {
      // 1. Munculkan Popup Login Google
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // 2. Ambil data user dari Google
      const userData = {
        name: user.displayName,
        email: user.email,
        uid: user.uid,
      };

      console.log("Berhasil Login Google:", userData);

      // 3. Masukkan ke state aplikasi (App.jsx)
      onLogin(userData);

      // 4. Pindah ke Halaman Utama
      navigate("/");
    } catch (error) {
      console.error("Error Google Login:", error);
      setError("Gagal masuk dengan Google. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };
  // ---------------------------

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email dan password harus diisi!");
      return;
    }

    setError("");
    setLoading(true);

    // --- SIMULASI LOGIN BIASA (Email/Password) ---
    setTimeout(() => {
      // Kita anggap login selalu berhasil jika ada input
      const dummyUser = {
        name: email.split("@")[0], // Ambil nama dari depan email
        email: email,
        photo: null, // User biasa mungkin belum ada foto
      };

      onLogin(dummyUser);
      setLoading(false);
      navigate("/");
    }, 1500);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>E-Read Hub</h1>
          <p>Masuk ke perpustakaan digital Anda</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              className="form-input"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="form-input"
              disabled={loading}
            />
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Memproses..." : "Masuk"}
          </button>

          <div className="divider">
            <span>atau masuk dengan</span>
          </div>

          {/* --- TOMBOL GOOGLE YANG SUDAH DIAKTIFKAN --- */}
          <button
            type="button"
            className="oauth-button google-button"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <span className="oauth-icon">G</span>
            {loading ? "Menghubungkan..." : "Masuk dengan Google"}
          </button>
          {/* ------------------------------------------- */}

          <div className="form-footer">
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="link-button"
            >
              Lupa Password?
            </button>
            <span className="separator">•</span>
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="link-button"
            >
              Daftar Akun
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
