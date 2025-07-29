const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  plan: {
    type: String,
    enum: ["Free", "Pro", "Enterprise"],
    default: "Free",
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  renewalDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["active", "cancelled", "expired"],
    default: "active",
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Subscription", SubscriptionSchema);
