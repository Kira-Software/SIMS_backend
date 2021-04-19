/** @format */

const express = require("express");
const router = express.Router();
const Assessmentmodel = require("../../models/markclassficationmodel");
const auth = require("../Middleware/auth");

router.post("/", auth, async (req, res) => {
  // console.log("the value of req.body is " + req.body)
  // console.log("the value of req.file is "+ req.file)
  try {
    const { Quiz, Coursename,Assignment, Project, Attendance, Final } = req.body;
    console.log("the value of req.body  is ", req.body);

    const obj = {
      Instructorid: req.user.Id,
      Coursename,
      Quiz,
      Assignment,
      Project,
      Attendance,
      Final,
    };

    //console.log("the obj value is that "+obj)

    const data = new Assessmentmodel(obj);

    await data.save();

    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

router.get("/",auth, async (req, res) => {
  try {
    //const search = await Assessmentmodel.find().limit(2);
    const search = await Assessmentmodel.find({Instructorid: req.user.Id});
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
