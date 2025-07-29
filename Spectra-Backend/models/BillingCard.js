const mongoose = require('mongoose')



const BillingCardSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  cardHolderName: {
    type: String,
    required: true,
  },
  cardNumber: {
    type: String,
    required: true,
  },
  expiryMonth: {
    type: String,
    required: true,
  },
  expiryYear: {
    type: String,
    required: true,
  },
  cvv: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model("BillingCard", BillingCardSchema);
