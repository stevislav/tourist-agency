import { Link } from "react-router-dom";
import "./searchItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faCalendarXmark,
} from "@fortawesome/free-solid-svg-icons";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import TrainIcon from "@mui/icons-material/Train";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";

const SearchItem = ({ item }) => {
  const readableStartDate = new Date(item.startDate);
  const readableEndDate = new Date(item.endDate);
  const currentDate = new Date();

  let active = true;
  let calendarIcon = (
    <FontAwesomeIcon icon={faCalendarDays} className="iconCal" />
  );
  // ikonica u zavisnosti od datuma ponude
  if (item.startDate - currentDate.getTime() < 0) {
    active = false;
    calendarIcon = (
      <FontAwesomeIcon icon={faCalendarXmark} className="iconCal" />
    );
  }

  let transportIcon;
  // ikonica u zavisnosti od tipa transporta
  switch (item.transportType) {
    case "plane":
      transportIcon = <AirplanemodeActiveIcon className="transportIcon" />;
      break;
    case "car":
      transportIcon = <DirectionsCarIcon className="transportIcon" />;
      break;
    case "train":
      transportIcon = <TrainIcon className="transportIcon" />;
      break;
    case "ship":
      transportIcon = <DirectionsBoatIcon className="transportIcon" />;
      break;
    case "bus":
      transportIcon = <DirectionsBusIcon className="transportIcon" />;
      break;
  }

  let maxDays = 0; // broj indeksa koji odgovara lokaciji sa najvise provedenih dana
  let days = 0; // ukupan broj dana
  let cities = "";

  for (let i = 0; i < item.daysPerLocation.length; i++) {
    days = days + item.daysPerLocation[i];
    if (item.daysPerLocation[i] > maxDays) {
      maxDays = i;
    }

    // odvajanje lokacija
    if (i === item.daysPerLocation.length - 1) {
      cities = cities + item.location[i];
    } else {
      cities = cities + item.location[i] + ", ";
    }
  }

  return (
    <div className="searchItem">
      <Link to={`/offers/${item._id}`}>
        <img src={item.imgPerLocation[maxDays]} alt="" className="siImg" />
      </Link>
      <div className="siDesc">
        <Link to={`/offers/${item._id}`} style={{ textDecoration: "none" }}>
          <h1 id="name" className="siTitle">{item.name}</h1>
        </Link>
        <span id="city" className="siDistance">{cities}</span>
        <span id="date" className={active ? "siTaxiOp" : "work"}>
          {calendarIcon} {readableStartDate.toDateString()} -{" "}
          {readableEndDate.toDateString()}
        </span>
        <span className="siFeatures">
          Transport type:
          <span>
            {transportIcon}
            <span id="transport" className="itemTransport">{item.transportType}</span>
          </span>
        </span>
        <span className="itemDesc">
          <span className="siFeatures">Description:</span> {item.description}
        </span>
        <span className="daysOnTrip">
          Days: <span>{days}</span>
        </span>
      </div>
      <div className="siDetails">
        <div className="siDetailTexts">
          <span className="siPrice">€{item.price}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <span className="siCancelOp">Free cancellation</span>
          <Link to={`/offers/${item._id}`}>
            <button id="see" className="siCheckButton">See availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
