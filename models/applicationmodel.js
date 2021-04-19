/** @format */

const mongoose = require("mongoose");

const applicationschema = new mongoose.Schema({
  Firstname: {
    type: String,
     required: true
  },
  Middlename: {
    type: String,
     required: true
  },
  Lastname: {
    type: String,
     required: true
  },
  Birthdate: {
    type: String,
     required: true
  },
  Sex: {
    type: String,
     required: true
  },
  Telephone: {
    type: String,
     required: true
  },
  Email: {
    type: String,
     required: true
  },
  Birthregion: {
    type: String,
     required: true
  },
  Birthzone: {
    type: String,
     required: true
  },
  Birthworeda: {
    type: String,
     required: true
  },
  Currentregion: {
    type: String,
     required: true
  },
  Currentzone: {
    type: String,
     required: true
  },
  Currentworeda: {
    type: String,
     required: true
  },
  Currenthouseno: {
    type: String,
     required: true
  },
  Contactfname: {
    type: String,
     required: true
  },
  Contactmname: {
    type: String,
     required: true
  },
  Contactlname: {
    type: String,
     required: true
  },
  Contactregion: {
    type: String,
     required: true
  },
  Contactzone: {
    type: String,
     required: true
  },
  Contactworeda: {
    type: String,
     required: true
  },
  Contacthouseno: {
    type: String,
     required: true
  },
  Contactemail: {
    type: String,
     required: true
  },
  Contacttelephone: {
    type: String,
     required: true
  },
  Lasteducation: {
    type: String,
     required: true
  },
  Field: {
    type: String,
     required: true
  },
  File12: {
    type: String,
    required: true
  },
  File10: {
    type: String,
    required: true
  },
  File8: {
    type: String,
    required: true
  },
  File9_10: {
    type: String,
    required: true
  },
  File11_12: {
    type: String,
    required: true
  },
  Financial: {
    type: String,
    required: true
  },
  Photograph: {
    type: String,
    required: true
  },
  Approved: {
    type: Boolean
  },
  Year: {
    type:Number
  },
  Semister: {
    type:Number
  }
});

const Myobject = mongoose.model("Student", applicationschema);

module.exports = Myobject;
