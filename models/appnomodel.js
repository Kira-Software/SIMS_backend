/** @format */

const mongoose = require("mongoose");

const appnoschema = new mongoose.Schema({
  Appno: {
    type: Number 
    //  required: true
  }
});

const Myobject = mongoose.model("Appno", appnoschema);

module.exports = Myobject;
 