/** @format */

const mongoose = require("mongoose");

const gradeschema = new mongoose.Schema({
  Studid: {
    type: String,
    //  required: true
  },
  Year: {
    type: Number,
    //  required: true
  },
  Semister: {
    type: Number,
    //  required: true
  },
  Section: {
    type: Number,
    //  required: true
  },

  Course: {
    type: String,
  },
  Grade: {
    type: String,
  },
});

const Myobject = mongoose.model("Grades", gradeschema);

module.exports = Myobject;
