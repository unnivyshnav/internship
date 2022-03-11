const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const Class = require("./models/Class");
const Student = require("./models/Student");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

dotenv.config();

// mongoose db connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

//get all classes
app.get("/classes", async (req, res) => {
  try {
    const classes = await Class.find();
    res.status(200).json(classes);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all students
app.get("/students", async (req, res) => {
  try {
    const students = await Student.find().populate("classid");
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Add class
app.post("/class", async (req, res) => {
  const newClass = new Class(req.body);
  try {
    const SavedClass = await newClass.save();
    res.status(200).json(SavedClass);
  } catch (err) {
    res.status(500).json(err);
  }
});

//add student
app.post("/student", async (req, res) => {
  try {
    const Classdata = await Class.findOne({
      standard: req.body.standard,
      division: req.body.division,
    }).exec();
    console.log(Classdata);
    !Classdata && res.status(401).json("No class or division Exist");
    const classId = Classdata.id;

    const newStudent = new Student({
      name: req.body.name,
      rollNumber: req.body.rollNumber,
      mobileNumber: req.body.mobileNumber,
      classid: classId,
    });

    const student = await newStudent.save();
    res.status(200).json(student);
  } catch (err) {}
});

//update student class with standard and division
app.put("/student/:id", async (req, res) => {
  try {
    const addClass = await Class.findOne({
      standard: req.body.standard,
      division: req.body.division,
    }).exec();
    !addClass && res.status(401).json("No class or division Exist");
    const classId = addClass.id;
    const updateStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { classid: classId },
      { new: true }
    );
    res.status(200).json(updateStudent);
  } catch (err) {
    // res.status(500).json(err);
  }
});

//delete student
app.delete("/student/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.status(200).json("Student has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//read all students in a standard and division
app.get("/student/std_div", async (req, res) => {
  const getClass = await Class.findOne({
    standard: req.body.standard,
    division: req.body.division,
  }).exec();
  !getClass && res.status(401).json("No class or division Exist");
  const classId = getClass.id;
  try {
    const students = await Student.find({ classid: classId }).populate(
      "classid"
    );
    res.status(200).json(students);
  } catch (err) {}
});

// read all students in a standard
app.get("/student/std", async (req, res) => {
  try {
    const students = await Student.find()
      .populate({ path: "classid", match: { standard: req.body.standard } })
      .exec();
    var newArray = students.filter(function (el) {
      return el.classid;
    });
    res.status(200).json(newArray);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.listen(5002, () => {
  console.log("Express server started on port 5002");
  console.log("connecting to DB....");
});
