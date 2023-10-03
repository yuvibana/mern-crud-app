import React, { useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import {useNavigate} from 'react-router-dom'

export default function CreateStudent() {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    rollno: "",
  });
  
  const Navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3001/createstudent`, formValues)
      .then((res) => {
        if (res.status === 200) {
          alert("Student successfully created");          
          Navigate('/')
        } else Promise.reject();
      })
      .catch((err) => alert(`Something went wrong ${err}`));
    setFormValues({ name: "", email: "", rollno: "" });
  };

  return (
    <div className="formcontainer">
      <h3>Add Student</h3>
      <form onSubmit={onSubmit}>
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
        <Button
          variant="outline-secondary"
          size="lg"
          block="block"
          type="submit"
        >
          Add
        </Button>
      </form>
    </div>
  );
}

// import React from 'react'
// import * as Yup from "yup";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import { FormGroup,  Button } from "react-bootstrap";

// export default function CreateStudent() {

//   const validationSchema = Yup.object().shape({
//     name: Yup.string().required("Required"),
//     email: Yup.string()
//       .email("You have enter an invalid email address")
//       .required("Required"),
//     rollno: Yup.number()
//       .positive("invalid roll number")
//       .integer("invalid roll number")
//       .required("Required"),
//   });

//   return (
//     <div className='formcontainer'>
//       <h3>Add Student</h3>
//       <Formik validationSchema={validationSchema}>
//         <Form>
//           <FormGroup className="mb-2">
//             <Field name="name" type="text" placeholder="Enter Name" className="form-control" />
//             <ErrorMessage
//               name="name"
//               className="d-block invalid-feedback"
//               component="span"
//             />
//           </FormGroup>
//           <FormGroup className="mb-2">
//             <Field name="email" type="text" placeholder="Enter Email" className="form-control" />
//             <ErrorMessage
//               name="email"
//               className="d-block invalid-feedback"
//               component="span"
//             />
//           </FormGroup>
//           <FormGroup className="mb-2">
//             <Field name="rollno" type="number" placeholder="Roll No."  className="form-control" />
//             <ErrorMessage
//               name="rollno"
//               className="d-block invalid-feedback"
//               component="span"
//             />
//           </FormGroup>
//           <Button variant="outline-secondary" size="lg" block="block" type="submit">Add</Button>
//         </Form>
//       </Formik>
//     </div>
//   )
// }
