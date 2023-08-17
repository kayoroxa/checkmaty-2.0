'use server'

import prismadb from '@/lib/prismadb'
import { Folder, Prisma } from '@prisma/client'

export async function createFolder(newData: Prisma.FolderUncheckedCreateInput) {
  return await prismadb.folder.create({
    data: newData,
  })
}

export function fetchFolder(folderId: Folder['id']) {
  return {
    async updateFolder(newData: Partial<Folder>) {
      prismadb.task.update({
        where: {
          id: folderId,
        },
        data: newData,
      })
    },
    async getTasksInFolder() {
      const tasks = await prismadb.task.findMany({
        where: {
          project_id: folderId,
        },
      })
      return tasks
    },
    async deleteFolder() {
      await prismadb.folder.delete({
        where: {
          id: folderId,
        },
      })
    },
    async createTaskInFolder(newTask: Prisma.TaskUncheckedCreateInput) {
      const response = await prismadb.task.create({
        data: {
          createdByUserId: newTask.createdByUserId,
          folder_id: folderId,
          title: newTask.title,
          description: newTask.description,
        },
      })
      return response
    },
  }
}
