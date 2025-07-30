// routes/projectSettings.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  getProjectSettings,
  saveOrUpdateProjectSettings,
} = require("../controllers/projectSettingsController");

router
  .route("/:projectId")
  .get(auth, getProjectSettings)
  .post(auth, saveOrUpdateProjectSettings);

module.exports = router;
