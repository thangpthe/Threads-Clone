import Container from "@/src/components/layouts/Container"
import LoadingSpinner from "@/src/components/loading/LoadingSpinner"
import ProfileCard from "@/src/components/profile/ProfileCard";
import getCurrentUser from "@/src/server-actions/getCurrentUser";
import { getUserProfileByUsername } from "@/src/server-actions/getUserProfileByUsername"
import { Suspense } from "react"

async function ProfileLoader({username}:{username:string}) {
    const user = await getUserProfileByUsername(username);
    const currentUser = await getCurrentUser();
    if(!user) return <div className="text-white/8-">No user found</div>
    return(
       <ProfileCard userProfile={user} currentUserId={currentUser?.id || ""}/>
    )
}

export default async function UserProfilePage({params}:{params:Promise<{username: string}>}) {
   const username = (await params).username
    return (
        <Container title={username} showBackButton>
            <Suspense fallback={<LoadingSpinner/>}>
                <ProfileLoader username={username}/>
            </Suspense>
        </Container>
  )
}
