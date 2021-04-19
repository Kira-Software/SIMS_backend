/** @format */

const mongoose = require("mongoose");

const instructorassignschema = new mongoose.Schema({
  Instructorid: {
    type: String 
    //  required: true
  },
  Year : {
      type : Number
  },
  Semister : {
      type : Number
  },
  Section: {
      type: Number
  },
  Coursename : {
      type : String
  }
});

const Myobject = mongoose.model("Instructorassign", instructorassignschema);

module.exports = Myobject;
 