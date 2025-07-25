// src/pages/Home.jsx
import React from "react";
import { FiServer, FiLayers, FiActivity, FiAlertCircle } from "react-icons/fi";

const overview = [
  {
    title: "Projects",
    value: "12",
    icon: <FiLayers className="text-3xl text-blue-600" />,
    bg: "bg-blue-50",
  },
  {
    title: "Deployments",
    value: "48",
    icon: <FiServer className="text-3xl text-green-600" />,
    bg: "bg-green-50",
  },
  {
    title: "Resource Usage",
    value: "72%",
    icon: <FiActivity className="text-3xl text-yellow-600" />,
    bg: "bg-yellow-50",
  },
  {
    title: "Errors",
    value: "3",
    icon: <FiAlertCircle className="text-3xl text-red-600" />,
    bg: "bg-red-50",
  },
];

const Home = () => {
  return (
    <div className="space-y-12">
      {/* Welcome Hero */}
      <section className="text-left">
        <h1 className="text-3xl md:text-4xl font-bold text-[#00477B] mb-2">
          Welcome back to Spectra
        </h1>
        <p className="text-gray-600 text-base md:text-lg">
          Build, deploy, and scale your cloud apps with intelligent infrastructure.
        </p>
      </section>

      {/* Overview Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {overview.map((item, idx) => (
          <div
            key={idx}
            className={`p-6 rounded-xl shadow hover:shadow-md transition-all ${item.bg}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm text-gray-500 uppercase">{item.title}</h2>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {item.value}
                </p>
              </div>
              {item.icon}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
