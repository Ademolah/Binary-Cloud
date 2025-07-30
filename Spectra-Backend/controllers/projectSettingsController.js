// controllers/projectSettingsController.js
const ProjectSettings = require("../models/ProjectSettings");

exports.getProjectSettings = async (req, res) => {
  try {
    const settings = await ProjectSettings.findOne({
      user: req.user._id,
      projectId: req.params.projectId,
    });

    if (!settings) return res.status(404).json({ message: "No settings found for this project." });
    res.json(settings);
  } catch (err) {
    console.error("Fetch settings error:", err.message);
    res.status(500).json({ message: "Error fetching settings" });
  }
};

exports.saveOrUpdateProjectSettings = async (req, res) => {
  try {
    const {
      description,
      githubRepo,
      autoDeploy,
      buildCommand,
      outputDirectory,
      envVars,
    } = req.body;

    const existing = await ProjectSettings.findOne({
      user: req.user._id,
      projectId: req.params.projectId,
    });

    if (existing) {
      existing.description = description;
      existing.githubRepo = githubRepo;
      existing.autoDeploy = autoDeploy;
      existing.buildCommand = buildCommand;
      existing.outputDirectory = outputDirectory;
      existing.envVars = envVars;
      await existing.save();
      return res.json({ message: "Settings updated", settings: existing });
    }

    const newSettings = new ProjectSettings({
      user: req.user._id,
      projectId: req.params.projectId,
      description,
      githubRepo,
      autoDeploy,
      buildCommand,
      outputDirectory,
      envVars,
    });

    await newSettings.save();
    res.status(201).json({ message: "Settings saved", settings: newSettings });
  } catch (err) {
    console.error("Save settings error:", err.message);
    res.status(500).json({ message: "Error saving settings" });
  }
};
