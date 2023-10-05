import axios from "axios";
import React, { useEffect, useState } from "react";
import { FormGroup, Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function UpdateStudent() {
  const { id } = useParams();
  const Navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    rollno: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/getStudents/${id}`)
      .then((result) => setFormValues(result.data))
      .catch((err) => console.log(err));
  }, []);

  const onUpdate = (e) => {
    e.preventDefault();
    if (formValues.name === "" || formValues.length < 3) {
      alert("Please Enter Name");
      return;
    }
    if (formValues.email === "" || formValues.email < 18) {
      alert("Please Enter Valid Email Address");
      return;
    }
    if (formValues.rollno === "" || formValues.rollno < 1) {
      alert("Please Enter Valid Roll No.");
      return;
    }
    axios
      .put(`http://localhost:3001/updateStudent/${id}`, formValues)
      .then((res) => {
        if (res.status === 200) {
          alert("Student Updated Successfully!");
          Navigate("/");
        } else Promise.reject();
      })
      .catch((err) => alert(`Something went wrong => ${err}`));
  };

  return (
    <div className="formcontainer">
      <h3>Update {formValues.name}'s detail</h3>
      <form onSubmit={onUpdate}>
        <div className="formgoup mb-2">
          <label className="mb-1">Name</label>
          <input
            className="p-2 w-100 rounded"
            placeholder="Enter Name"
            value={formValues.name}
            type="text"
            name="name"
            onChange={handleInputChange}
          />
        </div>
        <div className="formgoup mb-2">
          <label className="mb-1">Email</label>
          <input
            className="p-2 w-100 rounded"
            placeholder="Enter Email"
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="formgoup mb-2">
          <label className="mb-1">Roll No.</label>
          <input
            className="p-2 w-100 rounded"
            placeholder="Roll No."
            type="number"
            value={formValues.rollno}
            name="rollno"
            onChange={handleInputChange}
          />
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <Link to={`/`} className="btn btn-primary">
            Go Back
          </Link>
          <Button
            variant="outline-secondary"
            size="lg"
            block="block"
            type="submit"
          >
            Update
          </Button>
        </div>
      </form>
    </div>
  );
}
