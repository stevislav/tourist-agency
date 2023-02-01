import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  const { data, loading, error, reFetch } = useFetch(
    "/offers/getSample?samples=4"
  );
  console.log(data);

  return (
    <div className="fp">
      {loading ? (
        "Loading"
      ) : (
        <>
          {data.map((item) => (
            <div className="fpItem" key={item._id}>
              <Link
                to={`/offers/${item._id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <img src={item.imgPerLocation[0]} alt="" className="fpImg" />
                <span className="fpName">{item.name}</span>
              </Link>
              <span className="fpCity">
                Travel to <span>{item.location[0]}</span>
                {item.location[1] ? ", among others!" : "!"}
              </span>
              <div className="fpPrice">
                Starting from <span>${item.price}</span>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
