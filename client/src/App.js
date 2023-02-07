import ProfileHome from "./profile/pages/home/Home";
import ProfileList from "./profile/pages/list/List";
import NewUser from "./profile/pages/newUser/NewUser";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { offerInputs, userInputs } from "./profile/formSource";
import { useContext } from "react";

import { AuthContext } from "./profile/context/AuthContext";
import {
  offerColumns,
  pendingOfferColumns,
  userColumns,
} from "./profile/datatablesource";
import NewOffer from "./profile/pages/newOffer/NewOffer";
import EditOffer from "./profile/pages/editOffer/EditOffer";

import Home from "./main/pages/home/Home";
import List from "./main/pages/list/List";
import Offer from "./main/pages/offer/Offer";
import Login from "./profile/pages/login/Login";
import Register from "./profile/pages/register/Register";

function App() {
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <div className={"app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="/" element={<Home />} />
            <Route path="/offers" element={<List />} />
            <Route path="/offers/:id" element={<Offer />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="profile"
              index
              element={
                <ProtectedRoute>
                  <ProfileHome />
                </ProtectedRoute>
              }
            />
            <Route path="profile/users">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <ProfileList columns={userColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewUser inputs={userInputs} title="Add New User" />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="profile/offers">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <ProfileList columns={offerColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewOffer inputs={offerInputs} title="Add New Offer" />
                  </ProtectedRoute>
                }
              />
              <Route
                path="editoffer/:id"
                element={
                  <ProtectedRoute>
                    <EditOffer inputs={offerInputs} title="Edit Offer" />
                  </ProtectedRoute>
                }
              />
            </Route>

            <Route path="profile/pendingOffers">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <ProfileList columns={pendingOfferColumns} />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
