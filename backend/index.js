const express=require('express')
const cors=require('cors')
const exp = require('constants')
const { default: mongoose } = require('mongoose')
const User=require('./models/User')
const bcrypt=require('bcryptjs')
const app=express()
const jwt=require('jsonwebtoken')

const salt=bcrypt.genSaltSync()
const secretKey='IAmPrakhar09$'

app.use(cors({credentials:true,origin:'http://localhost:3000'}))      //we included extra info in this cors because if we are using credentials(see login page while fetching API) while fetching the API, we have to include more info like credentials to true and the host of our frontend(i.e., react)
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
    if(passCheck){
        jwt.sign({email, id:userInfo._id }, secretKey, {}, (err,token)=>{
            if (err) throw err
            
            res.cookie('token',token).json('OK!')
        })
    }
    
    else{                              //means password isn't correct, so login will be failed!
        res.status(400).json({'err':"Invalid Password: Please Try Again!"})
    }
})

app.listen(4000,()=>{console.log("Server Running On PORT NO: 4000")})

