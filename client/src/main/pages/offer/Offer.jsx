import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
  faScroll,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import "./offer.css";
import { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";
import DotLoader from "react-spinners/DotLoader";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import TrainIcon from "@mui/icons-material/Train";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";

const Offer = () => {
  const location = useLocation();
  const idnums = location.pathname.split("/");
  const id = idnums[idnums.length - 1]; //uvek se docepa poslednjeg clana, sto je id

  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { data, loading, error, reFetch } = useFetch(`/offers/find/${id}`);
  console.log(data);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { dates, options } = useContext(SearchContext);

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

  //const days = dayDifference(dates[0].endDate, dates[0].startDate)

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;
    if (direction === "l") {
      newSlideNumber =
        slideNumber === 0 ? data.location.length - 1 : slideNumber - 1;
    } else {
      newSlideNumber =
        slideNumber === data.location.length - 1 ? 0 : slideNumber + 1;
    }
    setSlideNumber(newSlideNumber);
  };

  const handleClick = () => {
    if (user) {
      {
        setOpenModal(true);
      }
    } else {
      navigate("/login");
    }
  };

  const citiesBuilder = () => {
    let cities = "";
    for (let i = 0; i < data.location.length; i++) {
      // odvajanje lokacija
      if (i === data.location.length - 1) {
        cities = cities + data.location[i];
      } else {
        cities = cities + data.location[i] + ", ";
      }
    }
    return cities;
  };

  const amountDays = () => {
    let days = 0;
    for (let i = 0; i < data.daysPerLocation.length; i++) {
      days = days + data.daysPerLocation[i];
    }
    return days;
  };

  let transportIcon;
  switch (data.transportType) {
    case "plane":
      transportIcon = <AirplanemodeActiveIcon className="transportIcon2" />;
      break;
    case "car":
      transportIcon = <DirectionsCarIcon className="transportIcon2" />;
      break;
    case "train":
      transportIcon = <TrainIcon className="transportIcon2" />;
      break;
    case "ship":
      transportIcon = <DirectionsBoatIcon className="transportIcon2" />;
      break;
    case "bus":
      transportIcon = <DirectionsBusIcon className="transportIcon2" />;
      break;
  }

  return (
    <div>
      <Navbar />
      <Header openReserve={openModal} />
      {loading ? (
        loader
      ) : (
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img
                  src={data.imgPerLocation[slideNumber]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="hotelWrapper">
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>
                Locations:{" "}
                <span>
                  {data.location === undefined ? "" : citiesBuilder()}
                </span>
              </span>
            </div>
            <div className="hotelTT">
              {transportIcon}
              <span>
                Arrive by <span className="offerTT">{data.transportType}</span>
              </span>
            </div>
            <span className="hotelDistance">
              <FontAwesomeIcon icon={faScroll} className="reserveDesc" />
              <span>Description: </span>
              <span>{data.description}</span>
            </span>
            <span className="hotelPriceHighlight">
              Book a stay over <span>€{data.price}</span> at this property and
              get a free airport taxi
            </span>
            <div className="hotelImages">
              {data.imgPerLocation?.map(
                (img, i) => (
                  console.log(img),
                  (
                    <div className="hotelImgWrapper">
                      <img
                        onClick={() => handleOpen(i)}
                        src={img}
                        alt=""
                        className="hotelImg"
                      />
                    </div>
                  )
                )
              )}
            </div>
            {data.descPerDay === undefined ? (
              ""
            ) : (
              <>
                <div>
                  {data.descPerDay.map((desc, i) => {
                    return (
                      <div className="display" key={i}>
                        <span>{i + 1}. DAY</span>
                        <div>{desc}</div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc">{data.desc}</p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>
                  Perfect price for a{" "}
                  {data.daysPerLocation === undefined ? "" : amountDays()}-day
                  offer
                </h1>
                <span>{data.description}</span>
                <h2>
                  <b>€{data.price}</b>
                </h2>
                <button
                  disabled={new Date().getTime() > data.startDate}
                  onClick={handleClick}
                >
                  {new Date().getTime() > data.startDate
                    ? "Unavailable"
                    : "Reserve or Book Now!"}
                </button>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} offerId={id} />}
    </div>
  );
};

export default Offer;
