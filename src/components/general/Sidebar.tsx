"use client"
import { Heart, Home, LogOut, LucideIcon, Plus, Search, User } from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";
import { usePathname } from "next/navigation";
import { useModalStore } from "@/src/store/useModalStore";
import { authClient } from "@/src/lib/auth-client";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface NavItem{
    href?: string;
    icon: LucideIcon;
    isAction?: boolean;
}

export const navItems: NavItem[] = [
    {href: "/feed", icon: Home},
    {href: "/search", icon: Search},
    {icon: Plus, isAction: true},
    {href: "/favorites", icon: Heart},
    {href: "/profile", icon: User},
]

export default function Sidebar() {
    const pathname = usePathname();
    const {openCreatePost,closeAll} = useModalStore();
    const [loggingOut, setLoggingOut] = useState(false);
    const queryClient = useQueryClient();
     const handleLogout = async () => {
        if (loggingOut) return;
        setLoggingOut(true);
        closeAll();
 
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    queryClient.clear();
                    toast.success("Logout successful", {
                        duration: 1500,
                    });
                    // Đợi toast hiện xong rồi redirect
                    setTimeout(() => {
                        window.location.replace("/login");
                    }, 1500);
                },
                onError: () => {
                    setLoggingOut(false);
                    toast.error("Logout failed. Please try again.");
                }
            }
        });
    };
 
    return (
        <aside className="hidden md:flex items-center justify-between flex-col w-20 fixed z-100 top-0 left-0 h-screen">
            <Logo/>

            <div className="flex flex-col gap-4">
                {navItems.map((item, index) => {
                    const Icon = item.icon;
                    if(item.isAction){
                        return (
                            <button onClick={openCreatePost} className="p-4  bg-surface text-white rounded-md hover:opacity-80 transition" key={index}>
                                <Icon size={30}/>
                            </button>
                    )
                    }
                    const isActive = pathname === item.href;
                    return (
                        <Link href={item.href!} key={index}>
                            <div className={`p-4 rounded-md transition ${isActive ? "text-white" : "text-text-muted hover:bg-surface/50"}`}>
                                <Icon size={30}/>
                            </div>
                        </Link>
                    )
                })}   
            </div>

            <button className="mb-6 p-4 rounded-md text-text-muted hover:bg-surface/50 hover:text-white transition cursor-pointer" onClick={handleLogout}>
                <LogOut size={30}/>
            </button>
        </aside>
    )
}

