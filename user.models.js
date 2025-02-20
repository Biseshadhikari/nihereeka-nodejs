const mongoose = require('mongoose')

const userSchema = mongoose.Schema({ 
    username:{ 
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    },

},{timestamps:true})


const User = mongoose.model('User',userSchema)
module.exports = User