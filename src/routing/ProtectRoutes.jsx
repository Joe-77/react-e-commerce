import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectRoutes = ({ isAuth }) => {
  return isAuth ? <Outlet /> : <Navigate to={"/login"} />;
};

export default ProtectRoutes;
