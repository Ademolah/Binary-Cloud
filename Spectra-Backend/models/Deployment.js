const mongoose = require("mongoose");

const DeploymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    projectName: {
      type: String,
      required: true,
    },
    framework: {
      type: String,
      enum: ["React", "Next.js", "Vue", "Nodejs", "Other"],
      default: "React",
    },
    environment: {
      type: String,
      enum: ["production", "staging", "development"],
      default: "production",
    },
    domain: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["building", "deployed", "error", "inactive"],
      default: "building",
    },
    buildLogs: {
      type: [String],
      default: [],
    },
    deployedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Deployment", DeploymentSchema);
