/** @format */

const express = require("express");
const router = express.Router();
const Departmentapproval = require("../../models/departmentapprovalreqmodel");
const auth = require("../Middleware/auth");

router.patch("/", auth, async (req, res) => {
  // console.log("the value of req.body is " + req.body)
  // console.log("the value of req.file is "+ req.file)
  try {
    const {
      Departmentname,
      Year,
      Semister,
      Section,
      Coursename,
      Instructorid,
      //  Instructorid,
    } = req.body;

    const updated = await Departmentapproval.updateOne(
      {
        Departmentname,
        Year,
        Semister,
        Section,
        Coursename,
        Instructorid,
      },
      { $set: { Departmentapproved: true } },
      { new: true }
    );

    // console.log("the updated document is ", updated);

    // res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

router.get("/", auth, async (req, res) => {

  try {
    const {
      Departmentname,
      Year,
      Semister,
      Section,
      Coursename,
      Instructorid
    } = req.query;

    console.log(
      "the request query values are ",
      Departmentname,
      Year,
      Semister,
      Section,
      Coursename,
      Instructorid
    );

    const search = await Departmentapproval.find({
      Departmentname,
      Year,
      Semister,
      Section,
      Coursename,
      Instructorid,
      Departmentapproved: true
    });
    console.log("the search value of getting for registrar approval is  " + search);
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
