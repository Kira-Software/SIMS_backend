/** @format */

const express = require("express");
const router = express.Router();
const applicationmodel = require("../../models/applicationmodel");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.any("fileimages"), async (req, res, next) => {
  // console.log("the value of req.body is " + req.body)
  // console.log("the value of req.file is "+ req.file)
  console.log("instide of tha send application method");
  try {
    const {
      Firstname,
      Middlename,
      Lastname,
      Birthdate,
      Sex,
      Telephone,
      Email,
      Birthregion,
      Birthzone,
      Birthworeda,
      Currentregion,
      Currentzone,
      Currentworeda,
      Currenthouseno,
      Contactfname,
      Contactmname,
      Contactlname,
      Contactregion,
      Contactzone,
      Contactworeda,
      Contacthouseno,
      Contactemail,
      Contacttelephone,
      Lasteducation,
      Field,
      Year,
      Semister,
    } = req.body;
    // console.log("the value of the first name is " + Firstname)
    // console.log("the value of the middle name is " + Middlename)
    // console.log("the value of the last name is " + Lastname)

    const obj = {
      Firstname,
      Middlename,
      Lastname,
      Birthdate,
      Sex,
      Telephone,
      Email,
      Birthregion,
      Birthzone,
      Birthworeda,
      Currentregion,
      Currentzone,
      Currentworeda,
      Currenthouseno,
      Contactfname,
      Contactmname,
      Contactlname,
      Contactregion,
      Contactzone,
      Contactworeda,
      Contacthouseno,
      Contactemail,
      Contacttelephone,
      Lasteducation,
      Field,
      Year,
      Semister,
    };

    obj.File12 = req.files[0].path;
    obj.File10 = req.files[1].path;
    obj.File8 = req.files[2].path;
    obj.File9_10 = req.files[3].path;
    obj.File11_12 = req.files[4].path;
    obj.Financial = req.files[5].path;
    obj.Photograph = req.files[6].path;

    obj.Approved = false;

    //console.log("the obj value is that "+obj)

    const data = new applicationmodel(obj);

    await data.save();

    console.log("the value of final is " + data);

    res.json(data);
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({
        errors: [
          {
            msg:
              "Something went wrong.... please make sure that you filled all the necessary fields",
          },
        ],
      });
  }
});

router.get("/", async (req, res) => {
  try {
    const search = await Myobject.find();
    console.log("the search value is  " + search);
    res.json(search);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const search = await Myobject.find({ _id: req.params.id });
    console.log("the search value is  " + search);
    res.json(search);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});
module.exports = router;
