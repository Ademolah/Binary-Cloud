// src/pages/home/components/Process.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaRocket, FaLayerGroup, FaChartLine, FaTools } from "react-icons/fa";

const steps = [
  {
    icon: <FaRocket className="text-3xl text-white" />,
    title: "Launch",
    description: "Deploy your web app, AI model, or backend with just a few clicks or a single CLI command.",
    color: "bg-[#00477B]",
  },
  {
    icon: <FaLayerGroup className="text-3xl text-white" />,
    title: "Scale",
    description: "Auto-scale across regions and instances with built-in load balancing and infra redundancy.",
    color: "bg-[#50D6FE]",
  },
  {
    icon: <FaChartLine className="text-3xl text-white" />,
    title: "Monitor",
    description: "Get real-time observability with metrics, logs, and performance insights — all in one dashboard.",
    color: "bg-[#00B3C8]",
  },
  {
    icon: <FaTools className="text-3xl text-white" />,
    title: "Optimize",
    description: "Continuously improve through alerts, AI-based recommendations, and cost-efficiency tools.",
    color: "bg-[#00A86B]",
  },
];

const Process = () => {
  return (
    <section className="bg-[#F0F8FF] py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-[#00477B] mb-8"
        >
          Our Seamless Process
        </motion.h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto text-lg">
          From idea to infrastructure — Spectra simplifies every step of your cloud journey.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-6 text-left"
            >
              <div className={`w-14 h-14 flex items-center justify-center rounded-full mb-4 ${step.color}`}>
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-[#00477B] mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-700">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
