import "./newOffer.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { offerInputs } from "../../formSource";
import axios from "axios";
import { DateRange } from "react-date-range";
import { format } from "date-fns";

const NewOffer = ({}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({
    name: undefined,
    price: undefined,
    description: undefined,
    transportType: "bus",
    accommodation: "hotel",
    continent: "Europe",
    country: undefined,
    location: undefined,
    daysPerLocation: undefined,
    descPerDay: undefined,
    roomType: "1/1",
    accommodationType: "1",
    internet: false,
    tv: false,
    airConditioning: false,
    roomFridge: false,
  });

  const [openDate, setOpenDate] = useState(false);
  const [days, setDays] = useState(0);

  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleChange = (e) => {
    setErrorMessage("");
    if (e.target.type === "checkbox") {
      setInfo((prev) => ({ ...prev, [e.target.id]: e.target.checked }));
    } else {
      if (
        e.target.id === "location" ||
        e.target.id === "daysPerLocation" ||
        e.target.id === "descPerDay"
      ) {
        const values = e.target.value.split(",");
        if (e.target.id === "daysPerLocation") {
          for (let i = 0; i < values.length; i++) {
            values[i] = parseInt(values[i]);
          }
          const sumOfDays = values.reduce((a, b) => a + b, 0);
          setDays(sumOfDays);
        }
        setInfo((prev) => ({ ...prev, [e.target.id]: values }));
      } else {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
      }
    }
    console.log(info);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const startMS = new Date(dates[0]["startDate"]);
    const endMS = new Date(dates[0]["endDate"]);
    const entryTest = {
      ...info,
      startDate: startMS.getTime(),
      endDate: endMS.getTime(),
    };

    for (const [key, value] of Object.entries(entryTest)) {
      if (value === undefined) {
        setErrorMessage("All inputs must be provided!");

        return;
      }
    }

    if (
      !(
        entryTest["location"].length === files.length &&
        entryTest["location"].length === entryTest["daysPerLocation"].length
      )
    ) {
      setErrorMessage(
        "Number of pictures entered/days per locations must match number of locations!"
      );

      return;
    }

    if (!(entryTest["descPerDay"].length === days)) {
      setErrorMessage(
        "Number of descriptions must match total number of days!"
      );

      return;
    }
    // console.log(entry)

    try {
      const filesArray = [];
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dnwggl9ra/image/upload",
            data
          );
          const url = uploadRes.data;
          filesArray.push(url.url);
        })
      );
      // ovo je sve za upload zakomentarisano
      const entry = {
        ...info,
        startDate: startMS.getTime(),
        endDate: endMS.getTime(),
        imgPerLocation: filesArray,
      };
      await axios.post("/offers", entry);
      console.log(entry);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="new">
      <Sidebar />

      <div className="newContainer">
        <div className="topNewOffer"></div>
        <div className="topOffer">
          <h1>{errorMessage === "" ? "Add New Offer" : errorMessage}</h1>
        </div>
        <div className="bottomOffer">
          <div className="left">
            <div className="imgHalf">
              <img
                src={
                  files[0]
                    ? URL.createObjectURL(files[0])
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt=""
              />
              {files[1] && <img src={URL.createObjectURL(files[1])} alt="" />}
              {files[2] && <img src={URL.createObjectURL(files[2])} alt="" />}
            </div>
            <div className="imgSecondHalf">
              {files[3] && <img src={URL.createObjectURL(files[3])} alt="" />}
              {files[4] && <img src={URL.createObjectURL(files[4])} alt="" />}
              {files[5] && <img src={URL.createObjectURL(files[5])} alt="" />}
            </div>

            <div className="dateHalf">
              <span
                onClick={() => setOpenDate(!openDate)}
                className="headerSearchText headerSearchTextOffer"
              >{`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(
                dates[0].endDate,
                "dd/MM/yyyy"
              )}`}</span>
              {openDate && (
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => {
                    console.log(item);
                    setDates([item.selection]);
                  }}
                  moveRangeOnFirstSelection={false}
                  ranges={dates}
                  className="date2"
                  minDate={new Date()}
                />
              )}
            </div>
          </div>

          <div className="formInput formIcon">
            <label htmlFor="file" className="pointer">
              Image: <DriveFolderUploadOutlinedIcon />
            </label>
            <input
              type="file"
              id="file"
              multiple
              onChange={(e) => {
                if (e.target.files.length < 7) {
                  setFiles(e.target.files);
                } else {
                  setErrorMessage(
                    "Number of locations/files must be 6 or lower!"
                  );
                }
              }}
              style={{ display: "none" }}
            />
          </div>
          <div className="right">
            <form>
              <div className="wrapHalf">
                <div className="wrapdiv">
                  {offerInputs.map((input) => (
                    <div className="formInput formInput1" key={input.id}>
                      <label>{input.label}</label>
                      <input
                        id={input.id}
                        onChange={handleChange}
                        type={input.type}
                        placeholder={input.placeholder}
                        min="0"
                        style={{ outline: "none", textDecoration: "none" }}
                      />
                    </div>
                  ))}
                </div>

                <div className="formInput">
                  <label>Rating</label>
                  <select
                    onChange={handleChange}
                    id="accommodationType"
                    className="inputChoose"
                  >
                    <option value={1}>1 star</option>
                    <option value={2}>2 stars</option>
                    <option value={3}>3 stars</option>
                    <option value={4}>4 stars</option>
                    <option value={5}>5 stars</option>
                  </select>
                </div>
                <div className="formInput">
                  <label>Continent</label>
                  <select
                    onChange={handleChange}
                    id="continent"
                    className="inputChoose"
                  >
                    <option value={"Europe"}>Europe</option>
                    <option value={"Asia"}>Asia</option>
                    <option value={"North America"}>North America</option>
                    <option value={"South America"}>South America</option>
                    <option value={"Africa"}>Africa</option>
                    <option value={"Australia"}>Australia and Oceania</option>
                  </select>
                </div>
                <div className="formInput formInputCountry">
                  <label>Country</label>
                  <input
                    id="country"
                    onChange={handleChange}
                    type="text"
                    placeholder="Enter country here..."
                    style={{ outline: "none" }}
                    className="inputCountry"
                  />
                </div>
                <div className="roomTransport">
                  <div className="formInput">
                    <label>Room Type</label>
                    <select
                      onChange={handleChange}
                      id="roomType"
                      className="inputChoose"
                    >
                      <option value={"1/1"}>1/1</option>
                      <option value={"1/2"}>1/2</option>
                      <option value={"1/3"}>1/3</option>
                      <option value={"1/2 + 1"}>1/2 + 1</option>
                      <option value={"1/4"}>1/4</option>
                      <option value={"1/3 + 1"}>1/3 + 1</option>
                    </select>
                  </div>
                  <div className="formInput">
                    <label>Transport Type</label>
                    <select
                      onChange={handleChange}
                      id="transportType"
                      className="inputChoose"
                    >
                      <option value={"bus"}>Bus</option>
                      <option value={"plane"}>Plane</option>
                      <option value={"ship"}>Ship</option>
                      <option value={"train"}>Train</option>
                      <option value={"car"}>Car</option>
                    </select>
                  </div>
                </div>

                <div className="formInput">
                  <label>Accommodation</label>
                  <select
                    onChange={handleChange}
                    id="accommodation"
                    className="inputChoose"
                  >
                    <option value={"hotel"}>Hotel</option>
                    <option value={"resort"}>Resort</option>
                    <option value={"apartment"}>Apartment</option>
                    <option value={"bungalow"}>Bungalow</option>
                    <option value={"cabin"}>Cabin</option>
                    <option value={"villa"}>Villa</option>
                  </select>
                </div>
                <div className="checkHalf">
                  <div className="formInput">
                    <div className="commodity">
                      <label className="commodity2">Internet</label>
                      <input
                        onChange={handleChange}
                        type="checkbox"
                        id="internet"
                        className="commodityCheck"
                      />
                    </div>
                    <div className="commodity">
                      <label className="commodity2">TV</label>
                      <input
                        onChange={handleChange}
                        type="checkbox"
                        id="tv"
                        className="commodityCheck"
                      />
                    </div>
                    <div className="commodity">
                      <label className="commodity2">AC</label>
                      <input
                        onChange={handleChange}
                        type="checkbox"
                        id="airConditioning"
                        className="commodityCheck"
                      />
                    </div>
                    <div className="commodity">
                      <label className="commodity2">Fridge</label>
                      <input
                        onChange={handleChange}
                        type="checkbox"
                        id="roomFridge"
                        className="commodityCheck"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="wrapSecondHalf">
                <div className="formInput">
                  <label className="inputDesc">Location</label>
                  <textarea
                    onChange={handleChange}
                    id="location"
                    placeholder="Enter locations here like this: Location 1,Location 2,etc..."
                    className="borderColor"
                  ></textarea>
                </div>
                <div className="formInput">
                  <label className="inputDesc">Days per Location</label>
                  <textarea
                    onChange={handleChange}
                    id="daysPerLocation"
                    placeholder="Enter days spent at each entered location respectively like this: 2,3,etc..."
                    className="borderColor"
                  ></textarea>
                </div>
                <div className="formInput">
                  <label className="inputDesc">Description</label>
                  <textarea
                    onChange={handleChange}
                    id="description"
                    placeholder="Enter a description here..."
                    className="borderColor"
                  ></textarea>
                </div>
                <div className="formInput">
                  <label className="inputDesc">Description per Day</label>
                  <textarea
                    onChange={handleChange}
                    id="descPerDay"
                    placeholder="Enter guides per day like this; Description 1, Description 2,etc..."
                    className="borderColor"
                  ></textarea>
                </div>
                <button className="sendButtonOffer" onClick={handleClick}>
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="bottomNewOffer"></div>
      </div>
    </div>
  );
};

export default NewOffer;
