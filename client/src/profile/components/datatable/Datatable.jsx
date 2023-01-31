import "./datatable.scss";
import { DataGrid, GridFilterModel } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch.js";
import { useEffect } from "react";
import axios from "axios";
import StoreIcon from "@mui/icons-material/Store";
import PersonIcon from "@mui/icons-material/Person";
import CreditCardIcon from "@mui/icons-material/CreditCard";

import { SearchContext } from "../../../main/context/SearchContext";

const Datatable = ({ columns }) => {
  const { dates, options } = useContext(SearchContext);

  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const savedUser = JSON.parse(localStorage.getItem("user"));

  const [list, setList] = useState([]);
  const [userData, setUserData] = useState("");

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
  if (userData.isStaff || userData.isAdmin) {
    fetchPath += `${path}`;
  } else {
    fetchPath += `${path}?userID=${userData._id}`;
  }
  if (path.split("/")[0] === "offers") {
    fetchPath = `/${path}?offerList=1`;
  }
  console.log(fetchPath);

  const { data, loading, error, reFetch } = useFetch(fetchPath);

  useEffect(() => {
    setList(data);
  }, [data]);

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

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 300,
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
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Datatable;
