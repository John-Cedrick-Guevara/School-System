import prisma from "@/lib/prisma";
import { Announcements, Role } from "@prisma/client";

export async function getAnnouncements(role: "STUDENT" | "TEACHER" | "ADMIN") {
  try {
    if (role !== "ADMIN") {
      const announcements = await prisma.announcements.findMany({
        where: {
          for: role,
        },
      });
      return announcements;
    } else {
      const announcements = await prisma.announcements.findMany({});
      return announcements;
    }
  } catch (error) {
    return error;
  }
}
export async function createAnnouncement(data: Announcements) {
  try {
    const announcements = await prisma.announcements.create({
      data: data,
    });
    return announcements;
  } catch (error) {
    return error;
  }
}
export async function editAnnouncement(data: Announcements) {
  try {
    const announcements = await prisma.announcements.update({
      where: {
        id: data.id,
      },
      data: data,
    });
    return announcements;
  } catch (error) {
    return error;
  }
}
export async function deleteAnnouncement(data: Announcements) {
  try {
    const announcements = await prisma.announcements.delete({
      where: {
        id: data.id,
      },
    });
    return announcements;
  } catch (error) {
    return error;
  }
}
