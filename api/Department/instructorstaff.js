/** @format */

const express = require("express");
const router = express.Router();
const Instructormodel = require("../../models/instructormodel");
const auth = require("../Middleware/auth");

router.post("/", auth, async (req, res) => {
  try {
    const {
      Instructorfname,
      Instructormname,
      Instructorlname,
      Birthdate,
      Sex,
    } = req.body;

    const obj = {
      Instructorfname,
      Instructormname, 
      Instructorlname,
      Birthdate,
      Sex,
    };

    obj.Department = req.user.Departmentname;
    obj.Password = Instructorlname + "abcd1234";

    const data = new Instructormodel(obj);

    await data.save();

    console.log("the value of final is " + data);

    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const search = await Instructormodel.find({
      Department: req.user.Departmentname,
    });
    console.log("the search value is  " + search);
    res.json(search);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// router.get("/:id", async (req, res) => {
//   try {
//     const search = await Myobject.find({ _id: req.params.id });
//     console.log("the search value is  " + search);
//     res.json(search);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("server error");
//   }
// });
module.exports = router;
