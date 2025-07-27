import React from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { FaLinux, FaApple, FaWindows } from "react-icons/fa";
import { Link } from "react-router-dom";

const installers = [
  {
    os: "macOS",
    icon: <FaApple className="text-2xl" />,
    link: "/downloads/spectra-cli-mac.pkg",
  },
  {
    os: "Linux",
    icon: <FaLinux className="text-2xl" />,
    link: "/downloads/spectra-cli-linux.deb",
  },
  {
    os: "Windows",
    icon: <FaWindows className="text-2xl" />,
    link: "/downloads/spectra-cli-win.exe",
  },
];

const CliTools = () => {
  return (
    <div className="pt-24 pb-20 px-6 bg-[#F0F9FF] min-h-screen overflow-hidden">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-[#00477B] mb-4">
          Spectra CLI Tools
        </h1>
        <p className="text-gray-700 text-lg max-w-2xl mx-auto">
          Automate deployments, manage cloud resources, and streamline devops workflows right from your terminal.
        </p>
      </motion.section>

      {/* Terminal Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-black text-green-400 font-mono p-6 rounded-xl shadow-lg max-w-3xl mx-auto mb-20 text-left text-sm overflow-x-auto"
      >
        <pre>
          <Typewriter
            words={[
              "npx spectra init my-app",
              "cd my-app",
              "spectra login",
              "spectra deploy",
              "spectra logs --tail",
            ]}
            loop={0}
            cursor
            cursorStyle="_"
            typeSpeed={60}
            deleteSpeed={40}
            delaySpeed={2000}
          />
        </pre>
      </motion.div>

      {/* Downloads */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16"
      >
        {installers.map((installer, i) => (
          <a
            key={i}
            href={installer.link}
            className="bg-white border border-gray-200 hover:border-[#00477B] hover:shadow-lg rounded-lg p-6 flex flex-col items-center transition"
          >
            {installer.icon}
            <span className="mt-2 font-medium text-gray-800">{installer.os}</span>
          </a>
        ))}
      </motion.div>

      {/* CLI Docs Link */}
      <div className="text-center">
        <Link
          href="/cli"
          to="/docs"
          className="inline-block bg-[#00477B] text-white font-medium px-6 py-3 rounded-md hover:bg-[#00345d] transition"
        >
          View Full CLI Documentation
        </Link>
      </div>
    </div>
  );
};

export default CliTools;
