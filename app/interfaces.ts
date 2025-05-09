import { Role } from "@prisma/client";

export interface Schedule {
  scheduleId?: string;
  teacherId?: string;
  subjectId: string;
  sectionId: string;
  startTime: string;
  day: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY";
  endTime: string;
}

export interface Subject {
  name: string;
  id: string;
  newId?: string;
}

export interface Section {
  name: string;
  id: string;
  newId?: string;
}

export interface TimeStamp {
  timeStamp: string;
  id: number;
  newId?: number;
}

export interface Grades {
  studentId: string;
  teacherId: string;
  sectionId: string;
  subjectId: string;
  prelimGrade: number | null;
  midtermGrade: number | null;
  finalsGrade: number | null;
}

export interface User {
  grades?: Grades[];
  action?: string;
  name: string;
  email: string;
  password: string;
  sectionId: string;
  id: string;
  role: string;
}

export interface Announcements {
  id?: string;
  title: string;
  description: string;
  for: "STUDENT" | "TEACHER" | "ALL";
}
