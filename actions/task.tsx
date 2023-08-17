'use server'

import prismadb from '@/lib/prismadb'
import { Prisma, Task } from '@prisma/client'

export async function createTask(newData: Prisma.TaskUncheckedCreateInput) {
  return await prismadb.task.create({
    data: newData,
  })
}

export function fetchTask(taskId: Task['id']) {
  return {
    async updateTask(newData: Partial<Task>) {
      prismadb.task.update({
        where: {
          id: taskId,
        },
        data: newData,
      })
    },
    async getTasksInTask() {
      const tasks = await prismadb.task.findMany({
        where: {
          project_id: taskId,
        },
      })
      return tasks
    },
    async deleteTask() {
      await prismadb.task.delete({
        where: {
          id: taskId,
        },
      })
    },
  }
}
