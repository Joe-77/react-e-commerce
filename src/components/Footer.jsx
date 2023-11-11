import React from "react";

const Footer = () => {
  return (
    <div>
      <h2 className="text-center py-3 bg-white shadow-lg shadow-black ">
        All rights reserved © {new Date().getFullYear()}{" "}
        <span className="italic tracking-wide font-mono">Shopping</span>
      </h2>
    </div>
  );
};

export default Footer;
