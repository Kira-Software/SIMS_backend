/** @format */

const mongoose = require("mongoose");

const instructormarkentryschema = new mongoose.Schema({
  Instructorid: {
    type: String 
    //  required: true
  },
  // Studentid:{
  //   type:String
  // },
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
  },
  Assessment: {
    type: [Array]
  }
});

const Myobject = mongoose.model("Instructormarkentry", instructormarkentryschema);

module.exports = Myobject;
 