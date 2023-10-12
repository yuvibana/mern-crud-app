import Table from "react-bootstrap/Table";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { EditIcon, DeleteIcon } from "./IconsModule.js";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [printData, setPrintData] = useState([]);
  const [searchText, setSearchText] = useState("");  
  const NoStudentFound = <h1 style={{ textAlign: "center" }}>No Data Found</h1>;

  const getStudents = () => {
    axios
      .get("http://localhost:3001")
      .then((res) => {
        if (res.status === 200) {
          setStudents(res.data);
          setPrintData(res.data);
        } else Promise.reject();
      })
      .catch((err) => console.log(`fetching error ${err}`));
  };

  const deleteStudent = (_id, Name) => {
    if (confirm(`Do You Really Want To Delete ${Name}`)) {
      axios
        .delete(`http://localhost:3001/deleteStudent/${_id}`)
        .then((res) => {
          if (res.status === 200) {
            alert("Student deleted successfully");
            getStudents();
          } else Promise.reject();
        })
        .catch((err) => alert(`Something went wrong => ${err}`));
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  const filterData = () => {
    const filtered = students.filter((item) => {
      const { name, email, rollno } = item;
      return (
        name.toLowerCase().includes(searchText.toLowerCase()) ||
        email.toLowerCase().includes(searchText.toLowerCase()) ||
        rollno.toString().includes(searchText)
      );
    });
    setPrintData(filtered);
  };

  useEffect(() => {
    filterData();
  }, [searchText]);

  if (students.length <= 0) {
    return NoStudentFound;
  }

  return (
    <div className="tablewrapper">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <Link to={"/create"} className="btn btn-primary ">
          <span style={{ fontSize: "25px", lineHeight: "25px" }}>+</span> Add
        </Link>
        <div className="filterstd w-50">
          <input
            type="text"
            className="p-2 w-100 rounded text-center"
            placeholder="search by name, email or roll no."
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>
      <Table striped bordered hover>
        <thead className="body-bg-dark">
          <tr>
            <th>#</th>
            <th>Studnt Name</th>
            <th>Studnt Email</th>
            <th>Roll No.</th>
            <th>Action</th>
          </tr>
        </thead>           
          <tbody>
            {printData?.map((userdata, index) => (
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
