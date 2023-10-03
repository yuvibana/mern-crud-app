import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function UpdateStudent() {

  const { id } = useParams();
  const Navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    rollno: "",
  });

  useEffect(() => {
    axios.get(`http://localhost:3001/getUser/${id}`)
      .then(result => setFormValues(result.data))
      .catch(err => console.log(err))
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  const onSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/updatestudent`, formValues)
    Navigate('/')
  }


  console.log(formValues);

  return (
    <div className='formcontainer'>
      <h3>Update {formValues.name}'s detail</h3>
      <form onSubmit={onSubmit}>
        <div className="formgoup mb-2">
          <label className="mb-1">Name</label>
          <input
            className="p-2 w-100 rounded"
            placeholder="Enter Name"
            value={formValues.name}
            type="text"
            name="name"
            required
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
            required
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
            required
            onChange={handleInputChange}
          />
        </div>
        <div className='d-flex justify-content-between'>
          <Link
            to={'/'}
            className='btn p-2 d-block text-white secondary'
            style={{ background: 'blue' }}
          >Cancel
          </Link>
          <Button
            variant="outline-secondary"
            size="lg"
            block="block"
            type="submit"
          >Update
          </Button>
        </div>
      </form>
    </div>
  )
}
