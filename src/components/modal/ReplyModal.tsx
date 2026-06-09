"use client"
import { useModalStore } from "@/src/store/useModalStore";
import Modal from "./Modal";
import { useState } from "react";
import { usePostStore } from "@/src/store/usePostStore";
import Feed from "../feed/Feed";


export default function ReplyModal() {
    const {closeReplyPost,isReplyPostOpen} = useModalStore();
    const {selectedPost} = usePostStore();
    const [content,setContent] = useState("");
  return (
    <Modal title="Reply" isOpen={isReplyPostOpen} onClose={closeReplyPost}>
        {selectedPost && <Feed post={selectedPost}/>}
    </Modal>
  )
}
