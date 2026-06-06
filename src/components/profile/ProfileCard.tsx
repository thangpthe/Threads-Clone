"use client"
import { useModalStore } from "@/src/store/useModalStore";
import Avatar from "../ui/Avatar";
import { User } from "@/src/types/user";

interface ProfileCardProps{
    userProfile: User,
}

export default function ProfileCard({userProfile}: ProfileCardProps) {
    const {openEditProfile} = useModalStore();
    
    return (
    <>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-xl text-white font-semibold">{userProfile.name}</p>
                    <p className="text-sm text-white/70 mt-1">{userProfile.username}</p>
                </div>
                <Avatar imgSrc={userProfile.image || "/images/avatar.png"} alt={userProfile.name || ""} width={80} height={80}/>
            </div>
            <div className="flex gap-2 items-center text-sm text-text-muted my-4">
                <p>{userProfile._count.followers} Follower</p>
                <p>{userProfile._count.following} Following</p>
                <p>{userProfile._count.posts} Posts</p>
            </div>
            <button onClick={openEditProfile} className="w-full py-1 border border-border text-white/90 rounded-lg cursor-pointer">Edit Profile</button>
    </>
    )
}
