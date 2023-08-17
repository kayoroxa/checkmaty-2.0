// export interface Project {
//   id: number
//   name: string
//   description: string

//   coverImg: string
//   imgUrl: string

//   percent?: number

//   createdAt: number
//   updatedAt: number
//   createdByUserId: string
//   accessUserIds: string[]
// }

import type { Project as ProjectPrisma } from '@prisma/client'

export type Project = ProjectPrisma

export interface ProjectCreate extends Omit<Project, 'id'> {
  id?: number
  user_id: string
}
