/** @format */

const express = require("express");
const router = express.Router();
const Grademodel = require("../../models/grademodel");
const takenmodel = require("../../models/takenmodel");
const auth = require("../Middleware/auth");

router.post("/", auth, async (req, res) => {
  // console.log("the value of req.body is " + req.body)
  // console.log("the value of req.file is "+ req.file)
  try {
    const { Studid, Year, Semister, Section, Course, Grade } = req.body;

    const obj = {
      Studid,
      Year,
      Semister,
      Section,
      Course,
      Grade,
    };

    //console.log("the obj value is that "+obj)

    const data = new Grademodel(obj);

    await data.save();

    const temp = await takenmodel.findOne({ Studentid: Studid });
    console.log("the value of temp is " + temp);
    const x = temp.Takencourses;
    x.push(Course);
    console.log("the value of x is ", x);


    const toupdate = await takenmodel.updateOne( 
      { Studentid: Studid },
      { $set: { Takencourses: x } }, 
      { $new: true }
    );

    //  console.log("the value of final is " + data);

    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// router.get("/",auth, async (req, res) => {
//   try {
//     //const search = await Grademodel.find().limit(2);
//     const search = await Grademodel.find({Department: req.user.Departmentname});
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
