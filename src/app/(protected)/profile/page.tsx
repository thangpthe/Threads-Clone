import Container from "@/src/components/layouts/Container";
import ProfileModal from "@/src/components/modal/ProfileModal";
import ProfileCard from "@/src/components/profile/ProfileCard";
import { getCurrentUserProfile } from "@/src/server-actions/getCurrentUserProfile";
import { Suspense } from "react";


async function ProfileComponent() {
  const userProfile = await getCurrentUserProfile();
  return (
    <>
     {userProfile && <ProfileCard userProfile={userProfile}/> } 
     {userProfile && <ProfileModal userProfile={userProfile}/>}
    </>
  )
}

export default async function ProfilePage() {
  return(
    <Container title="Profile">
      <Suspense fallback={ <p className="text-white">Loading...</p>}>
        <ProfileComponent/>
      </Suspense>
    </Container>
  )
}