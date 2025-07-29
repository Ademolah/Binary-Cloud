const Transaction = require("../models/Transactions");

// Get all transactions for current user
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id }).sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    console.error("Transaction Fetch Error:", err.message);
    res.status(500).json({ message: "Failed to fetch transactions" });
  }
};

