// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
// import logo from "../layouts/"; // Replace with your logo

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Pricing", path: "/pricing" },
    { name: "Docs", path: "/docs" },
    { name: "CLI Tools", path: "/cli" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-[#00477B] flex items-center gap-2">
          {/* <img src={logo} alt="Spectra" className="h-8 w-auto" /> */}
          {/* <img alt="Spectra" className="h-8 w-auto" /> */}
          Spectra
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-medium hover:text-[#00477B] transition ${
                location.pathname === link.path ? "text-[#00477B]" : "text-gray-700"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/auth"
            className="ml-4 bg-[#00477B] text-white px-4 py-2 rounded-md hover:bg-[#00345d] transition text-sm font-medium"
          >
            Login / Sign Up
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white px-6 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={`block py-2 font-medium text-sm ${
                location.pathname === link.path ? "text-[#00477B]" : "text-gray-700"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/auth"
            onClick={() => setMobileOpen(false)}
            className="block mt-3 text-center bg-[#00477B] text-white py-2 rounded-md text-sm font-medium"
          >
            Login / Sign Up
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
