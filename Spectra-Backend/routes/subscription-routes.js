const express = require("express");
const router = express.Router();
const { getSubscription, updateSubscription } = require("../controllers/subscription-controller");
const authMiddleware = require("../middleware/authMiddleware");

router
  .route("/billing")
  .get(authMiddleware, getSubscription)
  .put(authMiddleware, updateSubscription);

module.exports = router;
