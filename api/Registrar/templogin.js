const express = require("express");
//const auth = require("../middleware/auth");
const router = express.Router();
const nodemailer = require("nodemailer");

// var htmlToText = require('nodemailer-html-to-text').htmlToText;
const hbs = require("nodemailer-express-handlebars");

//const Surveyquestion = require("../models/survey");
//const Applicatonmodel= require("../models/applicationmodel")
const Temploginmodel = require("../../models/temploginmodel");

router.post("/", async (req, res) => {
  try {
    const { Studid, Id, Temppass } = req.body;

    const obj = {
      Studid,
      Id,
      Temppass,
    };

    //console.log("the obj value is that "+obj)

    const data = new Temploginmodel(obj);

    await data.save();

    console.log("the value of final is " + data);

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAILUSER,
        pass: process.env.EMAILPASSWORD,
      },
    });

    transporter.use(
      "compile",
      hbs({
        viewEngine: "express-handlebars",
        viewPath: `./views/`,
      })
    );

    let mailoptions = {
      from: "kirubelgirmay21@gmail.com",
      to: "Kirubelgirmaye@gmail.com",
      subject: "LOGIN INFO",
      text: `ID : ${Id} \n  Verification code ${Temppass} \n \n `,
     template: `index`,
      // html:'<a href="localhost:3000/login"> Click here to login </a> ',
    };

    transporter.sendMail(mailoptions, function (err, data) {
      if (err) {
        console.log("Error occurs");
      } else {
        console.log("Email sent !!!");
      }
    });

    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// router.get("/", async (req, res) => {
//   try {
//     const application = await Appnomodel.find();
//     console.log("the value of the appno is" + application);

//     // if (!application) {
//     //   res.status(400).json({ msg: "there is no application for this api" });
//     // }
//     console.log(application.length);

//     res.json(application);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("server error");
//   }
// });

// router.patch("/", async (req, res) => {
//   try {
//     const select = await Appnomodel.find();

//     const prev = select[0].Appno;

//     console.log("the value of select is " + select[0].Appno);

//     const application = await Appnomodel.updateOne({
//       $set: { Appno: prev + 1 },
//     });

//     res.json(application);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("server error");
//   }
// });

module.exports = router;
