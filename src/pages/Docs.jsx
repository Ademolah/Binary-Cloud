import React from "react";
import { motion } from "framer-motion";
import { FaCode, FaServer, FaCogs, FaTools, FaQuestion, FaWallet } from "react-icons/fa";

const docSections = [
  {
    icon: <FaCode />,
    title: "Getting Started",
    desc: "Set up your first project and understand the basics of using Spectra.",
  },
  {
    icon: <FaServer />,
    title: "Deploying Your App",
    desc: "Learn how to deploy and manage your applications effortlessly.",
  },
  {
    icon: <FaCogs />,
    title: "API Reference",
    desc: "Explore our REST API endpoints for integrations and automations.",
  },
  {
    icon: <FaTools />,
    title: "CLI Tools",
    desc: "Use our CLI to manage deployments and resources from your terminal.",
  },
  {
    icon: <FaQuestion />,
    title: "Troubleshooting",
    desc: "Fix common issues with guidance from our support docs.",
  },
  {
    icon: <FaWallet />,
    title: "Billing & Plans",
    desc: "Understand pricing tiers, invoices, usage metrics, and billing cycles.",
  },
];

const Docs = () => {
  return (
    <div className="pt-24 pb-16 px-6 bg-white min-h-screen">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-[#00477B] mb-4">
          Developer Documentation
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Find everything you need to build, deploy, and scale on Spectra. Simple, intuitive, and always up to date.
        </p>

        {/* Search bar (visual only for now) */}
        <div className="mt-8 max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search documentation..."
            className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00477B] outline-none"
          />
        </div>
      </motion.section>

      {/* Doc Sections */}
      <div className="max-w-6xl mx-auto grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {docSections.map((section, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="bg-[#F0F9FF] border border-[#E0EFFF] p-6 rounded-xl shadow hover:shadow-lg transition-all"
          >
            <div className="text-3xl text-[#00477B] mb-4">{section.icon}</div>
            <h3 className="text-xl font-bold text-[#00477B]">{section.title}</h3>
            <p className="text-gray-700 text-sm mt-2">{section.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Docs;
