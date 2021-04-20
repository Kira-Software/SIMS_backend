const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const applicationapi = require("./api/Student/applicationapi");
const giveapplication = require("./api/Registrar/giveapplication");
const approvedapplication = require("./api/Registrar/approvedapplication");
const approveapplication = require("./api/Registrar/approveapplication");
const course = require("./api/Department/course");
const appno = require("./api/Registrar/appno");
const userlogin = require("./api/Logins/userlogin");
const adddepartment = require("./api/Registrar/department");
const departmentlogin = require("./api/Logins/departmentlogin");
const getstudents = require("./api/Department/getstudents");
const instructorstaff = require("./api/Department/instructorstaff");
const templogin = require("./api/Registrar/templogin");
const createsection = require("./api/Department/createsection");
const courseassign = require("./api/Department/courseassign");
const semisteredcourses = require("./api/Department/semisteredcourses");
const assigninstructor = require("./api/Department/assigninstructor");
const semisteredcoursesstudent = require("./api/Student/semisteredcoursesstudent");
const studentcoursereg = require("./api/Student/studentcoursereg");
const instructorlogin = require("./api/Logins/instructorlogin");
const instructorjob = require("./api/Instructor/instructorjob");
const instructorstudents = require("./api/Instructor/instructorstudents");
const gradestaff = require("./api/Instructor/gradestaff");
const getmygrades = require("./api/Student/getmygrades");
const getmycourses = require("./api/Student/getmycourses");
const addacourse = require("./api/Student/addacourse");
const getsemistercourses = require("./api/Student/getsemistercourses");
const takencourse = require("./api/Student/takencourse");
const dropcourse = require("./api/Student/dropcourse");
const withdrawal = require("./api/Student/withdrawal");
const readmission = require("./api/Student/readmission");
const markclassificaion = require("./api/Instructor/markclassificaion");

const instructormarkentry = require("./api/Instructor/instructormarkentry");
const getstudentid = require("./api/Instructor/getstudentid");

dotenv.config({ path: "./config.env" });

const app = express();
app.use(express.json());
console.log(process.env.DATABASE_LOCAL);

app.use("/uploads", express.static("uploads"));

app.use("/api/sendapplication", applicationapi);
app.use("/api/giveapplication", giveapplication);
app.use("/api/approvedapplication", approvedapplication);
app.use("/api/approveapplication", approveapplication);
app.use("/api/course", course);
app.use("/api/appno", appno);
app.use("/api/userlogin", userlogin);
app.use("/api/adddepartment", adddepartment);
app.use("/api/departmentlogin", departmentlogin);
app.use("/api/getstudents", getstudents);
app.use("/api/instructor", instructorstaff);

app.use("/api/templogin", templogin);
app.use("/api/createsection", createsection);
app.use("/api/courseassign", courseassign);
app.use("/api/semisteredcourses", semisteredcourses);
app.use("/api/assigninstructor", assigninstructor);
app.use("/api/semisteredcoursesstudent", semisteredcoursesstudent);
app.use("/api/studentcoursereg", studentcoursereg);
app.use("/api/instructorlogin", instructorlogin);
app.use("/api/instructorjob", instructorjob);
app.use("/api/instructorstudents", instructorstudents);
app.use("/api/gradestaff", gradestaff);
app.use("/api/getmygrades", getmygrades);
app.use("/api/getmycourses", getmycourses);
app.use("/api/addacourse", addacourse);
app.use("/api/getsemistercourses", getsemistercourses);
app.use("/api/takencourse", takencourse);
app.use("/api/dropcourse", dropcourse);
app.use("/api/withdrawal", withdrawal);
app.use("/api/readmission", readmission);
app.use("/api/markclassification", markclassificaion);
app.use("/api/markentry", instructormarkentry);
app.use("/api/getstudentid", getstudentid);

app.use("/", (req, res) =>
  res.send("helow this is from the student backend root directory")
);

mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("the database connection is successful");
  });

app.listen(process.env.PORT, () => {
  console.log("the server is listening on port ..." + process.env.PORT);
});
