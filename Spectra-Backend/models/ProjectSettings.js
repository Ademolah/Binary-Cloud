// models/ProjectSettings.js
const mongoose = require("mongoose");

const ProjectSettingsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Deployment", // Assuming each "project" maps to a deployment
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    githubRepo: {
      type: String,
      default: "",
    },
    autoDeploy: {
      type: Boolean,
      default: false,
    },
    buildCommand: {
      type: String,
      default: "npm run build",
    },
    outputDirectory: {
      type: String,
      default: "dist",
    },
    envVars: [
      {
        key: { type: String },
        value: { type: String },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProjectSettings", ProjectSettingsSchema);
