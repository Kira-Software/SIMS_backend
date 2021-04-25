const express = require("express");
//const auth = require("../middleware/auth");
const router = express.Router();
//const Surveyquestion = require("../models/survey");
//const Applicatonmodel= require("../models/applicationmodel")
const Departmentmodel = require("../../models/departmentmodel")
const { check, validationResult } = require("express-validator");


router.get("/", async (req, res) => {
    try {

        const application = await Departmentmodel.find();

        // if (!application) {
        //   res.status(400).json({ msg: "there is no application for this api" });
        // }
        console.log(application.length) 

        res.json(application);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});



router.post("/", [
    check("Departmentname", "Department name  is required")
        .not()
        .isEmpty(),
    check("Duration", "Duration  is required")
        .not()
        .isEmpty(),

    check("Password", "Enter password and min of 6 characters").isLength({
        min: 6
    })
], async (req, res) => {
        
    const errors = validationResult(req);
    // console.log("the errors of validation result is",errors);

    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);

    try {
        const {
            Departmentname,
            Duration,
            Password
        } = req.body;

        const obj = {
            Departmentname,
            Duration,
            Password,
            Sectioned: false

        };

        //console.log("the obj value is that "+obj)

        const data = new Departmentmodel(obj);

        await data.save();

        console.log("the value of final is " + data);

        res.json(data);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});


module.exports = router;
