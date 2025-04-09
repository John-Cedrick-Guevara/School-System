import { deleteUser, getUsers, updateUser } from "@/app/server/actions/studens";
import prisma from "@/lib/prisma";
import { error } from "console";
import { NextApiRequest } from "next";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// handles the retrieval of data
export async function GET(req: NextRequest) {
  const section = req.nextUrl.searchParams.get("section");
  
  try {
    const users = await getUsers(section as string);
    
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "failed to fetch users" },
      { status: 200 }
    );
  }
}

// handles editing of data
export async function PUT(req: NextRequest) {
  const data = await req.json();
  try {
    const res = await updateUser(data);
    
    return NextResponse.json(res, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

// handles deletion of data
export async function DELETE(req: NextRequest) {
  const { email } = await req.json();
  
  try {
    const res = await deleteUser(email);
    
    return NextResponse.json(res, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
