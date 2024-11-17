import React, { useEffect, useState } from "react";
import "./EmployeeList.css";
import axios from 'axios'
import { Link } from "react-router-dom";

const EmployeeList = () => {
  const [employees,setEmployees]=useState([])
  const [searchQuery,setSearchQuery]=useState('')
  const getEmployees=async(e)=>{
    const response=await axios.get('http://localhost:8000/getEmployee',{withCredentials:true})
    try {
      if(response.data.message==='Employees retrived successfully')
      {
        setEmployees(response.data.employees)
      }
    } catch (error) {
      alert(error.message)
    }
  }

  useEffect(()=>{
    getEmployees()
  },[])

  const deleteEmployee=async(employeeId)=>{
    const response=await axios.delete(`http://localhost:8000/deleteEmployee/${employeeId}`,{withCredentials:true})

    try{
      if(response.data.message==='deleted successfully'){
        setEmployees(employees.filter(employee=>employeeId!==employee._id))
      }
      else{
        alert(response.data.message)
      }
    }
    catch(err)
    {
      alert(response.data.message)
    }
  }
  const filterdEmployees=employees.filter(employee=>{
    const lCSearchQuery=searchQuery.toLowerCase();

    return (
      employee.name.toLowerCase().includes(lCSearchQuery)||
      employee.email.toLowerCase().includes(lCSearchQuery))
  })
  return (
    <div className="table-container">
      <Link to='/createEmployee'><div className="right"><button>Create Employee</button></div></Link>
      <div className="tableR">
      <span>Employee List</span>
      <span>TotalCount:{filterdEmployees.length}</span>
      <span>Search:{" "}<input type="text" placeholder="Enter name or email" onChange={(e)=>setSearchQuery(e.target.value)} /></span>
      </div>
      <table>
        <thead>
          <tr>
            <th>Unique Id</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile No</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Create Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filterdEmployees.length>0 && filterdEmployees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee._id}</td>
              <td>
                <img
                  src={employee.img? `file:///d%3A/Folder/Deals/app/src/uploads/${employee.img}` :null}
                  style={{width:"80px",height:"80px",borderRadius:"50%"}}
                />
              </td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.mobileNo}</td>
              <td>{employee.email}</td>
              <td>{employee.designation}</td>
              <td>
                {employee.course.map((course, index) => (
                  <div key={index}>{course}</div>
                ))}
              </td>
              <td>{employee.createdAt}</td>
              <td>
                <Link to={`/updateEmployee/${employee._id}`}> <button>Edit</button></Link> <button onClick={()=>deleteEmployee(employee._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
