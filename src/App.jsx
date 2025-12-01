import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import { booksData } from "./data/booksData";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ForgotPassword from "./components/auth/ForgotPassword";
import KoleksiBuku from "./components/sections/KoleksiBuku/KoleksiBuku";
import Favorit from "./components/sections/Favorit/Favorit";
import BacaBuku from "./pages/BacaBuku";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  // Fungsi Login
  const handleLogin = (userData) => {
    setUser(userData);
  };

  // Fungsi Logout
  const handleLogout = () => {
    setUser(null);
    setFavorites([]);
  };

  // Fungsi Baca (Hanya Alert, karena navigasi baca ada di tombol komponennya langsung)
  const handleRead = (book) => alert(`Membuka buku "${book.title}"...`);

  // --- FUNGSI DOWNLOAD (SUDAH DIPERBAIKI) ---
  const handleDownload = (book) => {
    // 1. Cek Login
    if (!user) return alert("Harap Login untuk mengunduh.");

    // 2. Cek Ketersediaan PDF
    if (book.pdfLink) {
      const link = document.createElement("a");
      link.href = book.pdfLink;
      link.download = `${book.title}.pdf`; // Nama file hasil download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert("Maaf, file PDF untuk buku ini belum tersedia.");
    }
  };

  // Fungsi Tambah Favorit
  const handleAddFav = (book) => {
    if (!user) return alert("Silakan Login terlebih dahulu!");

    const exists = favorites.some((f) => f.id === book.id);
    if (!exists) {
      setFavorites([...favorites, book]);
      alert(`Buku "${book.title}" berhasil ditambahkan ke Favorit!`);
    } else {
      alert("Buku ini sudah ada di favoritmu!");
    }
  };

  // Fungsi Hapus Favorit
  const handleRemoveFav = (book) => {
    setFavorites(favorites.filter((f) => f.id !== book.id));
  };

  return (
    <BrowserRouter>
      <Navbar
        userEmail={user?.email}
        isAuthenticated={!!user}
        onLogout={handleLogout}
      />

      <div className="main-content" style={{ minHeight: "80vh" }}>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                user={user}
                books={booksData}
                favorites={favorites}
                onAddFav={handleAddFav}
                onRemoveFav={handleRemoveFav}
              />
            }
          />

          <Route
            path="/books"
            element={
              <div style={{ marginTop: "2rem" }}>
                <KoleksiBuku
                  books={booksData}
                  onRead={handleRead}
                  onDownload={handleDownload}
                  onAddToFavorite={handleAddFav}
                />
              </div>
            }
          />

          <Route
            path="/favorites"
            element={
              <div style={{ marginTop: "2rem" }}>
                <Favorit
                  isLoggedIn={!!user}
                  favoriteList={favorites}
                  onRemoveFavorite={handleRemoveFav}
                />
              </div>
            }
          />

          <Route
            path="/categories"
            element={
              <div style={{ textAlign: "center", padding: "100px" }}>
                <h2>Kategori Buku</h2>
                <p>Segera Hadir!</p>
              </div>
            }
          />

          <Route path="/read/:id" element={<BacaBuku />} />

          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
