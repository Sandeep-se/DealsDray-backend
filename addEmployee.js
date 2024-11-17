const express = require('express');
const Employee = require('./DB/employeeSchema');
const auths=require('./DB/authentication')
const multer=require('multer')


const addEmployee=async(req,res)=>{
    const {name,email,mobileNo,designation,gender,course}=req.body
    const img=req.file?.filename;
    console.log(`uploaded image:${img}`)
    const {userId}=JSON.parse(req.cookies.userInfo)
    if(userId==="" || !userId)return res.json({message:'please login'})
    if(name===""||email===""||mobileNo===""||designation===""||gender===""||course===""||img===""){
        return res.json({message:'please fill All the fileds'})
    }
    if (!email.includes('@gmail.com')) {
        return res.json({ message: 'Please enter a valid Gmail address' });
    }

    try{
        const user=await auths.findById(userId)
        if(!user){
            return res.json({message:'user not found'})
        }
        
        const newEmployee=new Employee({name,email,mobileNo,designation,gender,course,img})
        const savedEmployee=await newEmployee.save();
        user.employees.push(savedEmployee._id)
        await user.save();
        return res.json({message:'Employee created succesfully'});
    }
    catch(err){
        if (err.code === 11000) {
            const duplicateKey=Object.keys(err.keyValue)[0];
            const duplicateValue= err.keyValue[duplicateKey];
            return res.json({message:`Enter unique ${duplicateKey}`});
        }
        return res.json({err})
    }
}

module.exports=addEmployee