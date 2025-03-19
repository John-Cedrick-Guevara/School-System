import prisma from "@/lib/prisma";

export async function createSchedule(data: {
  day: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY";
  endTime: string;
  id: string;
  section: string;
  startTime: string;
  subjectName: string;
}) {
  try {
    const res = await prisma.schedule.create({
      data: {
        teacherId: data.id,
        sectionId: data.section,
        subjectId: data.subjectName,
        day: data.day,
        startTime: data.startTime,
        endTime: data.endTime,
      },
    });
    return res;
  } catch (error) {
    return error;
  }
}
