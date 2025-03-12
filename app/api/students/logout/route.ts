import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    try {
      (await cookies()).set("token", "", { httpOnly: true, maxAge: 0 });
  
      return NextResponse.json({ message: " User Loged out" }, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { message: " Error logging out", error },
        { status: 500 }
      );
    }
  }