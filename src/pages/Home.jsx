import React from "react";
import { motion } from "framer-motion";
import WhySpectra from "../components/WhySpectra";
import Industries from "../components/Industries";
import Process from "../components/Process";

function Home()  {
  return (
    <>
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

    <section className="bg-white py-24 px-6 text-gray-800">
  <div className="max-w-7xl mx-auto text-center">
    <motion.h2
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-3xl md:text-4xl font-bold text-[#00477B] mb-4"
    >
      Built for Performance. Designed for Intelligence.
    </motion.h2>
    <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-16">
      Spectra delivers a powerful blend of speed, simplicity, and AI-native architecture to help developers and enterprises thrive in a cloud-first world.
    </p>

    <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
      {[
        {
          icon: "⚡",
          title: "Lightning Deployments",
          desc: "Push from Git and go live in seconds. Spectra's edge-backed deployment engine is blazing fast.",
        },
        {
          icon: "🧠",
          title: "AI-Native Infrastructure",
          desc: "Built with transformers, vector DBs, and LLM support in mind — AI-first from core to edge.",
        },
        {
          icon: "🛡️",
          title: "Zero-Trust Security",
          desc: "Spectra integrates fine-grained RBAC, secure APIs, and auto-encrypted data at rest and in transit.",
        },
        {
          icon: "🚀",
          title: "Cloud Simplicity",
          desc: "No ops nightmares. No over-engineering. Just clean tools and powerful abstractions.",
        },
      ].map((feature, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.2, duration: 0.5 }}
          className="bg-[#F9FAFB] rounded-xl p-6 shadow-md hover:shadow-xl transition-all text-left"
        >
          <div className="text-4xl mb-4">{feature.icon}</div>
          <h3 className="text-xl font-bold text-[#00477B] mb-2">{feature.title}</h3>
          <p className="text-sm text-gray-700">{feature.desc}</p>
        </motion.div>
      ))}
    </div>
  </div>
</section>

<section className="bg-[#F0F8FF] py-20 px-6">
  <div className="max-w-6xl mx-auto text-center">
    <motion.h2
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-3xl md:text-4xl font-bold text-[#00477B] mb-4"
    >
      Trusted by Innovators
    </motion.h2>
    <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
      From agile startups to global teams, Spectra empowers developers across the globe to build, scale, and deploy with confidence.
    </p>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 items-center justify-center text-center text-gray-500">
      {[
        "OpenAI", "Nvidia", "Google", "Stripe", "GitHub",
        "AWS", "Notion", "Vercel", "Hugging Face", "Zapier",
      ].map((brand, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
          className="text-sm md:text-base font-semibold text-gray-600 hover:text-[#00477B] transition"
        >
          {brand}
        </motion.div>
      ))}
    </div>
  </div>
</section>

      <WhySpectra/>
      <Industries/>
      <Process/>
            {/* Testimonials Section */}
        <section className="bg-white py-20 px-6 text-center text-gray-800">
        <h2 className="text-3xl md:text-4xl font-bold text-[#00477B] mb-12">
            What Our Clients Say
        </h2>

        <div className="max-w-4xl mx-auto space-y-12">
            {[
            {
                name: "Ada N.",
                company: "HiPrep EdTech",
                quote:
                "Working with Binary has been transformative. Their AI-driven solutions helped us scale our product faster and smarter.",
            },
            {
                name: "James O.",
                company: "FinTrust Microfinance",
                quote:
                "The engineering excellence and cloud stability we received from Spectra has made our platform 10x more reliable.",
            },
            {
                name: "Ngozi U.",
                company: "HealthStack Africa",
                quote:
                "Binary's team brought deep domain knowledge and innovation to our healthtech deployment. Highly recommend.",
            },
            ].map((testimonial, index) => (
            <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-[#F0F9FF] rounded-xl p-8 shadow"
            >
                <p className="text-lg italic text-gray-700 mb-4">"{testimonial.quote}"</p>
                <h4 className="text-[#00477B] font-semibold text-lg">
                — {testimonial.name}, <span className="text-sm text-gray-600">{testimonial.company}</span>
                </h4>
            </motion.div>
            ))}
        </div>
        </section>

    </>
    
  );
};

export default Home;
