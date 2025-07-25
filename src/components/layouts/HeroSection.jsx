// src/pages/Home/HeroSection.jsx or src/components/home/HeroSection.jsx

import React from "react";

const HeroSection = () => {
  return (
    <section className="relative bg-[#F0F9FF] min-h-[90vh] flex items-center justify-center text-center px-6">
      <div className="max-w-5xl mx-auto z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-[#00477B] leading-tight mb-6">
          Spectra: The Future of <span className="text-[#50D6FE]">AI-Powered Cloud</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8">
          Deploy, scale, and manage intelligent applications — all on one platform built for the next era of innovation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/"
            className="bg-[#00477B] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#00345d] transition"
          >
            🚀 Get Started
          </a>
          <a
            href="/"
            className="border border-[#00477B] text-[#00477B] font-semibold px-6 py-3 rounded-full hover:bg-[#00477B] hover:text-white transition"
          >
            📚 Explore Docs
          </a>
        </div>
      </div>

      {/* Optional SVG background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-[#C1F2FF] opacity-20 pointer-events-none"></div>
    </section>
  );
};

export default HeroSection;
