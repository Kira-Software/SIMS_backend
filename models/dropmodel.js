/** @format */

const mongoose = require("mongoose");

const droppedcourseschema = new mongoose.Schema({
  Studentid: {
    type: String,
   // unique: true
    //  required: true
  },
  Droppedcourse: {
      type: Array 
    //  required: true
  }
}); 

const Myobject = mongoose.model("Droppedcourse", droppedcourseschema);

module.exports = Myobject;
  