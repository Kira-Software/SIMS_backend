const express = require("express");
const router = express.Router();
const auth = require("../Middleware/auth");
const sectionedmodel = require("../../models/sectionedmodel");

router.get("/", auth, async (req, res) => {
  try {
    // const age =
    //   new Date(Date.now()).getFullYear() -
    //   new Date(req.user.birthdate).getFullYear();

    // console.log("in the giveme age of the user is", age);
    console.log("inside of the instructor student for grade ")

    const { Department, Year, Semister, Section } = req.query;

    // console.log(
    //   "the value of year and semister in the back is " + year + "and" + semister
    // );

    const students = await sectionedmodel.find({
      Field: { $eq: Department },
      Year: { $eq: Year },
      Semister: { $eq: Semister },
      Section: { $eq: Section },

      //Approved: { $eq: true },
    }).sort("Firstname");

    if (!students) {
      res.status(400).json({ msg: "there is no students for this api" });
    }

    res.json(students);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
