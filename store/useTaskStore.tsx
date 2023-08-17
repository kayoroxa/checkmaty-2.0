import { Task } from '@prisma/client'
import { create } from 'zustand'

interface MyState {
  taskSelected: null | Task
  setTaskSelected: (task: Task | null) => void
  taskSelectedHistoric: null | Task[]
  addTaskSelectedHistoric: (task: Task) => void
  resetTaskSelectedHistoric: () => void
  setTaskSelectedHistoric: (callBack: (prev: Task[]) => Task[]) => void
  setTaskIdSelected: (id: Task['id']) => void
}

export const useTaskStore = create<MyState>()((set, get) => ({
  taskSelected: null,
  setTaskSelected: task => {
    set({ taskSelected: task })

    const lastTaskInHistoric = get().taskSelectedHistoric?.slice(-1)[0]

    if (task && lastTaskInHistoric?.id === task?.parentId) {
      get()?.addTaskSelectedHistoric(task)
    }
  },

  taskSelectedHistoric: null,
  addTaskSelectedHistoric: (task: Task) => {
    const taskHistoric = get().taskSelectedHistoric
    if (taskHistoric !== null && Array.isArray(taskHistoric)) {
      const newTaskHistoric = Array.from(new Set([...taskHistoric, task]))

      set({ taskSelectedHistoric: newTaskHistoric })
    } else {
      set({ taskSelectedHistoric: [task] })
    }
  },
  resetTaskSelectedHistoric: () => {
    set({ taskSelectedHistoric: null })
  },
  setTaskSelectedHistoric: (callBack: (prev: Task[]) => Task[]) => {
    const taskHistoric = get().taskSelectedHistoric
    if (taskHistoric !== null && Array.isArray(taskHistoric)) {
      set({ taskSelectedHistoric: callBack(taskHistoric) })
    } else {
      set({ taskSelectedHistoric: [] })
    }
  },
  setTaskIdSelected: id => {
    const tasks: Task[] = []
    const taskSelected = tasks.find(task => task.id === id)
    set({ taskSelected })
  },
}))
