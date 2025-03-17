import prisma from "@/lib/prisma";
import { PrismaClient } from "@prisma/client";

export async function getTimeStamps() {
  try {
    const timeStamps = await prisma.time.findMany();
    return { timeStamps };
  } catch (error) {
    return { error };
  }
}

export async function createTimeStamp(data: { timeStamp: string }) {
  try {
    const res = await prisma.time.create({
      data: {
        timeStamp: data.timeStamp,
      },
    });
    return res;
  } catch (error) {
    return error;
  }
}

export async function editTimeStamp(data: { timeStamp: string; id: number }) {
  try {
    const res = await prisma.time.update({
      where: {
        id: data.id,
      },
      data: {
        timeStamp: data.timeStamp,
      },
    });
    return res;
  } catch (error) {
    return error;
  }
}
