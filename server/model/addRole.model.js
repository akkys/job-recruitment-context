const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roleSchema = new Schema(
  {
    role: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const AddRole = mongoose.model("AddRole", roleSchema);

module.exports = AddRole;
