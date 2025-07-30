// import React, { useEffect, useState } from "react";
// // import axios from "../../api/axiosInstance";
// import moment from "moment";
// import { motion } from "framer-motion";
// import axios from "../api/axiosInstance";



// const DeploymentHistory = () => {
//   const [history, setHistory] = useState([]);

//   useEffect(() => {
//     const fetchHistory = async () => {
//       try {
//         const res = await axios.get("/deployment");
//         setHistory(res.data);
//       } catch (err) {
//         console.error("Failed to fetch deployment history:", err);
//       }
//     };

//     fetchHistory();
//   }, []);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: 0.2 }}
//       className="mt-12 bg-white rounded-xl shadow-md overflow-x-auto"
//     >
//       <h2 className="text-xl font-bold text-[#00477B] px-6 pt-6">Deployment History</h2>
//       <table className="min-w-full table-auto mt-4 text-sm text-left">
//         <thead className="bg-[#00477B] text-white">
//           <tr>
//             <th className="p-4">Project</th>
//             <th className="p-4">Framework</th>
//             <th className="p-4">Environment</th>
//             <th className="p-4">Domain</th>
//             <th className="p-4">Status</th>
//             <th className="p-4">Date</th>
//           </tr>
//         </thead>
//         <tbody className="text-gray-700">
//           {history.map((item) => (
//             <tr key={item._id} className="border-b hover:bg-gray-50">
//               <td className="p-4 font-medium">{item.projectName}</td>
//               <td className="p-4">{item.framework}</td>
//               <td className="p-4">{item.environment}</td>
//               <td className="p-4">
//                 <a href={`https://${item.domain}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
//                   {item.domain}
//                 </a>
//               </td>
//               <td className="p-4">
//                 <span
//                   className={`px-2 py-1 text-xs rounded ${
//                     item.status === "deployed"
//                       ? "bg-green-100 text-green-700"
//                       : item.status === "building"
//                       ? "bg-yellow-100 text-yellow-700"
//                       : item.status === "error"
//                       ? "bg-red-100 text-red-700"
//                       : "bg-gray-200 text-gray-700"
//                   }`}
//                 >
//                   {item.status}
//                 </span>
//               </td>
//               <td className="p-4">{moment(item.createdAt).format("MMM DD, YYYY h:mm A")}</td>
//             </tr>
//           ))}
//         </tbody>
        
//       </table>
//     </motion.div>
//   );
// };

// export default DeploymentHistory;

import React, { useEffect, useState } from "react";
import moment from "moment";
import { motion } from "framer-motion";
import axios from "../api/axiosInstance";
import toast from "react-hot-toast";

const DeploymentHistory = () => {
  const [history, setHistory] = useState([]);
  const [openDropdownId, setOpenDropdownId] = useState(null); // Controls open dropdown per row

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await axios.get("/deployment");
      setHistory(res.data);
    } catch (err) {
      console.error("Failed to fetch deployment history:", err);
    }
  };

  const handleRedeploy = async (id) => {
    try {
      await axios.post(`/deployment/${id}/redeploy`);
      toast.success("Redeployment started");
      fetchHistory();
    } catch (err) {
      toast.error("Redeploy failed");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/deployment/${id}`);
      toast.success("Deployment deleted");
      setHistory((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      toast.error("Failed to delete deployment");
      console.error(err);
    }
  };

  const toggleDropdown = (id) => {
    setOpenDropdownId((prevId) => (prevId === id ? null : id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mt-12 bg-white rounded-xl shadow-md overflow-x-auto"
    >
      <h2 className="text-xl font-bold text-[#00477B] px-6 pt-6">Deployment History</h2>
      <table className="min-w-full table-auto mt-4 text-sm text-left">
        <thead className="bg-[#00477B] text-white">
          <tr>
            <th className="p-4">Project</th>
            <th className="p-4">Framework</th>
            <th className="p-4">Environment</th>
            <th className="p-4">Domain</th>
            <th className="p-4">Status</th>
            <th className="p-4">Date</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {history.map((item) => (
            <tr key={item._id} className="border-b hover:bg-gray-50 relative">
              <td className="p-4 font-medium">{item.projectName}</td>
              <td className="p-4">{item.framework}</td>
              <td className="p-4">{item.environment}</td>
              <td className="p-4">
                <a
                  href={`https://${item.domain}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {item.domain}
                </a>
              </td>
              <td className="p-4">
                <span
                  className={`px-2 py-1 text-xs rounded ${
                    item.status === "deployed"
                      ? "bg-green-100 text-green-700"
                      : item.status === "building"
                      ? "bg-yellow-100 text-yellow-700"
                      : item.status === "error"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {item.status}
                </span>
              </td>
              <td className="p-4">{moment(item.createdAt).format("MMM DD, YYYY h:mm A")}</td>
              <td className="p-4 text-right">
                <div className="relative inline-block text-left">
                  <button
                    onClick={() => toggleDropdown(item._id)}
                    className="text-gray-600 hover:text-[#00477B] focus:outline-none"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zm7-2a2 2 0 100 4 2 2 0 000-4zm5 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </button>

                  {openDropdownId === item._id && (
                    <div className="absolute right-0 z-50 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg">
                      <button
                        onClick={() => handleRedeploy(item._id)}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        🔄 Redeploy
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        ❌ Delete
                      </button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default DeploymentHistory;
