import { Grades } from "@/app/interfaces";
import prisma from "@/lib/prisma";

export async function uploadGrades(data: Grades[]) {
  console.log(data);
  try {
    const uplaod = await prisma.grade.createMany({ data: data });
    return uplaod;
  } catch (error) {
    return error;
  }
}

export async function getGrades(id: string, role: string) {
  try {
    if (role === "TEACHER") {
      const schedule = await prisma.grade.findMany();
      return schedule;
    } else {
      const grades = await prisma.grade.findMany({
        where: {
          studentId: id
        },
      });

      return grades;
    }
  } catch (error) {
    return error;
  }
}
