const mongoose = require('mongoose');

const authentication=mongoose.Schema(
    {
        name:{type:String,required:true,unique:true},
        password:{type:String,require:true},
        employees:[{type:mongoose.Schema.Types.ObjectId,ref:'Employee'}]
    }
)

const auth=mongoose.model('auth',authentication)

module.exports=auth