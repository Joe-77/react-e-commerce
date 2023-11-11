import React, { useState } from "react";
import NavBar from "./navBar/NavBar";
import Routers from "../routing/Routers";
import Footer from "./Footer";

const LayOut = () => {
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("isAuth")));

  return (
    <>
      <NavBar auth={auth} setAuth={setAuth} />
      <Routers setAuth={setAuth} isAuth={auth} />

      <Footer />
    </>
  );
};

export default LayOut;
