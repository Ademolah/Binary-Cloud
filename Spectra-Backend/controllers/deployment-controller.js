// controllers/deploymentController.js
const Deployment = require("../models/Deployment");



exports.createDeployment = async (req, res) => {
  try {
    const { projectName, framework, environment, domain } = req.body;

    console.log("Incoming deployment request:", {
      projectName,
      framework,
      environment,
      domain,
    });

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized. User not found." });
    }

    const existing = await Deployment.findOne({ domain });
    if (existing) {
      return res.status(400).json({ message: "Domain is already in use" });
    }

    const deployment = new Deployment({
      user: req.user._id,
      projectName,
      framework,
      environment,
      domain,
      status: "building",
      buildLogs: ["Initializing build process..."],
    });

    await deployment.save();
    return res.status(201).json({ message: "Deployment created", deployment });

  } catch (err) {
    console.error("Create Deployment Error:", err);
    return res.status(500).json({ message: "Failed to create deployment", error: err.message });
  }
};




// Get all deployments for current user
exports.getUserDeployments = async (req, res) => {
  try {
    const deployments = await Deployment.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(deployments);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch deployments" });
  }
};

// Get a single deployment by ID
exports.getDeploymentById = async (req, res) => {
  try {
    const deployment = await Deployment.findOne({ _id: req.params.id, user: req.user._id });
    if (!deployment) return res.status(404).json({ message: "Deployment not found" });

    res.json(deployment);
  } catch (err) {
    res.status(500).json({ message: "Error fetching deployment" });
  }
};

// Update deployment (status, logs, etc.)
exports.updateDeployment = async (req, res) => {
  try {
    const updates = req.body; // e.g. { status: "deployed", buildLogs: [...] }

    const updated = await Deployment.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      updates,
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Deployment not found" });

    res.json({ message: "Deployment updated", deployment: updated });
  } catch (err) {
    console.error("Update Deployment Error:", err.message);
    res.status(500).json({ message: "Failed to update deployment" });
  }
};

exports.redeployDeployment = async (req, res) => {
  try {
    const deployment = await Deployment.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!deployment) {
      return res.status(404).json({ message: "Deployment not found" });
    }

    // Simulate redeployment
    deployment.status = "building";
    deployment.buildLogs = ["Redeployment started...", "Rebuilding..."];
    deployment.deployedAt = null;
    await deployment.save();

    res.json({ message: "Redeployment triggered", deployment });
  } catch (err) {
    res.status(500).json({ message: "Redeployment failed" });
  }
};



// Optional: Delete deployment
exports.deleteDeployment = async (req, res) => {
  try {
    const deleted = await Deployment.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!deleted) return res.status(404).json({ message: "Deployment not found" });

    res.json({ message: "Deployment deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting deployment" });
  }
};

// controllers/deploymentController.js

exports.checkDomainAvailability = async (req, res) => {
    console.log("🚀 checkDomainAvailability hit")
  try {
    const { domain } = req.query;

    if (!domain) {
      return res.status(400).json({ message: "Domain query is required" });
    }

    const existing = await Deployment.findOne({ domain });

    res.json({ available: !existing });
  } catch (err) { 
    // res.status(500).json({ message: "Error fetching deployment here" });
    console.error("Domain check error:", err.message);
  }
};








