const express = require("express");
//const auth = require("../middleware/auth");
const router = express.Router();
//const Surveyquestion = require("../models/survey");
//const Applicatonmodel= require("../models/applicationmodel")
const Appnomodel = require("../../models/appnomodel");

router.get("/", async (req, res) => {
  try {
    const application = await Appnomodel.find();
    console.log("the value of the appno is" + application);

    // if (!application) {
    //   res.status(400).json({ msg: "there is no application for this api" });
    // }
    console.log(application.length);

    res.json(application);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

router.post("/", async (req, res) => {
  try {
    const { Appno } = req.body;

    const obj = {
      Appno: Appno + 1,
    };

    //console.log("the obj value is that "+obj)

    const data = new Appnomodel(obj);

    await data.save(); 

    console.log("the value of final is " + data);

    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

router.patch("/", async (req, res) => {
  try {
    const select = await Appnomodel.find();

    const prev = select[0].Appno;

    console.log("the value of select is " + select[0].Appno);

    const application = await Appnomodel.updateOne({
      $set: { Appno: prev + 1 },
    });

    res.json(application);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
