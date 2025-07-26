import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="pt-24 pb-20 px-6 bg-white text-gray-800 overflow-hidden">
      {/* Hero Section */}
      <section className="text-center mb-20 max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-[#00477B] mb-4"
        >
          About Spectra
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-lg text-gray-600"
        >
          Spectra is the flagship AI-powered cloud platform by Binary, built for modern teams that demand intelligence, scale, and lightning-fast development experience.
        </motion.p>
      </section>

      {/* Mission & Vision Section */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#F0F9FF] p-8 rounded-xl shadow"
        >
          <h2 className="text-2xl font-semibold text-[#00477B] mb-4">Our Vision</h2>
          <p className="text-gray-700 leading-relaxed">
            To become the leading AI-native cloud infrastructure empowering a future where intelligent applications are built effortlessly, scale endlessly, and serve globally.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#F0F9FF] p-8 rounded-xl shadow"
        >
          <h2 className="text-2xl font-semibold text-[#00477B] mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            To build an intelligent, secure, and user-friendly platform that bridges AI and cloud, empowering developers, startups, and enterprises to deploy at scale.
          </p>
        </motion.div>
      </section>

      {/* Philosophy Section */}
      <section className="max-w-7xl mx-auto mb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white px-6 md:px-16 py-12 rounded-xl shadow-lg text-center"
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-[#00477B] mb-6">
            What Makes Spectra Different?
          </h2>
          <ul className="text-left max-w-3xl mx-auto space-y-4 text-gray-700 text-base md:text-lg">
            <li className="relative pl-6">
              <span className="absolute left-0 top-1 text-[#00477B]">✓</span>
              AI-first infrastructure designed with ML workflows and LLM support from day one.
            </li>
            <li className="relative pl-6">
              <span className="absolute left-0 top-1 text-[#00477B]">✓</span>
              Developer-optimized UI with blazing-fast deployments, zero-config, and Git automation.
            </li>
            <li className="relative pl-6">
              <span className="absolute left-0 top-1 text-[#00477B]">✓</span>
              Multi-region infrastructure built for global latency reduction and reliability.
            </li>
            <li className="relative pl-6">
              <span className="absolute left-0 top-1 text-[#00477B]">✓</span>
              Backed by Binary — a bold team of AI researchers, cloud engineers, and designers.
            </li>
          </ul>
        </motion.div>
      </section>

      {/* Team Philosophy */}
      <section className="max-w-7xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
        >
          <div>
            <h2 className="text-2xl font-semibold text-[#00477B] mb-4">Meet the Minds Behind Spectra</h2>
            <p className="text-gray-700 leading-relaxed">
              At Binary, we believe in building for the future. Our diverse team of cloud experts, AI engineers, and creative technologists is obsessed with making development simpler, smarter, and scalable for all.
            </p>
          </div>

          <motion.img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
            alt="Team at work"
            className="rounded-xl shadow-lg object-cover w-full h-64 md:h-full"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          />
        </motion.div>
      </section>

      {/* CTA */}
      <section className="text-center">
        <motion.a
          href="/"
          whileHover={{ scale: 1.05 }}
          className="inline-block bg-[#00477B] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#00345d] transition"
        >
          Explore the Platform
        </motion.a>
      </section>
    </div>
  );
};

export default About;
