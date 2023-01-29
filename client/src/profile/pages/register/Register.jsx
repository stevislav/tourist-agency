import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./register.scss";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
    fName: undefined,
    lName: undefined,
    phoneNumber: undefined,
  });

  let error = "";
  // const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    console.log(credentials);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const newUser = { ...credentials };
      await axios.post("/auth/register", newUser);
      error = "Successfully registered";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login">
      <div className="lContainer">
        <h2>Register</h2>
        <div className="user-box">
          <input
            type="text"
            placeholder="Username"
            id="username"
            onChange={handleChange}
            className="lInput"
          />
        </div>
        <div className="user-box">
          <input
            type="password"
            placeholder="Password"
            id="password"
            onChange={handleChange}
            className="lInput"
          />
        </div>
        <div className="user-box">
          <input
            type="text"
            placeholder="First Name"
            id="fName"
            onChange={handleChange}
            className="lInput"
          />
        </div>
        <div className="user-box">
          <input
            type="text"
            placeholder="Last Name"
            id="lName"
            onChange={handleChange}
            className="lInput"
          />
        </div>
        <div className="user-box">
          <input
            type="text"
            placeholder="E-mail"
            id="email"
            onChange={handleChange}
            className="lInput"
          />
        </div>
        <div className="user-box">
          <input
            type="text"
            placeholder="Phone Number"
            id="phoneNumber"
            onChange={handleChange}
            className="lInput"
          />
        </div>
        <button onClick={handleClick} className="lButton">
          Register
        </button>
        {error === "" ? <span>{error}</span> : <span></span>}
      </div>
    </div>
  );
};

export default Register;
