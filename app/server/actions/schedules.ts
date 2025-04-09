import { Schedule } from "@/app/interfaces";
import prisma from "@/lib/prisma";
import { Day } from "@prisma/client";

// handles creation of schedule 
export async function createSchedule(data: Schedule) {
  try {
    if (!data.teacherId) {
      throw new Error("Teacher ID is required");
    }
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

// handles retrieval of data
export async function getSchedule(id: string, role: string) {
  try {
    // fetches all the schedule to restrict occupied schedules
    if (role === "TEACHER") {
      const schedule = await prisma.schedule.findMany();
      return schedule;
    } 
    // fetches the schedule for student
    else {
      const schedule = await prisma.user.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          name: true,
          section: {
            select: {
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

// handles edition of data
export async function editSchedule(data: Schedule) {
  try {
    // 
    const schedule = await prisma.schedule.update({
      where: {
        scheduleId: data.scheduleId,
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

// handles deletion of schedules
export async function deleteSchedule(data: Schedule) {
  try {
    const res = await prisma.schedule.delete({
      where: {
        scheduleId: data.scheduleId,
      },
    });
    return res;
  } catch (error) {
    return error;
  }
}
