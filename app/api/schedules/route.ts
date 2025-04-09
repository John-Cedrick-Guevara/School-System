import {
  createSchedule,
  deleteSchedule,
  editSchedule,
  getSchedule,
} from "@/app/server/actions/schedules";
import { NextApiRequest } from "next";
import { NextRequest } from "next/dist/server/web/spec-extension/request";
import { NextResponse } from "next/server";

// handles the creation of data
export async function POST(req: NextRequest) {
  const data = await req.json();
  try {
    const res = await createSchedule(data);
    return NextResponse.json(res, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
// handles the retrieval of data
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  const role = req.nextUrl.searchParams.get("role");

  try {
    const res = await getSchedule(String(id), String(role));
    console.log(res);
    return NextResponse.json(res, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
// hadnles the editing of data
export async function PUT(req: NextRequest) {
  const data = await req.json();

  try {
    const res = await editSchedule(data);
    return NextResponse.json(res, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
// handles the deletion of data
export async function DELETE(req: NextRequest) {
  const data = await req.json();
  try {
    const res = await deleteSchedule(data);
    return NextResponse.json(res, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
