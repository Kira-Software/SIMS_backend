/** @format */

const express = require("express");
const router = express.Router();
const dropmodel = require("../../models/dropmodel");
const studentcoursemodel = require("../../models/studentcoursemodel");

const auth = require("../Middleware/auth");

router.post("/", auth, async (req, res) => {
  try {
    const { Course } = req.body;

    const selectdropped = await dropmodel.findOne({
      Studentid: req.user.Applicationid,
    });

    if (selectdropped) {
      console.log("the value of selectdropped is ", selectdropped);

      const x = selectdropped.Droppedcourse;
      console.log("the value of x before is ", x);
      console.log("the value of new dropped course is ", Course);

      if (Array.isArray(Course)) {
        for (let i = 0; i < Course.length; i++) {
          x.push(Course[i]);
        }
      }
      console.log("the value of x after is ", x);

      const updateddrop = await dropmodel.updateOne(
        { Studentid: req.user.Applicationid },
        { $set: { Droppedcourse: x }, new: true }
      );
      res.json(updateddrop);
    } else {
      const obj = {
        Studentid: req.user.Applicationid,
        Droppedcourse: Course,
      };
      const newdropped = new dropmodel(obj);

      const newsaved = await newdropped.save();
      res.json(newsaved);
    }

    const selectregcourse = await studentcoursemodel.findOne({
      Studentid: req.user.Applicationid,
    });

    let registeredcourses = selectregcourse.Courses;
    console.log("the value of registered courses before is", registeredcourses);

    for (let i = 0; i < Course.length; i++) {
      if (registeredcourses.includes(Course[i])) {
        // let x = indexOf(Course[i])
        let j;
        for (let k = 0; k < registeredcourses.length; k++) {
          if (Course[i] == registeredcourses[k]) {
            j = k;
          }
        }
        registeredcourses.splice(j, 1);
      }
      console.log(
        "the value of registered courses after is",
        registeredcourses
      );
    }

    const updatereg = await studentcoursemodel.findOneAndUpdate(
      {
        Studentid: req.user.Applicationid,
      },
      { $set: { Courses: registeredcourses }, new: true }
    );

    // const search = await takenmodel.find({
    //   Studentid: req.user.Applicationid,
    // });
    // console.log("the search value is  " + search);
    // res.json(search);
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
