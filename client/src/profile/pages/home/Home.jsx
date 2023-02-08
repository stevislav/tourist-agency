import Sidebar from "../../components/sidebar/Sidebar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import useFetch from "../../hooks/useFetch";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DotLoader from "react-spinners/DotLoader";

const Home = () => {
  // useFetch koristimo samo za looding da bi bilo interaktivno
  const { data, loading, error } = useFetch(`/users`);

  // korisnikove vrednosti iz contexta
  const { user } = useContext(AuthContext);

  const values = Object.values(user).slice(1, 6);
  const keys = Object.keys(user).slice(1, 6);

  // vrednosti i kljucevi za widgete
  const values1 = [values[0], values[2], values[3]];
  const keys1 = [keys[0], keys[2], keys[3]];

  const values2 = [values[1], values[4]];
  const keys2 = [keys[1], keys[4]];

  // loading animacija
  const loader = (
    <DotLoader
      color={"#7251b5c4"}
      loading={loading}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
      className="loader"
    />
  );

  return (
    <div className="home">
      <Sidebar />
      <div className="profileHomeContainer">
        <div className="topHome">
          <div className="profileIcon">
            <AccountCircleIcon className="iconProfile" />
            PROFILE
          </div>
        </div>
        <div className="bothWidgets">
          <div className="widgets1">
            {loading ? (
              loader
            ) : (
              <>
                {values1.map((item, index) => (
                  <Widget
                    type={keys1[index]}
                    key={index}
                    value={item}
                    id={user._id}
                  />
                ))}
              </>
            )}
          </div>
          <div className="widgets2">
            {loading ? (
              ""
            ) : (
              <>
                {values2.map((item, index) => (
                  <Widget
                    type={keys2[index]}
                    key={index}
                    value={item}
                    id={user._id}
                  />
                ))}
              </>
            )}
          </div>
        </div>
        <div className="bottomHome"></div>
      </div>
    </div>
  );
};

export default Home;
