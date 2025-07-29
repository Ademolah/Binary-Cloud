// seedDeployment.js
require('dotenv').config()
const mongoose = require("mongoose");
const Deployment = require("./models/Deployment");

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function seed() {
  const deployment = new Deployment({
    user: "68881488253a45d317bd6990", // Replace with actual User ObjectId
    projectName: "VisionAI",
    framework: "React",
    enviroment: "staging",
    domain: "visionai.spectra.dev",
    status: "deployed",
    buildLogs: ["Build started", "Build completed successfully"],
    deployedAt: new Date()
  });

  await deployment.save();
  console.log("Deployment seeded!");
  mongoose.disconnect();
}

seed();
