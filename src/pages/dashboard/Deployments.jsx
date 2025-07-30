// src/pages/dashboard/Deployments.jsx
import React, { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import toast from "react-hot-toast";
import { FaTerminal, FaPlusCircle } from "react-icons/fa";
import { motion } from "framer-motion";

import { FaSync } from "react-icons/fa";
import BuildTerminal from "../../components/BuildTerminal";
import DeploymentHistory from "../../components/DeploymentHistory";






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
  const [domain, setDomain] = useState("");
  const [domainStatus, setDomainStatus] = useState(""); // "", "available", "taken", "checking"


  const fetchDeployments = async () => {
    try {
      const res = await axios.get("/deployment");
      setDeployments(res.data);
    } catch (err) {
      toast.error("Failed to fetch deployments");
    }
  };

    // Manual refresh button
  const handleRefresh = () => {
    fetchDeployments();
  };

 
    useEffect(() => {
    fetchDeployments(); // initial load
    const interval = setInterval(fetchDeployments, 10000); // every 10 sec
    return () => clearInterval(interval); // cleanup
  }, []);

  const checkDomainAvailability = async () => {
  if (!domain.trim()) return;
  try {
    setDomainStatus("checking");
    const res = await axios.get(`deployment/check-domain?domain=${domain}`);
    if (res.data.available) {
      setDomainStatus("available");
    } else {
      setDomainStatus("taken");
    }
  } catch (err) {
    console.error("Domain check error:", err);
    setDomainStatus("taken");
  }
};


  

  const handleDeploy = async () => {
    try {
      setLoading(true);
      await axios.post("/deployment", form);
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
            {/* <input
              type="text"
              placeholder="Domain (e.g., spectra.ai)"
              value={form.domain}
              onChange={(e) => setForm({ ...form, domain: e.target.value })}
              className="border px-4 py-2 rounded-md w-full focus:ring-2 focus:ring-[#00477B] outline-none"
            /> */}
            <div className="relative">
              <input
                type="text"
                placeholder="Enter domain e.g spectra.ai"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                onBlur={checkDomainAvailability}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00477B]"
              />
              {domainStatus === "checking" && (
                <span className="absolute top-2 right-4 text-sm text-gray-500">Checking...</span>
              )}
              {domainStatus === "available" && (
                <span className="absolute top-2 right-4 text-sm text-green-600">✅ Available</span>
              )}
              {domainStatus === "taken" && (
                <span className="absolute top-2 right-4 text-sm text-red-600">❌ Taken</span>
              )}
            </div>

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

      <div className="flex justify-between items-center mb-4">
  <h2 className="text-xl font-bold text-[#00477B]">Your Deployments</h2>
  <button
    onClick={handleRefresh}
    className="flex items-center gap-2 text-sm px-3 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition"
  >
    <FaSync className="animate-spin-slow text-[#00477B]" />
    Refresh
  </button>
</div>

  {/* GitHub Integration Placeholder */}
  <div className="bg-white rounded-xl shadow p-6 mt-10 w-full">
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
          alt="GitHub"
          className="w-10 h-10"
        />
        <div>
          <h2 className="text-lg font-semibold text-[#00477B]">Connect Your GitHub</h2>
          <p className="text-sm text-gray-600">
            Link your GitHub account to automatically deploy from your repositories.
          </p>
        </div>
      </div>
      <button
        className="px-5 py-2 bg-[#00477B] hover:bg-[#00345d] text-white rounded-md text-sm font-medium transition"
        onClick={() => toast("GitHub integration coming soon")}
      >
        Connect GitHub
      </button>
    </div>
  </div>



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

      <DeploymentHistory/>

      {/* Terminal Log */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold text-[#00477B] mb-2">Build Logs</h3>
        <BuildTerminal />
      </div>
    </div>
  );
};

export default Deployments;
