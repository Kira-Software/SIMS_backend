/** @format */

const mongoose = require("mongoose");

const specialentryschema = new mongoose.Schema({
  Studentid: {
    type: String,
  },
  Realid: {
    type: String,
  },
  Year: {
    type: Number,
  },
  Semister: {
    type: Number,
  },
  Section: {
    type: Number,
  },
  Department: {
    type: String,
  },
  Coursename: {
    type: String,
  },
  Instructorapproved: {
    type: Boolean,
    default: false,
  },
});

const Myobject = mongoose.model("SpecialEntry", specialentryschema);

module.exports = Myobject;
