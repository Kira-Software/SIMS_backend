/** @format */

const express = require("express");
const router = express.Router();
const Courseassign = require("../../models/courseassignmodel");
const auth = require("../Middleware/auth")


router.post("/",auth, async (req, res) => {
  // console.log("the value of req.body is " + req.body)
  // console.log("the value of req.file is "+ req.file)
  try {
    const {
      Year,
      Semister,
      Courses
    } = req.body;
    // console.log("the value of the first name is " + Firstname)
    // console.log("the value of the middle name is " + Middlename)
    // console.log("the value of the last name is " + Lastname)

    const obj = {
        Year,
        Semister,
        Courses
    };

    obj.Department = req.user.Departmentname



    //console.log("the obj value is that "+obj)

    const data = new Courseassign(obj);

    await data.save();

    console.log("the value of final is " + data);

    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});



router.get("/",auth, async (req, res) => {
  try {
    //const search = await Coursemodel.find().limit(2); 
    const search = await Courseassign.find({Department: req.user.Departmentname}); 
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
