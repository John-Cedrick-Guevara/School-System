import { Grades } from "@/app/interfaces";
import prisma from "@/lib/prisma";
import { number, string } from "zod";

const terms: string[] = ["prelimGrade", "midtermGrade", "finalsGrade"];
interface toUpdateGrades {
  [key: string]: number | null;
}

export async function uploadGrades(data: Grades[]) {
  let toUpdate: toUpdateGrades = {};

  try {
    for (const grade of data) {
      // finds the term that is not null and set them to be updated
      for (const term of terms) {
        if (grade[term as keyof typeof grade] !== null) {
          toUpdate[term] = grade[term as keyof typeof grade] as number;
        }
      }
      // updates the data or create them
      const uplaod = await prisma.grade.upsert({
        where: {
          studentId_subjectId: {
            studentId: grade.studentId,
            subjectId: grade.subjectId,
          },
        },
        update: toUpdate,
        create: grade,
      });

      toUpdate = {}; // clears the toUpdate to avoid adding random grades
    }
    return "uplaoded";
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
          studentId: id,
        },
      });

      return grades;
    }
  } catch (error) {
    return error;
  }
}
