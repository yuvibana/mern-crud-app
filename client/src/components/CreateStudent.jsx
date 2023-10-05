import React, { useState } from "react";
import { FormGroup, Button } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function CreateStudent() {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    rollno: "",
  });

  const Navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const onSubmit = (e) => {
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
      .post(`http://localhost:3001/createstudent`, formValues)
      .then((res) => {
        if (res.status === 200) {
          alert("Student successfully created");
          Navigate("/");
        } else Promise.reject();
      })
      .catch((err) => alert(`Something went wrong ${err}`));
    setFormValues({ name: "", email: "", rollno: "" });
  };

  return (
    <div className="formcontainer">
      <h3>Add Student</h3>
      <form onSubmit={onSubmit}>
        <FormGroup className=" mb-2">
          <label className="mb-1">Name {formValues.name}</label>
          <input
            name="name"
            type="text"
            placeholder="Enter Name"
            className="form-control"
            value={formValues.name}
            onChange={handleInputChange}
          />
        </FormGroup>

        <FormGroup className=" mb-2">
          <label className="mb-1">Email {formValues.email}</label>
          <input
            name="email"
            type="email"
            placeholder="Enter Email"
            className="form-control"
            value={formValues.email}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <label className="mb-1">Roll No. {formValues.rollno}</label>
          <input
            type="number"
            placeholder="Roll No."
            className="form-control"
            value={formValues.rollno}
            name="rollno"
            onChange={handleInputChange}
          />
        </FormGroup>
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
            Add
          </Button>
        </div>
      </form>
    </div>
  );
}
