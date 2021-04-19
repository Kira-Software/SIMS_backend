/** @format */

const mongoose = require("mongoose");

const sutudloginschema = new mongoose.Schema({
  
  Studid: {
    type: String
  },
  Id: {
    type: String 
    //  required: true
    },
  Temppass: {
     type: Number
 }
});

const Myobject = mongoose.model("templogin", sutudloginschema);

module.exports = Myobject;
 