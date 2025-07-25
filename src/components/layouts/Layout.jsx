// src/components/Layout/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#F4F7FA] text-gray-800">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="ml-64">
        {/* Fixed Header */}
        <Header />

        {/* Page Content */}
        <main className="p-6 mt-16">
            <Outlet/>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
