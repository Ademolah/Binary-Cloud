// src/pages/dashboard/DashboardLayout.jsx
import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaServer, FaWallet, FaCog, FaSignOutAlt } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../../auth/firebaseConfig";
import toast from "react-hot-toast";

const DashboardLayout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    toast.success("Logged out successfully");
    navigate("/auth");
  };

  return (
    <div className="min-h-screen flex bg-[#F9FAFB]">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col py-6 px-4 space-y-6">
        <h2 className="text-2xl font-bold text-[#00477B] mb-6">Spectra</h2>
        <nav className="flex-1 space-y-4">
          <NavLink to="home" className="flex items-center gap-3 text-sm text-gray-700 hover:text-[#00477B]">
            <FaTachometerAlt /> Dashboard
          </NavLink>
          <NavLink to="deployments" className="flex items-center gap-3 text-sm text-gray-700 hover:text-[#00477B]">
            <FaServer /> Deployments
          </NavLink>
          <NavLink to="usage" className="flex items-center gap-3 text-sm text-gray-700 hover:text-[#00477B]">
            <FaWallet /> Usage
          </NavLink>
          <NavLink to="billing" className="flex items-center gap-3 text-sm text-gray-700 hover:text-[#00477B]">
            <FaWallet /> Billing
          </NavLink>
          <NavLink to="settings" className="flex items-center gap-3 text-sm text-gray-700 hover:text-[#00477B]">
            <FaCog /> Settings
          </NavLink>
        </nav>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-red-600 mt-auto hover:text-red-800"
        >
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
