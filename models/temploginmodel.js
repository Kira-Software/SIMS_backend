/** @format */

const mongoose = require("mongoose");

const temploginschema = new mongoose.Schema({
  Studid: {
    type: String
  },
  Id: {
    type: String 
    //  required: true
    },
  Temppass: {
     type: Number
  },
  Newpassword: {
    type: String
  }
});

const Myobject = mongoose.model("templogin", temploginschema);

module.exports = Myobject;
 