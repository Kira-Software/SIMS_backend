const express = require("express");
const router = express.Router();
const auth = require("../Middleware/auth");
const withdrawalmodel = require("../../models/withdrawalmodel");

router.post("/", auth, async (req, res) => {
  try {
    // const age =
    //   new Date(Date.now()).getFullYear() -
    //   new Date(req.user.birthdate).getFullYear();

    const obj = {
      Studentid: req.user.Applicationid,
      Withdrawaldate: Date.now(),
    };

    const newwithdrawal = new withdrawalmodel(obj);
    await newwithdrawal.save();

    res.json(newwithdrawal);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const withdrawstudent = await withdrawalmodel.find({
      Studentid: { $eq: req.user.Applicationid },
    });

    res.json(withdrawstudent);
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
