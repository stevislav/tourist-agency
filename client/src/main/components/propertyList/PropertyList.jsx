import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch.js";
import "./propertyList.css";

const PropertyList = () => {
  const { data, loading, error, reFetch } = useFetch("/offers/countByCountry");
  const navigate = useNavigate();

  const handleOnClickSearch = (country) => {
    const search1 = "";
    const search2 = country;
    const search3 = "";
    const dates = [
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ];
    const pageSize = 50;

    navigate("/offers", {
      state: { search1, search2, search3, dates, pageSize },
    });
  };

  const images = [
    "https://www.state.gov/wp-content/uploads/2019/04/Canada-e1556023963820-2500x1406.jpg",
    "https://www.state.gov/wp-content/uploads/2019/04/Japan-2107x1406.jpg",
    "https://cdn.kimkim.com/files/a/content_articles/featured_photos/cc69c4c0f212bde8cdade44534ed11990719e6bf/big-968762e16f26380a23cc511a9cb4ccc5.jpg",
    "https://cdn.britannica.com/89/179589-138-3EE27C94/Overview-Great-Wall-of-China.jpg?w=800&h=450&c=crop",
    "https://media.worldnomads.com/Explore/middle-east/hagia-sophia-church-istanbul-turkey-gettyimages-skaman306.jpg",
    "https://www.state.gov/wp-content/uploads/2018/11/France-1980x1406.jpg",
  ];
  return (
    <div className="pList">
      {loading ? (
        "loading"
      ) : (
        <>
          {data &&
            images.map((img, i) => (
              <div
                className="pListItem"
                key={i}
                onClick={() => handleOnClickSearch(data[i]?.country)}
              >
                <img src={img} alt="" className="pListImg" />
                <div className="pListTitles">
                  <h1>{data[i]?.country}</h1>
                  <h2>{data[i]?.count} offers</h2>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default PropertyList;
