const {getUserProfile, updateProfile} = require('../controllers/user-controller')
const authMiddleware = require('../middleware/authMiddleware')

const express = require("express");
const router = express.Router();

router.get('/profile', authMiddleware, getUserProfile)
router.put('/profile', authMiddleware, updateProfile)

module.exports = router
