

// src/pages/dashboard/Billing.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGem, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import axios from "../../api/axiosInstance";
import toast from "react-hot-toast";



const Billing = () => {
  const [card, setCard] = useState(null);
  const [form, setForm] = useState({
    cardHolderName: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [subscription, setSubscription] = useState(null);
  
const [transactions, setTransactions] = useState([]);

  const fetchSubscription = async () => {
    try {
      const res = await axios.get("/subscriptions/billing");
      setSubscription(res.data);
    } catch (err) {
      toast.error("Failed to fetch subscription");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSubscription();
  }, []);


 
  const fetchCard = async () => {
  try {
    const res = await axios.get("/billing/card");
    setCard(res.data);
    setForm({
      cardHolderName: res.data.cardHolderName,
      cardNumber: "", // hide for security
      expiryMonth: res.data.expiryMonth,
      expiryYear: res.data.expiryYear,
      cvv: "", // never return CVV
    });
    setEditing(true);
  } catch (err) {
    setCard(null); // No card yet
  }
};

  useEffect(() => {
    fetchCard();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
  try {
    setLoading(true);

    if (card && card._id) {
      // Update existing card using the new route with ID
      await axios.put(`/billing/cards/${card._id}`, form);
      toast.success("Card updated!");
    } else {
      // Add new card
      await axios.post("/billing/cards", form);
      toast.success("Card added!");
    }

    fetchCard(); // Refresh card state from backend

    setForm({
      cardHolderName: "",
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
    });

    setEditing(false);
  } catch (err) {
    console.error(err);
    toast.error("Failed to save card");
  } finally {
    setLoading(false);
  }
};


// 📥 Fetch transactions from backend
const fetchTransactions = async () => {
  try {
    const res = await axios.get("/transactions");
    setTransactions(res.data);
  } catch (err) {
    toast.error("Failed to load billing history");
    console.error(err);
  }
};

// 🎯 Call this when component mounts
useEffect(() => {
  fetchTransactions();
}, []);


  const handleDeleteCard = async (id) => {
  if (!window.confirm("Are you sure you want to delete this card?")) return;

  try {
    setLoading(true);
    await axios.delete(`/billing/cards/${id}`);
    toast.success("Card deleted successfully");
    setCard(null); // clear state
    setForm({
      cardHolderName: "",
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
    });
    setEditing(false);
  } catch (err) {
    console.error("Delete Error:", err);
    toast.error("Failed to delete card");
  } finally {
    setLoading(false);
  }
};

const handlePlanSelect = async (selectedPlan) => {
  try {
    await axios.put("/subscriptions/billing", { plan: selectedPlan });
    toast.success(`${selectedPlan} plan activated!`);
    fetchSubscription(); // refresh subscription info
  } catch (err) {
    console.error(err);
    toast.error("Failed to update plan");
  }
};



  return (
    <div className="w-full space-y-10">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1 className="text-2xl font-bold text-[#00477B] mb-1">Billing & Payments</h1>
        <p className="text-sm text-gray-500">Manage your subscription and payment information securely.</p>
      </motion.div>

      {/* Plan Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white shadow p-6 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-100 rounded-full text-blue-600">
            <FaGem className="text-2xl" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[#00477B]">
              {subscription?.plan || "No Plan"}
            </h2>
            <p className="text-sm text-gray-600">
              {subscription?.status === "active"
                ? `Renews on ${new Date(subscription.renewalDate).toLocaleDateString()}`
                : `Status: ${subscription?.status}`}
            </p>
          </div>
        </div>
        <button
          disabled={!subscription}
          className="px-4 py-2 bg-[#00477B] hover:bg-[#00345d] text-white rounded-md transition text-sm"
        >
          Change Plan
        </button>
      </motion.div>

      {/* Pricing Plans Reference */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
>
  {[
    {
      title: "Free",
      price: "$0",
      features: ["1 Project", "Community Support", "Limited Usage"],
      popular: false,
    },
    {
      title: "Pro",
      price: "$29",
      features: ["10 Projects", "Email Support", "Unlimited Usage"],
      popular: true,
    },
    {
      title: "Enterprise",
      price: "Custom",
      features: ["Unlimited Projects", "Priority Support", "Advanced Controls"],
      popular: false,
    },
  ].map((plan, i) => (
    <div
      key={i}
      className={`border rounded-xl p-6 bg-white shadow-md ${
        plan.popular ? "border-[#00477B]" : "border-gray-200"
      }`}
    >
      {plan.popular && (
        <div className="text-sm mb-2 text-[#00477B] font-semibold">Most Popular</div>
      )}
      <h3 className="text-xl font-bold text-[#00477B] mb-2">{plan.title}</h3>
      <p className="text-2xl font-bold text-gray-900 mb-4">{plan.price}/mo</p>
      <ul className="text-sm text-gray-600 mb-4 space-y-2">
        {plan.features.map((feature, idx) => (
          <li key={idx}>• {feature}</li>
        ))}
      </ul>
      <button className="w-full py-2 px-4 bg-[#00477B] text-white rounded-md hover:bg-[#00345d] transition text-sm">
        Choose {plan.title}
      </button>
    </div>
  ))}
</motion.div>


{/* Subscription Management */}
<motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.3 }}
  className="bg-white rounded-xl shadow p-6 space-y-4"
>
  <h3 className="text-lg font-semibold text-[#00477B] mb-2">Subscription Management</h3>

  {subscription ? (
    <div className="space-y-2">
      <p className="text-sm text-gray-600">
        <span className="font-medium text-[#00477B]">Plan:</span> {subscription.plan}
      </p>
      <p className="text-sm text-gray-600">
        <span className="font-medium text-[#00477B]">Status:</span>{" "}
        <span className={`px-2 py-1 rounded text-xs ${subscription.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
          {subscription.status}
        </span>
      </p>
      <p className="text-sm text-gray-600">
        <span className="font-medium text-[#00477B]">Renews:</span>{" "}
        {new Date(subscription.renewalDate).toLocaleDateString()}
      </p>
    </div>
  ) : (
    <p className="text-sm text-gray-500 italic">No subscription found</p>
  )}
</motion.div>



      {/* Plan Options */}
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.3 }}
  className="bg-white shadow rounded-xl p-6 space-y-6"
>
  <h3 className="text-lg font-semibold text-[#00477B]">Choose Your Plan</h3>
  <div className="grid md:grid-cols-3 gap-6">
    {["Free", "Pro", "Enterprise"].map((planOption) => (
      <div
        key={planOption}
        className={`border rounded-xl p-4 space-y-3 cursor-pointer transition ${
          subscription?.plan === planOption
            ? "border-[#00477B] bg-blue-50"
            : "hover:shadow"
        }`}
        onClick={() => handlePlanSelect(planOption)}
      >
        <h4 className="text-lg font-semibold text-[#00477B]">{planOption} Plan</h4>
        <p className="text-sm text-gray-600">
          {planOption === "Free" && "Basic access with limited features."}
          {planOption === "Pro" && "Advanced tools and analytics."}
          {planOption === "Enterprise" && "Custom solutions for teams."}
        </p>
        <button
          disabled={subscription?.plan === planOption}
          className={`mt-2 px-4 py-2 text-sm rounded-md transition ${
            subscription?.plan === planOption
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-[#00477B] text-white hover:bg-[#00345d]"
          }`}
        >
          {subscription?.plan === planOption ? "Current Plan" : "Select"}
        </button>
      </div>
    ))}
  </div>
</motion.div>



      {/* Saved Card Display */}
          {card ? (
      <div className="bg-white p-5 shadow rounded-lg">
        <div className="flex justify-between items-center mb-3">
          <div className="text-[#00477B] font-semibold text-lg">
            **** **** **** {card.cardNumber.slice(-4)}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setEditing(true)}
              className="text-blue-600 hover:text-blue-800"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => handleDeleteCard(card._id)}
              className="text-red-600 hover:text-red-800"
            >
              <FaTrash />
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-600">Cardholder: {card.cardHolderName}</p>
        <p className="text-sm text-gray-600">
          Expires: {card.expiryMonth}/{card.expiryYear}
        </p>
      </div>
    ) : (
      <p className="text-gray-500 italic">No saved card.</p>
    )}

    {/* Billing History Table */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.8 }}
  className="bg-white shadow rounded-xl overflow-hidden"
>
  <h3 className="text-lg font-semibold text-[#00477B] px-4 pt-4">Billing History</h3>
  <table className="min-w-full text-sm mt-2">
    <thead className="bg-[#00477B] text-white text-left">
      <tr>
        <th className="p-4">Date</th>
        <th className="p-4">Amount</th>
        <th className="p-4">Payment Method</th>
        <th className="p-4">Status</th>
      </tr>
    </thead>
    <tbody className="text-gray-700">
      {transactions.length === 0 ? (
        <tr>
          <td className="p-4" colSpan={4}>
            <span className="text-sm text-gray-500">No billing history found.</span>
          </td>
        </tr>
      ) : (
        transactions.map((txn) => (
          <tr key={txn._id} className="border-b hover:bg-gray-50">
            <td className="p-4">{new Date(txn.date).toLocaleDateString()}</td>
            <td className="p-4">${txn.amount.toFixed(2)}</td>
            <td className="p-4">{txn.method}</td>
            <td className="p-4">
              <span
                className={`px-2 py-1 rounded text-xs ${
                  txn.status === "Paid"
                    ? "bg-green-100 text-green-600"
                    : txn.status === "Pending"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {txn.status}
              </span>
            </td>
          </tr>
        ))
      )}
    </tbody>
  </table>
</motion.div>



      {/* Form Section */}
      {(editing || !card) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white shadow p-6 rounded-xl max-w-2xl space-y-6"
        >
          <h2 className="text-lg font-semibold text-[#00477B]">
            {card ? "Update Card" : "Add New Card"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="cardHolderName"
              value={form.cardHolderName}
              onChange={handleChange}
              type="text"
              placeholder="Cardholder Name"
              className="border px-4 py-2 rounded-md focus:ring-2 focus:ring-[#00477B] outline-none"
            />
            <input
              name="cardNumber"
              value={form.cardNumber}
              onChange={handleChange}
              type="text"
              maxLength={16}
              placeholder="Card Number"
              className="border px-4 py-2 rounded-md focus:ring-2 focus:ring-[#00477B] outline-none"
            />
            <input
              name="expiryMonth"
              value={form.expiryMonth}
              onChange={handleChange}
              type="text"
              maxLength={2}
              placeholder="Expiry Month (MM)"
              className="border px-4 py-2 rounded-md focus:ring-2 focus:ring-[#00477B] outline-none"
            />
            <input
              name="expiryYear"
              value={form.expiryYear}
              onChange={handleChange}
              type="text"
              maxLength={2}
              placeholder="Expiry Year (YY)"
              className="border px-4 py-2 rounded-md focus:ring-2 focus:ring-[#00477B] outline-none"
            />
            <input
              name="cvv"
              value={form.cvv}
              onChange={handleChange}
              type="password"
              maxLength={4}
              placeholder="CVV"
              className="border px-4 py-2 rounded-md focus:ring-2 focus:ring-[#00477B] outline-none"
            />
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-[#00477B] hover:bg-[#00345d] text-white px-5 py-2 rounded-md flex items-center gap-2"
          >
            <FaPlus />
            {card ? "Update Card" : "Add Card"}
          </button>
        
        </motion.div>
      )}
    </div>
  );
};

export default Billing;

