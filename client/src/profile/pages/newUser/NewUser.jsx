import "./newUser.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState } from "react";
import axios from "axios";

const NewUser = ({ inputs, title }) => {
  const [info, setInfo] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    console.log(info);
  };

  const handleClick = async (e) => {
    setErrorMessage("Working..");
    e.preventDefault();
    try {
      const newUser = { ...info };
      await axios.post("/auth/register", newUser);
      setErrorMessage("Successfully added user!");
      setTimeout(() => setErrorMessage(""), 3000);
    } catch (err) {
      if (typeof err.response.data === "string") {
        setErrorMessage(err.response.data);
        setTimeout(() => setErrorMessage(""), 2000);
      } else {
        setErrorMessage("Enter all inputs");
        setTimeout(() => setErrorMessage(""), 2000);
      }
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <div className="topNewUser"></div>
        <div className="topUser">
          <h1>{errorMessage === "" ? title : errorMessage}</h1>
        </div>
        <div className="bottomUser">
          <div className="right">
            <form>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                    style={{ outline: "none", textDecoration: "none" }}
                  />
                </div>
              ))}
            </form>
            <button className="sendButtonUser" onClick={handleClick}>
              SEND
            </button>
          </div>
        </div>
        <div className="bottomNewUser"></div>
      </div>
    </div>
  );
};

export default NewUser;
