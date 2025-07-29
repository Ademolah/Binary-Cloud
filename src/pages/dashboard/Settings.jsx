
// src/pages/dashboard/Settings.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "../../api/axiosInstance";

const Settings = () => {
  const [form, setForm] = useState({ fullName: "", email: "" });
  const [loading, setLoading] = useState(false);

 
  useEffect(() => {
      const fetchProfile = async () => {
        try {
          const res = await axios.get("/users/profile", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          setForm({
            fullName: res.data.fullName || "",
            email: res.data.email || "",
          });
        } catch (err) {
          toast.error("Failed to load profile");
          console.error(err);
        }
      };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        await axios.put("/users/profile", form, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        toast.success("Profile updated!");
      } catch (err) {
        toast.error("Update failed");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="w-full space-y-10">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-2xl font-bold text-[#00477B] mb-1">Account Settings</h1>
        <p className="text-sm text-gray-500">Manage your personal information and preferences.</p>
      </motion.div>

      {/* Profile Settings */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow p-6 space-y-6"
      >
        <h2 className="text-lg font-semibold text-[#00477B]">Profile Information</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <FaUser /> Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              className="mt-1 w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00477B]"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <FaEnvelope /> Email Address
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="mt-1 w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00477B]"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-[#00477B] text-white px-4 py-2 rounded-md hover:bg-[#00345d] transition text-sm"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </motion.form>

      {/* Password Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl shadow p-6 space-y-6"
      >
        <h2 className="text-lg font-semibold text-[#00477B]">Change Password</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-700">Current Password</label>
            <input
              type="password"
              className="mt-1 w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00477B]"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              className="mt-1 w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00477B]"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              className="mt-1 w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00477B]"
            />
          </div>
        </div>
        <button className="bg-[#00477B] text-white px-4 py-2 rounded-md hover:bg-[#00345d] transition text-sm">
          Update Password
        </button>
      </motion.div>

      {/* Notifications Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl shadow p-6 space-y-6"
      >
        <h2 className="text-lg font-semibold text-[#00477B]">Notification Preferences</h2>
        <div className="space-y-3">
          <label className="flex items-center gap-3">
            <input type="checkbox" className="accent-[#00477B]" defaultChecked />
            Email me about system updates
          </label>
          <label className="flex items-center gap-3">
            <input type="checkbox" className="accent-[#00477B]" />
            Email me about product news
          </label>
          <label className="flex items-center gap-3">
            <input type="checkbox" className="accent-[#00477B]" />
            Send me usage reports
          </label>
        </div>
        <button className="bg-[#00477B] text-white px-4 py-2 rounded-md hover:bg-[#00345d] transition text-sm">
          Save Preferences
        </button>
      </motion.div>

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-red-50 border border-red-200 rounded-xl shadow p-6"
      >
        <h2 className="text-lg font-semibold text-red-700 mb-4">Danger Zone</h2>
        <p className="text-sm text-red-600 mb-4">
          Deleting your account is irreversible. Please proceed with caution.
        </p>
        <button className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 text-sm">
          <FaTrash /> Delete Account
        </button>
      </motion.div>
    </div>
  );
};

export default Settings;

