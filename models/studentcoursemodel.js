/** @format */

const mongoose = require("mongoose");

const studcourseschema = new mongoose.Schema({
  Studentid: {
    type: String 
    //  required: true
  },
  Courses : {
      type : Array
  },
  Year: {
      type: Number
  },
  Semister : {
      type : Number
  },
  Section: {
      type: Number
  },
  Department : {
      type : String
  }
});

const Myobject = mongoose.model("studentcourse", studcourseschema);

module.exports = Myobject;
 