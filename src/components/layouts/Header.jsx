// src/components/Layout/Header.jsx
import React from "react";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  return (
    <header className="w-full bg-white shadow px-6 py-4 flex items-center justify-between">
      {/* Logo / Brand */}
      <div className="text-xl font-bold text-[#00477B] tracking-wide">
        Spectra<span className="text-[#50D6FE]">Cloud</span>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* You can add Notification / Settings icons here */}
        <button className="text-[#00477B] hover:text-[#50D6FE] text-2xl">
          <FaUserCircle />
        </button>
      </div>
    </header>
  );
};

export default Header;
