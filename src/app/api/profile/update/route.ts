import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
    try {
        
    } catch (error) {
        console.error("PROFILE_UPDATE_ERROR:",error);
        return NextResponse.json(
            {error: "Failed to update profile"},
            {status: 500}
        );
    }
}