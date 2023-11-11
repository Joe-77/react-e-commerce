import React from "react";
import Logo from "../assets/logo.gif";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-11 mt-20">
      <img className="mt-4" src={Logo} alt="" />
    </div>
  );
};

export default Loading;
