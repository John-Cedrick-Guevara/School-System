import {
  createSubject,
  deleteSubject,
  editSubject,
  getSubjects,
} from "@/app/server/actions/subjects";
import { NextRequest, NextResponse } from "next/server";

// handles retrieval of data
export async function GET() {
  try {
    const res = await getSubjects();

    return NextResponse.json(res, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

// handles the creation of data
export async function POST(req: NextRequest) {
  const data = await req.json();
  try {
    const res = await createSubject(data);
    return NextResponse.json(res, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
// handle editing of data
export async function PUT(req: NextRequest) {
  const data = await req.json();
  console.log("asd", data);
  try {
    const res = await editSubject(data);
    return NextResponse.json(res, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
// handle deletion of data
export async function DELETE(req: NextRequest) {
  const data = await req.json();
  console.log(data);
  try {
    const res = await deleteSubject(data);
    return NextResponse.json(res, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
