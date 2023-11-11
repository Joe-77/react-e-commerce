import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCcVisa, FaCcMastercard } from "react-icons/fa";
import { BiLogoMastercard, BiLogoVisa } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { payNow } from "../app/cart/cartSlice";

const CheckOut = () => {
  const [notValidPhone, setNotValidPhone] = useState(true);
  const [showPayment, setShowPayment] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function validatePhoneNumber(phoneNumber) {
    var phoneRegex = /^(\+?)([0-9]){10,14}$/;

    return phoneRegex.test(phoneNumber);
  }

  const checkValidNumber = (number) => {
    if (validatePhoneNumber(number)) {
      setNotValidPhone(false);
    } else {
      setNotValidPhone(true);
    }
  };

  function formatLargeNumber(number, decimalPlaces = 2) {
    return number.toLocaleString("en-US", {
      style: "decimal",
      maximumFractionDigits: decimalPlaces,
    });
  }

  const change = (e) => {
    let x = document.getElementById("num").value.replace(e[2], "/");

    document.getElementById("num").value = x;
  };
  const submit = () => {
    dispatch(payNow());
    navigate("/shop");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });

  const totalAmount = useLocation().state;

  return (
    <div className="container flex flex-col md:flex-row px-3 md:px-0 gap-10 mx-auto my-7 min-h-[85vh]">
      <div className="w-full">
        <h1 className="text-xl font-mono italic">Shipping details</h1>
        <form onSubmit={handleSubmit(submit)} className="mt-5">
          <div>
            <div className="flex flex-col gap-2 border-2 border-gray-200 px-3 py-1 rounded-md">
              <label
                className=" cursor-text text-xs text-gray-500"
                htmlFor="userName"
              >
                Name : <span className="text-red-500">*</span>
              </label>
              <input
                {...register("userName", { required: true })}
                id="userName"
                className=" outline-none"
                type="text"
              />
            </div>
            {errors.userName && (
              <small className="text-xs block mt-2 text-orange-500">
                this field is required !
              </small>
            )}
          </div>
          <div className="my-2">
            <div className="flex flex-col gap-2 border-2 border-gray-200 px-3 py-1 rounded-md">
              <label
                className=" cursor-text text-xs text-gray-500"
                htmlFor="Email"
              >
                Email :
              </label>
              <input id="Email" className=" outline-none" type="text" />
            </div>
          </div>
          <div className="my-2">
            <div className="flex flex-col gap-2 border-2 border-gray-200 px-3 py-1 rounded-md">
              <label
                className=" cursor-text text-xs text-gray-500"
                htmlFor="phone"
              >
                Phone : <span className="text-red-500">*</span>
              </label>
              <input
                onKeyUp={(e) => checkValidNumber(e.target.value)}
                {...register("phone", { required: true })}
                id="phone"
                className=" outline-none"
                type="text"
              />
            </div>
            {errors.phone && (
              <small className="text-xs block mt-2 text-orange-500">
                this field is required !
              </small>
            )}
            {notValidPhone && !errors.phone && (
              <small className="text-xs block mt-2 text-orange-500">
                enter valid phone !
              </small>
            )}
          </div>
          <div className="my-2">
            <div className="flex flex-col gap-2 border-2 border-gray-200 px-3 py-1 rounded-md">
              <label
                className=" cursor-text text-xs text-gray-500"
                htmlFor="city"
              >
                City : <span className="text-red-500">*</span>
              </label>
              <input
                {...register("city", { required: true })}
                id="city"
                className=" outline-none"
                type="text"
              />
            </div>

            {errors.city && (
              <small className="text-xs block mt-2 text-orange-500">
                this field is required ! !
              </small>
            )}
          </div>

          <div className="mt-5">
            <h1 className="text-bold font-mono text-xl">Payment methods</h1>
            <div
              onClick={() => setShowPayment(!showPayment)}
              className="mt-5 border-2 border-gray-200 px-3 py-2 rounded-md cursor-pointer flex items-center gap-2 select-none"
            >
              <div className="w-7 h-7  rounded-full border-2 border-gray-400 flex items-center justify-center">
                <span className="block w-5 h-5 rounded-full bg-red-500"></span>
              </div>
              <img
                src="https://jomla.ae/_next/image/?url=%2Fcredit-icon.svg&w=48&q=75"
                alt=""
              />
              <span>Credit card</span>
              (<FaCcVisa color="blue" /> <FaCcMastercard />)
            </div>
          </div>

          {showPayment && (
            <div className="border-2 border-gray-200 px-3 py-2 rounded-md flex gap-5 pl-8">
              <div className="text-3xl">
                <BiLogoVisa />
                <BiLogoMastercard />
              </div>

              <div className="flex-1">
                <div className="relative">
                  <input
                    maxLength={14}
                    placeholder="Card Number"
                    className=" outline-none p-2 border-b-2 border-gray-300 w-full"
                    {...register("number", {
                      required: true,
                      pattern: [0 - 9],
                      minLength: 14,
                      maxLength: 14,
                    })}
                    type="tel"
                    pattern="[0-9]*"
                  />
                  {errors.number && (
                    <small className="block text-red-500 mt-3 absolute right-2 top-[-12px] text-xl">
                      !
                    </small>
                  )}
                </div>
                <div>
                  <div className="flex flex-col sm:flex-row  border-gray-300">
                    <div className="relative">
                      <input
                        placeholder="MM YY"
                        className=" outline-none p-2 border-b-2 w-full h-10"
                        {...register("num", {
                          required: true,
                          minLength: 5,
                          maxLength: 5,
                        })}
                        id="num"
                        onChange={(e) => change(e.target.value)}
                        maxLength={5}
                        type="tel"
                      />
                      {errors.num && (
                        <small className="block text-red-500 mt-3 absolute top-[-10px] right-2 text-xl">
                          !
                        </small>
                      )}
                    </div>
                    <div className="w-full relative">
                      <input
                        placeholder="CVC"
                        className=" outline-none p-2 w-full border-b-2 border-l-0 sm:border-l-2 h-10"
                        {...register("cvc", {
                          required: true,
                          minLength: 3,
                          maxLength: 3,
                        })}
                        onChange={(e) => change(e.target.value)}
                        maxLength={3}
                        type="password"
                      />
                      {errors.cvc && (
                        <small className="block text-red-500 mt-3 absolute right-2 top-[-10px] text-xl">
                          !
                        </small>
                      )}
                    </div>
                  </div>
                  <div>
                    <input
                      placeholder="Card Holder Name"
                      className=" outline-none p-2 border-b-2 border-gray-300 w-full"
                      {...register("cardName", {
                        required: true,
                      })}
                      type="text"
                    />
                    {errors.cardName && (
                      <small className="block text-red-500 mt-3">
                        enter name card !
                      </small>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          <button className="text-center bg-red-500 w-full my-3 py-3 text-white text-xl italic font-mono rounded-md duration-300 hover:bg-red-700">
            Place Order
          </button>
        </form>
      </div>

      <div className="w-full">
        <h1 className="text-xl font-mono italic font-bold">Order details</h1>

        <div className="my-7">
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
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
