/** @format */

const express = require("express");
const router = express.Router();
const Courseassign = require("../../models/courseassignmodel");
const auth = require("../Middleware/auth")


router.get("/",auth, async (req, res) => {
  try {
    //const search = await Coursemodel.find().limit(2); 
    const {Year,Semister} = req.query


    const search = await Courseassign.find({Department: req.user.Departmentname,Year, Semister}); 
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
