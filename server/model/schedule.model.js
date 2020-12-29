const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scheduleSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    date: { type: Date, required: true },
    interviewer: { type: String, required: true },
    inttype: { type: String, required: true },
    status: { type: String, required: true },
    userId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;
