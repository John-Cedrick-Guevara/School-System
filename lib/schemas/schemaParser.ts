// lib/schemas/auth.ts
import { z } from "zod";

export const signUpSchema = z.object({
  action: z.string().nonempty("Action required"),
  role: z.string().nonempty("role required"),
  sectionId: z.string(),
  email: z.string().email(),
  name: z.string().nonempty("Please enter your full name"),
  id: z.string().nonempty("Please enter your id"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const logInSchema = z.object({
  action: z.string().nonempty("Action required"),
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
