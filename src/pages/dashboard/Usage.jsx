// src/pages/dashboard/Usage.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaDatabase, FaMicrochip, FaClock, FaCloudUploadAlt } from "react-icons/fa";

const usageStats = [
  {
    title: "Bandwidth Used",
    value: "124.6 GB",
    icon: <FaCloudUploadAlt className="text-3xl text-blue-500" />,
    description: "Out of 200 GB monthly allocation",
  },
  {
    title: "Compute Time",
    value: "73 hours",
    icon: <FaMicrochip className="text-3xl text-green-500" />,
    description: "Running containers across projects",
  },
  {
    title: "Build Minutes",
    value: "8,920 mins",
    icon: <FaClock className="text-3xl text-yellow-500" />,
    description: "Out of 10,000 mins monthly quota",
  },
  {
    title: "Database Storage",
    value: "32.1 GB",
    icon: <FaDatabase className="text-3xl text-purple-600" />,
    description: "Across active services and backups",
  },
];

const Usage = () => {
  return (
    <div className="w-full">
      {/* Page Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-[#00477B]">Usage Overview</h1>
        <p className="text-sm text-gray-500">Track your current usage stats across all services.</p>
      </motion.div>

      {/* Usage Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {usageStats.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 bg-gray-100 rounded-full">
                {stat.icon}
              </div>
              <div>
                <h3 className="text-md font-medium text-gray-700">{stat.title}</h3>
                <p className="text-2xl font-bold text-[#00477B]">{stat.value}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500">{stat.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Usage;
