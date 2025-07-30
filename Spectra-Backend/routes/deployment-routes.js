// routes/deployment.js
const express = require("express");
const router = express.Router();

const {
  createDeployment,
  getUserDeployments,
  getDeploymentById,
  updateDeployment,
  deleteDeployment,
  checkDomainAvailability,
  redeployDeployment,
} = require("../controllers/deployment-controller");
const authMiddleware = require("../middleware/authMiddleware");

// Create a new deployment
router.post("/", authMiddleware, createDeployment);

// Get all deployments for the current user
router.get("/", authMiddleware, getUserDeployments);

// Get single deployment by ID
router.get("/:id", authMiddleware, getDeploymentById);

// Update a deployment (e.g., status, logs)
router.put("/:id", authMiddleware, updateDeployment);

router.post("/:id/redeploy", authMiddleware, redeployDeployment);

// Delete a deployment
router.delete("/:id", authMiddleware, deleteDeployment);

router.get('/check-domain', authMiddleware, checkDomainAvailability)


module.exports = router;
