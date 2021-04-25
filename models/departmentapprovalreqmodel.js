/** @format */

const mongoose = require("mongoose");

const departmentapproval = new mongoose.Schema({
  Departmentname: {
    type: String,
    // unique: true
    //  required: true
  },
  Year: {
    type: String,
    //  required: true
  },
  Semister: {
    type: String,
    //  required: true
  },
  Section: {
    type: String,
    //  required: true
  },
  Coursename: {
    type: String,
    //  required: true
  },
  Instructorid: {
    type: String,
    //  required: true
  },
  Instructorname: {
    type: String,
    //  required: true
  },
  Departmentapproved: {
    type:Boolean,
    default: false
  },
  Registrarapproved: {
    type:Boolean,
    default: false
  },
  Assessmentnumber:{
    type: Number
  }
});

const Myobject = mongoose.model("deptapprovalrequest", departmentapproval);
  
module.exports = Myobject;
