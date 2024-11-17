const express = require('express');
const auths=require('./DB/authentication')

const register=async(req,res)=>{
    const {name,password}=req.body
    if(name==="" || password==="")return res.json({message:'please fill all the filed'})
    try{
        console.log(name,password)
        const newUser=new auths({name,password})
        await newUser.save()
        console.log('register success')
        return res.json({message:'register success'})
    }
    catch(err)
    {
        if (err.code === 11000) {
            const duplicateKey=Object.keys(err.keyValue)[0];
            const duplicateValue= err.keyValue[duplicateKey];
            return res.json({message:`Enter unique ${duplicateKey}`});
        }
        return res.send(err.message)
    }
}

module.exports=register