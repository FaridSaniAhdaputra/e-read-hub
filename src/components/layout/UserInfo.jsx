import "./UserInfo.css";

function UserInfo({ userEmail, onLogout, isMobile = false }) {
  if (!userEmail) return null;

  const handleLogout = () => {
    if (window.confirm("Yakin ingin keluar?")) {
      onLogout();
    }
  };

  return (
    <div className={isMobile ? "user-info-mobile" : "user-info-desktop"}>
      <span className="user-email">Hi, {userEmail.split("@")[0]}</span>
      <button onClick={handleLogout} className="logout-button">
        Keluar
      </button>
    </div>
  );
}

export default UserInfo;
