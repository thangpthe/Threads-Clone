import prisma from "@/src/lib/prisma";
import getCurrentUser from "@/src/server-actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const currentUser = await getCurrentUser();
        if(!currentUser?.id) {
            return NextResponse.json({error:"Unathorized"}, {status:401});
        }
        const {username} = await req.json();
        
        const formattedUsername = username.toLowerCase().trim();
        const existingUsername = await prisma.user.findUnique({
            where:{
                username: username.toLowerCase()
            }
        });
        if(existingUsername) {
            return NextResponse.json({error:"Username already taken"}, {status:400});
        }
        
        const updatedUser = await prisma.user.update({
            where: {id: currentUser?.id},
            data: {username: formattedUsername}
        })
        return NextResponse.json({success: true, user: updatedUser});
    } catch (error) {
        console.error("Error setting up username:", error);
        return new Response(JSON.stringify({ message: "Failed to set up username" }), { status: 500 });
    }
}