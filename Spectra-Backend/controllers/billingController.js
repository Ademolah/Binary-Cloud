// controllers/billingController.js
const BillingCard = require('../models/BillingCard');

// Add or update card
exports.saveOrUpdateCard = async (req, res) => {
  try {
    const { cardHolderName, cardNumber, expiryMonth, expiryYear, cvv } = req.body;

    const existingCard = await BillingCard.findOne({ user: req.user._id });

    if (existingCard) {
      // Update existing card
      existingCard.cardHolderName = cardHolderName;
      existingCard.cardNumber = cardNumber;
      existingCard.expiryMonth = expiryMonth;
      existingCard.expiryYear = expiryYear;
      existingCard.cvv = cvv;

      await existingCard.save();
      return res.json({ message: "Card updated", card: existingCard });
    }

    // New card
    const card = new BillingCard({
      user: req.user._id,
      cardHolderName,
      cardNumber,
      expiryMonth,
      expiryYear,
      cvv,
    });

    await card.save();
    res.status(201).json({ message: "Card added", card });
  } catch (err) {
    console.error("Billing Save Error:", err.message);
    res.status(500).json({ message: "Failed to save billing card" });
  }
};

// Get card
exports.getCard = async (req, res) => {
  try {
    const card = await BillingCard.findOne({ user: req.user._id }).select("-cvv");
    if (!card) return res.status(404).json({ message: "No card found" });

    res.json(card);
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve billing card" });
  }
};
