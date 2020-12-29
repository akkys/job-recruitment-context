const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InterviewSchema = new Schema(
  {
    inttype: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const InterviewTypes = mongoose.model("InterviewTypes", InterviewSchema);

module.exports = InterviewTypes;
