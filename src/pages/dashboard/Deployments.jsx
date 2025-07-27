// src/pages/dashboard/Deployments.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaPlus, FaExternalLinkAlt, FaCodeBranch } from "react-icons/fa";

const dummyDeployments = [
  {
    id: 1,
    name: "binary-landing",
    url: "https://binary-landing.spectra.dev",
    status: "Live",
    branch: "main",
    time: "2 mins ago",
  },
  {
    id: 2,
    name: "ai-api-service",
    url: "https://ai-api.spectra.dev",
    status: "Building",
    branch: "dev",
    time: "just now",
  },
  {
    id: 3,
    name: "admin-dashboard",
    url: "https://admin.spectra.dev",
    status: "Failed",
    branch: "main",
    time: "5 mins ago",
  },
];

const statusColors = {
  Live: "bg-green-100 text-green-700",
  Building: "bg-yellow-100 text-yellow-800",
  Failed: "bg-red-100 text-red-700",
};

const Deployments = () => {
  return (
    <div className="w-full">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between mb-6"
      >
        <h1 className="text-2xl font-bold text-[#00477B]">Deployments</h1>
        <button className="flex items-center gap-2 bg-[#00477B] text-white px-4 py-2 rounded-md hover:bg-[#00345d] transition">
          <FaPlus /> New Deployment
        </button>
      </motion.div>

      {/* Deployment List */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {dummyDeployments.map((app, index) => (
          <motion.div
            key={app.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-gray-800">{app.name}</h2>
              <span
                className={`text-xs px-3 py-1 rounded-full font-medium ${statusColors[app.status]}`}
              >
                {app.status}
              </span>
            </div>
            <div className="text-sm text-gray-600 mb-2">
              <FaCodeBranch className="inline mr-1 text-gray-500" /> {app.branch}
            </div>
            <div className="text-sm text-gray-500 mb-3">{app.time}</div>
            <a
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-[#00477B] font-medium hover:underline"
            >
              {app.url}
              <FaExternalLinkAlt className="ml-2 text-xs" />
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Deployments;
