const express = require("express");
//const auth = require("../middleware/auth");
const router = express.Router();
//const Surveyquestion = require("../models/survey");
//const Applicatonmodel= require("../models/applicationmodel")
const Regradingmodel = require("../../models/regradingmodel");
const Temploginmodel = require("../../models/temploginmodel");

router.post("/", async (req, res) => {
  try {
    const { Id, Year, Semister, Section, Department, Coursename } = req.body;

    const search = await Temploginmodel.find({ Id });

    const Studentid = search[0].Studid;

    const obj = {
      Studentid,
      Realid: Id,
      Department,
      Year,
      Semister,
      Section,
      Coursename,
    };

    //console.log("the obj value is that "+obj)

    const data = new Regradingmodel(obj);

    await data.save();

    console.log("the value of regrading is " + data);

    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

router.get("/", async (req, res) => {
  try {
    const regrading = await Regradingmodel.find().sort("Realid Year Semister Section");
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
