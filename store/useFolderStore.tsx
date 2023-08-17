import { Folder } from '@prisma/client'
import { create } from 'zustand'

interface MyState {
  folderSelected: null | Folder
  setFolderSelected: (folder: Folder | null) => void
  setFolderIdSelected: (id: Folder['id']) => void
}

export const useFolderStore = create<MyState>()((set, get) => ({
  folderSelected: null,
  setFolderSelected: folder => {
    set({ folderSelected: folder })
  },

  setFolderIdSelected: id => {
    const folders: Folder[] = []
    const folderSelected = folders.find(folder => folder.id === id)
    set({ folderSelected })
  },
}))
