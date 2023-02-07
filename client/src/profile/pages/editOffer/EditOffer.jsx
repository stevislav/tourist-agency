import "./editOffer.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { offerInputs } from "../../formSource";
import axios from "axios";
import { DateRange } from "react-date-range";
import { format, set } from "date-fns";
import { useLocation } from "react-router-dom";
import useFetch from "../../../profile/hooks/useFetch";

const EditOffer = ({}) => {
  const location = useLocation();
  const idnums = location.pathname.split("/");
  const editID = idnums[idnums.length - 1]; //uvek se docepa poslednjeg clana, sto je id
  // const { data, loading, error } = useFetch(`/offers/find/${editID}`);

  const [data, setData] = useState({});
  const handler = async () => {
    const response = await fetch(`/offers/find/${editID}`);
    const data = await response.json();
    setData(data);
    setInfo({
      name: data.name,
      price: data.price,
      description: data.description,
      transportType: data.transportType,
      accommodation: data.accommodation,
      continent: data.continent,
      country: data.country,
      location: data.location,
      daysPerLocation: data.daysPerLocation,
      descPerDay: data.descPerDay,
      roomType: data.roomType,
      accommodationType: data.accommodationType,
      internet: data.internet,
      tv: data.tv,
      airConditioning: data.airConditioning,
      roomFridge: data.roomFridge,
    });
    setDates([
      {
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        key: "selection",
      },
    ]);
    const sumOfDays = data.daysPerLocation.reduce((a, b) => a + b, 0);
    setDays(sumOfDays);
  };
  useEffect(() => {
    handler();
  }, []);

  const [errorMessage, setErrorMessage] = useState("");
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({
    name: data.name,
    price: data.price,
    description: data.description,
    transportType: data.transportType,
    accommodation: data.accommodation,
    continent: data.continent,
    country: data.country,
    location: data.location,
    daysPerLocation: data.daysPerLocation,
    descPerDay: data.descPerDay,
    roomType: data.roomType,
    accommodationType: data.accommodationType,
    internet: data.internet,
    tv: data.tv,
    airConditioning: data.airConditioning,
    roomFridge: data.roomFridge,
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
    setErrorMessage("Working..");
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

    if (files === "") {
      if (
        !(
          entryTest["location"].length === data.imgPerLocation.length &&
          entryTest["location"].length === entryTest["daysPerLocation"].length
        )
      ) {
        setErrorMessage(
          "Number of pictures entered/days per locations must match number of locations!"
        );
        return;
      }
    } else {
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
    }

    if (!(entryTest["descPerDay"].length === days)) {
      setErrorMessage(
        "Number of descriptions must match total number of days!"
      );
      return;
    }
    // console.log(entry)

    if (files === "") {
      try {
        const entry = {
          ...info,
          startDate: startMS.getTime(),
          endDate: endMS.getTime(),
          imgPerLocation: data.imgPerLocation,
        };
        await axios.put(`/offers/${editID}`, entry);
        setErrorMessage("Successfully edited offer!");
        setTimeout(() => setErrorMessage(""), 3000);
      } catch (err) {
        console.log(err);
      }
    } else {
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
        await axios.put(`/offers/${editID}`, entry);
        setErrorMessage("Successfully edited offer!");
        setTimeout(() => setErrorMessage(""), 5000);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="new">
      <Sidebar />

      <div className="newContainer">
        <div className="topNewOffer"></div>
        <div className="topOffer">
          <h1>{errorMessage === "" ? "Edit Offer" : errorMessage}</h1>
        </div>
        <div className="bottomOffer">
          <div className="left">
            {files && data.imgPerLocation !== undefined ? (
              <>
                <div className="imgHalf">
                  <img
                    src={
                      files[0]
                        ? URL.createObjectURL(files[0])
                        : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                    }
                    alt=""
                  />
                  {files[1] && (
                    <img src={URL.createObjectURL(files[1])} alt="" />
                  )}
                  {files[2] && (
                    <img src={URL.createObjectURL(files[2])} alt="" />
                  )}
                </div>
                <div className="imgSecondHalf">
                  {files[3] && (
                    <img src={URL.createObjectURL(files[3])} alt="" />
                  )}
                  {files[4] && (
                    <img src={URL.createObjectURL(files[4])} alt="" />
                  )}
                  {files[5] && (
                    <img src={URL.createObjectURL(files[5])} alt="" />
                  )}
                </div>
              </>
            ) : (
              <>
                {data.imgPerLocation === undefined ? (
                  ""
                ) : (
                  <>
                    <div className="imgHalf">
                      <img src={data.imgPerLocation[0]} alt="" />
                      {data.imgPerLocation[1] && (
                        <img src={data.imgPerLocation[1]} alt="" />
                      )}
                      {data.imgPerLocation[2] && (
                        <img src={data.imgPerLocation[2]} alt="" />
                      )}
                    </div>
                    <div className="imgSecondHalf">
                      {data.imgPerLocation[3] && (
                        <img src={data.imgPerLocation[3]} alt="" />
                      )}
                      {data.imgPerLocation[4] && (
                        <img src={data.imgPerLocation[4]} alt="" />
                      )}
                      {data.imgPerLocation[5] && (
                        <img src={data.imgPerLocation[5]} alt="" />
                      )}
                    </div>
                  </>
                )}
              </>
            )}

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
                        defaultValue={data[input.id]}
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
                    <option value={1} selected={data.accommodationType === 1}>
                      1 star
                    </option>
                    <option value={2} selected={data.accommodationType === 2}>
                      2 stars
                    </option>
                    <option value={3} selected={data.accommodationType === 3}>
                      3 stars
                    </option>
                    <option value={4} selected={data.accommodationType === 4}>
                      4 stars
                    </option>
                    <option value={5} selected={data.accommodationType === 5}>
                      5 stars
                    </option>
                  </select>
                </div>
                <div className="formInput">
                  <label>Continent</label>
                  <select
                    onChange={handleChange}
                    id="continent"
                    className="inputChoose"
                  >
                    <option
                      value={"Europe"}
                      selected={data.continent === "Europe"}
                    >
                      Europe
                    </option>
                    <option value={"Asia"} selected={data.continent === "Asia"}>
                      Asia
                    </option>
                    <option
                      value={"North America"}
                      selected={data.continent === "North America"}
                    >
                      North America
                    </option>
                    <option
                      value={"South America"}
                      selected={data.continent === "South America"}
                    >
                      South America
                    </option>
                    <option
                      value={"Africa"}
                      selected={data.continent === "Africa"}
                    >
                      Africa
                    </option>
                    <option
                      value={"Australia"}
                      selected={data.continent === "Australia"}
                    >
                      Australia and Oceania
                    </option>
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
                    defaultValue={data.country}
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
                      <option value={"1/1"} selected={data.roomType === "1/1"}>
                        1/1
                      </option>
                      <option value={"1/2"} selected={data.roomType === "1/2"}>
                        1/2
                      </option>
                      <option value={"1/3"} selected={data.roomType === "1/3"}>
                        1/3
                      </option>
                      <option
                        value={"1/2 + 1"}
                        selected={data.roomType === "1/2 + 1"}
                      >
                        1/2 + 1
                      </option>
                      <option value={"1/4"} selected={data.roomType === "1/4"}>
                        1/4
                      </option>
                      <option
                        value={"1/3 + 1"}
                        selected={data.roomType === "1/3 + 1"}
                      >
                        1/3 + 1
                      </option>
                    </select>
                  </div>
                  <div className="formInput">
                    <label>Transport Type</label>
                    <select
                      onChange={handleChange}
                      id="transportType"
                      className="inputChoose"
                    >
                      <option
                        value={"bus"}
                        selected={data.transportType === "bus"}
                      >
                        Bus
                      </option>
                      <option
                        value={"plane"}
                        selected={data.transportType === "plane"}
                      >
                        Plane
                      </option>
                      <option
                        value={"ship"}
                        selected={data.transportType === "ship"}
                      >
                        Ship
                      </option>
                      <option
                        value={"train"}
                        selected={data.transportType === "train"}
                      >
                        Train
                      </option>
                      <option
                        value={"car"}
                        selected={data.transportType === "car"}
                      >
                        Car
                      </option>
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
                    <option
                      value={"hotel"}
                      selected={data.accommodation === "hotel"}
                    >
                      Hotel
                    </option>
                    <option
                      value={"resort"}
                      selected={data.accommodation === "resort"}
                    >
                      Resort
                    </option>
                    <option
                      value={"apartment"}
                      selected={data.accommodation === "apartment"}
                    >
                      Apartment
                    </option>
                    <option
                      value={"bungalow"}
                      selected={data.accommodation === "bungalow"}
                    >
                      Bungalow
                    </option>
                    <option
                      value={"cabin"}
                      selected={data.accommodation === "cabin"}
                    >
                      Cabin
                    </option>
                    <option
                      value={"villa"}
                      selected={data.accommodation === "villa"}
                    >
                      Villa
                    </option>
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
                        defaultChecked={data.internet}
                      />
                    </div>
                    <div className="commodity">
                      <label className="commodity2">TV</label>
                      <input
                        onChange={handleChange}
                        type="checkbox"
                        id="tv"
                        className="commodityCheck"
                        defaultChecked={data.tv}
                      />
                    </div>
                    <div className="commodity">
                      <label className="commodity2">AC</label>
                      <input
                        onChange={handleChange}
                        type="checkbox"
                        id="airConditioning"
                        className="commodityCheck"
                        defaultChecked={data.airConditioning}
                      />
                    </div>
                    <div className="commodity">
                      <label className="commodity2">Fridge</label>
                      <input
                        onChange={handleChange}
                        type="checkbox"
                        id="roomFridge"
                        className="commodityCheck"
                        defaultChecked={data.roomFridge}
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
                    defaultValue={data.location}
                  ></textarea>
                </div>
                <div className="formInput">
                  <label className="inputDesc">Days per Location</label>
                  <textarea
                    onChange={handleChange}
                    id="daysPerLocation"
                    placeholder="Enter days spent at each entered location respectively like this: 2,3,etc..."
                    className="borderColor"
                    defaultValue={data.daysPerLocation}
                  ></textarea>
                </div>
                <div className="formInput">
                  <label className="inputDesc">Description</label>
                  <textarea
                    onChange={handleChange}
                    id="description"
                    placeholder="Enter a description here..."
                    className="borderColor"
                    defaultValue={data.description}
                  ></textarea>
                </div>
                <div className="formInput">
                  <label className="inputDesc">Description per Day</label>
                  <textarea
                    onChange={handleChange}
                    id="descPerDay"
                    placeholder="Enter guides per day like this; Description 1, Description 2,etc..."
                    className="borderColor"
                    defaultValue={data.descPerDay}
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

export default EditOffer;
