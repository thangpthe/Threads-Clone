"use client"

import axios from "axios";
import { Heart } from "lucide-react";
import { useState } from "react"

interface LikeButtonProps{
    postId:string,
    initialLike:boolean,
    initialCount:number
}

export default function LikeButton({postId,initialCount,initialLike}:LikeButtonProps) {
    const [liked,setLiked] = useState(initialLike);
    const [count,setCount] = useState(initialCount);
    const[loading,setLoading] = useState(false);
    const handleLike = async () => {
        if(loading) return;
        try {
            setLoading(true);
            const res = await axios.post("/api/posts/like",{
                postId
            });
            const likeState = res.data.liked;
            setLiked(liked);
            setCount((prev) => likeState ? prev + 1: prev -1);
        } catch (error) {
            console.error(error);
        }finally{
            setLoading(false);
        }
    }
    return (
        <button onClick={handleLike} className="flex items-center gap-1 text-sm cursor-pointer">
            <Heart size={18} className={liked ?"text-pink-500 fill-pink-500":""}/>
            <span className={liked ? "text-pink-500":""}>{count}</span>
        </button>
  )
}
