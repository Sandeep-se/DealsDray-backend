const express = require('express');
const Employee = require('./DB/employeeSchema');
const auths=require('./DB/authentication')

const deleteEmployee=async(req,res)=>{
    const {userId}=JSON.parse(req.cookies.userInfo)
    const {employeeId}=req.params
    if(userId==="" || !userId){
        return res.json({message:'please login'})
    }
    if(!employeeId){
        return res.json({message:'employee id is required'})
    }

    try {
        const user=await auths.findById(userId)
        if(!user){
            return res.json({message:'user not found'});
        }
        const employeeIndex=user.employees.indexOf(employeeId)
        if(employeeIndex===-1){
            return res.json({message:'employee is not found for this user please refersh the page'})
        }

        const deletedEmpoyee=await Employee.findByIdAndDelete(employeeId)
        if(!deletedEmpoyee){
            return res.json({message:'Employee not found'})
        }
        user.employees.splice(employeeIndex,1);
        await user.save()
        console.log('deleted successfully')
        res.json({message:'deleted successfully',deletedEmpoyee})

    } catch (error) {
        return res.json(error)
    }
}

module.exports=deleteEmployee