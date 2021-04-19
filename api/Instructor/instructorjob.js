/** @format */

const express = require("express");
const router = express.Router();
const Instructorassign = require("../../models/instructorassignmodel");
const auth = require("../Middleware/auth");

router.get("/:id", auth, async (req, res) => {
  try {
    //const search = await Coursemodel.find().limit(2);
    const search = await Instructorassign.find({
      Instructorid: req.params.id,
    }).sort("Year Semister Section Coursename");
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
