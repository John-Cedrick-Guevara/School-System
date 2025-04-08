"use server";

import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Role } from "@prisma/client";
import { NextApiRequest } from "next";

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
  sectionId?: string;
  id: string;
  role: "STUDENT" | "TEACHER" | "ADMIN";
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
        role: data.role as Role,
        sectionId: data.sectionId || null,
      },
    });
    console.log("Created user:", newUser);

    return { newUser }; // Return the object directly
  } catch (error) {
    console.error("Error creating user:", error);
    throw error; // Rethrow error instead of returning it
  }
}

export async function getUsers(section: string) {
  try {
    if (section) {
      const users = await prisma.user.findMany({
        where: section ? { sectionId: section } : {},
        select: {
          grades: true,
          name: true,
          id: true,
        },
      });
      return { users };
    } else {
      const users = await prisma.user.findMany({});
      return { users };
    }
  } catch (error) {
    return { error };
  }
}

export async function logInUser(email: string, password: string) {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return { message: "No User found", success: false };
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return { message: "Invalid Password", success: false };
    }

    // Generate JWT
    const token = jwt.sign(
      {
        userData: {
          name: user.name,
          role: user.role,
          id: user.id,
        },
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1h",
      }
    );

    (
      await // Store token in HTTP-only cookies
      cookies()
    ).set("token", token, { httpOnly: true });

    // Return only necessary data
    return { token, user };
  } catch (error) {
    NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function updateUser(data: {
  name: string;
  email: string;
  password: string;
  sectionId?: string;
  id: string;
  role: "STUDENT" | "TEACHER" | "ADMIN";
}) {
  try {
    const res = await prisma.user.update({
      where: {
        email: data.email,
      },
      data: {
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role as Role,
        sectionId: data.sectionId || null,
      },
    });
    return res;
  } catch (error) {
    return error;
  }
}

export async function deleteUser(email: string) {
  try {
    const res = await prisma.user.delete({
      where: {
        email: email,
      },
    });
    return res;
  } catch (error) {
    return error;
  }
}
