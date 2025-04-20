import React, { use, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import Profile from "./Profile";
import Searchbar from "./Searchbar";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const logout = () => {
    navigate("/login");
  };

  const handleChange = (e) => setSearchTerm(e.target.value);

  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
  };

  const handleClear = () => {
    setSearchTerm("");
  };
  return (
    <nav className="fixed top-0 left-0 w-full py-4 px-6 flex justify-between items-center z-50">
      <a
        href="/"
        className="text-sm font-bold bg-[#131313] backdrop-blur-sm rounded-full p-4 text-gray-400"
      >
        NN
      </a>
      <Searchbar
        value={searchTerm}
        onChange={handleChange}
        handleSearch={handleSearch}
        onClear={handleClear}
      />

      <Profile onLogout={logout} />
    </nav>
  );
};

export default Navbar;
