/** @format */

const mongoose = require("mongoose");

const courseschema = new mongoose.Schema({
  Coursename: {
    type: String,
    //  required: true
  },
  Coursecode: {
    type: String,
    unique: true,
    //  required: true
  },
  Credithour: {
    type: Number,
  },
  Department: {
    type: String,
  },
  Prerequisite:{
    type: Array
  }
});

const Myobject = mongoose.model("Courses", courseschema);

module.exports = Myobject;
