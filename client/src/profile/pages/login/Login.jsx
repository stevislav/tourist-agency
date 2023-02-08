import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.js";
import "./login.scss";

const Login = () => {
  // definisanje promenljive i funkcije za njeno menjanje
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  // loading za animaciju, error za poruku i dispatch za context
  const { loading, error, dispatch } = useContext(AuthContext);

  // prebacivanje na drugu stranu van html-a
  const navigate = useNavigate();

  // unete podatke ubacujemo u promenljivu
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // dugme za login koje odredjuje da li smo zadovoljili uslove za logovanje
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
