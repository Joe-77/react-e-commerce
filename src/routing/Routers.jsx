import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Shop from "../components/products/Shop";
import Men from "../components/products/Men";
import Women from "../components/products/Women";
import Kids from "../components/products/Kids";
import Login from "../components/Login";
import Cart from "../components/navBar/Cart";
import SignUp from "../components/SignUp";
import ResetPass from "../components/ResetPass";
import ProtectRoutes from "./ProtectRoutes";
import Profile from "../components/Profile";
import CheckOut from "../components/CheckOut";
import ErrorPage from "../components/ErrorPage";
import AboutProducts from "../components/products/AboutProducts";

const Routers = ({ isAuth, setAuth }) => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="shop" />} />
      <Route path="shop" element={<Shop />} />
      <Route path="men" element={<Men />} />

      <Route path="women" element={<Women />} />

      <Route path="kids" element={<Kids />} />

      <Route path="login" element={<Login auth={setAuth} />} />

      <Route path="signUp" element={<SignUp />} />

      <Route path="reset-password" element={<ResetPass />} />

      <Route path="about/:name" element={<AboutProducts />} />

      {/* <Route path="about/:name" element={<About />} /> */}

      <Route element={<ProtectRoutes isAuth={isAuth} />}>
        <Route path="cart" element={<Cart />} />
        <Route path="profile" element={<Profile />} />
        <Route path="payment" element={<CheckOut />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default Routers;
