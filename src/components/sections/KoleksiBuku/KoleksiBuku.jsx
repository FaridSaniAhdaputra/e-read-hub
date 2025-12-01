import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./KoleksiBuku.css";

const KoleksiBuku = ({ books = [], onAddToFavorite, onRead, onDownload }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Pastikan data books berupa array
  const safeBooks = Array.isArray(books) ? books : [];

  // Logic Pencarian (Judul, Penulis, atau Kategori)
  const filteredBooks = safeBooks.filter((book) => {
    const term = searchTerm.toLowerCase();
    const title = book.title ? book.title.toLowerCase() : "";
    const author = book.author ? book.author.toLowerCase() : "";
    const category = book.category ? book.category.toLowerCase() : "";

    return (
      title.includes(term) || author.includes(term) || category.includes(term)
    );
  });

  return (
    <section className="koleksi-section">
      <div className="koleksi-container">
        {/* --- HEADER --- */}
        <div className="koleksi-header">
          <h2 className="section-title">Koleksi Buku</h2>
          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Cari judul, penulis, atau kategori..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {/* --- GRID BUKU --- */}
        <div className="books-grid">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book, index) => (
              <div key={book.id || index} className="book-card">
                {/* 1. COVER BUKU */}
                <div className="card-image-area">
                  {book.image ? (
                    <img
                      src={book.image}
                      alt={book.title}
                      className="cover-img"
                    />
                  ) : (
                    <div className="placeholder-box">📚</div>
                  )}
                </div>

                {/* 2. INFO BUKU (Urutan: Judul -> Penulis -> Kategori) */}
                <div className="card-info">
                  <h3 className="book-title" title={book.title}>
                    {book.title}
                  </h3>

                  <p className="book-author">{book.author}</p>

                  <span className="category-tag">
                    {book.category || "Umum"}
                  </span>
                </div>

                {/* 3. TOMBOL AKSI */}
                <div className="card-buttons">
                  <button
                    className="btn btn-read"
                    onClick={() => navigate(`/read/${book.id}`)}
                  >
                    📖 Baca
                  </button>

                  <button
                    className="btn btn-download"
                    onClick={() => onDownload && onDownload(book)}
                  >
                    ⬇️ Download
                  </button>

                  <button
                    className="btn btn-fav"
                    onClick={() => onAddToFavorite && onAddToFavorite(book)}
                  >
                    ❤️ Favorit
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <p>😔 Maaf, buku yang Anda cari tidak ditemukan.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default KoleksiBuku;
