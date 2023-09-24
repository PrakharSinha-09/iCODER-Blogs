const express=require('express')
const cors=require('cors')
const exp = require('constants')
const { default: mongoose } = require('mongoose')
const User=require('./models/User')
const bcrypt=require('bcryptjs')
const app=express()


const salt=bcrypt.genSaltSync()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://prakharsinha2k2:gvBmtUlmIINl5v6H@cluster0.lgrhctg.mongodb.net/?retryWrites=true&w=majority')

app.post('/register',async (req,res)=>{
    const {name,email,password}=req.body

    try{
        const userInfo=await User.create({
            name:name,
            email:email,
            password: bcrypt.hashSync(password,salt)
        })
        res.status(200).json({'status':"User Registered Successfully!"})
    }
    catch(e){
        res.status(400).json({'status':"Something Went Wrong!"})
    }
})

app.post('/login',async(req,res)=>{
    const {email,password}=req.body;

    const userInfo=await User.findOne({email})
    if(!userInfo.email){
        res.status(400).json({'err':"User Doesn't Exist!"})
    }

    const passCheck=bcrypt.compareSync(password,userInfo.password)          //.compareSync functn of bcypt will return false if pwd doesn't match
    if(!passCheck){
        res.status(400).json({'err':"Invalid Password: Please Try Again!"})
    }

    else{                              //means password is correct, that measn this is the stage, that user has logged in!

    }


    

})

app.listen(4000,()=>{console.log("Server Running On PORT NO: 4000")})

