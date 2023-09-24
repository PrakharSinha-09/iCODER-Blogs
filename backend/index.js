const express=require('express')
const cors=require('cors')
const exp = require('constants')
const { default: mongoose } = require('mongoose')
const User=require('./models/User')
const app=express()

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://prakharsinha2k2:gvBmtUlmIINl5v6H@cluster0.lgrhctg.mongodb.net/?retryWrites=true&w=majority')

app.post('/register',async (req,res)=>{
    const {name,email,password}=req.body

    try{
        const userInfo=await User.create({
            name:name,
            email:email,
            password:password 
        })
        res.status(200).json({'status':"User Registered Successfully!"})
    }
    catch(e){
        res.status(400).json({'status':"Something Went Wrong!"})
    }
})

app.listen(4000,()=>{console.log("Server Running On PORT NO: 4000")})

