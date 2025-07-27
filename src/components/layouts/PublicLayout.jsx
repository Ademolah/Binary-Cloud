// src/layouts/PublicLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer"; // We'll build this next
import Navbar from "./Navbar";
import Footer from "./Footer";


const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F4F7FA]">
      <Navbar />
      <main className="pt-20 flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
