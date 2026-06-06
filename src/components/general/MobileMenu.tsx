"use client"
import { usePathname } from "next/navigation";
import { navItems } from "./Sidebar";
import Link from "next/link";

export default function MobileMenu() {
    const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 w-full h-16 bg-background flex items-center justify-around md:hidden">
        {navItems.map((item, index) => {
            const Icon = item.icon;
            if(item.isAction){
                return (
                    <button className="px-6 py-3 bg-surface rounded-md text-white shadow-lg hover:scale-105 transition " key={index}>
                        <Icon size={26}/>
                    </button>
            )
            }
            const isActive = pathname === item.href;
            return (
                <Link href={item.href!} key={index}>
                    <div className={`p-2  transition ${isActive ? "text-white" : "text-text-muted hover:bg-surface/50"}`}>
                        <Icon size={26}/>
                    </div>
                </Link>
            )
        })}
            

    </nav>
  )
}
