const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const experienceSchema = new Schema(
  {
    cmpName: { type: String, required: true },
    role: { type: String, required: true },
    description: { type: String, required: true },
    fromDate: { type: Date, required: true },
    toDate: { type: Date, required: true },
    userId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Experience = mongoose.model("experince", experienceSchema);

module.exports = Experience;
