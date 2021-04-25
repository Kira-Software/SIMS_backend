/** @format */

const express = require("express");
const router = express.Router();
const Departmentapproval = require("../../models/departmentapprovalreqmodel");
const Markentrymodel = require("../../models/instructormarkentrymodel");

const auth = require("../Middleware/auth");

router.post("/", auth, async (req, res) => {
  // console.log("the value of req.body is " + req.body)
  // console.log("the value of req.file is "+ req.file)
  try {
    const {
      Departmentname,
      Year,
      Semister,
      Section,
      Coursename,
      Instructorname,
      Assessmentnumber,
      //  Instructorid,
    } = req.body;

    //  console.log("the id of instructor is", req.user.Id)

    const Instructorid = req.user.Id;

    const obj = {
      Departmentname,
      Year,
      Semister,
      Section,
      Coursename,
      Instructorid,
      Instructorname,
      Assessmentnumber,
    };

    //console.log("the obj value is that "+obj)

    const updated = await Markentrymodel.updateOne(
      {
        Departmentname,
        Year,
        Semister,
        Section,
        Coursename,
        Instructorid,
      },
      { $set: { Assessmentnumber } },
      { new: true }
    );

    const data = new Departmentapproval(obj);

    await data.save();

    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const { Departmentname, Year, Semister, Section, Coursename } = req.query;

    console.log(
      "the request query values are ",
      Departmentname,
      Year,
      Semister,
      Section,
      Coursename
    );

    const search = await Departmentapproval.find({
      Departmentname,
      Year,
      Semister,
      Section,
      Coursename,
      Instructorid: req.user.Id,
    });
    console.log("the search value of getting for dep't approval is  " + search);
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
