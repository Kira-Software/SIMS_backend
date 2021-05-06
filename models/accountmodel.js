/** @format */

const mongoose = require("mongoose");

const accountschema = new mongoose.Schema({
  Username: {
    type: String,
    unique: true,
    //  required: true
  },
  Password: {
    type: String,
  },
  Role: {
    type: String,
  },
  Accountblocked: {
    type: Boolean,
    default: false,
  },
});

const Myobject = mongoose.model("Accounts", accountschema);

module.exports = Myobject;
