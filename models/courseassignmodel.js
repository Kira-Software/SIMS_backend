/** @format */

const mongoose = require("mongoose");

const courseassignschema = new mongoose.Schema({
  Department: {
    type: String 
    //  required: true
  },
  Year : {
      type : Number
  },
  Semister : {
      type : Number
  },
  Courses : {
      type : Array
  }
});

const Myobject = mongoose.model("Courseassign", courseassignschema);

module.exports = Myobject;
 