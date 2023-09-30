import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'

function PostPage() {
    const [postInfo,setPostInfo]=useState()
    const params=useParams();
    const id=params.id

    useEffect(()=>{
        posts()
    },[])

    const posts=async()=>{
        const response=await fetch(`http://localhost:4000/post/${id}`)
        const data=await response.json()
        setPostInfo(data)
    }
  return (
    <div>{console.log(id)}</div>
  )
}

export default PostPage