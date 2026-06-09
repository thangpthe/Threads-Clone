"use client"
import { useModalStore } from "@/src/store/useModalStore";
import { usePostStore } from "@/src/store/usePostStore";
import { Post } from "@/src/types/post";
import { MessageCircle } from "lucide-react";


export default function PostActions({post}:{post:Post}) {
  const {openReplyPost} = useModalStore();
  const {setSelectedPost} = usePostStore();
  return (
    <div className="flex items-center text-xs text-text-muted mt-2">
      <div onClick={() => {openReplyPost();setSelectedPost(post);}} className="flex items-center gap-1 px-3 py-2 rounded-full hover:bg-surface-hover cursor-pointer">
          <MessageCircle size={20}/>
          {post._count.comments}
      </div>
    </div>
  )
}
