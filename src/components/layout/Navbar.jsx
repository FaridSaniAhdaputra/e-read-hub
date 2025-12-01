import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import HamburgerButton from "./HamburgerButton";
import NavMenu from "./NavMenu";
import UserInfo from "./UserInfo";
import logo from "../../assets/logo.png";

function Navbar({ userEmail, onLogout, onOpenLogin, isAuthenticated }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      {isMenuOpen && <div className="menu-overlay" onClick={closeMenu}></div>}

      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-brand">
            <img src={logo} alt="E-Read Hub Logo" className="brand-image" />
            <h1 className="brand-logo">E-Read Hub</h1>
          </Link>

          <HamburgerButton isOpen={isMenuOpen} onClick={toggleMenu} />

          <NavMenu
            isOpen={isMenuOpen}
            onClose={closeMenu}
            userEmail={userEmail}
            onLogout={onLogout}
            onOpenLogin={onOpenLogin}
            isAuthenticated={isAuthenticated}
          />

          {/* Bagian Tombol Desktop */}
          <div className="desktop-auth">
            {isAuthenticated && userEmail ? (
              <UserInfo
                userEmail={userEmail}
                onLogout={onLogout}
                isMobile={false}
              />
            ) : (
              // TAMPILAN JIKA BELUM LOGIN: MASUK & DAFTAR
              <div className="auth-buttons-group">
                <Link to="/login">
                  <button className="btn-nav-login">Masuk</button>
                </Link>
                <Link to="/register">
                  <button className="btn-nav-register">Daftar</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
