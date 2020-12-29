const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    cmpName: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    category: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", UserSchema);

module.exports = User;
