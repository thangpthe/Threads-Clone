// "use client"
// import { usePathname } from "next/navigation";
// import { navItems } from "./Sidebar";
// import Link from "next/link";

// export default function MobileMenu() {
//     const pathname = usePathname();
//   return (
//     <nav className="fixed bottom-0 left-0 w-full h-16 bg-background flex items-center justify-around md:hidden">
//         {navItems.map((item, index) => {
//             const Icon = item.icon;
//             if(item.isAction){
//                 return (
//                     <button className="px-6 py-3 bg-surface rounded-md text-white shadow-lg hover:scale-105 transition " key={index}>
//                         <Icon size={26}/>
//                     </button>
//             )
//             }
//             const isActive = pathname === item.href;
//             return (
//                 <Link href={item.href!} key={index}>
//                     <div className={`p-2  transition ${isActive ? "text-white" : "text-text-muted hover:bg-surface/50"}`}>
//                         <Icon size={26}/>
//                     </div>
//                 </Link>
//             )
//         })}
            

//     </nav>
//   )
// }
"use client"
import { usePathname } from "next/navigation";
import { navItems } from "./Sidebar";
import Link from "next/link";
import { useModalStore } from "@/src/store/useModalStore";
import { authClient } from "@/src/lib/auth-client";
import { useQueryClient } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function MobileMenu() {
    const pathname = usePathname();
    const { openCreatePost, closeAll } = useModalStore();
    const queryClient = useQueryClient();
    const [loggingOut, setLoggingOut] = useState(false);

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
        <nav className="fixed bottom-0 left-0 w-full h-16 bg-background border-t border-border flex items-center justify-around md:hidden z-50">
            {navItems.map((item, index) => {
                const Icon = item.icon;
                if (item.isAction) {
                    return (
                        <button
                            className="px-6 py-3 bg-surface rounded-md text-white shadow-lg hover:scale-105 transition"
                            key={index}
                            onClick={openCreatePost}
                        >
                            <Icon size={26} />
                        </button>
                    )
                }
                const isActive = pathname === item.href;
                return (
                    <Link href={item.href!} key={index}>
                        <div className={`p-2 transition ${isActive ? "text-white" : "text-text-muted hover:bg-surface/50"}`}>
                            <Icon size={26} />
                        </div>
                    </Link>
                )
            })}

            <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="p-2 text-text-muted hover:text-white transition disabled:opacity-40"
            >
                <LogOut size={26} className={loggingOut ? "animate-pulse" : ""} />
            </button>
        </nav>
    )
}