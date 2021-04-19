/** @format */

const mongoose = require("mongoose");

const takenschema = new mongoose.Schema({
  Studentid: {
    type: String,
    //  required: true
  },

  Registeredcourses: {
    type: Array,
  },
  Takencourses: {
    type: Array,
  },
});

const Myobject = mongoose.model("Takencourses", takenschema);

module.exports = Myobject;
