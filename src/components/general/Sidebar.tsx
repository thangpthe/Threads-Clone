import { Heart, Home, LucideIcon, Plus, Search, User } from "lucide-react";
import Logo from "./Logo";

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
                }
                )}   
            </div>
        </aside>
    )
}

