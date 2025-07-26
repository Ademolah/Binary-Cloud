import React from "react";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#001F3F] via-[#00477B] to-[#001F3F] text-white px-6 py-28 flex items-center justify-center overflow-hidden">
      {/* Animated Gradient Circles */}
      <div className="absolute w-[600px] h-[600px] bg-[#50D6FE]/20 rounded-full blur-3xl top-[-150px] left-[-150px] animate-pulse"></div>
      <div className="absolute w-[500px] h-[500px] bg-[#00477B]/30 rounded-full blur-2xl bottom-[-100px] right-[-100px] animate-pulse"></div>

      <div className="relative z-10 max-w-4xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-[#50D6FE]"
        >
          Spectra: The AI-First Cloud for Visionaries
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-6 text-lg sm:text-xl md:text-2xl text-white/90 max-w-2xl mx-auto"
        >
          Build, deploy, and scale next-gen applications with intelligent infrastructure,
          blazing speed, and limitless innovation — powered by Spectra.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-10"
        >
          <a
            href="/"
            className="inline-block bg-[#50D6FE] text-[#00477B] font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-[#82e4ff] transition"
          >
            Launch with Spectra
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Home;
