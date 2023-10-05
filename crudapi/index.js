const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const StudentModel = require('./models/students');
let dbConfig = require('./database/db');

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log('Connected to port ' + port)
});

// Making Connection With  MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db).then(() => {
        console.log('Database successfully connected!')
    },
    error => {
        console.log('Could not connect to database : ' + error)
    }
);

// get all students
app.get("/", async (req, res, next) => {
    try {
        const getAllStudents = await StudentModel.find({})
        if (!getAllStudents || getAllStudents.length === 0) {
            return res.status(404).json({
                error: 'No students found'
            });
        } else console.log(`Student founded`);
        res.json(getAllStudents);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// insert a new student
app.post("/createstudent", async (req, res) => {
    try {
        const createStudent = StudentModel.create(req.body)
        if (!createStudent) {
            return res.status(404).json({
                error: 'Problem In Adding Student'
            });
        } else console.log(`Student founded`);
        res.json(createStudent)
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// get single student
app.get("/getStudents/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const getsingleStudent = await StudentModel.findById({
            _id: id
        })
        if (!getsingleStudent) return res.status(404).json({
            error: 'Student not found'
        });
        else console.log(`Student found`);
        res.json(getsingleStudent);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// update student
app.put('/updateStudent/:id', async (req, res, next) => {
    try {
        const updatedStudent = await StudentModel.findByIdAndUpdate(
            req.params.id, {
                $set: req.body
            }, {
                new: true
            }
        );
        if (!updatedStudent) {
            return res.status(404).json({
                error: 'Student not found'
            });
        }
        console.log("Student updated successfully!");
        res.json(updatedStudent);
    } catch (error) {
        console.error(error);
        next(error);
    }
});


// deleteStudent a Student
app.delete("/deleteStudent/:id", async (req, res, next) => {
    try {
        const deleteStudent = await StudentModel.findByIdAndRemove(
            req.params.id
        );

        if (!deleteStudent) {
            return res.status(404).json({
                error: 'Student not found'
            });
        } else {
            console.log("Student deleted successfully!");
            res.status(200).json({
                msg: 'Student deleted successfully',
            });
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
});