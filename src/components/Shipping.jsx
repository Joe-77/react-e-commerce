import React from "react";
import { CgNotes } from "react-icons/cg";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Shipping = ({ item }) => {
  function formatLargeNumber(number, decimalPlaces = 2) {
    return number.toLocaleString("en-US", {
      style: "decimal",
      maximumFractionDigits: decimalPlaces,
    });
  }

  let totalAmount = 0;

  item.map((e) => {
    totalAmount += e.quantity * e.new_price;
  });

  return (
    <>
      <div className="flex gap-4 bg-orange-200 p-2 rounded-lg text-red-400">
        <div className="text-xl mt-2">
          <CgNotes />
        </div>
        <p className="text-xs sm:text-sm leading-5">
          All orders are shipped from the Egypt through SMSA. Customs fees or
          tax may apply according to the laws of your country.
        </p>
      </div>
      <div className="mt-5 shadow-lg shadow-gray-500 px-3 pt-7 pb-4">
        <div className="pb-5 border-b-2 border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-gray-400 text-sm">Items</p>
            <p className="text-sm font-mono font-bold">
              {formatLargeNumber(totalAmount)} USD
            </p>
          </div>
          <div className="flex items-center justify-between mt-3">
            <p className="text-gray-400 text-sm">Shipping & handling</p>
            <p className="text-sm font-mono font-bold">50 USD</p>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-gray-400 text-sm">Total</p>
          <p className="text-sm font-mono font-bold">
            {formatLargeNumber(totalAmount + 50)} USD
          </p>
        </div>
        <Link to={"/shop"}>
          <button className="w-full text-center capitalize text-sm mt-4 bg-gray-200 hover:bg-gray-400 duration-500 py-3">
            continue shopping
          </button>
        </Link>
        <Link to={"/payment"} state={totalAmount}>
          <button className="w-full font-bold tracking-wider text-center text-white capitalize text-sm my-4 bg-red-600 hover:bg-red-800 duration-500 py-3">
            checkout
          </button>
        </Link>
      </div>
    </>
  );
};

export default Shipping;
