import prisma from "@/src/lib/prisma";
import getCurrentUser from "@/src/server-actions/getCurrentUser";
import { error } from "console";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
    try {
        const currentUser = await getCurrentUser();
        if(!currentUser?.id){
            return NextResponse.json(
                {error:"Unathorized"},
                {status:401}
            )
        }
        const{postId} = await req.json();
        if(!postId){
            return NextResponse.json(
                {error:"PostID required"},
                {status:400}
            )
        }

        const existingLike = await prisma.like.findUnique({
            where:{
                userId_postId:{
                    userId: currentUser.id,
                    postId
                }
            }
        });
        if(existingLike){
            await prisma.like.delete({
                where:{
                    userId_postId:{
                        userId:currentUser.id,
                        postId
                    }
                }
            })
            return NextResponse.json({like:false})
        }
        await prisma.like.create({
            data:{
                userId:currentUser.id,
                postId
            }
        });
        return NextResponse.json({like:true});

    } catch (error) {
        console.error("Failed to like post:",error);
        return NextResponse.json(
            {error:"Failed to toggle like"},
            {status:500}
        )
    }
}