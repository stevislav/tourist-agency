import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch.js";
import { useEffect } from "react";
import axios from "axios";
import StoreIcon from "@mui/icons-material/Store";
import PersonIcon from "@mui/icons-material/Person";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import DotLoader from "react-spinners/DotLoader";

const Datatable = ({ columns }) => {
  // posto se datatable koristi za vise stranica, proveramo koja stranica je tacno
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const savedUser = JSON.parse(localStorage.getItem("user"));

  // podaci za prikazivanje
  const [list, setList] = useState([]);
  const [userData, setUserData] = useState("");

  // zbog kasnjenja podataka koristimo fetch umesto useFetcha
  const handler = async () => {
    const response = await fetch(`/users/${savedUser["_id"]}`);
    const data = await response.json();
    setUserData(data);
  };
  useEffect(() => {
    handler();
    if (userData.isAdmin) {
      columns.pop();
    }
  }, []);

  let fetchPath = `/`;
  // samo staff i admin vide sve korisnike
  if (userData.isStaff || userData.isAdmin) {
    fetchPath += `${path}`;
  } else {
    fetchPath += `${path}?userID=${userData._id}`;
  }
  // samo admin vidi ponude
  if (path.split("/")[0] === "offers") {
    fetchPath = `/${path}?offerList=1`;
  }
  console.log(fetchPath);

  const { data, loading, error, reFetch } = useFetch(fetchPath);

  useEffect(() => {
    setList(data);
  }, [data]);

  // (re)setuje aktivnost korisnika
  const handleSetActive = async (e) => {
    try {
      const id =
        e.target.parentElement.parentElement.parentElement.parentElement
          .children[0].children[0].textContent;
      const response = await fetch(`/users/${id}`);
      const targetData = await response.json();
      await axios.put(`/users/${id}`, { isActive: !targetData.isActive });

      e.preventDefault();
      reFetch();
    } catch (err) {}
  };

  // (re)setuje rol staffa
  const handleSetStaff = async (e) => {
    try {
      const id =
        e.target.parentElement.parentElement.parentElement.parentElement
          .children[0].children[0].textContent;
      const response = await fetch(`/users/${id}`);
      const targetData = await response.json();

      await axios.put(`/users/${id}`, { isStaff: !targetData.isStaff });

      e.preventDefault();
      reFetch();
    } catch (err) {}
  };

  // prihvatanje rezervacije
  const handleSetAccepted = async (e) => {
    const confirmation = window.confirm("Are you sure?");
    if (!confirmation) {
      return;
    }
    try {
      const id =
        e.target.parentElement.parentElement.parentElement.parentElement
          .children[0].children[0].textContent;
      await axios.put(`/pendingoffers/${id}`, { isAccepted: true });
      e.preventDefault();
      reFetch();
    } catch (err) {}
  };

  const handleDelete = async (id) => {
    const confirmation = window.confirm("Are you sure?");
    if (!confirmation) {
      return;
    }
    try {
      await axios.delete(`/${path}/${id}`);
      setList(list.filter((item) => item._id !== id));
    } catch (err) {}
  };

  // prelaz na editovanje ponude
  const handleEdit = async (e) => {
    const id =
      e.target.parentElement.parentElement.parentElement.parentElement
        .children[0].children[0].textContent;
    navigate(`/profile/${path}/editoffer/${id}`);
  };

  // dugmici u zavisnosti u kojoj tabeli treba da budu vidljivi i zavise od autoriteta
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {path === "users" && (
              <>
                <Link
                  onClick={handleSetActive}
                  style={{ textDecoration: "none" }}
                >
                  <div className="viewButton">Set Active</div>
                </Link>
                {userData.isAdmin && (
                  <Link
                    onClick={handleSetStaff}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="viewButton">Set Staff</div>
                  </Link>
                )}
              </>
            )}
            {path === "pendingoffers" && (
              <Link
                to={`/offers/${params.row.offerID}`}
                style={{ textDecoration: "none" }}
              >
                <div className="viewButton">View</div>
              </Link>
            )}
            {(userData.isAdmin || userData.isStaff) &&
              path === "pendingoffers" && (
                <Link
                  onClick={handleSetAccepted}
                  style={{ textDecoration: "none" }}
                >
                  <div className="viewButton">Accept</div>
                </Link>
              )}
            {userData.isAdmin && path === "offers" && (
              <div
                onClick={handleEdit} /* to={`/profile/${path}/editoffer`} */
                style={{ textDecoration: "none" }}
              >
                <div className="viewButton">Edit</div>
              </div>
            )}
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  let isPendingOffer = false;
  let listType = "";
  let icon;
  // ikone u zavisnosti od tabele
  switch (path) {
    case "users":
      icon = <PersonIcon className="icon" />;
      listType = `Users`;
      break;
    case "offers":
      icon = <StoreIcon className="icon" />;
      listType = `Offers`;
      break;
    case "pendingoffers":
      icon = <CreditCardIcon className="icon" />;
      listType = "Reservations";
      isPendingOffer = true;
      break;
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

  return (
    <div className="datatable">
      <div className="datatableTitle">
        <div className="datatableIcons">
          {icon}
          {listType}
        </div>
        {!isPendingOffer && (
          <Link to={`/profile/${path}/new`} className="link">
            Add New
          </Link>
        )}
      </div>
      {loading ? (
        loader
      ) : (
        <DataGrid
          className="datagrid"
          rows={list}
          columns={columns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          getRowId={(row) => row._id}
        />
      )}
    </div>
  );
};

export default Datatable;
