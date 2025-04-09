import {
  createSection,
  deleteSection,
  editSection,
  getSections,
} from "@/app/server/actions/sections";
import { NextRequest, NextResponse } from "next/server";

// handles the retrieval of data
export async function GET() {
  try {
    const res = await getSections();

    return NextResponse.json(res, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

// handles editing of data
export async function POST(req: NextRequest) {
  const data = await req.json();
  try {
    const res = await createSection(data);
    return NextResponse.json(res, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
// handles creation of data
export async function PUT(req: NextRequest) {
  const data = await req.json();
  try {
    const res = await editSection(data);
    return NextResponse.json(res, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
// handles deletion of data
export async function DELETE(req: NextRequest) {
  const data = await req.json();
  console.log(data);
  try {
    const res = await deleteSection(data);
    return NextResponse.json(res, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
