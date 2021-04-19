/** @format */

const mongoose = require("mongoose");

const departmentschema = new mongoose.Schema({
  Departmentname: {
    type: String,
    unique: true
    //  required: true
  },
  Duration: {
      type: Number 
    //  required: true
  },
  Password: {
    type: String
  },
  Classes: {
    type : [Array]
  }
}); 

const Myobject = mongoose.model("Departments", departmentschema);

module.exports = Myobject;
  