// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/auth-controllers");



router.post("/register", register);
router.post("/login", login);

// Test protected route
// router.get('/protected', protect, (req, res) => {
//   res.json({
//     message: 'Access granted to protected route',
//     user: req.user
//   });
// });

module.exports = router;
