const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

const Regradingmodel = require("../../models/regradingmodel");

router.patch("/", auth, async (req, res) => {
  try {
    const { Year, Semister, Section, Department, Coursename } = req.body;

    console.log(
      "the comming values are ",
      Year,
      Semister,
      Section,
      Department,
      Coursename
    );

    await Regradingmodel.updateOne(
      { Year, Semister, Section, Department, Coursename },
      { $set: { Instructorapproved: true }, new: true }
    );

    // res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const regrading = await Regradingmodel.find({
      Instructorapproved: false,
      Department: req.user.Department,
    }).sort("Realid Year Semister Section");
    console.log("the value of the regrading is" + regrading);

    // if (!calendar) {
    //   res.status(400).json({ msg: "Not found" });
    // }
    // console.log(application.length);

    res.json(regrading);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
