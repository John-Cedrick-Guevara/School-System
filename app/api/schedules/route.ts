import { createSchedule } from "@/app/server/actions/schedules"
import { NextRequest } from "next/dist/server/web/spec-extension/request"
import { NextResponse } from "next/server"

export async function POST(req:NextRequest) {
    const data = await req.json()
    try {
        const res= await createSchedule(data)
        return NextResponse.json(res, {status: 201})
    } catch (error) {
        return NextResponse.json({error: error}, {status: 500})
    }

}