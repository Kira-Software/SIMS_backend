/** @format */

const express = require("express");
const { findOneAndDelete } = require("../../models/instructormarkentrymodel");
const router = express.Router();
const Markentrymodel = require("../../models/instructormarkentrymodel");
//const takenmodel = require("../../models/takenmodel");
const auth = require("../Middleware/auth");


router.get("/", async (req, res) => {
  try {
    //const search = await Markentrymodel.find().limit(2);
    const { Coursename, Year, Semister, Section,Instructorid } = req.query;
    // console.log("the query values are",Coursename, Year, Semister, Section)
    // console.log("the Instructor id is ",req.user.Id)
    const search = await Markentrymodel.find({
      Instructorid,
      Coursename,
      Year,
      Semister,
      Section,
    });
    console.log("the search value is  " + search);
    res.json(search);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// router.get("/:id", async (req, res) => {
//   try {
//     const search = await Myobject.find({ _id: req.params.id });
//     console.log("the search value is  " + search);
//     res.json(search);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("server error");
//   }
// });
module.exports = router;
