const express = require("express");
// const routehandlers = require("../routehandler");
const { check, validationResult } = require("express-validator");
const Temploginmodel = require("../../models/temploginmodel");
const applicationmodel = require("../../models/applicationmodel");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../Middleware/auth");

const router = express.Router();

//////////new code here

router.get("/", auth, async (req, res) => {
  try {
    const user = await applicationmodel
      .findById(req.user.Applicationid)
      .select("Firstname _id Field Year Semister");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: "there is a problem on the server",
    });
  }
});

router.post(
  "/",
  [
    check("Id", "Id Number is required").not().isEmpty(),
    check("Temppass", "Verification code is required").not().isEmpty(),

    check("Newpass", "Enter New password and min of 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // console.log("the errors of validation result is",errors);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);
    const { Id, Temppass, Newpass } = req.body;

    try {
      let user = await Temploginmodel.findOne({ Id });

      if (!user) {
        res.status(400).json({ errors: [{ msg: "INVALID CREDENTIALS" }] });
      }

      //const ismatch = await bcrypt.compare(password, user.password);

      if (Temppass != user.Temppass) {
        res.status(400).json({ errors: [{ msg: "INVALID CREDENTIALS" }] });
      }

      const updated = await Temploginmodel.updateOne(
        { Id: user.Id },
        { $set: { Newpassword: Newpass } },
        { new: true }
      );

      const payload = {
        user: {
          Applicationid: user.Studid,
          // Studentid: user.Id
        },
      };

      console.log("the value of payload in the middleware is ", payload);

      jwt.sign(
        payload,
        process.env.JWTSECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({
            message: "token genetated successfully",
            token: token,
          });
        }
      );

      // console.log(req.body);
      // res.send("User is registerd successfully");
    } catch (err) {
      res.status(500).json({ status: "server error", message: err.message });
    }
  }
);

module.exports = router;
