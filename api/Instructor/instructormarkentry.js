/** @format */

const express = require("express");
const { findOneAndDelete } = require("../../models/instructormarkentrymodel");
const router = express.Router();
const Markentrymodel = require("../../models/instructormarkentrymodel");
//const takenmodel = require("../../models/takenmodel");
const auth = require("../Middleware/auth");

router.post("/", auth, async (req, res) => {
  // console.log("the value of req.body is " + req.body)
  // console.log("the value of req.file is "+ req.file)
  try {
    const {
      Year,
      Semister,
      Section,
      Coursename,
      Assessment,
      //Studentid
    } = req.body;

    const obj = {
      Instructorid: req.user.Id,
      Year,
      Semister,
      Section,
      Coursename,
      Assessment,
      //  Studentid
    };

    //console.log("the obj value is that "+obj)

    const search = await Markentrymodel.find({
      Instructorid: req.user.Id,
      Coursename,
      Year,
      Semister,
      Section,
    });

    if (search) {
      console.log("search is foundddddddddddddddddd")
     await Markentrymodel.deleteOne({
        Instructorid: req.user.Id,
        Coursename,
        Year,
        Semister,
        Section,
      });

      const data = new Markentrymodel(obj);
      await data.save();

      //  console.log("the value of final is " + data);

      res.json(data);
    } else {
      const data = new Markentrymodel(obj);
      await data.save();

      //  console.log("the value of final is " + data);

      res.json(data);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

router.get("/", auth, async (req, res) => {
  try {
    //const search = await Markentrymodel.find().limit(2);
    const { Coursename, Year, Semister, Section } = req.query;
    // console.log("the query values are",Coursename, Year, Semister, Section)
    // console.log("the Instructor id is ",req.user.Id)
    const search = await Markentrymodel.find({
      Instructorid: req.user.Id,
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
