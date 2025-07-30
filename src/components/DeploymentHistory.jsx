import React, { useEffect, useState } from "react";
// import axios from "../../api/axiosInstance";
import moment from "moment";
import { motion } from "framer-motion";
import axios from "../api/axiosInstance";

const DeploymentHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get("/deployment");
        setHistory(res.data);
      } catch (err) {
        console.error("Failed to fetch deployment history:", err);
      }
    };

    fetchHistory();
  }, []);

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
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {history.map((item) => (
            <tr key={item._id} className="border-b hover:bg-gray-50">
              <td className="p-4 font-medium">{item.projectName}</td>
              <td className="p-4">{item.framework}</td>
              <td className="p-4">{item.environment}</td>
              <td className="p-4">
                <a href={`https://${item.domain}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
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
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default DeploymentHistory;
