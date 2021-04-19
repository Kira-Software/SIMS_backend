const express = require("express");
//const auth = require("../middleware/auth");
const router = express.Router();
//const Surveyquestion = require("../models/survey");
const Applicatonmodel= require("../../models/applicationmodel")

router.get("/", async (req, res) => {
  try {
    // const age =
    //   new Date(Date.now()).getFullYear() -
    //   new Date(req.user.birthdate).getFullYear();

    // console.log("in the giveme age of the user is", age);
    const application = await Applicatonmodel.find({Approved : {$eq: true}}); 

    if (!application) {
      res.status(400).json({ msg: "there is no application for this api" });
    }

    res.json(application);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
