import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./register.scss";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    fName: "",
    lName: "",
    phoneNumber: "",
  });

  const [cPassword, setCPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    console.log(credentials);
  };

  const handleClick = async (e) => {
    setError("Working...");
    if (cPassword !== credentials.password) {
      setError("Passwords matching pls");
      setTimeout(() => setError(""), 2000);
      return;
    }
    console.log(cPassword);
    e.preventDefault();
    try {
      const newUser = { ...credentials };
      await axios.post("/auth/register", newUser);
      setError("Successfully registered");
      setTimeout(() => setError(""), 5000);
    } catch (err) {
      if (typeof err.response.data === "string") {
        setError(err.response.data);
        setTimeout(() => setError(""), 2000);
      } else {
        setError("Enter all inputs");
        setTimeout(() => setError(""), 2000);
      }
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
            type="password"
            placeholder="Confirm password"
            id="cPassword"
            onChange={(e) => {
              setCPassword(e.target.value);
            }}
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
            type="number"
            placeholder="Phone Number (10 digits | start with 06)"
            id="phoneNumber"
            onChange={handleChange}
            className="lInput"
          />
        </div>

        <button onClick={handleClick} className="lButton">
          Register
        </button>
        {error !== undefined ? (
          <span className="errorMsg">{error}</span>
        ) : (
          <span></span>
        )}
        <button
          className="homePageButton"
          onClick={() => {
            navigate("/");
          }}
        >
          Back to homepage
        </button>
      </div>
    </div>
  );
};

export default Register;
