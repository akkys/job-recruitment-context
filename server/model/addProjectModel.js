const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true },
    summary: { type: String, required: true },
    description: { type: String, required: true },
    cmpName: { type: String, required: true },
    fromDate: { type: Date, required: true },
    toDate: { type: Date, required: true },
    role: { type: String, required: true },
    contribution: { type: String, required: true },
    technologies: { type: Array, required: true },
    userId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Projects = mongoose.model("project", ProjectSchema);

module.exports = Projects;
