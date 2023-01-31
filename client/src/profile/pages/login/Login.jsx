import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.js";
import "./login.scss";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="login">
      <div className="lContainer">
        <h2>Login</h2>
        <form>
          <div className="user-box">
            <input
              type="text"
              id="username"
              onChange={handleChange}
              className="lInput"
            />
            <label>Username</label>
          </div>
          <div className="user-box">
            <input
              type="password"
              id="password"
              onChange={handleChange}
              className="lInput"
            />
            <label>Password</label>
          </div>
        </form>
        <button disabled={loading} onClick={handleClick}>
          Login
        </button>
        {error && <span className="errorMsg2">{error.message}</span>}
        <button
          className="homePageButton2"
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

export default Login;
