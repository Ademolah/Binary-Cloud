// seedTransactions.js

require('dotenv').config()
const mongoose = require("mongoose");



const Transaction = require("./models/Transactions"); // adjust path if needed

const MONGO_URL = process.env.MONGO_URL

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("MongoDB connected");
  seed();
}).catch(err => {
  console.error("MongoDB connection error:", err);
});

const seed = async () => {
  const userId = "68881488253a45d317bd6990";

  const transactions = [
    {
      user: userId,
      date: new Date("2025-07-01"),
      amount: 29.00,
      method: "Visa •••• 4242",
      status: "Paid",
    },
    {
      user: userId,
      date: new Date("2025-06-01"),
      amount: 29.00,
      method: "Visa •••• 4242",
      status: "Paid",
    },
    {
      user: userId,
      date: new Date("2025-05-01"),
      amount: 29.00,
      method: "Visa •••• 4242",
      status: "Paid",
    },
    {
      user: userId,
      date: new Date("2025-04-01"),
      amount: 29.00,
      method: "MasterCard •••• 9900",
      status: "Failed",
    },
    {
      user: userId,
      date: new Date("2025-03-01"),
      amount: 29.00,
      method: "Visa •••• 4242",
      status: "Pending",
    }
  ];

  try {
    await Transaction.insertMany(transactions);
    console.log("Transactions seeded successfully ✅");
    process.exit();
  } catch (err) {
    console.error("Error seeding transactions:", err);
    process.exit(1);
  }
};
