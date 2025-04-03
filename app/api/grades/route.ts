import { getGrades, uploadGrades } from "@/app/server/actions/grades";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  try {
    const grades = await uploadGrades(data);

    return NextResponse.json(grades, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 401 });
  }
}
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  const role = req.nextUrl.searchParams.get("role");

  try {
    const res = await getGrades(String(id), String(role));
    console.log("res", res);
    return NextResponse.json(res, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
