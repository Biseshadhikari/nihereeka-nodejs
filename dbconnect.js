const mongoose = require('mongoose')

const dbconnect = async()=>{
    try{ 
        await mongoose.connect('mongodb+srv://bisesh610:asdf@cluster0.ox3qg.mongodb.net')
        console.log('connected')
    } 
    catch(err){ 
        console.log(err)
    } 

}


module.exports = dbconnect