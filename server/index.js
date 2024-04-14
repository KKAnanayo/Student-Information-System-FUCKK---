const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const mongoose = require('mongoose');
const User = require("./user.model");
const Student = require("./student.model");

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Hello, world! ");
});

app.post("/addstudent", (req, res) => {
    const studentData = req.body;
    let existingData = [];

    try {
        existingData = JSON.parse(fs.readFileSync("students.json"));
    } catch (error) {}

    existingData.push(studentData);

    fs.writeFileSync("students.json", JSON.stringify(existingData, null, 2));

    res.json({ success: true, message: "Student added successfully!" })
});

app.get("/viewStudents", (req, res) => {
    try {
        const studentData = JSON.parse(fs.readFileSync("students.json"));
        res.json(studentData);
    } catch (error) {
        console.error("Error reading student data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.put("/editStudent", (req, res) => {
    const updateStudentData = req.body;
    let existingData = [];

    try {
        existingData = JSON.parse(fs.readFileSync("students.json"));
        const index = existingData.findIndex(student => student.ID == updateStudentData.ID);

        if (index !== -1) {
            existingData[index] = updateStudentData;
            fs.writeFileSync("students.json", JSON.stringify(existingData, null, 2));

            res.json({ success: true, message: "Student updated successfully!" });
        } else {
            res.status(404).json({ error: "Student not found" });
        }
    } catch (error) {
        console.error("Error updating student data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.delete('/deleteStudent/:id', async(req, res) => {
    const id = req.params.id;
    try {
        const studentsData = fs.readFileSync('students.json', 'utf-8');
        const students = JSON.parse(studentsData);
        const index = students.findIndex(student => student.ID === id);
        if (index !== -1) {
            students.splice(index, 1);
            fs.writeFileSync('students.json', JSON.stringify(students, null, 2));
            res.send(`Student with ID ${id} deleted successfully.`);
        } else {
            res.status(404).send(`Student with ID ${id} not found.`);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting student.');
    }
});

mongoose.connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});


app.post("/addUser", async(req, res) => {
    const userData = req.body;

    try {
        const user = new User(userData);
        await user.save();
        res.json({ success: true, message: "User added successfully!" });
    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/viewUsers", async(req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.put("/editUser/:email", async(req, res) => {
    const userEmail = req.params.email;
    const updatedUserData = req.body;

    try {
        const updatedUser = await User.findOneAndUpdate({ Email: userEmail }, updatedUserData, { new: true });

        if (updatedUser) {
            res.json({ success: true, message: "User updated successfully", user: updatedUser });
        } else {
            res.status(404).json({ success: false, message: "User not found" });
        }
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

//Manage Student
app.post("/addManageStudent", async(req, res) => {
    const studentData = req.body;

    try {
        const student = new Student(studentData);
        await student.save();
        res.json({ success: true, message: "Student added successfully!" });
    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/viewManageStudent", async(req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        console.error("Error fetching student data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.put("/editManageStudent/:email", async(req, res) => {
    const studentEmail = req.params.email;
    const updatedStudentData = req.body;

    try {
        const updatedStudent = await Student.findOneAndUpdate({ Email: studentEmail }, updatedStudentData, { new: true });

        if (updatedStudent) {
            res.json({ success: true, message: "Student updated successfully", user: updatedStudent });
        } else {
            res.status(404).json({ success: false, message: "Student not found" });
        }
    } catch (error) {
        console.error("Error updating student:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

const port = 1337;

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});