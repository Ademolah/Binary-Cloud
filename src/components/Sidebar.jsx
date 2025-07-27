// src/components/Layout/Sidebar.jsx
import React from "react";
import { FaTachometerAlt, FaCubes, FaCloud, FaCog } from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-[#00477B] text-white fixed top-0 left-0 flex flex-col shadow-lg z-20">
      {/* Logo / Brand */}
      <div className="text-2xl font-bold px-6 py-5 border-b border-white/10">
        Spectra<span className="text-[#50D6FE]">Cloud</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 pt-6 space-y-2 text-sm">
        <a href="/" className="flex items-center px-4 py-3 rounded-md hover:bg-[#50D6FE]/20 transition">
          <FaTachometerAlt className="mr-3 text-lg" />
          Dashboard
        </a>
        <a href="/" className="flex items-center px-4 py-3 rounded-md hover:bg-[#50D6FE]/20 transition">
          <FaCubes className="mr-3 text-lg" />
          Projects
        </a>
        <a href="/" className="flex items-center px-4 py-3 rounded-md hover:bg-[#50D6FE]/20 transition">
          <FaCloud className="mr-3 text-lg" />
          Deployments
        </a>
        <a href="/" className="flex items-center px-4 py-3 rounded-md hover:bg-[#50D6FE]/20 transition">
          <FaCog className="mr-3 text-lg" />
          Settings
        </a>
      </nav>

      {/* Footer (Optional) */}
      <div className="px-6 py-4 text-xs text-white/60 border-t border-white/10">
        © {new Date().getFullYear()} Spectra by Binary
      </div>
    </aside>
  );
};

export default Sidebar;
