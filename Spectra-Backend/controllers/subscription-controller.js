const Subscription = require("../models/Subscription");

// Get current user's subscription
exports.getSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({ user: req.user._id });
    if (!subscription) {
      return res.status(404).json({ message: "No subscription found" });
    }
    res.json(subscription);
  } catch (err) {
    console.error("Get Subscription Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Create or update subscription
exports.updateSubscription = async (req, res) => {
  try {
    const { plan } = req.body;

    if (!["Free", "Pro", "Enterprise"].includes(plan)) {
      return res.status(400).json({ message: "Invalid plan type" });
    }

    const renewalDate = new Date();
    renewalDate.setMonth(renewalDate.getMonth() + 1); // renew every month

    let subscription = await Subscription.findOne({ user: req.user._id });

    if (subscription) {
      subscription.plan = plan;
      subscription.status = "active";
      subscription.startDate = new Date();
      subscription.renewalDate = renewalDate;
      await subscription.save();
    } else {
      subscription = new Subscription({
        user: req.user._id,
        plan,
        renewalDate,
      });
      await subscription.save();
    }

    res.status(200).json({ message: "Subscription updated", subscription });
  } catch (err) {
    console.error("Update Subscription Error:", err.message);
    res.status(500).json({ message: "Failed to update subscription" });
  }
};
