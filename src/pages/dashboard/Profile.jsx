// src/pages/dashboard/Profile.jsx
import React, { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

const Profile = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  // Fetch user profile on mount
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

  // Handle form input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle profile update
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
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-xl mx-auto mt-10 bg-white shadow-md rounded-xl p-6"
    >
      <h2 className="text-2xl font-bold text-[#00477B] mb-6">Profile Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-[#00477B] focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-[#00477B] focus:outline-none"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#00477B] hover:bg-[#00345d] text-white py-2 px-4 rounded-md font-semibold transition"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </motion.div>
  );
};

export default Profile;
