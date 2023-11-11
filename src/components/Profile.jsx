import React from "react";
import user from "../images/user.png";
import { getUser } from "../app/feature/api/getUser";

const Profile = () => {
  const userAuth = getUser();


  return (
    <div className="container mx-auto h-[85vh] flex items-center justify-center px-5 sm:px-0">
      <div className="w-full sm:w-2/5 shadow-xl shadow-gray-500 py-5  flex flex-col items-center justify-center">
        <img className=" w-60" src={user} alt="" />
        <div className="text-xs md:text-sm">
          <div className="my-5 text-gray-500 flex items-center px-2 sm:px-0">
            User Name :
            <span className="font-mono italic text-orange-600 capitalize ml-1">
              {userAuth?.displayName}
            </span>
          </div>
          <div className="text-gray-500 px-2 sm:px-0">
            Email :{" "}
            <span className="font-mono italic text-orange-600 ml-1">
              {userAuth?.email}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
