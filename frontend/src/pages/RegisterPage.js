import React, { useState,useEffect } from 'react'

const RegisterPage = () => {
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const register=async (e)=>{
        e.preventDefault()
            
            const data=await fetch('http://localhost:4000/register',{
            method:'POST',
            body:JSON.stringify({name,email,password}),
            headers: {'Content-Type':'application/json'}            //since, we are sending json to the backend, we need to send this header as well!
        })
        const res=await data.json()
        alert(res.status)
    }
    return(
        <form className='register' onSubmit={register}>
            <h2>Register</h2>
            <input type="text" placeholder="name" value={name} onChange={(e)=>(setName(e.target.value))} />
            <input type="text" placeholder="email" value={email} onChange={(e)=>(setEmail(e.target.value))} />
            <input type="password" placeholder="password" value={password} onChange={(e)=>(setPassword(e.target.value))} />
            <button>Register</button>
        </form>
     )
}

export default RegisterPage