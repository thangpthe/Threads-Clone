import prisma from "@/src/lib/prisma";
import getCurrentUser from "@/src/server-actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
    try {
        const currentUser = await getCurrentUser();
        if(!currentUser?.id){
            return NextResponse.json({error:"Unauthorized"},{status: 401});
        }

        const {content,postId} = await req.json();
        if(!content || !postId){
            return NextResponse.json(
                {error:"Contents and postId are required"},
                {status: 400}
            )
        }
        await prisma.comment.create({
            data:{
                content,
                postId,
                authorId:currentUser.id
            },
            include:{
                author:{
                    select:{
                        id:true,
                        name:true,
                        username: true,
                        image: true
                    }
                }
            }
        });
        return NextResponse.json({status:201});
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {error:"Failed to create comment"},
            {status:500}
        )
    }
}