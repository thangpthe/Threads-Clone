import Container from "@/src/components/layouts/Container";
import LoadingSpinner from "@/src/components/loading/LoadingSpinner";
import ProfileModal from "@/src/components/modal/ProfileModal";
import ProfileCard from "@/src/components/profile/ProfileCard";
import getCurrentUser from "@/src/server-actions/getCurrentUser";
import { getCurrentUserProfile } from "@/src/server-actions/getCurrentUserProfile";
import { Suspense } from "react";


async function ProfileComponent() {
  const userProfile = await getCurrentUserProfile();
  const currentUser = await getCurrentUser();
  return (
    <>
     {userProfile && <ProfileCard userProfile={userProfile} currentUserId={currentUser?.id || ""}/> } 
     {userProfile && <ProfileModal userProfile={userProfile}/>}
    </>
  )
}

export default async function ProfilePage() {
  return(
    <Container title="Profile">
      <Suspense fallback={ <LoadingSpinner/>}>
        <ProfileComponent/>
      </Suspense>
    </Container>
  )
}