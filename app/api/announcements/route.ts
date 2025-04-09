import {
  createAnnouncement,
  deleteAnnouncement,
  editAnnouncement,
  getAnnouncements,
} from "@/app/server/actions/announcements";

import { NextRequest, NextResponse } from "next/server";

// handles retrieval of data
export async function GET(req: NextRequest) {
  // gets the user role
  const role = req.nextUrl.searchParams.get("role") as "STUDENT" | "TEACHER";

  try {
    if (role !== null) {
      const announcements = await getAnnouncements(role);
      return NextResponse.json(announcements, { status: 200 });
    } else {
      return NextResponse.json({ message: "No user role" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 401 });
  }
}

// handles creation of data
export async function POST(req: NextRequest) {
  // data needed
  const data = await req.json();

  try {
    const announcements = createAnnouncement(data);
    return NextResponse.json(announcements, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 200 });
  }
}

// handles update of data
export async function PUT(req: NextRequest) {
  // updated data
  const data = await req.json();

  try {
    const announcements = editAnnouncement(data);
    return NextResponse.json(announcements, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 200 });
  }
}
// handle deletion of data
export async function DELETE(req: NextRequest) {
  // data to be deleted
  const data = await req.json();

  try {
    const announcements = deleteAnnouncement(data);
    return NextResponse.json(announcements, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 200 });
  }
}
