import { deleteUser, getUsers, updateUser } from "@/app/server/actions/studens";
import prisma from "@/lib/prisma";
import { error } from "console";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await getUsers();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "failed to fetch users" },
      { status: 200 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  try {
    const res = await updateUser(data);

    return NextResponse.json(res, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { email } = await req.json();

  try {
    const res = await deleteUser(email);

    return NextResponse.json(res, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}


