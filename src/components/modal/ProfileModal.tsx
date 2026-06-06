"use client"
import { useModalStore } from "@/src/store/useModalStore"
import Modal from "./Modal";
import { useState } from "react";
import Image from "next/image";
import { User } from "@/src/types/user";

interface ProfileModalProps{
    userProfile: User,
}

export default function ProfileModal({userProfile}:ProfileModalProps) {
    const {closeEditProfile,isEditProfileOpen} = useModalStore();
    const [avatarPreview,setAvatarPreview] = useState(userProfile.image);
    const [name,setName] = useState(userProfile.name);
    const [username,setUsername] = useState(userProfile.username);
    const [bio,setBio] = useState(userProfile.bio);
    const handleAvatarChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(!file) return;
        const previewURL = URL.createObjectURL(file);
        setAvatarPreview(previewURL);
    }

    const inputStyles = "bg-surface border borde-border rounded-lg px-3 py-2 text-white text-sm focus:outlien-none"
    return (
        <Modal title="Edit Profile" onClose={closeEditProfile} isOpen={isEditProfileOpen}>
            <div className="mt-4 space-y-6">
                <div className="flex items-center gap-4 ">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden">
                        <Image src={avatarPreview || "/images/avatar.png"} alt="avatar" fill className="object-cover"/>
                    </div>

                    <label className="text-sm text-blue-500 cursor-pointer hover:underline">
                        Change Avatar
                        <input  className="hidden" type="files" accept="images/*" onChange={handleAvatarChange}/>
                    </label>
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-xs text-text-muted">Name</label>
                    <input type="text" placeholder="Your name" value={name || ""} onChange={(e) => setName(e.target.value)} className={inputStyles} />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-xs text-text-muted">Username</label>
                    <input type="text" placeholder="Your username" value={username || ""} onChange={(e) => setUsername(e.target.value)} className={inputStyles} />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-xs text-text-muted">Bio</label>
                    <textarea className={`resize-none ${inputStyles}`} rows={3} value={bio || ""} onChange={(e) => setBio(e.target.value)}/>
                </div>

                <div className="flex justify-end">
                    <button className="bg-white text-black text-sm font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition cursor-pointer">
                        Save
                    </button>
                </div>
            </div>

           
        </Modal>
    )
}
