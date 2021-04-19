const express = require("express");
const router = express.Router();
const auth = require("../Middleware/auth");
const withdrawalmodel = require("../../models/withdrawalmodel");

router.delete("/", auth, async (req, res) => {
  try {
    const newreadmission = await withdrawalmodel.deleteOne({
      Studentid: req.user.Applicationid,
    });

    res.json(newreadmission);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error"); 
  }
});

module.exports = router;
