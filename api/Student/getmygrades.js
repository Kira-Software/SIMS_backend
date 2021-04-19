const express = require("express");
const router = express.Router();
const auth = require("../Middleware/auth");
const Grademodel = require("../../models/grademodel");

router.get("/:id", auth, async (req, res) => {
  // console.log("the value of request.body is " + req.body);
  try {
    // const age =
    //   new Date(Date.now()).getFullYear() -
    //   new Date(req.user.birthdate).getFullYear();

    // console.log("in the giveme age of the user is", age);

    const grades = await Grademodel.find({ Studid: req.params.id });

    if (!grades) {
      res.status(400).json({ msg: "there is no student grade for this api" });
    }

    res.json(grades);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
