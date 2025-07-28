const User = require('../models/User')

// controllers/userController.js


exports.getUserProfile = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(404).json({ message: "User not found in request." });
    }

    res.status(200).json({
      id: user._id,
      fullName: user.fullName,
      email: user.email,
    });
  } catch (err) {
    console.error("Get Profile Error:", err.message);
    res.status(500).json({ message: "Server error fetching profile." });
  }
};


exports.updateProfile = async (req, res) => {
  try {
    const { fullName, email } = req.body;

    const updates = {};
    if (fullName) updates.fullName = fullName;
    if (email) updates.email = email;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Profile updated", user: updatedUser });
  } catch (err) {
    console.error("Update Profile Error:", err.message);
    res.status(500).json({ message: "Server error", err });
  }
};

