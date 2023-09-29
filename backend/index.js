const express=require('express')
const cors=require('cors')
const exp = require('constants')
const { default: mongoose } = require('mongoose')
const User=require('./models/User')
const bcrypt=require('bcryptjs')
const app=express()
const jwt=require('jsonwebtoken')
const cookieParser=require('cookie-parser')

//for file uploading, we have a multer package
const multer=require('multer')
const uploadMiddleware=multer({dest: 'uploads/'})
const fs=require('fs')

const salt=bcrypt.genSaltSync()
const secretKey='IAmPrakhar09$'

app.use(cors({credentials:true,origin:'http://localhost:3000'}))      //we included extra info in this cors because if we are using credentials(see login page while fetching API) while fetching the API, we have to include more info like credentials to true and the host of our frontend(i.e., react)
app.use(express.json())
app.use(cookieParser())                                                //if you want to send the cookie that contains token to front-end, we have to use this cookie-parser middleware

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
            
            res.cookie('token',token).json({
                id: userInfo._id,
                email:email
            })
        })
    }
    
    else{                              //means password isn't correct, so login will be failed!
        res.status(400).json({'err':"Invalid Password: Please Try Again!"})
    }
}) 

app.get('/profile',(req,res)=>{
    const {token}=req.cookies
    //need of verifying the token is that, we want the token that is required for the authorization not like something come up with any token and I'll give you the access of any such thing, we have to maintain the thing that whoever made the request, he sees only that relevant info.
    jwt.verify(token,secretKey, {}, (err,info)=>{
        if(err) throw err;

        res.json(info)
    })
    //res.json(req.cookies)                      //to send this cookie to the client, we need to use a middleware named cookie-parser
})

app.post('/logout',(req,res)=>{             //logout is damn simple, we just have to make ensure cookie is reset or we simply provide empty string.
    res.cookie('token','').json('ok')
})

app.post('/post',uploadMiddleware.single('file'),(req,res)=>{             //file will be saved as a file name file, because we have written that, we can change it but remember, from front-end as well, you have to change that name!
    const {originalname,path}=req.file
    const parts=originalname.split('.')
    const ext=parts[parts.length-1]   
    const newPath=path+'.'+ext
    fs.renameSync(path,newPath)
    res.json({ext})    
})

app.listen(4000,()=>{console.log("Server Running On PORT NO: 4000")}) 

