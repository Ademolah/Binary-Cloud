

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
            <h2 className="text-xl font-semibold text-[#00477B]">Pro Plan</h2>
            <p className="text-sm text-gray-600">Renews on August 01, 2025</p>
          </div>
        </div>
        <button className="px-4 py-2 bg-[#00477B] hover:bg-[#00345d] text-white rounded-md text-sm">
          Upgrade Plan
        </button>
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

