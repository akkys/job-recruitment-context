const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cmpRegSchema = new Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    category: { type: String },
    street1: { type: String },
    street2: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    zipcode: { type: String },
    userId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const CmpReg = mongoose.model("CmpReg", cmpRegSchema);

module.exports = CmpReg;
