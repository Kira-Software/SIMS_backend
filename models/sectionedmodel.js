/** @format */

const mongoose = require("mongoose");

const sectionedschema = new mongoose.Schema({
  Applicationid: {
    type: String
  },
  Firstname: {
    type: String
    //  required: true
  },
  Middlename: {
    type: String
    //  required: true
  },
  Lastname: {
    type: String
    //  required: true
  },
  Birthdate: {
    type: String
    //  required: true
  },
  Sex: {
    type: String
    //  required: true
  },
  Telephone: {
    type: String
    //  required: true
  },
  Email: {
    type: String
    //  required: true
  },
  
  Field: {
    type: String
    //  required: true
  },
  Year: {
    type: Number
  },
  Semister: {
    type: Number
  },
  Section: {
    type: Number
  }
});

const Myobject = mongoose.model("Sectionedstudents", sectionedschema);

module.exports = Myobject;
