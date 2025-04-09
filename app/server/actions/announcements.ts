import prisma from "@/lib/prisma";
import { Announcements, Role } from "@prisma/client";

export async function getAnnouncements(role: string) {
  try {
    // gets the announcements for their roles specificaly and for "all"
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
    } 
    // gets all the announcement for admin control
    else {
      const announcements = await prisma.announcements.findMany({});
      return announcements;
    }
  } catch (error) {
    return error;
  }
}

// created announcements 
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

// handles editing of announcements
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

// handles deletion of announcements
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
