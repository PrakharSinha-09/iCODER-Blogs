import { useState,useEffect } from "react"

export default function LoginPage(){

    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const handleLogin=async (e)=>{
        e.preventDefault()

        const data=fetch('http://localhost:4000/login',{
            method:'POST',
            body:JSON.stringify({email,password}),
            headers:{'Content-Type':'application/json'}
        })
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