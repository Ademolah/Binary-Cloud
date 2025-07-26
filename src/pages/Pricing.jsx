import React from "react";
import { motion } from "framer-motion";
import { FaRocket, FaGem, FaBuilding } from "react-icons/fa";

const plans = [
  {
    title: "Starter",
    icon: <FaRocket />,
    price: "Free",
    subtext: "Perfect for developers getting started",
    features: [
      "Deploy 1 project",
      "500 build minutes/month",
      "Basic monitoring & logs",
      "Community support",
      "GitHub integration",
      "Secure cloud environment",
    ],
    highlighted: false,
  },
  {
    title: "Pro",
    icon: <FaGem />,
    price: "$29/month",
    subtext: "Best for startups and growing teams",
    features: [
      "Unlimited projects",
      "10,000 build minutes/month",
      "Custom domains with SSL",
      "Auto-scaling deployments",
      "Priority email support",
      "Collaborator access",
      "Advanced usage analytics",
    ],
    highlighted: true,
  },
  {
    title: "Enterprise",
    icon: <FaBuilding />,
    price: "Custom",
    subtext: "For large-scale orgs & mission-critical apps",
    features: [
      "Dedicated infrastructure & uptime SLA",
      "Unlimited usage & custom resources",
      "SSO / SAML, RBAC, audit logs",
      "Private network deployments",
      "24/7 premium support",
      "Custom onboarding & account manager",
    ],
    highlighted: false,
  },
];

const Pricing = () => {
  return (
    <div className="pt-24 pb-20 px-6 bg-[#F0F9FF] min-h-screen overflow-hidden">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-[#00477B] mb-4">
          Flexible Pricing for Every Stage
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          From idea to scale, Spectra grows with you. Choose a plan that fits your goals and infrastructure needs.
        </p>
      </motion.section>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto grid gap-12 grid-cols-1 md:grid-cols-3">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            className={`rounded-2xl p-8 border shadow-lg hover:shadow-2xl transition-all duration-300 relative ${
              plan.highlighted
                ? "bg-white border-[#00477B] scale-105 z-10"
                : "bg-white border-gray-200"
            }`}
          >
            <div className="text-[#00477B] text-4xl mb-4">{plan.icon}</div>
            <h3 className="text-2xl font-bold text-[#00477B] mb-1">{plan.title}</h3>
            <p className="text-gray-500 text-sm mb-4">{plan.subtext}</p>
            <p className="text-3xl font-bold text-gray-800 mb-6">{plan.price}</p>

            <ul className="space-y-3 mb-8 text-gray-700 text-sm">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-[#00477B] mr-2">✔</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              className={`w-full py-3 rounded-lg font-semibold transition text-white ${
                plan.highlighted
                  ? "bg-[#00477B] hover:bg-[#00345d]"
                  : "bg-gray-500 hover:bg-gray-700"
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
