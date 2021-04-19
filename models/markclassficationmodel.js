/** @format */

const mongoose = require("mongoose");

const markschema = new mongoose.Schema({
  Instructorid: {
    type: String,
    //  required: true
  },
  Coursename:{
    type: String
  },
  Quiz: {
    type: Array,
  },
  Assignment: {
    type: Array,
  },
  Project: {
    type: Array,
  },
  Attendance: {
    type: Array,
  },
  Final: {
    type: Number,
  },
});

const Myobject = mongoose.model("Assessments", markschema);

module.exports = Myobject;
