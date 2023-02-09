import { faLocationDot, faScroll } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import "./offer.css";
import { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";
import DotLoader from "react-spinners/DotLoader";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import TrainIcon from "@mui/icons-material/Train";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import WifiIcon from "@mui/icons-material/Wifi";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import TvIcon from "@mui/icons-material/Tv";
import KitchenIcon from "@mui/icons-material/Kitchen";
import {
  faCalendarDays,
  faCalendarXmark,
} from "@fortawesome/free-solid-svg-icons";

const Offer = () => {
  // useLocation se koristi za putanju
  const location = useLocation();
  const idnums = location.pathname.split("/");
  const id = idnums[idnums.length - 1]; //uvek se docepa poslednjeg clana, sto je id

  const [slideNumber, setSlideNumber] = useState(0);
  // openModali za rezervaciju i slike
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { data, loading, error, reFetch } = useFetch(`/offers/find/${id}`);
  console.log(data);

  // podaci korisnika iz contexta
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const readableStartDate = new Date(data.startDate);
  const readableEndDate = new Date(data.endDate);
  const currentDate = new Date();

  let active = true;
  let calendarIcon = (
    <FontAwesomeIcon icon={faCalendarDays} className="iconCal" />
  );
  // u zavisnosti da li je ponuda istekla koristimo drugaciju ikonicu za kalendar
  if (data.startDate - currentDate.getTime() < 0) {
    active = false;
    calendarIcon = (
      <FontAwesomeIcon icon={faCalendarXmark} className="iconCal" />
    );
  }

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

  console.log(user);

  // otvaranje modala za slike
  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  // biramo koja slika ce da bude prikazana
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

  // moram da budemo ulogovani da bi otvorili modal za rezervaciju
  const handleClick = () => {
    if (user) {
      {
        setOpenModal(true);
      }
    } else {
      navigate("/login");
    }
  };

  // razdvajanje gradova iz baze
  const citiesBuilder = () => {
    let cities = "";
    for (let i = 0; i < data.location.length; i++) {
      // odvajanje lokacija
      if (i === data.location.length - 1) {
        cities = cities + data.location[i] + " (" + data.daysPerLocation[i];
        if (data.daysPerLocation[i] == 1) {
          cities = cities + " day)";
        } else {
          cities = cities + " days)";
        }
      } else {
        cities = cities + data.location[i] + " (" + data.daysPerLocation[i];
        if (data.daysPerLocation[i] == 1) {
          cities = cities + " day)";
        } else {
          cities = cities + " days)";
        }
        cities = cities + ", ";
      }
    }
    return cities;
  };

  // broj provedenih dana u ponudi
  const amountDays = () => {
    let days = 0;
    for (let i = 0; i < data.daysPerLocation.length; i++) {
      days = days + data.daysPerLocation[i];
    }
    return days;
  };

  let roomType;

  switch (data.roomType) {
    case "1/1":
      roomType = "Room with one bed";
      break;
    case "1/2":
      roomType = "Room with two beds";
      break;
    case "1/3":
      roomType = "Room with three beds";
      break;
    case "1/3 + 1":
      roomType = "Room with three beds and a bunk";
      break;
    case "1/4":
      roomType = "Room with four beds";
      break;
    case "1/2 + 1":
      roomType = "Room with two beds and a bunk";
      break;
  }

  let transportIcon;
  // ikonica za svaki tip transporta
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

  let rating;

  switch (data.accommodationType) {
    case 1:
      rating = (
        <>
          <StarIcon />
          <StarBorderIcon />
          <StarBorderIcon />
          <StarBorderIcon />
          <StarBorderIcon />
        </>
      );
      break;
    case 2:
      rating = (
        <>
          <StarIcon />
          <StarIcon />
          <StarBorderIcon />
          <StarBorderIcon />
          <StarBorderIcon />
        </>
      );
      break;
    case 3:
      rating = (
        <>
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarBorderIcon />
          <StarBorderIcon />
        </>
      );
      break;
    case 4:
      rating = (
        <>
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarBorderIcon />
        </>
      );
      break;
    case 5:
      rating = (
        <>
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
        </>
      );
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
              <CloseIcon className="close" onClick={() => setOpen(false)} />
              <NavigateBeforeIcon
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
              <NavigateNextIcon
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="hotelWrapper">
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="ratingStars">{rating}</div>
            <div className="continents">
              <span>{data.continent}</span>, {data.country}
            </div>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>
                Locations:{" "}
                <span>
                  {data.location === undefined ? "" : citiesBuilder()}
                </span>
              </span>
            </div>
            <div className="rangeDate">
              {calendarIcon} <span className="dateColor">Date: </span>
              <span className={active ? "siTaxiOp2" : "work2"}>
                {readableStartDate.toDateString()} -{" "}
                {readableEndDate.toDateString()}
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
            <div className="addons">
              <div className="tooltip">
                <WifiIcon
                  className={data.internet ? "addon yes" : "addon no"}
                />
                <span class="tooltiptext">
                  Wi-fi {data.internet ? "available" : "unavailable"}
                </span>
              </div>
              <div className="tooltip">
                <AcUnitIcon
                  className={data.airConditioning ? "addon yes" : "addon no"}
                />
                <span class="tooltiptext">
                  AC {data.airConditioning ? "available" : "unavailable"}
                </span>
              </div>
              <div className="tooltip">
                <TvIcon className={data.tv ? "addon yes" : "addon no"} />
                <span class="tooltiptext">
                  TV {data.tv ? "available" : "unavailable"}
                </span>
              </div>
              <div className="tooltip">
                <KitchenIcon
                  className={data.roomFridge ? "addon yes" : "addon no"}
                />
                <span class="tooltiptext">
                  Fridge {data.roomFridge ? "available" : "unavailable"}
                </span>
              </div>
            </div>
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
                        <div className="div">
                          <span>{i + 1}. DAY</span>
                          <div>{desc}</div>
                        </div>
                        <hr />
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
                  This {data.daysPerLocation === undefined ? "" : amountDays()}
                  -day offer has
                </h1>
                <span>
                  {roomType} in a {data.accommodationType}-star{" "}
                  <span
                    style={{ fontWeight: "bold", textTransform: "capitalize" }}
                  >
                    {data.accommodation}!
                  </span>
                </span>
                <h2>
                  <b style={{ color: "green" }}>€{data.price}</b>
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
        </div>
      )}
      <Footer />
      {openModal && <Reserve setOpen={setOpenModal} offerId={id} />}
    </div>
  );
};

export default Offer;
