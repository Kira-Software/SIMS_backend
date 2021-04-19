/** @format */

const express = require("express");
const router = express.Router();
const studentcoursemodel = require("../../models/studentcoursemodel");
const sectionedmodel = require("../../models/sectionedmodel");
const takenmodel = require("../../models/takenmodel");

const auth = require("../Middleware/auth");

router.post("/", auth, async (req, res) => {
  // console.log("the value of req.body is " + req.body)
  // console.log("the value of req.file is "+ req.file)
  try {
    const { Courses } = req.body;
    // console.log("the value of the first name is " + Firstname)
    // console.log("the value of the middle name is " + Middlename)
    // console.log("the value of the last name is " + Lastname)

    // const obj = {
    //   Courses
    // };

    ////////////////////// ADDING THE REGISTERED COURSES TO THE TAKEN COLLECTION
    const ifreg = await takenmodel.find({ Studentid: req.user.Applicationid });

    if (ifreg.length !== 0) {
      const toupdate = await takenmodel.updateOne(
        { Studentid: req.user.Applicationid },
        { $set: { Registeredcourses: Courses } },
        { $new: true }
      );
      console.log("the registered courses has been updated successfully !");
    } else {
      const newregistered = new takenmodel({
        Studentid: req.user.Applicationid,
        Registeredcourses: Courses,
      });
      await newregistered.save();
      console.log("the registered courses has been saved successfully !");
    }
    ///////////////////////////////////////////////////////////

    const temp = await sectionedmodel.find({
      Applicationid: req.user.Applicationid,
    });
    console.log("the value of temp is " + temp);

    const obj = {
      Studentid: req.user.Applicationid,
      Courses: Courses,
      Year: temp[0].Year,
      Semister: temp[0].Semister,
      Section: temp[0].Section,
      Department: temp[0].Field,
    };

    //console.log("the obj value is that "+obj)

    const data = new studentcoursemodel(obj);

    await data.save();

    console.log("the value of final is " + data);

    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

router.get("/", auth, async (req, res) => {
  try {
    //const search = await Coursemodel.find().limit(2);
    const { Department, Year, Semister, Section } = req.query;

    // console.log(
    //   "the value of year and semister in the back is " + year + "and" + semister
    // );

    const students = await studentcoursemodel
      .find({
        Department: { $eq: Department },
        Year: { $eq: Year },
        Semister: { $eq: Semister },
        Section: { $eq: Section },

        //Approved: { $eq: true },
      })
      .sort("Firstname");

    // const search = await studentcoursemodel.find({
    //   Department: req.user.Department,
    // });
    // console.log("the department value is  " + req.user.Department);
    res.json(students);
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
