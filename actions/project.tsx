'use server'

import prismadb from '@/lib/prismadb'
import { Prisma, Project } from '@prisma/client'

export async function createProject(
  newData: Prisma.ProjectUncheckedCreateInput
) {
  return await prismadb.project.create({
    data: newData,
  })
}

export function fetchProject(projectId: Project['id']) {
  return {
    async updateProject(newData: Partial<Project>) {
      prismadb.project.update({
        where: {
          id: projectId,
        },
        data: newData,
      })
    },
    async getAllProjects() {
      const projects = await prismadb.project.findMany()
      return projects
    },
    async deleteProject() {
      await prismadb.project.delete({
        where: {
          id: projectId,
        },
      })
    },
  }
}
