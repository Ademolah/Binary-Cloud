// routes/billingRoutes.js
// const express = require("express");
// const router = express.Router();
// const { saveOrUpdateCard, getCard } = require("../controllers/billingController");
// const authMiddleware = require("../middleware/authMiddleware");

// router.route("/card")
//   .post(authMiddleware, saveOrUpdateCard)
//   .get(authMiddleware, getCard);

// module.exports = router;

// routes/billing.js

const express = require("express");
const router = express.Router();
const {
  saveOrUpdateCard,
  getCard,
  updateCard,
  deleteCard
} = require("../controllers/billingController");
const authMiddleware = require("../middleware/authMiddleware");

// GET current user's card
router.get("/card", authMiddleware, getCard);

// POST new card
router.post("/cards", authMiddleware, saveOrUpdateCard);

// PUT update card by ID
router.put("/cards/:id", authMiddleware, updateCard);

// DELETE card by ID (optional, if you implement it)
router.delete("/cards/:id", authMiddleware, deleteCard);

module.exports = router;

