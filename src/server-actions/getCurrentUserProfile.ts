import { headers } from "next/headers";
import { auth } from "../lib/auth";
import prisma from "../lib/prisma";

export async function getCurrentUserProfile() {
    const session = await auth.api.getSession({
            headers: await headers(),
        });
    
        if(!session?.user.id) return null;

        const user = await prisma.user.findUnique({
            where:{id: session.user.id},
            select:{
                username: true,
                name: true,
                id: true,
                email: true,
                bio: true,
                image: true,
                createdAt:true,
                _count: {
                    select:{
                        posts: true,
                        followers: true,
                        following: true
                    }
                }
            }
        });
        return user;
}