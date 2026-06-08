import prisma from "@/src/lib/prisma";
import getCurrentUser from "@/src/server-actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
    try {
        const currentUser = await getCurrentUser();

        if(!currentUser?.id){
            return NextResponse.json({error:"Unauthorized"},{status: 401});
        }

        const {userId} = await req.json();
        if(!userId){
            return NextResponse.json({error:"User id is required"},{status: 400});
        }    
        if(userId === currentUser.id){
            return NextResponse.json({error: "You can't follow yourself"},{status: 400});
    
        }

        const existingFollow = await prisma.follow.findFirst({
            where: {
                followerId: currentUser?.id,
                followingId: userId
            }
        });
        if(existingFollow){
            await prisma.follow.delete({
                where:{
                    id: existingFollow.id,
                },
            });
            return NextResponse.json({following: false});
        }
        await prisma.follow.create({
            data:{
                followerId: currentUser?.id,
                followingId:userId
            }
        });
         return NextResponse.json({following: true});
    } catch (error) {
        console.error("FOLLOW_ERROR:",error);
        return NextResponse.json(
            {error: "Failed to update follow status"},
            {status: 500}
        );
    }
}