const express = require('express');
const Employee = require('./DB/employeeSchema');
const auths=require('./DB/authentication')

const updateEmployee=async(req,res)=>{
    const {employeeId}=req.params
    const {name,email,mobileNo,designation,gender,course}=req.body
    const img=req.file?.filename;
    const {userId}=JSON.parse(req.cookies.userInfo)

    if(userId==="" || !userId){
        return res.json({message:'please login'})
    }
    if(!employeeId){
        return res.json({message:'employee id is required'})
    }
    if(name===""||email===""||mobileNo===""||designation===""||gender===""||course===""||img===""){
        return res.json({message:'please fill All the fileds'})
    }
    console.log(req.body)
    try {
        const user=await auths.findById(userId)
        if(!user){
            return res.json({message:'user not found'})
        }
        if(!user.employees.includes(employeeId)){
            return res.json({message:'employee id is not found'})
        }
        const updatedEmployee=await Employee.findByIdAndUpdate(employeeId,
            {name,email,mobileNo,designation,gender,course,img},
            {new:true,runValidators:true}
        )
        return res.json({message:'updated successfully'})
    } catch (error) {
        return res.json(err.message)
    }
}
module.exports=updateEmployee