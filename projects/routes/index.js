var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");

const Project = mongoose.model("Project");

router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().lean(); // Use lean() to ensure plain JavaScript objects
    projects.forEach((project) => {
      project.start_date_formatted = formatDate(project.start_date);
      project.end_date_formatted = formatDate(project.end_date);
    });
    res.render("index", { projects });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve projects", error: error.message });
  }
});

function formatDate(date) {
  return new Date(date).toLocaleDateString();
}

module.exports = router;
