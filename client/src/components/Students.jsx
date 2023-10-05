import Table from "react-bootstrap/Table";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { EditIcon, DeleteIcon } from "./IconsModule.js";

export default function Students() {
  const [student, setStudent] = useState([]);

  const getStudents = () => {
    axios
      .get("http://localhost:3001")
      .then((res) => {
        if (res.status === 200) {
          setStudent(res.data);
        } else Promise.reject();
      })
      .catch((err) => console.log(`fetching error ${err}`));
  }

  useEffect(() => {
    getStudents();
  }, []);

  const deleteStudent = (_id, Name) => {
    if (confirm(`Do You Really Want To Delete "${Name}'s" Detail`)) {
      axios
        .delete(`http://localhost:3001/deleteStudent/${_id}`)
        .then((res) => {
          if (res.status === 200) {
            alert("Student deleted successfully");
            getStudents()
          } else Promise.reject();
        })
        .catch((err) => alert(`Something went wrong => ${err}`));
    }
  };

  return (
    <div className="tablewrapper">
      <Link to={"/create"} className="btn btn-primary mb-2">
        <span style={{ fontSize: "25px", lineHeight: "25px" }}>+</span> Add
      </Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Studnt Name</th>
            <th>Studnt Email</th>
            <th>Roll No.</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {student?.map((userdata, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{userdata.name}</td>
              <td>{userdata.email}</td>
              <td>{userdata.rollno}</td>
              <td style={{ display: "flex", gap: "0 20px" }}>
                <Link className="text-primary" to={`/update/${userdata._id}`}>
                  <img src={EditIcon} />
                </Link>
                <button
                  className="text-danger"
                  onClick={() => deleteStudent(userdata._id, userdata.name)}
                >
                  <img src={DeleteIcon} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
