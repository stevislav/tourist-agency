import clsx from "clsx";

export const userColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "username",
    headerName: "User",
    width: 170,
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "phoneNumber",
    headerName: "Phone",
    width: 100,
  },
  {
    field: "isActive",
    headerName: "Active",
    width: 100,
    cellClassName: (params) =>
      clsx({
        activeState: params.value === true,
        inactiveState: params.value === false,
      }),
  },
  {
    field: "isStaff",
    headerName: "Staff",
    width: 100,
    cellClassName: (params) =>
      clsx({
        activeState: params.value === true,
        inactiveState: params.value === false,
      }),
  },
];

export const offerColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "name",
    headerName: "Name",
    width: 120,
  },
  {
    field: "location",
    headerName: "Location",
    width: 230,
  },
  {
    field: "transportType",
    headerName: "Transport Type",
    width: 130,
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
  },
];

export const pendingOfferColumns = [
  { field: "_id", headerName: "ID", width: 230 },
  {
    field: "offerID",
    headerName: "Offer ID",
    width: 230,
  },
  {
    field: "userID",
    headerName: "User ID",
    width: 230,
  },
  {
    field: "email",
    headerName: "E-mail",
    width: 150,
  },
  {
    field: "comment",
    headerName: "Comment",
    width: 120,
  },
];
