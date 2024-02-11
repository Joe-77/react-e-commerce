import React, { useState } from "react";
import user from "../../images/user.png";
import { useSignOutMutation } from "../../app/feature/api/authApi";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Menu = ({ setAuth }) => {
  const [showMenu, setShowMenu] = useState(false);

  const [signOut] = useSignOutMutation();

  const click = () => {
    signOut()
      .unwrap()
      .then(() => {
        toast.success("Sign Out Successfully");
      });
    setAuth(localStorage.setItem("isAuth", false));
  };

  return (
    <div className="relative">
      <button onClick={() => setShowMenu(!showMenu)} className="w-20">
        <img className="w-full " src={user} alt="" />
      </button>
      {showMenu && (
        <ul className=" absolute z-[999] right-[-5px] flex flex-col gap-3">
          <Link onClick={() => setShowMenu(false)} to={`/profile`}>
            <li className=" bg-blue-600 p-1 cursor-pointer text-sm text-white select-none">
              Profile
            </li>
          </Link>
          <li
            onClick={click}
            className=" bg-blue-600 p-1 cursor-pointer text-sm text-white select-none"
          >
            Logout
          </li>
        </ul>
      )}
    </div>
  );
};

export default Menu;
