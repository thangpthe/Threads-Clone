import MobileMenu from "@/src/components/general/MobileMenu";
import Sidebar from "@/src/components/general/Sidebar";
import { requireAuth } from "@/src/server-actions/requireAuth";

export default async function ProtectedRoute({children}: Readonly<{children: React.ReactNode}>) {
    await requireAuth();    
    return (
    <div className="mt-15">
      {children}
      <Sidebar/>
      <MobileMenu/>
    </div>
  )
}
