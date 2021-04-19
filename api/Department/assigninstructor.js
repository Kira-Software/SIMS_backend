/** @format */

const express = require("express");
const router = express.Router();
const Instructorassign = require("../../models/instructorassignmodel");
const auth = require("../Middleware/auth");

router.post("/", auth, async (req, res) => {
  // console.log("the value of req.body is " + req.body)
  // console.log("the value of req.file is "+ req.file)
  try {
    const { Instructorid, Year, Semister, Section, Coursename } = req.body;
    // console.log("the value of the first name is " + Firstname)
    // console.log("the value of the middle name is " + Middlename)
    // console.log("the value of the last name is " + Lastname)

    const obj = {
      Instructorid,
      Year,
      Semister,
      Section,
      Coursename,
    };

    obj.Department = req.user.Departmentname;

    //console.log("the obj value is that "+obj)

    const data = new Instructorassign(obj);

    await data.save();

    console.log("the value of final is " + data);

    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
