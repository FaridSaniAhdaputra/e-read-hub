import { NavLink, Link } from "react-router-dom";
import "./NavMenu.css";
import UserInfo from "./UserInfo";

function NavMenu({ isOpen, onClose, userEmail, onLogout, isAuthenticated }) {
  const menuItems = [
    { to: "/", label: "Beranda" },
    { to: "/books", label: "Koleksi Buku" }, // Ganti link sesuai kebutuhan
    { to: "/favorites", label: "Favorit Saya" },
  ];

  return (
    <div className={`navbar-menu ${isOpen ? "active" : ""}`}>
      <ul className="menu-list">
        {menuItems.map((item) => (
          <li key={item.to} className="navbar-item">
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `navbar-link ${isActive ? "active" : ""}`
              }
              onClick={onClose}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Tampilan Mobile: User Info atau Tombol Login */}
      <div className="mobile-auth">
        {isAuthenticated && userEmail ? (
          <UserInfo userEmail={userEmail} onLogout={onLogout} isMobile={true} />
        ) : (
          <Link to="/login" onClick={onClose}>
            <button className="navbar-login-btn mobile-btn">Masuk Akun</button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default NavMenu;
