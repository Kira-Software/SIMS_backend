/** @format */

const express = require("express");
const router = express.Router();
const studentcoursemodel = require("../../models/studentcoursemodel");
const sectionedmodel = require("../../models/sectionedmodel");
const takenmodel = require("../../models/takenmodel");

const auth = require("../Middleware/auth");

router.post("/", auth, async (req, res) => {
  try {
    console.log("the req.body value is " + req.body);
    const { Courses } = req.body;

    const temp = await sectionedmodel.find({
      Applicationid: req.user.Applicationid,
    });
    //console.log("the value of temp.Year is "+ temp[0].Year)

    const ifreg = await studentcoursemodel.findOne({
      Studentid: req.user.Applicationid,
      Year: temp[0].Year,
      Semister: temp[0].Semister,
      Section: temp[0].Section,
    });

    console.log("the value of ifreg is ", ifreg);

    const x = ifreg.Courses;
    console.log("the value of x before is ", x); 

    if (Array.isArray(Courses)) {
      for (let i = 0; i < Courses.length; i++) {
        x.push(Courses[i]);
      }
    }

    console.log("the value of x after is ", x);

    const toupdate = await studentcoursemodel.updateOne(
      {
        Studentid: req.user.Applicationid,
        Year: temp[0].Year,
        Semister: temp[0].Semister,
        Section: temp[0].Section,
      },
      { $set: { Courses: x } },
      { $new: true }
    );
    console.log(
      "the new course has been added successfully to your course list !"
    );

    const temp2 = await takenmodel.findOne({ Studentid: req.user.Applicationid });
    console.log("the value of temp is " + temp2);
    const y = temp2.Registeredcourses;

    if (Array.isArray(Courses)) {
      for (let i = 0; i < Courses.length; i++) {
        y.push(Courses[i]);
      }
    }
 //   y.push(Courses);
    console.log("the value of y is ", y);

    const takenupdate = await takenmodel.updateOne(
      { Studentid: req.user.Applicationid },
      { $set: { Registeredcourses: y } },
      { $new: true }
    );

    res.json(toupdate);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// router.get("/",auth, async (req, res) => {
//   try {
//     //const search = await studentcoursemodel.find().limit(2);
//     const search = await Coursemodel.find({Department: req.user.Departmentname});
//     console.log("the search value is  " + search);
//     res.json(search);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("server error");
//   }
// });

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
