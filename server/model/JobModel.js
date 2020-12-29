const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobListSchema = new Schema(
  {
    companyName: { type: String, required: true },
    position: { type: String, required: true },
    role: { type: String, required: true },
    level: { type: String, required: true },
    location: { type: String, required: true },
    contract: { type: String, required: true },
    languages: { type: Array, default: [] },
    tools: { type: Array, default: [] },
    minSalary: { type: String, required: true },
    maxSalary: { type: String, required: true },
    experience: { type: String, required: true },
    userId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const JobList = mongoose.model("jobList", JobListSchema);

module.exports = JobList;
