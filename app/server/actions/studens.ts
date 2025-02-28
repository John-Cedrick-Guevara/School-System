"use server";

import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
  sectionId?: string;
  id: string;
  role: "STUDENT" | "TEACHER";
}) {
  console.log("Server action received data:", data);

  if (!data) {
    throw new Error("No data received in request");
  }

  const hashedPassword = await bcrypt.hash(data.password, 5);

  try {
    const newUser = await prisma.user.create({
      data: {
        id: data.id,
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: data.role,
        sectionId: data.sectionId || null,
      },
    });
    console.log("Created user:", newUser);

    return newUser; // Return the object directly
  } catch (error) {
    console.error("Error creating user:", error);
    throw error; // Rethrow error instead of returning it
  }
}

export async function logInUser(email: string, password: string) {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error("No user found.");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  try {
    if (!passwordMatch) {
      throw new Error("Invalid Password");
    }

    // ✅ Generate JWT
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET!,
      {
        expiresIn: "20s",
      }
    );

    (
      await // ✅ Store token in HTTP-only cookies
      cookies()
    ).set("token", token, { httpOnly: true });  

    // ✅ Return only necessary data
    return {token, user};
  } catch (error) {
    NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
