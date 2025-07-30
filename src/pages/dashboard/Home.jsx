// // src/pages/dashboard/Home.jsx
// import React from "react";
// import { motion } from "framer-motion";
// import {
//   FaServer,
//   FaClock,
//   FaCloudUploadAlt,
//   FaChartLine,
//   FaPlusCircle,
//   FaCreditCard,
// } from "react-icons/fa";

// const DashboardHome = () => {
//   const metrics = [
//     {
//       label: "Active Deployments",
//       value: 5,
//       icon: <FaServer />,
//     },
//     {
//       label: "Build Minutes Used",
//       value: "1,320 / 10,000",
//       icon: <FaClock />,
//     },
//     {
//       label: "Total Projects",
//       value: 12,
//       icon: <FaCloudUploadAlt />,
//     },
//     {
//       label: "Bandwidth Usage",
//       value: "8.6 GB",
//       icon: <FaChartLine />,
//     },
//   ];

//   return (
//     <div className="space-y-10">
//       {/* Welcome Banner */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="bg-gradient-to-r from-[#00477B] to-[#50D6FE] text-white rounded-xl p-6 shadow-md"
//       >
//         <h2 className="text-2xl md:text-3xl font-semibold mb-1">
//           Welcome back, Charles!
//         </h2>
//         <p className="text-sm md:text-base">
//           Manage your deployments, monitor usage, and scale confidently with Spectra Cloud.
//         </p>
//       </motion.div>

//       {/* Metrics Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {metrics.map((metric, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: index * 0.1, duration: 0.5 }}
//             className="bg-white shadow rounded-xl p-5 flex items-center gap-4"
//           >
//             <div className="text-[#00477B] text-3xl">{metric.icon}</div>
//             <div>
//               <p className="text-sm text-gray-500">{metric.label}</p>
//               <h4 className="text-xl font-bold text-gray-800">{metric.value}</h4>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {/* Recent Deployments */}
//       <div className="bg-white shadow rounded-xl p-6">
//         <h3 className="text-xl font-semibold text-[#00477B] mb-4">Recent Deployments</h3>
//         <div className="overflow-x-auto">
//           <table className="min-w-full text-sm text-left">
//             <thead className="border-b text-gray-600">
//               <tr>
//                 <th className="py-2 px-4">Project</th>
//                 <th className="py-2 px-4">Status</th>
//                 <th className="py-2 px-4">Region</th>
//                 <th className="py-2 px-4">Deployed At</th>
//               </tr>
//             </thead>
//             <tbody>
//               {[
//                 { name: "AI Model API", status: "Active", region: "us-west-1", time: "2 mins ago" },
//                 { name: "Docs Platform", status: "Building", region: "eu-central", time: "7 mins ago" },
//                 { name: "Edge Proxy", status: "Failed", region: "ap-south", time: "10 mins ago" },
//               ].map((row, i) => (
//                 <tr key={i} className="border-b hover:bg-gray-50">
//                   <td className="py-2 px-4 font-medium">{row.name}</td>
//                   <td className="py-2 px-4">
//                     <span
//                       className={`px-2 py-1 text-xs rounded-full ${
//                         row.status === "Active"
//                           ? "bg-green-100 text-green-700"
//                           : row.status === "Building"
//                           ? "bg-yellow-100 text-yellow-700"
//                           : "bg-red-100 text-red-700"
//                       }`}
//                     >
//                       {row.status}
//                     </span>
//                   </td>
//                   <td className="py-2 px-4">{row.region}</td>
//                   <td className="py-2 px-4 text-gray-500">{row.time}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Quick Actions */}
//       <motion.div
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="grid sm:grid-cols-2 gap-6"
//       >
//         <button className="bg-[#00477B] hover:bg-[#00345d] text-white py-3 px-5 rounded-xl flex items-center justify-center gap-2 font-medium shadow transition">
//           <FaPlusCircle /> Create New Deployment
//         </button>
//         <button className="bg-white border border-[#00477B] hover:bg-[#f0f9ff] text-[#00477B] py-3 px-5 rounded-xl flex items-center justify-center gap-2 font-medium shadow transition">
//           <FaCreditCard /> View Billing & Usage
//         </button>
//       </motion.div>
//     </div>
//   );
// };

