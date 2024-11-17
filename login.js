const express = require('express');
const auths=require('./DB/authentication')

const login=async(req,res)=>{

    const {name,password}=req.body
    if(name==="" || password==="")return res.json({message:'please fill all the filed'})

    try{
        const user=await auths.findOne({name});
        if(!user){
            return res.json({message:'user doesn`t have account'})
        }
        if(user.password!==password){
            return res.json({message:'wrong password'})
        }
        res.cookie('userInfo', JSON.stringify({ userId: user._id.toString(), name: user.name }), {  /*user._id.toString(),user.name*/
            maxAge: 900000, 
            path:'/',
            httpOnly: false, 
            secure: true,
            sameSite:'None'
          });
        console.log('login success')
        return res.json({message:'login success'})
    }
    catch(err)
    {
        return res.send(err.message)
    }
}

module.exports=login