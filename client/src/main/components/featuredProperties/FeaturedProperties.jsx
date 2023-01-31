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
                Travel to {item.location[0]}
                {item.location[1] ? ", among others!" : "!"}
              </span>
              <span className="fpPrice">Starting from ${item.price}</span>
              {item.price && (
                <div className="fpRating">
                  <button>{item.price}</button>
                  <span>Excellent</span>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
