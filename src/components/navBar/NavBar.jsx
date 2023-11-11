import React, { useState } from "react";
import { FaShopify } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import { FaOpencart } from "react-icons/fa";
import { BiMenu } from "react-icons/bi";
import "./nav.css";
import Menu from "./Menu";
import { useSelector } from "react-redux";
import { selectCart } from "../../app/cart/cartSlice";

const NavBar = ({ auth, setAuth }) => {
  const [showCategory, setShowCategory] = useState(false);

  const category = () => {
    setShowCategory(!showCategory);
  };

  const cart = useSelector(selectCart)


  return (
    <div className="w-full h-20 flex justify-between items-center px-3 md:px-10 bg-white shadow-xl shadow-gray-400">
      <div className="flex  items-center  gap-4">
        <div className="relative md:hidden">
          <BiMenu onClick={category} className="text-2xl cursor-pointer" />
          {showCategory && (
            <ul className="category flex flex-col gap-4 absolute z-50 bg-white shadow-lg shadow-zinc-800 mt-2 p-2">
              <Link to="/shop">shop</Link>
              <Link to="/men">Men</Link>
              <Link to="/women">women</Link>
              <Link to="/kids">kids</Link>
            </ul>
          )}
        </div>
        <Link to={"/"}>
          <div className="flex items-center gap-1">
            <FaShopify className="text-2xl md:text-4xl" />
            <p className="uppercase italic font-mono tracking-wider text-sm md:text-2xl">
              shopping
            </p>
          </div>
        </Link>
      </div>

      <ul className="category gap-4 hidden md:flex">
        <NavLink to="/shop">shop</NavLink>
        <NavLink to="/men">Men</NavLink>
        <NavLink to="/women">women</NavLink>
        <NavLink to="/kids">kids</NavLink>
      </ul>

      <div className="flex items-center gap-3 md:gap-5">
        {auth === true ? (
          <Menu setAuth={setAuth} />
        ) : (
          <Link to={"/login"}>
            <button className="bg-cyan-500 px-1 md:px-3 py-1 text-white font-bold tracking-wider rounded-lg duration-500 hover:bg-cyan-700">
              Login
            </button>
          </Link>
        )}
        <Link to="/cart">
          <div className="relative cursor-pointer">
            <FaOpencart className="text-2xl text-red-500" />
            <p className=" absolute top-[-12px] right-0 text-sm select-none text-orange-500">
              {cart.length}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
