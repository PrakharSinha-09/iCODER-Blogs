import { useState } from "react"

export default function LoginPage(){

    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")


    return(
       <form className="login" >
        <h2>Login</h2>
        <input type="text" placeholder="email" value={email} onChange={(e)=>(setEmail(e.target.value))} />
        <input type="password" placeholder="password" value={password} onChange={(e)=>(setPassword(e.target.value))}/>
        <button>Login</button>
       </form>
    )
}