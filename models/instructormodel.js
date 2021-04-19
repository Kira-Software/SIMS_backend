/** @format */

const mongoose = require("mongoose");

const instructorschema = new mongoose.Schema({
  Instructorfname: {
    type: String,
   // unique: true
    //  required: true
  },
  Instructormname: {
      type: String 
    //  required: true
  },
  Instructorlname: {
    type: String
  },
  Birthdate: {
    type: Date
  },
  Sex: {
    type: String
  },
  Department: {
    type: String
  },
  Password: {
    type: String
  },
}); 

const Myobject = mongoose.model("Instructors", instructorschema);

module.exports = Myobject;
  