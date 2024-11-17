const logout=async(req,res)=>{
    try{
        res.cookie('userInfo','',{
            maxAge:0,
            path:'/',
            httpOnly:false,
            secure: true,
            sameSite:'None'
        })
        console.log('Logout successful')
        return res.json({message:'Logout successful'})
    }
    catch(err)
    {
        res.json({message:err.message})
    }
}

module.exports=logout