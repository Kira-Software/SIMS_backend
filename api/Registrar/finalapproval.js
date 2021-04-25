/** @format */

const express = require("express");
const router = express.Router();
const Departmentapproval = require("../../models/departmentapprovalreqmodel");
const Markentrymodel = require("../../models/instructormarkentrymodel");

const auth = require("../Middleware/auth");

router.patch("/",async (req, res) => {
  // console.log("the value of req.body is " + req.body)
  // console.log("the value of req.file is "+ req.file)
  try {
    const {
      Year,
      Semister,
      Section,
      Coursename,
      Instructorid,
      Departmentname
      //  Instructorid,
    } = req.body;

    const updated = await Departmentapproval.updateOne(
      {
        Year,
        Semister,
        Section,
        Coursename,
        Instructorid,
        Departmentname
      },
      { $set: { Registrarapproved: true } },
      { new: true }
    );

    const updated2 = await Markentrymodel.updateOne(
      {
        Year,
        Semister,
        Section,
        Coursename,
        Instructorid,
        Departmentname
      },
      { $set: { Allapproved: true } },
      { new: true }
    );

    // console.log("the updated document is ", updated);

    // res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

router.get("/", async (req, res) => {

  try {
    const {
      Year,
      Semister,
      Section,
      Coursename,
      Instructorid,
      Departmentname
    } = req.query;

    console.log(
      "the request query values are ",
      Year,
      Semister,
      Section,
      Coursename,
      Instructorid,
      Departmentname
    );

    const search = await Departmentapproval.find({
      Year,
      Semister,
      Section,
      Coursename,
      Instructorid,
      Departmentname,
      Departmentapproved: true,
      Registrarapproved: true
    });
    console.log("the search value of getting final approval is  " + search);
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
