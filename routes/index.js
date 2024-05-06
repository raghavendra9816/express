const express = require("express");
const router = express.Router();
let students = [];

router.get("/", (req, res) => {
  res.json({ msg: "hamdling different method" });
});

// Create a student
router.post("/students", (req, res) => {
  const { name, age, location } = req.query;
  const id = students.length + 1; // Generate ID (you might want a more robust method)
  const newStudent = {
    id,
    name,
    age,
    location,
    status: "active",
    role: "student",
    password: "",
  };
  students.push(newStudent);
  console.log("Student added:", newStudent);
  res.json(newStudent);
});

// Update a student by ID
router.put("/students/:id", (req, res) => {
  const { id } = req.params;
  const { name, age, location } = req.query;
  const studentIndex = students.findIndex(
    (student) => student.id === parseInt(id)
  );
  if (studentIndex === -1) {
    res.status(404).json({ error: "Student not found" });
  }
  students[studentIndex] = { ...students[studentIndex], name, age, location };
  console.log("Student updated:", students[studentIndex]);
  res.json(students[studentIndex]);
});

// Patch a student by ID
router.patch("/students/:id", (req, res) => {
  const { id } = req.params;
  const updates = req.query;
  const studentIndex = students.findIndex(
    (student) => student.id === parseInt(id)
  );
  if (studentIndex === -1) {
    res.status(404).json({ error: "Student not found" });
  }
  students[studentIndex] = { ...students[studentIndex], ...updates };
  console.log("Student patched:", students[studentIndex]);
  res.json(students[studentIndex]);
});

// Change the status of a student to inactive by ID
router.put("/students/inactive/:id", (req, res) => {
  const { id } = req.params;
  const studentIndex = students.findIndex(
    (student) => student.id === parseInt(id)
  );
  if (studentIndex === -1) {
    res.status(404).json({ error: "Student not found" });
  }
  students[studentIndex].status = "inactive";
  console.log("Student status changed to inactive:", students[studentIndex]);
  res.json(students[studentIndex]);
});

// Change the role of a student by ID
router.put("/students/role/:id", (req, res) => {
  const { id } = req.params;
  const { role } = req.query;
  const studentIndex = students.findIndex(
    (student) => student.id === parseInt(id)
  );
  if (studentIndex === -1) {
    res.status(404).json({ error: "Student not found" });
  }
  students[studentIndex].role = role;
  console.log("Student role changed:", students[studentIndex]);
  res.json(students[studentIndex]);
});

// Change the password of a student by ID
router.put("/students/password/:id", (req, res) => {
  const { id } = req.params;
  const { password } = req.query;
  const studentIndex = students.findIndex(
    (student) => student.id === parseInt(id)
  );
  if (studentIndex === -1) {
    res.status(404).json({ error: "Student not found" });
  }
  students[studentIndex].password = password;
  console.log("Student password changed:", students[studentIndex]);
  res.json(students[studentIndex]);
});

// Forget the password of a student by ID
router.put("/students/forget-password/:id", (req, res) => {
  const { id } = req.params;
  const studentIndex = students.findIndex(
    (student) => student.id === parseInt(id)
  );
  if (studentIndex === -1) {
    res.status(404).json({ error: "Student not found" });
  }

  students[studentIndex].password = ""; // Forgetting the password by setting it to an empty string
  console.log("Student password forgotten:", students[studentIndex]);
  res.json(students[studentIndex]);
});

// Get all students
router.get("/students", (req, res) => {
  res.json({ students });
});

module.exports = router;
