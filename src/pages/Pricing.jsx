import React from "react";
import { motion } from "framer-motion";
import { FaRocket, FaGem, FaBuilding } from "react-icons/fa";

const plans = [
  {
    title: "Starter",
    icon: <FaRocket />,
    price: "Free",
    features: [
      "Deploy 1 project",
      "500 build minutes/month",
      "Basic monitoring",
      "Community support",
    ],
    highlighted: false,
  },
  {
    title: "Pro",
    icon: <FaGem />,
    price: "$29/month",
    features: [
      "Unlimited projects",
      "10,000 build minutes/month",
      "Custom domains",
      "Priority email support",
    ],
    highlighted: true,
  },
  {
    title: "Enterprise",
    icon: <FaBuilding />,
    price: "Custom",
    features: [
      "Dedicated infrastructure",
      "Unlimited usage",
      "Advanced analytics",
      "24/7 Premium support",
    ],
    highlighted: false,
  },
];

const Pricing = () => {
  return (
    <div className="pt-24 pb-16 px-6 bg-[#F0F9FF] min-h-screen overflow-hidden">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-[#00477B] mb-4">
          Flexible Plans for Every Stage
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Whether you're just getting started or scaling to millions of users,
          Spectra's pricing fits your growth.
        </p>
      </motion.section>

      {/* Pricing Cards */}
      <div className="max-w-6xl mx-auto grid gap-10 grid-cols-1 md:grid-cols-3">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className={`rounded-2xl p-8 shadow-xl border ${
              plan.highlighted
                ? "bg-white border-[#00477B] scale-105 z-10"
                : "bg-white border-gray-200"
            } transition-all hover:shadow-2xl relative`}
          >
            <div className="text-[#00477B] text-4xl mb-4">{plan.icon}</div>
            <h3 className="text-2xl font-semibold text-[#00477B] mb-2">{plan.title}</h3>
            <p className="text-3xl font-bold mb-6 text-gray-800">{plan.price}</p>
            <ul className="space-y-3 mb-8 text-gray-700 text-sm">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center justify-start">
                  ✅ <span className="ml-2">{feature}</span>
                </li>
              ))}
            </ul>
            <button
              className={`w-full py-3 rounded-lg font-semibold transition text-white ${
                plan.highlighted ? "bg-[#00477B] hover:bg-[#00345d]" : "bg-gray-500 hover:bg-gray-700"
              }`}
            >
              {plan.title === "Enterprise" ? "Contact Sales" : "Get Started"}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
