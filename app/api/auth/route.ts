import bcrypt from "bcryptjs";
import { createUser, logInUser } from "@/app/server/actions/studens";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, email, password, id, role, sectionId, name } = body;

  console.log("data", body);


    // creates the new user
    if (action === "signup") {
      const newStudent = await createUser({
        email,
        password,
        id,
        role,
        sectionId,
        name,
      });
      return NextResponse.json({ message: newStudent }, { status: 201 });
    }

    // logIn new user
    if (action === "login") {
      const logUser = await logInUser(email, password);
       return NextResponse.json({ message: logUser }, { status: 201 });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create student" },
      { status: 500 }
    );
  }
}
