import prisma from "@/lib/prisma";

export async function getSubjects() {
  try {
    const subjects = await prisma.subject.findMany();

    return { subjects };
  } catch (error) {
    return error;
  }
}

export async function createSubject(data: { name: string; newId: string }) {
  try {
    const res = await prisma.subject.create({
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

export async function editSubject(data: {
    name: string;
    id: string;
    newId: string;
  }) {

    try {
      const res = await prisma.subject.update({
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

  
export async function deleteSubject(data: {
    name: string;
    id: string;
    newId: string;
  }) {
    try {
      const res = await prisma.subject.delete({
        where: {
          id: data.id,
        },
      });
      return res;
    } catch (error) {
      return error;
    }
  }