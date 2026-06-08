import { NextResponse } from "next/server";

export async function POST() {
    try {
        
    } catch (error) {
        console.error("CREATE_POST_ERROR:",error);
        return NextResponse.json(
            {error:"Failed to create post"},
            {status: 500}
        );
    }
}