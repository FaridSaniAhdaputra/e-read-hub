import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { booksData } from "../data/booksData";
import { Document, Page, pdfjs } from "react-pdf";
import "./BacaBuku.css";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

const BacaBuku = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const foundBook = booksData.find((b) => b.id === parseInt(id));
    if (foundBook) {
      setBook(foundBook);
    } else {
      navigate("/");
    }
  }, [id, navigate]);

  // Fungsi saat PDF berhasil dimuat
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const changePage = (offset) => {
    setPageNumber((prevPage) => prevPage + offset);
  };

  const prevPage = () => changePage(-1);
  const nextPage = () => changePage(1);

  if (!book) return <div className="loading">Memuat...</div>;

  return (
    <div className="read-mode-container">
      <div className="read-layout">
        <div className="read-sidebar">
          <div className="sidebar-cover-wrapper">
            <img src={book.image} alt={book.title} className="sidebar-cover" />
          </div>
          <div className="sidebar-text">
            <h1 className="sidebar-title">{book.title}</h1>
            <p className="sidebar-author">{book.author}</p>
            <div className="sidebar-meta">
              <span>{book.category}</span>
            </div>
          </div>
        </div>

        <div className="read-content-area">
          <div className="white-paper">
            <div className="pdf-container">
              {book.pdfLink ? (
                <Document
                  file={book.pdfLink}
                  onLoadSuccess={onDocumentLoadSuccess}
                  loading={
                    <div className="loading-text">Sedang memuat PDF...</div>
                  }
                  error={
                    <div className="error-text">
                      Gagal memuat PDF. Pastikan file ada di folder public.
                    </div>
                  }
                >
                  <Page
                    pageNumber={pageNumber}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    className="pdf-page"
                    width={500}
                  />
                </Document>
              ) : (
                // Tampilan jika tidak ada PDF (Fallback)
                <div className="paper-placeholder">
                  <h3>{book.title}</h3>
                  <p>⚠️ File PDF belum tersedia untuk buku ini.</p>
                </div>
              )}
            </div>

            <div className="page-number">
              Halaman {pageNumber} dari {numPages || "--"}
            </div>
          </div>
        </div>
        <div className="read-controls">
          <button
            className="nav-btn up"
            onClick={prevPage}
            disabled={pageNumber <= 1}
          >
            ↑
          </button>
          <button
            className="nav-btn down"
            onClick={nextPage}
            disabled={pageNumber >= numPages}
          >
            ↓
          </button>
        </div>
      </div>
    </div>
  );
};

export default BacaBuku;
