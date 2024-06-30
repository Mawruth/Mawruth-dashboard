import "./Logout.css";

function Logout() {
  return (
    <div className="logout">
      <button
        className="logout-btn"
        onClick={(e) => {
          localStorage.clear();
          location.href = "/login";
        }}
      >
        تسجيل الخروج
      </button>
    </div>
  );
}

export default Logout;
