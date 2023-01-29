import "./sidebar.scss";
import PersonIcon from "@mui/icons-material/Person";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";
import { useContext } from "react";
import useFetch from "../../../main/hooks/useFetch";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Sidebar = () => {
  const location = window.location;
  const savedUser = JSON.parse(localStorage.getItem("user"));
  const { data, loading, error } = useFetch(`/users/${savedUser["_id"]}`);

  const handleLogout = async (e) => {
    localStorage.removeItem("user");
    location.reload();
  };

  /*  window.onbeforeunload = function () {
    localStorage.removeItem("user");
    return "";
  }; */

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">INSTABOOK</span>
        </Link>
      </div>
      <div className="center">
        <ul>
          <p className="title">LISTS</p>
          {(data.isAdmin || data.isStaff) && (
            <Link to="/profile/users" style={{ textDecoration: "none" }}>
              <li>
                <PersonIcon className="icon" />
                <span>Users</span>
              </li>
            </Link>
          )}
          {data.isAdmin && (
            <Link to="/profile/offers" style={{ textDecoration: "none" }}>
              <li>
                <StoreIcon className="icon" />
                <span>Offers</span>
              </li>
            </Link>
          )}
          <Link to="/profile/pendingoffers" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>Reservations</span>
            </li>
          </Link>
        </ul>
      </div>
      <hr className="dividerCenter" />
      <div className="bottom">
        <div className="smallOptions">
          <div className="colorOption"></div>
          <span>Light Mode</span>
        </div>

        <div className="smallOptions">
          <div className="colorOption colorDark"></div>
          <span>Dark Mode</span>
        </div>
      </div>

      <div className="sidebarBottom">
        <Link
          className="sidebarSides"
          to="/profile"
          style={{ textDecoration: "none" }}
        >
          <AccountCircleIcon className="iconSides iconSides1" />
          <span className="spanSides spanSides1">Profile</span>
        </Link>
        <div className="sidebarSides" onClick={handleLogout}>
          <ExitToAppIcon className="iconSides iconSides2" />
          <span className="spanSides spanSides2">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
