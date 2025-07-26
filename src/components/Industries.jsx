// src/pages/home/components/Industries.jsx
import React from "react";
import { motion } from "framer-motion";

const industries = [
  {
    emoji: "💰",
    title: "Fintech",
    description: "Secure, scalable deployments for payment APIs, credit scoring engines, and fraud detection.",
  },
  {
    emoji: "🧠",
    title: "AI & ML",
    description: "Train, deploy, and scale models — with native support for vector databases and LLM infrastructure.",
  },
  {
    emoji: "🏥",
    title: "Healthcare",
    description: "HIPAA-ready infrastructure for e-health platforms, telemedicine, and diagnostic automation.",
  },
  {
    emoji: "🏛️",
    title: "Public Sector",
    description: "Government-grade cloud hosting for registries, dashboards, and secure citizen services.",
  },
  {
    emoji: "📡",
    title: "Telecom",
    description: "Edge deployments, automated service rollouts, and scalable network analytics systems.",
  },
  {
    emoji: "🔗",
    title: "Blockchain",
    description: "DApp hosting, smart contract APIs, and zero-downtime crypto platforms with full-node sync.",
  },
];

const Industries = () => {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-[#00477B] mb-8"
        >
          Industries We Power
        </motion.h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto text-lg">
          Spectra is trusted across sectors — enabling next-gen innovation from startups to sovereign systems.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-left">
          {industries.map((industry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-[#F9FAFB] rounded-xl p-6 shadow hover:shadow-xl transition-all"
            >
              <div className="text-4xl mb-4">{industry.emoji}</div>
              <h3 className="text-xl font-semibold text-[#00477B] mb-2">
                {industry.title}
              </h3>
              <p className="text-sm text-gray-700">{industry.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Industries;
