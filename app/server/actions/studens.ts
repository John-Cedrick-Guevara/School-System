"use server";

import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Role } from "@prisma/client";
import { NextApiRequest } from "next";
import { User } from "@/app/interfaces";

// handles creation of data
export async function createUser(data: User) {
  // throws error if no data received
  if (!data) {
    throw new Error("No data received in request");
  }

  // encryption of passowrd
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

    return { newUser }; // Return the object directly
  } catch (error) {
    console.error("Error creating user:", error);
    throw error; // Rethrow error instead of returning it
  }
}

// handles retrieval of section
export async function getUsers(section: string) {
  try {
    // fetches the students on specific section if provided(used for grading)
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
    }
    // fetches all the users for admin control
    else {
      const users = await prisma.user.findMany({});
      return { users };
    }
  } catch (error) {
    return { error };
  }
}

// handles logging in of user
export async function logInUser(email: string, password: string) {
  // throws error of no credentials provided
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  try {
    // gets the user according to email
    const user = await prisma.user.findUnique({ where: { email } });
    // returns the error when no user found
    if (!user) {
      return { message: "No User found", success: false };
    }
    // checking of password when user is existing
    const passwordMatch = await bcrypt.compare(password, user.password);

    // sends invalid password error
    if (!passwordMatch) {
      return { message: "Invalid Password", success: false };
    }

    // Generate JWT
    const token = jwt.sign(
      {
        userData: {
          email: user.email,
          name: user.name,
          role: user.role,
          id: user.id,
        },
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "24h", // 1 day token 
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

// handles updating user's data
export async function updateUser(data: User) {
  // enryption of password
  const hashedPassword = await bcrypt.hash(data.password, 5);
  try {
    const res = await prisma.user.update({
      where: {
        email: data.email,
      },
      data: {
        id: data.id,
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: data.role as Role,
        sectionId: data.sectionId || null,
      },
    });
    return res;
  } catch (error) {
    return error;
  }
}

// handles deletion of user
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
