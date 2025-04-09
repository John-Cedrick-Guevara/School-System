import {
  createTimeStamp,
  deleteTimeStamp,
  editTimeStamp,
  getTimeStamps,
} from "@/app/server/actions/timeStamps";
import { NextRequest, NextResponse } from "next/server";

// handles the retrieval of data
export async function GET() {
  try {
    const res = await getTimeStamps();

    return NextResponse.json(res, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

// handles creation of data
export async function POST(req: NextRequest) {
  const data = await req.json();
  try {
    const res = await createTimeStamp(data);
    return NextResponse.json(res, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

// handles the 
export async function PUT(req: NextRequest) {
  const data = await req.json();
  try {
    const res = await editTimeStamp(data);
    return NextResponse.json(res, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
// handles the deletion of data
export async function DELETE(req: NextRequest) {
  const data = await req.json();
  console.log(data);
  try {
    const res = await deleteTimeStamp(data);
    return NextResponse.json(res, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
