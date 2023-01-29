import "./newUser.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState } from "react";
import axios from "axios";

const NewUser = ({ inputs, title }) => {
  const [info, setInfo] = useState({});

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const newUser = { ...info };
      await axios.post("/auth/register", newUser);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <div className="topNewUser"></div>
        <div className="topUser">
          <h1>{title}</h1>
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
