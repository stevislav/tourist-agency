import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faCar,
  faPlane,
  faGlobe,
  faLocationPin,
  faShip,
  faTrain,
  faTags,
} from "@fortawesome/free-solid-svg-icons";

import { DateRange } from "react-date-range";
import { useContext, useEffect, useState } from "react";
import { format } from "date-fns";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";

const Header = ({
  type,
  refetch,
  setLimit,
  setS1,
  setS2,
  setS3,
  setDate,
  setPageNumber,
  S1,
  S2,
  S3,
  listDates,
  openReserve,
}) => {
  const location = useLocation();
  const path = location.pathname.split("/");
  //console.log(path)

  // da li su preporuke za search otvorene
  const [openSearch1, setOpenSearch1] = useState(false);
  const [openSearch2, setOpenSearch2] = useState(false);
  const [openSearch3, setOpenSearch3] = useState(false);
  // isto to i za datume
  const [openDate, setOpenDate] = useState(false);

  // ako smo na listi pokupi njene vrednosti
  const [dates, setDates] = useState(
    listDates === undefined
      ? [
          {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
          },
        ]
      : listDates
  );

  // ako smo na listi pokupi njene vrednosti
  const [search1, setSearch1] = useState(S1 === undefined ? "" : S1);
  const [search2, setSearch2] = useState(S2 === undefined ? "" : S2);
  const [search3, setSearch3] = useState(S3 === undefined ? "" : S3);

  // broj ponuda po stranici
  const [pageSize, setPageSize] = useState(50);

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    // zatvaramo dropdown menije
    setOpenSearch1(false);
    setOpenSearch2(false);
    setOpenSearch3(false);
    setOpenDate(false);

    dispatch({
      type: "NEW_SEARCH",
      payload: { search1, search2, search3, dates },
    });

    // proverava da li smo na listi
    if (path[1] === "offers" && path.length === 2) {
      // setujemo podatke iz liste
      setS1(search1);
      setS2(search2);
      setS3(search3);
      setDate(dates);
      setPageNumber(1);
    } else {
      // u slucaju da nismo na listi usmereni smo tamo
      navigate("/offers", {
        state: { search1, search2, search3, dates, pageSize },
      });
    }
  };

  // prikaz svih ponuda
  const handleOffers = () => {
    setSearch1("");
    setSearch2("");
    setSearch3("");
    handleSearch();
  };

  // ako smo na stranici sa ponudom zatvaraju nam se dropdown meniji iz searcha
  useEffect(() => {
    if (openReserve === true) {
      setOpenSearch1(false);
      setOpenSearch2(false);
      setOpenSearch3(false);
      setOpenDate(false);
    }
  }, [openReserve]);

  return (
    <div className="header">
      <div className="headerContainer">
        <div className="headerList">
          <div className="headerListItem">
            <span className="allOffers" onClick={handleOffers}>
              <FontAwesomeIcon icon={faTags} className="offerIcon" />
              all offers
            </span>
          </div>
        </div>

        <h1 className="headerTitle">A lifetime of discounts? It's Genius.</h1>
        <p className="headerDesc">
          Get rewarded for your travels - unlock instant savings of 10% or more
          with a free Instabooking account
        </p>

        <div className="headerSearch">
          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faLocationPin} className="headerIcon" />
            <input
              id="1"
              type="text"
              placeholder="Name/Location..."
              className="headerSearchInput"
              defaultValue={S1 === undefined ? "" : S1}
              onChange={(e) => setSearch1(e.target.value)}
              onClick={() => setOpenSearch1(!openSearch1)}
            />
            {openSearch1 && (
              <div className="nameModal">
                <div
                  id="Guadalajara"
                  className="singleItem"
                  onClick={(e) => {
                    setSearch1(e.target.id);
                    e.target.parentElement.parentElement.children[1].value =
                      e.target.id;
                    setOpenSearch1(!openSearch1);
                  }}
                >
                  <FontAwesomeIcon
                    icon={faLocationPin}
                    className="locationsIcon"
                  />
                  Guadalajara
                </div>
                <div
                  id="Berlin"
                  className="singleItem"
                  onClick={(e) => {
                    setSearch1(e.target.id);
                    e.target.parentElement.parentElement.children[1].value =
                      e.target.id;
                    setOpenSearch1(!openSearch1);
                  }}
                >
                  <FontAwesomeIcon
                    icon={faLocationPin}
                    className="locationsIcon"
                  />
                  Berlin
                </div>
                <div
                  id="Melbourne"
                  className="singleItem"
                  onClick={(e) => {
                    setSearch1(e.target.id);
                    e.target.parentElement.parentElement.children[1].value =
                      e.target.id;
                    setOpenSearch1(!openSearch1);
                  }}
                >
                  <FontAwesomeIcon
                    icon={faLocationPin}
                    className="locationsIcon"
                  />
                  Melbourne
                </div>
                <div
                  id="London"
                  className="singleItem"
                  onClick={(e) => {
                    setSearch1(e.target.id);
                    e.target.parentElement.parentElement.children[1].value =
                      e.target.id;
                    setOpenSearch1(!openSearch1);
                  }}
                >
                  <FontAwesomeIcon
                    icon={faLocationPin}
                    className="locationsIcon"
                  />
                  London
                </div>
                <div
                  id="Paris"
                  className="singleItem"
                  onClick={(e) => {
                    setSearch1(e.target.id);
                    e.target.parentElement.parentElement.children[1].value =
                      e.target.id;
                    setOpenSearch1(!openSearch1);
                  }}
                >
                  <FontAwesomeIcon
                    icon={faLocationPin}
                    className="locationsIcon"
                  />
                  Paris
                </div>
              </div>
            )}
          </div>
          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faGlobe} className="headerIcon" />
            <input
              id="2"
              type="text"
              placeholder="Continent/Country..."
              className="headerSearchInput"
              defaultValue={S2 === undefined ? "" : S2}
              onChange={(e) => setSearch2(e.target.value)}
              onClick={() => setOpenSearch2(!openSearch2)}
            />
            {openSearch2 && (
              <div className="ccModal">
                <div
                  id="Europe"
                  className="singleItem"
                  onClick={(e) => {
                    setSearch2(e.target.id);
                    e.target.parentElement.parentElement.children[1].value =
                      e.target.id;
                    setOpenSearch2(!openSearch2);
                  }}
                >
                  <FontAwesomeIcon icon={faGlobe} className="locationsIcon" />
                  Europe
                </div>
                <div
                  id="North America"
                  className="singleItem"
                  onClick={(e) => {
                    setSearch2(e.target.id);
                    e.target.parentElement.parentElement.children[1].value =
                      e.target.id;
                    setOpenSearch2(!openSearch2);
                  }}
                >
                  <FontAwesomeIcon icon={faGlobe} className="locationsIcon" />
                  North America
                </div>
                <div
                  id="Australia"
                  className="singleItem"
                  onClick={(e) => {
                    setSearch2(e.target.id);
                    e.target.parentElement.parentElement.children[1].value =
                      e.target.id;
                    setOpenSearch2(!openSearch2);
                  }}
                >
                  <FontAwesomeIcon icon={faGlobe} className="locationsIcon" />
                  Australia
                </div>
                <div
                  id="France"
                  className="singleItem"
                  onClick={(e) => {
                    setSearch2(e.target.id);
                    e.target.parentElement.parentElement.children[1].value =
                      e.target.id;
                    setOpenSearch2(!openSearch2);
                  }}
                >
                  <FontAwesomeIcon icon={faGlobe} className="locationsIcon" />
                  France
                </div>
                <div
                  id="China"
                  className="singleItem"
                  onClick={(e) => {
                    setSearch2(e.target.id);
                    e.target.parentElement.parentElement.children[1].value =
                      e.target.id;
                    setOpenSearch2(!openSearch2);
                  }}
                >
                  <FontAwesomeIcon icon={faGlobe} className="locationsIcon" />
                  China
                </div>
              </div>
            )}
          </div>

          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faCar} className="headerIcon" />
            <input
              id="3"
              type="text"
              placeholder="Arrive with what?"
              className="headerSearchInput"
              defaultValue={S3 === undefined ? "" : S3}
              onChange={(e) => setSearch3(e.target.value)}
              onClick={() => setOpenSearch3(!openSearch3)}
            />
            {openSearch3 && (
              <div className="transportModal">
                <div
                  id="Bus"
                  className="singleItem"
                  onClick={(e) => {
                    setSearch3(e.target.id);
                    e.target.parentElement.parentElement.children[1].value =
                      e.target.id;
                    setOpenSearch3(!openSearch3);
                  }}
                >
                  <FontAwesomeIcon icon={faCar} className="locationsIcon" />
                  Bus
                </div>
                <div
                  id="Ship"
                  className="singleItem"
                  onClick={(e) => {
                    setSearch3(e.target.id);
                    e.target.parentElement.parentElement.children[1].value =
                      e.target.id;
                    setOpenSearch3(!openSearch3);
                  }}
                >
                  <FontAwesomeIcon icon={faShip} className="locationsIcon" />
                  Ship
                </div>
                <div
                  id="Car"
                  className="singleItem"
                  onClick={(e) => {
                    setSearch3(e.target.id);
                    e.target.parentElement.parentElement.children[1].value =
                      e.target.id;
                    setOpenSearch3(!openSearch3);
                  }}
                >
                  <FontAwesomeIcon icon={faCar} className="locationsIcon" />
                  Car
                </div>
                <div
                  id="Train"
                  className="singleItem"
                  onClick={(e) => {
                    setSearch3(e.target.id);
                    e.target.parentElement.parentElement.children[1].value =
                      e.target.id;
                    setOpenSearch3(!openSearch3);
                  }}
                >
                  <FontAwesomeIcon icon={faTrain} className="locationsIcon" />
                  Train
                </div>
                <div
                  id="Plane"
                  className="singleItem"
                  onClick={(e) => {
                    setSearch3(e.target.id);
                    e.target.parentElement.parentElement.children[1].value =
                      e.target.id;
                    setOpenSearch3(!openSearch3);
                  }}
                >
                  <FontAwesomeIcon icon={faPlane} className="locationsIcon" />
                  Plane
                </div>
              </div>
            )}
          </div>
          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
            <span
              onClick={() => setOpenDate(!openDate)}
              className="headerSearchText"
            >{`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(
              dates[0].endDate,
              "dd/MM/yyyy"
            )}`}</span>
            {openDate && (
              <DateRange
                editableDateInputs={true}
                onChange={(item) => {
                  /*console.log(item);*/ setDates([item.selection]);
                }}
                moveRangeOnFirstSelection={false}
                ranges={dates}
                className="date"
                //minDate={new Date()}
              />
            )}
          </div>

          <div className="headerSearchItem">
            <button className="headerBtn" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
