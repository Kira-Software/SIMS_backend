/** @format */

const mongoose = require("mongoose");

const withdrawalschema = new mongoose.Schema({
  Studentid: {
    type: String 
    //  required: true
  },
  Withdrawaldate: {
      type: Date
  }
});

const Myobject = mongoose.model("Withdrawals", withdrawalschema);

module.exports = Myobject;
 