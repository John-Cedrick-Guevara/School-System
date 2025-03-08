import prisma from "@/lib/prisma";

export async function getSections() {
  try {
    const sections = await prisma.section.findMany();

    return { sections };
  } catch (error) {
    return error;
  }
}

export async function createSection(data: { name: string; newId: string }) {
  try {
    const res = await prisma.section.create({
      data: {
        name: data.name,
        id: data.newId,
      },
    });
    return res;
  } catch (error) {
    return error;
  }
}

export async function editSection(data: {
  name: string;
  id: string;
  newId: string;
}) {
  try {
    const res = await prisma.section.update({
      where: {
        id: data.id,
      },
      data: {
        id: data.newId,
        name: data.name,
      },
    });
    return res;
  } catch (error) {
    return error;
  }
}
export async function deleteSection(data: {
  name: string;
  id: string;
  newId: string;
}) {
    console.log("first")
  try {
    const res = await prisma.section.delete({
      where: {
        id: data.id,
      },
    });
    return res;
  } catch (error) {
    return error;
  }
}
