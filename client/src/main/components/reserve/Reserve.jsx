import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useFetch from "../../hooks/useFetch";
import "./reserve.css";

const Reserve = ({ setOpen, offerId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, loading, error, reFetch } = useFetch(`/hotels/room/${offerId}`);

  const savedUser = JSON.parse(localStorage.getItem("user"));
  console.log(savedUser);

  const [fName, setFName] = useState(savedUser.fName);
  const [lName, setLName] = useState(savedUser.lName);
  const [phoneNumber, setPhoneNumber] = useState(savedUser.phoneNumber);
  const [email, setEmail] = useState(savedUser.email);
  const [numOfAdults, setNumOfAdults] = useState(1);
  const [numOfChildren, setNumOfChildren] = useState(0);
  const [paymentType, setPaymentType] = useState("cash");
  const [comment, setComment] = useState("");

  //console.log(fName,lName,email,phoneNumber,numOfAdults,numOfChildren,paymentType)

  const handleSelect = (e) => {};

  const navigate = useNavigate();

  const handleClick = async () => {
    const newPendingOffer = {
      offerID: offerId,
      userID: savedUser._id,
      paymentType: paymentType,
      numOfAdults: numOfAdults,
      numOfChildren: numOfChildren,
      comment: comment,
      fName: fName,
      lName: lName,
      phoneNumber: phoneNumber,
      email: email,
    };
    try {
      await axios.post("/pendingoffers", newPendingOffer);
      setOpen(false);
      //navigate("/")
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Book your stay:</span>
        <div className="rItem">
          <div className="rItemInfo">
            <label>First Name</label>
            <input
              type="text"
              className="reserveInput"
              placeholder="fname"
              defaultValue={savedUser.fName}
              onChange={(e) => setFName(e.target.value)}
            />
            <label>Last Name</label>
            <input
              type="text"
              placeholder="lname"
              className="reserveInput"
              defaultValue={savedUser.lName}
              onChange={(e) => setLName(e.target.value)}
            />
            <label>Phone</label>
            <input
              type="text"
              placeholder="phone"
              defaultValue={savedUser.phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <label>E-Mail</label>
            <input
              type="text"
              placeholder="email"
              defaultValue={savedUser.email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Payment method</label>
            <select onChange={(e) => setPaymentType(e.target.value)}>
              <option value={"cash"}>cash</option>
              <option value={"card"}>card</option>
            </select>
            <label>Number of adults</label>
            <input
              min="1"
              type="number"
              placeholder="numOfAdults"
              defaultValue={1}
              onChange={(e) => setNumOfAdults(e.target.value)}
            />
            <label>Number of children</label>
            <input
              min="0"
              type="number"
              placeholder="numOfChildren"
              defaultValue={0}
              onChange={(e) => setNumOfChildren(e.target.value)}
            />
            <label>Comment</label>
            <textarea
              placeholder="Leave a comment.."
              onChange={(e) => setComment(e.target.value)}
            />
            <button onClick={handleClick} className="rButton">
              Reserve Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reserve;
