import { createAnnouncement, deleteAnnouncement, editAnnouncement, getAnnouncements } from "@/app/server/actions/announcements";
import prisma from "@/lib/prisma";
import { announcementsSchema } from "@/lib/schemas/schemaParser";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const role = req.nextUrl.searchParams.get("role") as "STUDENT" | "TEACHER";

  try {
    if (role !== null) {
      const announcements = await getAnnouncements(role)
      return NextResponse.json(announcements, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({message : error}, { status: 401 });

  }
  
}
export async function POST(req: NextRequest) {
  const data = await req.json();

  try {
    const announcements = createAnnouncement(data)
    return NextResponse.json(announcements, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 200 });
  }
}
export async function PUT(req: NextRequest) {
  const data = await req.json();

  try {
    const announcements = editAnnouncement(data)
    return NextResponse.json(announcements, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 200 });
  }
}
export async function DELETE(req: NextRequest) {
  const data = await req.json();

  try {
    const announcements = deleteAnnouncement(data)
    return NextResponse.json(announcements, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 200 });
  }
}
