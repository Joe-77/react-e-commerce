import React from "react";
import { days, hours } from "../../dateTime/date";
import backGround from "../../assets/product_34.png";
import { products } from "../../products/all_product";
import { Link } from "react-router-dom";

const Kids = () => {

  
    function truncateText(text) {
      if (text.length > 48) {
        return text.substring(0, 48) + "...";
      } else {
        return text;
      }
    }


  const kids = [];

  products.filter((e) => {
    if (e.category === "kids") {
      kids.push(e);
    }
  });

  return (
    <div className="container mx-auto mt-5 mb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-3 sm:px-0">
      <div className=" col-span-1 sm:col-span-2 lg:col-span-3 bg-gradient-to-r from-purple-300 to-orange-800 flex flex-col sm:flex-row gap-5 sm:justify-between items-center px-3 sm:px-20 py-2 h-[350px] sm:h-60 rounded-md">
        <div>
          <p className=" uppercase text-orange-600 font-bold mb-2 sm:mb-4 text-xl sm:text-3xl">
            flat 35% off
          </p>
          <p className=" uppercase font-mono">
            <span className="text-orange-600">{days}</span> days{" "}
            <span className="text-orange-600"> {hours}</span> hours
          </p>
        </div>
        <img className=" rounded-xl h-56 sm:h-full" src={backGround} alt="" />
      </div>
      {kids.map((e) => (
        <Link key={e.id} to={`/about/${e.name}`} state={e}>
          <div>
            <img className="h-96 w-full rounded-xl" src={e.image[0]} alt="" />
            <p className="text-sm mt-4 px-2 text-gray-500">{truncateText(e.name)}</p>
            <div className="mt-3 mb-2 flex items-center gap-4 px-2">
              <span className="font-bold font-mono">
                %{parseInt(((e.old_price - e.new_price) / e.old_price) * 100)}
              </span>
              <span className="text-orange-600 font-mono">${e.new_price}</span>
            </div>
            <p className="text-sm px-2">
              <del>${e.old_price}</del>
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Kids;
