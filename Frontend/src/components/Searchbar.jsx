import React from "react";
import { FiSearch, FiX } from "react-icons/fi";

const Searchbar = ({ value, onChange, handleSearch, onClear }) => {
  return (
    <div className="flex items-center bg-[#131313] px-4 py-2 rounded-full shadow-md w-full max-w-sm ">
      <button
        onClick={handleSearch}
        aria-label="Search"
        className="text-[#585858] hover:text-blue-600 transition mr-2"
      >
        <FiSearch className="text-lg" />
      </button>

      <input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={onChange}
        className="flex-grow outline-none bg-transparent text-sm text-[#585858]"
      />

      {value?.trim() && (
        <button
          onClick={onClear}
          aria-label="Clear"
          className="ml-2 text-gray-300 hover:text-red-500 transition"
        >
          <FiX className="text-lg" />
        </button>
      )}
    </div>
  );
};

export default Searchbar;
