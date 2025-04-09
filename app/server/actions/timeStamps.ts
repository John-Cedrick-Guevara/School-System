import prisma from "@/lib/prisma";

// handles retrieval of time Stamps
export async function getTimeStamps() {
  try {
    const timeStamps = await prisma.time.findMany();
    return { timeStamps };
  } catch (error) {
    return { error };
  }
}

// handles the creation of timeStamps
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

// handles editing timeStamps
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

  // handles deletion of timeStamps
export async function deleteTimeStamp(data: {
  timeStamp: string;
  id: number;
}) {
  try {
    const res = await prisma.time.delete({
      where: {
        id: data.id,
      },
    });
    return res;
  } catch (error) {
    return error;
  }
}