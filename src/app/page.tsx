import { redirect } from "next/navigation";
import getCurrentUser from "../server-actions/getCurrentUser";


export default async function Home() {
  const currentUser = await getCurrentUser();
  if(!currentUser){
    redirect("/login");
  }
  else {
    redirect("/feed");
  }
}
