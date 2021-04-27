const express = require("express");
//const auth = require("../middleware/auth");
const router = express.Router();
//const Surveyquestion = require("../models/survey");
//const Applicatonmodel= require("../models/applicationmodel")
const Calendarmodel = require("../../models/calendarmodel");

router.post("/", async (req, res) => {
  try {
    const { AC, Program, Year, Semister, Calendar } = req.body;

    const obj = {
      AC,
      Program,
      Year,
      Semister,
      Calendar,
    };

    //console.log("the obj value is that "+obj)

    const data = new Calendarmodel(obj);

    await data.save();

    console.log("the value of calendar is " + data);

    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

router.get("/", async (req, res) => {
  try {
    const { AC, Program, Year, Semister } = req.query;
    console.log("the query values are",AC, Program, Year, Semister )
    const calendar = await Calendarmodel.find({ AC, Program, Year, Semister });
    console.log("the value of the calendar is" + calendar);

    // if (!calendar) {
    //   res.status(400).json({ msg: "Not found" });
    // }
    // console.log(application.length);

    res.json(calendar);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
