import prisma from "@/lib/prisma";
import { Announcements, Role } from "@prisma/client";

export async function getAnnouncements(role: string) {
  try {
    if (role !== "ADMIN") {
      const announcements = await prisma.announcements.findMany({
        where: role !== "ADMIN"
          ? {
              OR: [
                { for: role as any },  // cast if needed
                { for: "ALL" },
              ],
            }
          : {}, // no filtering for admin
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
