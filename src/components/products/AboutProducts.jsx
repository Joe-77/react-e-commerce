import React from "react";
import { Link, useLocation } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { BsGenderAmbiguous } from "react-icons/bs";
import { products } from "../../products/all_product";
import { useDispatch } from "react-redux";
import { addToCart } from "../../app/cart/cartSlice";

const AboutProducts = () => {
  window.scrollTo(0, 0);

  const dispatch = useDispatch();

  const location = useLocation().state;

  const filterProducts = [];

  products.filter((e) => {
    if (e.category === location.category && e.id !== location.id) {
      filterProducts.push(e);
    }
  });

  const random = Math.ceil(Math.random() * filterProducts.length);

  return (
    <div className="container mx-auto mt-10 px-3 sm:px-0 min-h-screen">
      <div className="flex flex-col sm:flex-row gap-10">
        <div className="sm:w-1/2">
          <Carousel
            className="h-full"
            autoPlay
            infiniteLoop
            width={`100%`}
            showIndicators={false}
            showStatus={false}
            showArrows={false}
          >
            {location.image.map((e, id) => (
              <div key={id}>
                <img className="rounded-xl" src={e} alt="" />
              </div>
            ))}
          </Carousel>
        </div>

        <div>
          <p className="font-mono text-xl text-orange-600 tracking-wide mb-4">
            {location.name}
          </p>
          <p className="my-3 font-mono">${location.new_price}</p>
          <p className="my-4 text-red-600">Get 10% off on checkout</p>
          <div className="flex items-center gap-2 text-sm text-gray-600 capitalize tracking-widest">
            <BsGenderAmbiguous />
            {location.category}
          </div>

          <div>
            <div className="text-center my-7">
              <button
                onClick={() => dispatch(addToCart(location))}
                className="font-serif bg-orange-600 text-white tracking-wid rounded-xl p-2"
              >
                Add To Cart
              </button>
            </div>
          </div>

          <div className="mt-8">
            <p className=" uppercase font-mono -tracking-wide italic text-xl mb-4">
              feature:
            </p>
            <ul className=" list-disc ml-10 capitalize tracking-wider font-serif">
              <li className="mb-2">cotton blend</li>
              <li className="mb-2">made in egypt & imported</li>
              <li className="mb-2">high quality</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-20 mb-10 px-5">
        <p className="col-span-1 sm:col-span-2 lg:col-span-3 text-xl font-bold tracking-wider">
          Customers Also Viewed
        </p>
        <Link
          to={`/about/${filterProducts[random].name}`}
          state={filterProducts[random]}
        >
          <div>
            <img
              className=" h-60 w-full rounded-xl"
              src={filterProducts[random].image[0]}
              alt=""
            />
            <p className="text-sm mt-4 px-2 text-gray-500">
              {filterProducts[random].name}
            </p>
            <div className="mt-3 mb-2 flex items-center gap-4 px-2">
              <span className="font-bold font-mono">
                %
                {parseInt(
                  ((filterProducts[random].old_price -
                    filterProducts[random].new_price) /
                    filterProducts[random].old_price) *
                    100
                )}
              </span>
              <span className="text-orange-600 font-mono">
                ${filterProducts[random].new_price}
              </span>
            </div>
            <p className="text-sm px-2">
              <del>${filterProducts[random].old_price}</del>
            </p>
          </div>
        </Link>

        <Link
          to={`/about/${filterProducts[random + 1].name}`}
          state={filterProducts[random + 1]}
        >
          <div>
            <img
              className=" h-60 w-full rounded-xl"
              src={filterProducts[random + 1].image[0]}
              alt=""
            />
            <p className="text-sm mt-4 px-2 text-gray-500">
              {filterProducts[random + 1].name}
            </p>
            <div className="mt-3 mb-2 flex items-center gap-4 px-2">
              <span className="font-bold font-mono">
                %
                {parseInt(
                  ((filterProducts[random + 1].old_price -
                    filterProducts[random + 1].new_price) /
                    filterProducts[random + 1].old_price) *
                    100
                )}
              </span>
              <span className="text-orange-600 font-mono">
                ${filterProducts[random + 1].new_price}
              </span>
            </div>
            <p className="text-sm px-2">
              <del>${filterProducts[random + 1].old_price}</del>
            </p>
          </div>
        </Link>

        <Link
          to={`/about/${filterProducts[random + 3].name}`}
          state={filterProducts[random + 3]}
        >
          <div>
            <img
              className=" h-60 w-full rounded-xl"
              src={filterProducts[random + 3].image[0]}
              alt=""
            />
            <p className="text-sm mt-4 px-2 text-gray-500">
              {filterProducts[random + 3].name}
            </p>
            <div className="mt-3 mb-2 flex items-center gap-4 px-2">
              <span className="font-bold font-mono">
                %
                {parseInt(
                  ((filterProducts[random + 3].old_price -
                    filterProducts[random + 3].new_price) /
                    filterProducts[random + 3].old_price) *
                    100
                )}
              </span>
              <span className="text-orange-600 font-mono">
                ${filterProducts[random + 3].new_price}
              </span>
            </div>
            <p className="text-sm px-2">
              <del>${filterProducts[random + 3].old_price}</del>
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AboutProducts;