// export default DashboardHome;

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaServer,
  FaClock,
  FaCloudUploadAlt,
  FaChartLine,
  FaPlusCircle,
  FaCreditCard,
} from "react-icons/fa";
import axios from "../../api/axiosInstance";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const DashboardHome = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [metrics, setMetrics] = useState([]);
  const [deployments, setDeployments] = useState([]);

  // Fetch user profile
  const fetchUser = async () => {
    try {
      const res = await axios.get("/users/profile");
      setUser(res.data);
    } catch (err) {
      console.error("Failed to fetch user profile:", err);
    }
  };

  // Fetch deployments and calculate metrics
  const fetchDashboardData = async () => {
    try {
      const res = await axios.get("/deployment");
      setDeployments(res.data);

      const activeDeployments = res.data.filter(d => d.status === "deployed").length;
      const totalProjects = res.data.length;

      setMetrics([
        { label: "Active Deployments", value: activeDeployments, icon: <FaServer /> },
        { label: "Build Minutes Used", value: "1,320 / 10,000", icon: <FaClock /> },
        { label: "Total Projects", value: totalProjects, icon: <FaCloudUploadAlt /> },
        { label: "Bandwidth Usage", value: "8.6 GB", icon: <FaChartLine /> },
      ]);
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-10">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-[#00477B] to-[#50D6FE] text-white rounded-xl p-6 shadow-md"
      >
        <h2 className="text-2xl md:text-3xl font-semibold mb-1">
          Welcome back{user?.fullName ? `, ${user.fullName.split(" ")[0]}` : ""}!
        </h2>
        <p className="text-sm md:text-base">
          Manage your deployments, monitor usage, and scale confidently with Spectra Cloud.
        </p>
      </motion.div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="bg-white shadow rounded-xl p-5 flex items-center gap-4"
          >
            <div className="text-[#00477B] text-3xl">{metric.icon}</div>
            <div>
              <p className="text-sm text-gray-500">{metric.label}</p>
              <h4 className="text-xl font-bold text-gray-800">{metric.value}</h4>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Deployments */}
      <div className="bg-white shadow rounded-xl p-6">
        <h3 className="text-xl font-semibold text-[#00477B] mb-4">Recent Deployments</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="border-b text-gray-600">
              <tr>
                <th className="py-2 px-4">Project</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Domain</th>
                <th className="py-2 px-4">Deployed At</th>
              </tr>
            </thead>
            <tbody>
              {deployments
                .slice(0, 5)
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((row, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4 font-medium">{row.projectName}</td>
                    <td className="py-2 px-4">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          row.status === "deployed"
                            ? "bg-green-100 text-green-700"
                            : row.status === "building"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="py-2 px-4 text-blue-600 hover:underline">
                      <a href={`https://${row.domain}`} target="_blank" rel="noreferrer">
                        {row.domain}
                      </a>
                    </td>
                    <td className="py-2 px-4 text-gray-500">
                      {moment(row.createdAt).fromNow()}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid sm:grid-cols-2 gap-6"
      >
        <button
          onClick={() => navigate("/dashboard/deployments")}
          className="bg-[#00477B] hover:bg-[#00345d] text-white py-3 px-5 rounded-xl flex items-center justify-center gap-2 font-medium shadow transition"
        >
          <FaPlusCircle /> Create New Deployment
        </button>
        <button
          onClick={() => navigate("/dashboard/billing")}
          className="bg-white border border-[#00477B] hover:bg-[#f0f9ff] text-[#00477B] py-3 px-5 rounded-xl flex items-center justify-center gap-2 font-medium shadow transition"
        >
          <FaCreditCard /> View Billing & Usage
        </button>
      </motion.div>
    </div>
  );
};

export default DashboardHome;
