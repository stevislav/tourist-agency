import "./navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const location = window.location;
  const navigate = useNavigate();

  /*   window.onbeforeunload = function () {
    localStorage.removeItem("user");
    return "";
  }; */

  const handleLogin = async (e) => {
    navigate("/login");
  };

  const handleRegister = (e) => {
    navigate("/register");
  };

  const handleLogout = async (e) => {
    localStorage.removeItem("user");
    location.reload();
  };

  const handleProfile = async (e) => {
    navigate("/profile");
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">INSTABOOK</span>
        </Link>
        {user !== null ? (
          <div>
            <button className="navButton" onClick={handleProfile}>
              {user.username}
            </button>
            <button className="navButton" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div className="navItems">
            <button className="navButton" onClick={handleRegister}>
              Register
            </button>
            <button className="navButton" onClick={handleLogin}>
              Log in
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;