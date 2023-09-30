import { useEffect, useState } from "react";
import Post from "../components/Post";

export default function HomePage(){

    const [post,setPost]=useState([])
    useEffect(()=>{
       getPost()
    },[])

    const getPost=async()=>{
        const response=await fetch('http://localhost:4000/post')
        const data=await response.json()
        setPost(data)
        console.log(data);
    }

    return(
        <>
            {post.length > 0 && post.map((item,ind)=>(
                <Post {...item} key={item._id}/>
            ))}
        </>
    )
}