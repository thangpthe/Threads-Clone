import MobileMenu from "@/src/components/general/MobileMenu";
import Sidebar from "@/src/components/general/Sidebar";
import CreatePostModal from "@/src/components/modal/CreatePostModal";
import { requireAuth } from "@/src/server-actions/requireAuth";

export default async function ProtectedRoute({children}: Readonly<{children: React.ReactNode}>) {
    await requireAuth();    
    return (
    <div className="mt-15">
      {children}
      <Sidebar/>
      <MobileMenu/>
      <CreatePostModal/>
    </div>
  )
}
