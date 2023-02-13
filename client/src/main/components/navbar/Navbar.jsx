import "./navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  // refreshujemo navbar ukoliko je korisnik logovan zbog prikaza
  const storageUser = JSON.parse(localStorage.getItem("user"));
  const location = window.location;
  const { user } = useContext(AuthContext);
  if (user === null && storageUser !== null) {
    location.reload();
  }

  const navigate = useNavigate();

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
            <button id="btnUser" className="navButton" onClick={handleProfile}>
              {user.username}
            </button>
            <button id="btnLogout" className="navButton" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div id="btnReg" className="navItems">
            <button className="navButton" onClick={handleRegister}>
              Register
            </button>
            <button id="btnLogin" className="navButton" onClick={handleLogin}>
              Log in
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
