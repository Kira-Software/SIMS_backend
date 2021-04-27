/** @format */

const mongoose = require("mongoose");

const calendarschema = new mongoose.Schema({
  AC: {
    type: String,
  },
  Program: {
    type: String,
  },
  Year: {
    type: String,
  },
  Semister: {
    type: String,
  },
  Calendar: {
    type: [Array],
  },
});

const Myobject = mongoose.model("Calendar", calendarschema);

module.exports = Myobject;
