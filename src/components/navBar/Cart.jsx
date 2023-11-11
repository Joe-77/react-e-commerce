import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteItem, selectCart } from "../../app/cart/cartSlice";
import { BsGenderAmbiguous } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import Shipping from "../Shipping";

const Cart = () => {
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();

  function truncateText(text) {
    if (text.length > 26) {
      return text.substring(0, 26) + "...";
    } else {
      return text;
    }
  }

  return (
    <div className="container mx-auto my-5 min-h-screen">
      {cart.length === 0 && (
        <div className="flex flex-col items-center justify-center h-[75vh]">
          <h1 className="text-sm sm:text-2xl text-red-700 font-mono italic">
            Cart is empty !
          </h1>
          <Link to={"/shop"}>
            <button className="mt-5 bg-orange-600 px-2 py-1 text-white rounded-md duration-700 hover:scale-125">
              Shopping now
            </button>
          </Link>
        </div>
      )}

      {cart.length > 0 && (
        <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-0 px-3 sm:px-0">
          <div className="w-full sm:w-2/5 lg:w-2/4 shadow-md shadow-gray-400 px-3 md:px-5 py-4">
            {cart.map((e, id) => (
              <div
                key={id}
                className="main-div mb-8 flex items-center justify-between"
              >
                <div className="flex items-center gap-5">
                  <Link to={`/about/${e.name}`} state={e}>
                    <img
                      className=" w-16 sm:w-32 rounded-2xl"
                      src={e.image[0]}
                      alt=""
                    />
                  </Link>
                  <div>
                    <div className="flex items-center gap-2 my-3 text-gray-500 text-sm">
                      <BsGenderAmbiguous />
                      <span> {e.category}</span>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500 font-mono font-bold w-40">
                        {truncateText(e.name)}
                      </p>
                      <h1 className="text-xs my-3 text-orange-600 italic font-mono">
                        <span>{e.quantity}x</span>
                        <span className="ml-6">${e.new_price}</span>
                      </h1>
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => dispatch(deleteItem(e))}
                  className=" justify-end text-xl text-red-400 cursor-pointer"
                >
                  <AiOutlineDelete />
                </div>
              </div>
            ))}
          </div>

          {cart.length > 0 && (
            <div className="w-full sm:w-2/6">
              <Shipping item={cart} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
