// lib/schemas/auth.ts
import { z } from "zod";

export const signUpSchema = z.object({
  action: z.string().nonempty("Action required"),
  role: z.string().nonempty("role required"),
  sectionId: z.string().optional().nullable(),
  email: z.string().email("Email is required"),
  name: z.string().nonempty("Please enter your full name"),
  id: z.string().nonempty("Please enter your id"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
export const editUserSchema = z.object({
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
  email: z.string().email().nonempty(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const createSectionSchema = z.object({
  newId: z.string().nonempty("Section id cannot be null."),
  name: z.string().nonempty("Section name cannot be null."),
});

export const createSSubjectSchema = z.object({
  newId: z.string().nonempty("Section id cannot be null."),
  name: z.string().nonempty("Section name cannot be null."),
});
export const createTimeSchema = z.object({
  timeStamp: z.string().nonempty("Tiome  cannot be null."),
});

export const editTimeSchema = z.object({
  timeStamp: z.string().nonempty("Time cannot be null."),
  id: z.number().min(0),
});
export const editSubjectSchema = z.object({
  name: z.string().nonempty("Section name cannot be null."),
  id: z.string().min(0),
  newId: z.string().nonempty("Section id cannot be null."),
});

export const editSectionSchema = z.object({
  name: z.string().nonempty("Section name cannot be null."),
  id: z.string().min(0),
  newId: z.string().nonempty("Section id cannot be null."),
});

export const scheduleSchema = z.object({
  scheduleId: z.string().optional(),
  day: z.string().nonempty("Day cannot be null."),
  endTime: z.string().nonempty("End time cannot be null."),
  teacherId: z.string().nonempty("Teacher ID cannot be null."),
  sectionId: z.string().nonempty("Section cannot be null."),
  startTime: z.string().nonempty("Start time cannot be null."),
  subjectId: z.string().nonempty("Subject cannot be null."),
});

export const announcementsSchema = z.object({
  id: z.string().optional(),
  title: z.string().nonempty("Title must have characters"),
  description: z.string().nonempty("Description must have characters"),
  for: z.string().nonempty(),
});
