import React from "react";
import { Link, useNavigate } from "react-router-dom"; // 1. Import useNavigate
import "./Favorit.css";

const Favorit = ({ isLoggedIn, favoriteList, onRemoveFavorite }) => {
  const navigate = useNavigate(); // 2. Inisialisasi navigate

  // Fungsi Download Buku (Opsional: Sesuaikan property pdfLink)
  const handleDownload = (book) => {
    // Pastikan menggunakan nama property yang benar (pdfLink sesuai data)
    const linkPdf = book.pdfLink || book.pdfUrl;

    if (linkPdf) {
      const link = document.createElement("a");
      link.href = linkPdf;
      link.download = book.title || "download-buku";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert("File download tidak ditemukan.");
    }
  };

  return (
    <div className="favorit-container">
      <div className="favorit-header">
        <h2>Rak Buku Favorit</h2>
        <p>Koleksi buku pilihan Anda tersimpan di sini.</p>
      </div>

      {!isLoggedIn ? (
        <div className="favorit-locked">
          <div className="lock-icon">🔒</div>
          <h3>Akses Terbatas</h3>
          <p>
            Silakan{" "}
            <Link to="/login" className="link-text">
              Login
            </Link>{" "}
            terlebih dahulu untuk melihat koleksi favorit Anda.
          </p>
          <Link to="/login">
            <button className="btn-login-redirect">Masuk ke Akun</button>
          </Link>
        </div>
      ) : (
        <div className="favorit-content">
          {favoriteList.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📚</div>
              <h3>Belum ada buku favorit</h3>
              <p>Simpan buku yang Anda suka agar mudah ditemukan nanti.</p>
              <Link to="/books">
                <button className="btn-cari">Cari Buku Sekarang</button>
              </Link>
            </div>
          ) : (
            <div className="books-grid">
              {favoriteList.map((book, index) => (
                <div key={index} className="book-card">
                  {/* --- BAGIAN GAMBAR --- */}
                  <div className="card-image-area">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="cover-img"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/images/placeholder.png";
                      }}
                    />
                  </div>

                  {/* --- BAGIAN INFO --- */}
                  <div className="card-info">
                    <h3 className="book-title" title={book.title}>
                      {book.title}
                    </h3>
                    <p className="book-author">{book.author}</p>
                    <span className="category-tag">{book.category}</span>
                  </div>

                  {/* --- ACTION BUTTONS --- */}
                  <div className="card-buttons">
                    {/* 3. Tombol Baca (DIPERBAIKI) */}
                    <button
                      className="btn btn-read"
                      onClick={() => navigate(`/read/${book.id}`)} // Arahkan ke halaman baca internal
                      title="Baca Buku"
                    >
                      📖 Baca
                    </button>

                    {/* Tombol Download */}
                    <button
                      className="btn btn-download"
                      onClick={() => handleDownload(book)}
                      title="Download PDF"
                    >
                      ⬇️ Download
                    </button>

                    {/* Tombol Hapus */}
                    <button
                      className="btn btn-remove"
                      onClick={() => onRemoveFavorite(book)}
                      title="Hapus dari Favorit"
                    >
                      🗑️ Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Favorit;
