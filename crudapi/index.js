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
)

app.post("/createstudent", (req, res) => {
    StudentModel.create(req.body)
        .then(students => res.json(students))
        .catch(err => err.json())
});

app.get("/", (req, res) => {
    StudentModel.find({})
        .then(students => res.json(students))
        .catch(err => err.json())
});

app.get("/getUser/:id", (req, res) => {
    const id = req.params.id;
    StudentModel.findById({ _id:id })
        .then(students => res.json(students))
        .catch(err => err.json())
});