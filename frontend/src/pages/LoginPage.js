import { useState,useEffect } from "react"
import {Navigate} from 'react-router-dom'
// import use
export default function LoginPage(){

    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const[redirect,setRedirect]=useState(false)

    const handleLogin=async (e)=>{
        e.preventDefault()

        const response=await fetch('http://localhost:4000/login',{
            method:'POST',
            body:JSON.stringify({email,password}),
            headers:{'Content-Type':'application/json'},
            credentials:"include"
        })

        if(response.ok){
            setRedirect(true)
        }
        else{
            alert('Wrong Credentials!')
        }
    }

    if(redirect){
        return <Navigate to={'/'} />
    }

    return(
       <form className="login" onSubmit={handleLogin}>
        <h2>Login</h2>
        <input type="text" placeholder="email" value={email} onChange={(e)=>(setEmail(e.target.value))} />
        <input type="password" placeholder="password" value={password} onChange={(e)=>(setPassword(e.target.value))}/>
        <button>Login</button>
       </form>
    )
}