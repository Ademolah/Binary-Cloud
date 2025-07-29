// // controllers/billingController.js
// const BillingCard = require('../models/BillingCard');

// // Add or update card
// exports.saveOrUpdateCard = async (req, res) => {
//   try {
//     const { cardHolderName, cardNumber, expiryMonth, expiryYear, cvv } = req.body;

//     const existingCard = await BillingCard.findOne({ user: req.user._id });

//     if (existingCard) {
//       // Update existing card
//       existingCard.cardHolderName = cardHolderName;
//       existingCard.cardNumber = cardNumber;
//       existingCard.expiryMonth = expiryMonth;
//       existingCard.expiryYear = expiryYear;
//       existingCard.cvv = cvv;

//       await existingCard.save();
//       return res.json({ message: "Card updated", card: existingCard });
//     }

//     // New card
//     const card = new BillingCard({
//       user: req.user._id,
//       cardHolderName,
//       cardNumber,
//       expiryMonth,
//       expiryYear,
//       cvv,
//     });

//     await card.save();
//     res.status(201).json({ message: "Card added", card });
//   } catch (err) {
//     console.error("Billing Save Error:", err.message);
//     res.status(500).json({ message: "Failed to save billing card" });
//   }
// };

// // Get card
// exports.getCard = async (req, res) => {
//   try {
//     const card = await BillingCard.findOne({ user: req.user._id }).select("-cvv");
//     if (!card) return res.status(404).json({ message: "No card found" });

//     res.json(card);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to retrieve billing card" });
//   }
// };

// controllers/billingController.js
const BillingCard = require('../models/BillingCard');

// Add or update card (used in POST /billing/cards)
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

// Get current user's card (GET /billing/card)
exports.getCard = async (req, res) => {
  try {
    const card = await BillingCard.findOne({ user: req.user._id }).select("-cvv");
    if (!card) return res.status(404).json({ message: "No card found" });

    res.json(card);
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve billing card" });
  }
};

// ✅ New: Update card by ID (PUT /billing/cards/:id)
exports.updateCard = async (req, res) => {
  try {
    const { id } = req.params;
    const { cardHolderName, cardNumber, expiryMonth, expiryYear, cvv } = req.body;

    const card = await BillingCard.findOne({ _id: id, user: req.user._id });
    if (!card) return res.status(404).json({ message: "Card not found" });

    card.cardHolderName = cardHolderName;
    card.cardNumber = cardNumber;
    card.expiryMonth = expiryMonth;
    card.expiryYear = expiryYear;
    card.cvv = cvv;

    await card.save();
    res.json({ message: "Card updated successfully", card });
  } catch (err) {
    console.error("Billing Update Error:", err.message);
    res.status(500).json({ message: "Failed to update billing card" });
  }
};

// ✅ Optional: Delete card (DELETE /billing/cards/:id)
exports.deleteCard = async (req, res) => {
  try {
    const { id } = req.params;

    const card = await BillingCard.findOneAndDelete({ _id: id, user: req.user._id });
    if (!card) return res.status(404).json({ message: "Card not found or already deleted" });

    res.json({ message: "Card deleted successfully" });
  } catch (err) {
    console.error("Billing Delete Error:", err.message);
    res.status(500).json({ message: "Failed to delete billing card" });
  }
};

