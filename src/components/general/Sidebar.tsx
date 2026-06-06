"use client"
import { Heart, Home, LogOut, LucideIcon, Plus, Search, User } from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";
import { usePathname } from "next/navigation";

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
    return (
        <aside className="hidden md:flex items-center justify-between flex-col w-20 fixed z-100 top-0 left-0 h-screen">
            <Logo/>

            <div className="flex flex-col gap-4">
                {navItems.map((item, index) => {
                    const Icon = item.icon;
                    if(item.isAction){
                        return (
                            <button className="p-4  bg-surface text-white rounded-md hover:opacity-80 transition" key={index}>
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

            <button className="mb-6 p-4 rounded-md text-text-muted hover:bg-surface/50 hover:text-white transition cursor-pointer">
                <LogOut size={30}/>
            </button>
        </aside>
    )
}

