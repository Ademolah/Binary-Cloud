// src/pages/dashboard/Billing.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaGem, FaCreditCard, FaReceipt, FaPlus, FaTrash, FaEdit } from "react-icons/fa";

const billingHistory = [
  {
    date: "July 01, 2025",
    amount: "$29.00",
    method: "Visa •••• 4242",
    status: "Paid",
  },
  {
    date: "June 01, 2025",
    amount: "$29.00",
    method: "Visa •••• 4242",
    status: "Paid",
  },
  {
    date: "May 01, 2025",
    amount: "$29.00",
    method: "Visa •••• 4242",
    status: "Paid",
  },
];

const Billing = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      name: "Charles Ademola",
      number: "**** **** **** 1234",
      expiry: "08/26",
    },
  ]);
  const [newCard, setNewCard] = useState({ name: "", number: "", expiry: ""});
  const [editingCardId, setEditingCardId] = useState(null);

  const handleAddCard = () => {
    if (newCard.name && newCard.number && newCard.expiry ) {
      const masked = `**** **** **** ${newCard.number.slice(-4)}`;
      setCards([...cards, { ...newCard, number: masked, id: Date.now() }]);
      setNewCard({ name: "", number: "", expiry: ""});
    }
  };

  const handleDelete = (id) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  const handleEdit = (id) => {
    const card = cards.find((card) => card.id === id);
    setNewCard({ name: card.name, number: "", expiry: card.expiry });
    setEditingCardId(id);
  };

  const handleUpdate = () => {
    setCards(
      cards.map((card) =>
        card.id === editingCardId
          ? {
              ...card,
              name: newCard.name,
              number: newCard.number
                ? `**** **** **** ${newCard.number.slice(-4)}`
                : card.number,
              expiry: newCard.expiry,
            }
          : card
      )
    );
    setNewCard({ name: "", number: "", expiry: "" });
    setEditingCardId(null);
  };

  return (
    <div className="w-full space-y-10">
      {/* Title */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1 className="text-2xl font-bold text-[#00477B] mb-1">Billing & Payments</h1>
        <p className="text-sm text-gray-500">Manage your plan, cards, and view payment history.</p>
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
        <button className="px-4 py-2 bg-[#00477B] hover:bg-[#00345d] text-white rounded-md transition text-sm">
          Upgrade Plan
        </button>
      </motion.div>

      {/* Usage Summary */}
      <div className="grid md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-4 shadow flex items-center gap-4"
        >
          <FaCreditCard className="text-3xl text-green-600" />
          <div>
            <p className="text-gray-500 text-sm">Current Balance</p>
            <p className="font-semibold text-lg text-[#00477B]">$0.00</p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-4 shadow flex items-center gap-4"
        >
          <FaReceipt className="text-3xl text-yellow-600" />
          <div>
            <p className="text-gray-500 text-sm">Next Payment</p>
            <p className="font-semibold text-lg text-[#00477B]">$29.00</p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl p-4 shadow flex items-center gap-4"
        >
          <FaGem className="text-3xl text-purple-600" />
          <div>
            <p className="text-gray-500 text-sm">Subscription</p>
            <p className="font-semibold text-lg text-[#00477B]">Pro Plan</p>
          </div>
        </motion.div>
      </div>

      {/* Card Management */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
        <h3 className="text-lg font-semibold text-[#00477B] mb-4">Saved Cards</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {cards.map((card) => (
            <div key={card.id} className="bg-white p-5 shadow rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <div className="text-[#00477B] font-semibold text-lg">{card.number}</div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(card.id)}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(card.id)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-600">Cardholder: {card.name}</p>
              <p className="text-sm text-gray-600">Expires: {card.expiry}</p>
            </div>
          ))}
        </div>

        {/* Add or Edit Card */}
        <div className="bg-white p-6 rounded-xl shadow space-y-6 max-w-xl">
          <h4 className="text-md font-semibold text-[#00477B]">
            {editingCardId ? "Update Card" : "Add New Card"}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Cardholder Name"
              value={newCard.name}
              onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
              className="border px-4 py-2 rounded-md focus:ring-2 focus:ring-[#00477B] outline-none"
            />
            <input
              type="text"
              maxLength={16}
              placeholder="Card Number"
              value={newCard.number}
              onChange={(e) => setNewCard({ ...newCard, number: e.target.value })}
              className="border px-4 py-2 rounded-md focus:ring-2 focus:ring-[#00477B] outline-none"
            />
            <input
              type="text"
              placeholder="Expiry Date (MM/YY)"
              value={newCard.expiry}
              onChange={(e) => setNewCard({ ...newCard, expiry: e.target.value })}
              className="border px-4 py-2 rounded-md focus:ring-2 focus:ring-[#00477B] outline-none"
            />
          </div>
          <button
            onClick={editingCardId ? handleUpdate : handleAddCard}
            className="bg-[#00477B] hover:bg-[#00345d] text-white px-4 py-2 rounded-md transition flex items-center gap-2"
          >
            <FaPlus />
            {editingCardId ? "Update Card" : "Add Card"}
          </button>
        </div>
      </motion.div>

      {/* Billing History */}
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
            {billingHistory.map((entry, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="p-4">{entry.date}</td>
                <td className="p-4">{entry.amount}</td>
                <td className="p-4">{entry.method}</td>
                <td className="p-4">
                  <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs">
                    {entry.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default Billing;
