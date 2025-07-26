// src/pages/home/components/WhySpectra.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaRocket, FaShieldAlt, FaCogs, FaRobot } from "react-icons/fa";

const values = [
  {
    icon: <FaRocket className="text-4xl text-[#00477B]" />,
    title: "Blazing Speed",
    desc: "Deploy and scale your applications in seconds with global latency optimization.",
  },
  {
    icon: <FaShieldAlt className="text-4xl text-[#00477B]" />,
    title: "Secure by Default",
    desc: "End-to-end encryption, role-based access, and infrastructure-grade protection.",
  },
  {
    icon: <FaRobot className="text-4xl text-[#00477B]" />,
    title: "AI-Native Infrastructure",
    desc: "Optimized for large models, vector databases, and intelligent app pipelines.",
  },
  {
    icon: <FaCogs className="text-4xl text-[#00477B]" />,
    title: "Fully Automated",
    desc: "CI/CD pipelines, serverless triggers, and zero-config scaling out of the box.",
  },
];

const WhySpectra = () => {
  return (
    <section className="bg-[#F0F9FF] py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-[#00477B] mb-8"
        >
          Why Spectra
        </motion.h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto text-lg">
          Everything you need to deploy and scale AI-first cloud apps — fast, secure, and globally accessible.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
          {values.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="bg-white rounded-xl p-6 shadow hover:shadow-xl transition-all"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="font-semibold text-xl text-[#00477B] mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySpectra;
