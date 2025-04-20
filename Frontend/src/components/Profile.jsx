import React from "react";
import { getInitials } from "../utils/helper";

const Profile = ({ onLogout }) => {
  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-[#131313] backdrop-blur-sm rounded-full shadow-md transition-all duration-300">
      <div className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center bg-[#1C1C1C] text-blue-600 rounded-full font-semibold text-sm md:text-base">
        {getInitials("BV Vivek")}
      </div>
      <p className="text-gray-400 text-sm md:text-base font-medium hidden sm:block">
        Vivek
      </p>
      <button
        onClick={onLogout}
        className="text-xs md:text-sm bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
