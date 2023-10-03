const mongoos = require('mongoose');
const StudentSchema = new mongoos.Schema({
    name: String,
    email: String,
    rollno: Number
})

const StudentModel = mongoos.model("students", StudentSchema);
module.exports = StudentModel;