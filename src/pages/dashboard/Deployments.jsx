// src/pages/dashboard/Deployments.jsx
import React, { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import toast from "react-hot-toast";
import { FaTerminal, FaPlusCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const statusColors = {
  building: "bg-yellow-100 text-yellow-700",
  deployed: "bg-green-100 text-green-700",
  error: "bg-red-100 text-red-700",
  inactive: "bg-gray-100 text-gray-700",
};

const Deployments = () => {
  const [deployments, setDeployments] = useState([]);
  const [form, setForm] = useState({
    projectName: "",
    domain: "",
    framework: "React",
    environment: "Production",
  });
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [logsOpenId, setLogsOpenId] = useState(null);

  const fetchDeployments = async () => {
    try {
      const res = await axios.get("/deployment");
      setDeployments(res.data);
    } catch (err) {
      toast.error("Failed to fetch deployments");
    }
  };

  useEffect(() => {
    fetchDeployments();
  }, []);

  const handleDeploy = async () => {
    try {
      setLoading(true);
      await axios.post("/deployments", form);
      toast.success("Deployment started!");
      setForm({ projectName: "", domain: "", framework: "React", environment: "Production" });
      setShowForm(false);
      fetchDeployments();
    } catch (err) {
      console.error(err);
      toast.error("Deployment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-10">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#00477B]">Deployments</h1>
            <p className="text-sm text-gray-500">Manage your projects and track deployment logs.</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-[#00477B] text-white px-4 py-2 rounded-md hover:bg-[#00345d] transition"
          >
            <FaPlusCircle /> New Deployment
          </button>
        </div>
      </motion.div>

      {/* Deploy Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow p-6 space-y-4 max-w-2xl">
          <h2 className="font-semibold text-[#00477B] text-lg">New Deployment</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Project Name"
              value={form.projectName}
              onChange={(e) => setForm({ ...form, projectName: e.target.value })}
              className="border px-4 py-2 rounded-md w-full focus:ring-2 focus:ring-[#00477B] outline-none"
            />
            <input
              type="text"
              placeholder="Domain (e.g., spectra.ai)"
              value={form.domain}
              onChange={(e) => setForm({ ...form, domain: e.target.value })}
              className="border px-4 py-2 rounded-md w-full focus:ring-2 focus:ring-[#00477B] outline-none"
            />
            <select
              value={form.framework}
              onChange={(e) => setForm({ ...form, framework: e.target.value })}
              className="border px-4 py-2 rounded-md focus:ring-2 focus:ring-[#00477B]"
            >
              <option>React</option>
              <option>Next.js</option>
              <option>Vue</option>
              <option>Svelte</option>
              <option>Other</option>
            </select>
            <select
              value={form.environment}
              onChange={(e) => setForm({ ...form, environment: e.target.value })}
              className="border px-4 py-2 rounded-md focus:ring-2 focus:ring-[#00477B]"
            >
              <option>Production</option>
              <option>Staging</option>
              <option>Development</option>
            </select>
          </div>
          <button
            onClick={handleDeploy}
            disabled={loading}
            className="bg-[#00477B] hover:bg-[#00345d] text-white px-4 py-2 rounded-md transition"
          >
            {loading ? "Deploying..." : "Deploy"}
          </button>
        </div>
      )}

      {/* Deployment List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {deployments.map((deploy) => (
          <div key={deploy._id} className="bg-white p-5 rounded-xl shadow space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-[#00477B]">{deploy.projectName}</h3>
                <p className="text-sm text-gray-500">{deploy.domain}</p>
              </div>
              <span className={`px-3 py-1 text-xs rounded-full ${statusColors[deploy.status]}`}>
                {deploy.status}
              </span>
            </div>
            <div className="text-sm text-gray-600 flex flex-wrap gap-4">
              <p>Framework: <strong>{deploy.framework}</strong></p>
              <p>Environment: <strong>{deploy.environment}</strong></p>
              {deploy.deployedAt && <p>Deployed: {new Date(deploy.deployedAt).toLocaleString()}</p>}
            </div>
            <button
              onClick={() => setLogsOpenId(logsOpenId === deploy._id ? null : deploy._id)}
              className="text-[#00477B] text-sm flex items-center gap-1 hover:underline"
            >
              <FaTerminal /> {logsOpenId === deploy._id ? "Hide Logs" : "View Logs"}
            </button>
            {logsOpenId === deploy._id && (
              <div className="bg-black text-green-400 font-mono p-4 rounded-md text-xs overflow-auto max-h-48">
                {deploy.buildLogs.length === 0 ? (
                  <p>No logs available yet.</p>
                ) : (
                  deploy.buildLogs.map((line, i) => <p key={i}>&gt; {line}</p>)
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Deployments;
