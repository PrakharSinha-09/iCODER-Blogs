import { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../utils/UserContext";

export default function Header(){
    // const [userEmail,setUserEmail]=useState("")
    const {setUserInfo,userInfo}=useContext(UserContext)
    useEffect(()=>{
        handleProfile()
    },[])
    
    const handleProfile=async()=>{
        const response=await fetch('http://localhost:4000/profile',{
            credentials:"include",
        })
        const data=await response.json()
        // setUserEmail(data.email)
        setUserInfo(data)
    }

    const handleLogout=()=>{
        fetch('http://localhost:4000/logout',{
            credentials:"include",
            method:"POST"
        })
        setUserInfo(null)
    }

    const userEmail=userInfo?.email

    return(
        <header>
            <Link to="/" className="logo">iCODERS Blog</Link>
            <nav>
                {userEmail && (
                    <>
                        <Link to='/create'>Create New Post</Link>
                        <Link onClick={handleLogout}>Logout ({userEmail})</Link>
                    </>
                )}
                {!userEmail && (
                    <>
                        <Link to="/login">Login {userEmail}</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
                
            </nav>
      </header>
    )
}