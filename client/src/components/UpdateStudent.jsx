import React from 'react'
import { Button } from 'react-bootstrap'

export default function UpdateStudent() {
  return (
    <div className='formcontainer'>
        <h3>Update Student</h3>
        <form>
          <div className='formgoup mb-2'>
            <label className='mb-1'>Name</label>
            <input className='p-2 w-100 rounded' placeholder='Enter Name'/>
          </div>
          <div className='formgoup mb-2'>
            <label className='mb-1'>Email</label>
            <input className='p-2 w-100 rounded' placeholder='Enter Name'/>
          </div>
          <div className='formgoup mb-2'>
            <label className='mb-1'>Roll No.</label>
            <input className='p-2 w-100 rounded' placeholder='Enter Name'/>
          </div>
          <Button variant="outline-secondary" size="lg" block="block" type="submit">Update</Button>
        </form>
    </div>
  )
}
