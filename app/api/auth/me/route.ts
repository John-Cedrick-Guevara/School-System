// fetches the data from jwt

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    //gets the token
    const token = (await cookies()).get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    // gets the user data from token
    const userData = jwt.verify(token, process.env.JWT_SECRET!);
    console.log(userData)

    return NextResponse.json(userData);
  } catch (error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
