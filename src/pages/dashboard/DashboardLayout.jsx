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
    <div className="min-h-screen flex bg-[#F9FAFB] text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 fixed top-0 left-0 h-full bg-white shadow-lg z-20 flex flex-col py-6 px-4 space-y-6">
        <h2 className="text-2xl font-bold text-[#00477B] mb-6">Spectra</h2>
        <nav className="flex-1 space-y-4">
          <NavLink
            to="home"
            className={({ isActive }) =>
              `flex items-center gap-3 text-sm px-2 py-2 rounded-md transition ${
                isActive ? "bg-[#E1F3FF] text-[#00477B]" : "text-gray-700 hover:text-[#00477B]"
              }`
            }
          >
            <FaTachometerAlt /> Dashboard
          </NavLink>
          <NavLink
            to="deployments"
            className={({ isActive }) =>
              `flex items-center gap-3 text-sm px-2 py-2 rounded-md transition ${
                isActive ? "bg-[#E1F3FF] text-[#00477B]" : "text-gray-700 hover:text-[#00477B]"
              }`
            }
          >
            <FaServer /> Deployments
          </NavLink>
          <NavLink
            to="usage"
            className={({ isActive }) =>
              `flex items-center gap-3 text-sm px-2 py-2 rounded-md transition ${
                isActive ? "bg-[#E1F3FF] text-[#00477B]" : "text-gray-700 hover:text-[#00477B]"
              }`
            }
          >
            <FaWallet /> Usage
          </NavLink>
          <NavLink
            to="billing"
            className={({ isActive }) =>
              `flex items-center gap-3 text-sm px-2 py-2 rounded-md transition ${
                isActive ? "bg-[#E1F3FF] text-[#00477B]" : "text-gray-700 hover:text-[#00477B]"
              }`
            }
          >
            <FaWallet /> Billing
          </NavLink>
          <NavLink
            to="settings"
            className={({ isActive }) =>
              `flex items-center gap-3 text-sm px-2 py-2 rounded-md transition ${
                isActive ? "bg-[#E1F3FF] text-[#00477B]" : "text-gray-700 hover:text-[#00477B]"
              }`
            }
          >
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
      <div className="ml-64 flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white shadow px-6 flex items-center justify-between sticky top-0 z-10">
          <h3 className="text-lg font-semibold text-[#00477B]">Dashboard</h3>
          {/* Placeholder for future profile, notifications, etc. */}
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
