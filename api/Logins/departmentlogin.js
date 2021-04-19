const express = require("express");
// const routehandlers = require("../routehandler");
const { check, validationResult } = require("express-validator");
const Departmentmodel = require("../../models/departmentmodel")

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

const auth = require("../Middleware/auth")


router.get("/", auth, async (req, res) => {
    try {
        const user = await Departmentmodel.findById(req.user.Id).select("-Password");
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        message: "there is a problem on the server"
      });
    }
  });

router.post(
    "/",
    [
        check("Departmentname", "Department name  is required")
            .not()
            .isEmpty(),

        check("Password", "Enter password ").not()
        .isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        // console.log("the errors of validation result is",errors);

        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        }
        
        console.log(req.body);
        const { Departmentname, Password } = req.body;

        try {
            let user = await Departmentmodel.findOne({ Departmentname });

            if (!user) {
                res.status(400).json({ errors: [{ msg: "INVALID CREDENTIALS" }] });
            }


            //const ismatch = await bcrypt.compare(password, user.password);


            if (Password != user.Password) {
                res.status(400).json({ errors: [{ msg: "INVALID CREDENTIALS" }] });
            }

            const payload = {
                user: {
                    Id: user._id,
                    Departmentname: user.Departmentname,
                    Duration: user.Duration,
                    Classes: user.Classes
                   // Sectioned: user.Sectioned
                }
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
                        token: token
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
