/** @format */

const express = require("express");
const router = express.Router();
const Coursemodel = require("../../models/coursemodel");
const applicationmodel = require("../../models/applicationmodel");
const Sectionedmodel = require("../../models/sectionedmodel");
const departmentmodel = require("../../models/departmentmodel");

const auth = require("../Middleware/auth");

router.post("/", auth, async (req, res) => {
  try {
    const { Classno, Studentno, Year, Semister } = req.body;
    
    const Sectioninfo = [Year,Semister,Classno * 1]
    console.log(
      "the value of req.body is ",
      Classno,
      Studentno,
      Year,
      Semister,
      Sectioninfo
    );

    let page = Classno * 1;
    const limit = Studentno * 1;

    for (let i = page; i > 0; i--) {
      const skip = (page - 1) * limit;
      //   console.log("the value of page is " + page);

      const data = await applicationmodel
        .find({
          Field: { $eq: req.user.Departmentname },
          Year: { $eq: Year },
          Semister: { $eq: Semister }
        })
        .sort()
        .skip(skip)
        .limit(limit);
      //  console.log("the value of data is the ", i, "try is ", data);
      // data[i - 1].Section = i;

      for (let j = 0; j < data.length; j++) {
        //console.log("the value of data[j] is ", data[j]);
        let temp = {
          Applicationid: data[j]._id,
          Firstname: data[j].Firstname,
          Middlename: data[j].Middlename,
          Lastname: data[j].Lastname,
          Birthdate: data[j].Birthdate,
          Sex: data[j].Sex,
          Telephone: data[j].Telephone,
          Email: data[j].Email,
          Field: data[j].Field,
          Year: data[j].Year,
          Semister: data[j].Semister,
          Section: i
        };
        //   temp.Section = i;
        let sectioned = new Sectionedmodel(temp);
        await sectioned.save();
      }

      page--;
    }

    const tempdata= await departmentmodel.find({Departmentname: req.user.Departmentname})
    console.log("the value of tempdata is ", tempdata)
    const prevarray = tempdata[0].Classes
    console.log("the value of prevarray is ", prevarray)
     prevarray.push(Sectioninfo)
    console.log("the value of newarray is ", prevarray)

    await departmentmodel.updateOne(
      { Departmentname: req.user.Departmentname },
      { $set: { Classes: prevarray } },
      { new: true }
    ); 

    res.json({ msg: "successful" });

    // res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

router.get("/",auth, async (req, res) => {
  try {
    const { year, semister, section } = req.query;

    const search = await Sectionedmodel.find({
      Field: { $eq: req.user.Departmentname },
      Year: { $eq: year },
      Semister: { $eq: semister },
      Section: {$eq : section}
    }).sort("Firstname");
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
