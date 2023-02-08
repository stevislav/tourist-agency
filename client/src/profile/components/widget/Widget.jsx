import "./widget.scss";
import MailIcon from "@mui/icons-material/Mail";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined";
import { useState } from "react";
import axios from "axios";

const Widget = ({ type, value, id }) => {
  // podatak usera
  const [newValue, setNewValue] = useState("");

  const handleChange = (e) => {
    setNewValue(e.target.value);
  };

  const location = window.location;
  const handleClick = async (e) => {
    try {
      // cuvanje podataka u bazi
      const data = {};
      data[type] = newValue;
      await axios.put(`/users/${id}`, data);
      // i azuriranje usera u lokalnom skladistu
      const savedUser = JSON.parse(localStorage.getItem("user"));
      localStorage.removeItem("user");
      savedUser[type] = newValue;
      localStorage.setItem("user", JSON.stringify(savedUser));
      location.reload();
    } catch (err) {}
  };

  let typeDisplay = "";
  let icon = "";

  // svaki widget dobija svoje podatke
  switch (type) {
    case "username":
      typeDisplay = "Username";
      icon = <PersonIcon className="icon" />;
      break;
    case "email":
      typeDisplay = "E-Mail";
      icon = <MailIcon className="icon" />;
      break;
    case "fName":
      typeDisplay = "First Name";
      icon = <BookmarkOutlinedIcon className="icon" />;
      break;
    case "lName":
      typeDisplay = "Last Name";
      icon = <TurnedInNotOutlinedIcon className="icon" />;
      break;
    case "phoneNumber":
      typeDisplay = "Phone Number";
      icon = <PhoneIphoneIcon className="icon" />;
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <div className="iconTitle">
          <span>{icon}</span>
          <span className="title">{typeDisplay}</span>
        </div>
        <input
          type="text"
          defaultValue={value}
          className="profileInput"
          onChange={handleChange}
        />
      </div>
      <div className="right">
        <button className="confirm" onClick={handleClick}>
          CONFIRM
        </button>
      </div>
    </div>
  );
};

export default Widget;
