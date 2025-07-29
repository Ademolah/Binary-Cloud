const express = require("express");
const router = express.Router();
const { getTransactions } = require("../controllers/transactions-controller");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, getTransactions);

module.exports = router;
