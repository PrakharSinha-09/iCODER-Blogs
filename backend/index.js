const express=require('express')
const cors=require('cors')
const exp = require('constants')
const app=express()

app.use(cors())
app.use(express.json())

app.post('/register',(req,res)=>{
    const {email,password}=req.body
    res.json({"Status":"COol!"})
})

app.listen(4000,()=>{console.log("Server Running On PORT NO: 4000")})