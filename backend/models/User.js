const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
    name:{
        type: String, 
        required:true, 
        min:2
    },

    email: {
        type: String, 
        required:true, 
        unique:true, 
        min:10
    },

    password:{
        type: String, 
        required:true, 
        min:5
    }
})

const UserModel=mongoose.model('User',UserSchema)
module.exports=UserModel