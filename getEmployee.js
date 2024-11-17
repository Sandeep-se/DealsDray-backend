const express = require('express');
const Employee = require('./DB/employeeSchema');
const auths=require('./DB/authentication')

const getEmployee=async(req,res)=>{
    const {userId}=JSON.parse(req.cookies.userInfo)
    if(userId==="" || !userId)return res.json({message:'please login'})

    try {
        const user=await auths.findById(userId).populate('employees')
        if(!user){
            return res.json({message:'user not found'});
        }

        if(!user.employees || !user.employees.length===0){
            return res.json({message:'No Employees found for this user',employees:[]})
        }
        console.log('Employees retrived successfully')
        const employeesWithImgUrl = user.employees.map(employee => ({
            ...employee.toObject(),
            img: employee.img ? `http://localhost:8000/uploads/${employee.img}` : null,
          }));
        return res.json({message:'Employees retrived successfully',employees:employeesWithImgUrl})
    } catch (err) {
        return res.json({err:err.message})
    }
}

module.exports=getEmployee