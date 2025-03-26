import prisma from "@/lib/prisma";
import { Day } from "@prisma/client";

interface Schedule {
  day: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY";
  endTime: string;
  teacherId: string;
  sectionId: string;
  startTime: string;
  subjectId: string;
  id?: string;
}

export async function createSchedule(data: Schedule) {
  try {
    const res = await prisma.schedule.create({
      data: {
        teacherId: data.teacherId,
        sectionId: data.sectionId,
        subjectId: data.subjectId,
        day: data.day as Day,
        startTime: data.startTime,
        endTime: data.endTime,
      },
    });
    return res;
  } catch (error) {
    return error;
  }
}

export async function getSchedule(id: string, role: string) {
  console.log("asd",role)
  try {
    if (role === "TEACHER") {
      const schedule = await prisma.schedule.findMany({
        where: {
          teacherId: id,
        },
      });
      return schedule;
    } else {
      const schedule = await prisma.user.findUnique({
        where: {
          id: id,
        },
        include: {
          section: {
            include: {
              schedules: true,
            },
          },
        },
      });
      return schedule;
    }
  } catch (error) {
    return error;
  }
}

export async function editSchedule(data: Schedule) {
  console.log("data", data);

  try {
    const schedule = await prisma.schedule.update({
      where: {
        id: data.id,
      },

      data: {
        teacherId: data.teacherId,
        sectionId: data.sectionId,
        subjectId: data.subjectId,
        day: data.day as Day,
        startTime: data.startTime,
        endTime: data.endTime,
      },
    });
    return schedule;
  } catch (error) {
    return error;
  }
}

export async function deleteSchedule(data: Schedule) {
  try {
    const res = await prisma.schedule.delete({
      where: {
        id: data.id,
      },
    });
    return res;
  } catch (error) {
    return error;
  }
}
