const express = require("express");
const router = express.Router();
const auth = require("../Middleware/auth");
const studentcoursemodel = require("../../models/studentcoursemodel");

router.get("/:id", auth, async (req, res) => {
  // console.log("the value of request.body is " + req.body);
  try {
    // const age =
    //   new Date(Date.now()).getFullYear() -
    //   new Date(req.user.birthdate).getFullYear();

    // console.log("in the giveme age of the user is", age);

    const courses = await studentcoursemodel.find({ Studentid: req.params.id });

    if (!courses) {
      res.status(400).json({ msg: "there is no student grade for this api" });
    }

    res.json(courses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
