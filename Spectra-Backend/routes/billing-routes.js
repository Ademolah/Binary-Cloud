// routes/billingRoutes.js
const express = require("express");
const router = express.Router();
const { saveOrUpdateCard, getCard } = require("../controllers/billingController");
const authMiddleware = require("../middleware/authMiddleware");

router.route("/card")
  .post(authMiddleware, saveOrUpdateCard)
  .get(authMiddleware, getCard);

module.exports = router;
