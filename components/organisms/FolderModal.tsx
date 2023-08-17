'use client'
import { Folder, Task } from '@prisma/client'
import { fetchFolder } from '../../actions/folder'
import Use from '../../hooks/use'
import ButtonOp from '../atoms/ButtonOp'
import Input from '../atoms/Input'
import { useFolderStore } from '../store/useFolderStore'
import TodoItem from '../todo'
import WrapperTaskModal from './WrapperTaskModal'

interface Props {
  isOpen?: boolean
  onRequestClose?: () => void
  folder?: Folder
}

// Modal.setAppElement('#root')

function FolderModal({ ...wrapperProps }: Props) {
  // const [isOpen, setIsOpen] = useState(initialIsOpen)
  const { folderSelected: folder, setFolderSelected } = useFolderStore()

  // const { folders: subfolders } = useFolders('64de7201df61c3c518e7a83b')
  const { createTaskInFolder, deleteFolder, getTasksInFolder, updateFolder } =
    fetchFolder(folder?.id)

  if (!folder) return null

  const { data: stepTasks, isLoading } = Use<Task[]>(getTasksInFolder)

  return (
    <WrapperTaskModal
      // isOpen={folder ? true : false}
      isOpen={true}
      onRequestClose={() => {
        setFolderSelected(null)
      }}
      onDelete={() => {
        deleteFolder()
      }}
      task={{
        title: folder.title,
        description: folder.description,
        id: folder.id,
        inMainView: folder.tasksInMainView || false,
        urgency: folder.urgency || 0,
        relevance: folder.relevance || 0,
      }}
      onChange={props => updateFolder(props.updateData)}
    >
      <header className="flex items-center justify-start gap-2">
        <section className="w-full flex gap-3">
          <div className="text-3xl">📂</div>
          <Input
            onValueChange={newValue => {
              updateFolder({ title: newValue })
            }}
            value={folder.title}
            className="text-3xl font-medium mb-4 w-full break-all"
          />
          <Input
            onValueChange={newValue => {
              updateFolder({ description: newValue })
            }}
            value={folder.description}
            className="text-lg mb-4  w-full"
          />
        </section>
      </header>

      <ButtonOp
        title="Add StepTask"
        onClick={async () => {
          await createTaskInFolder({
            title: 'New Step Task',
            description: '',
            createdByUserId: '64de7201df61c3c518e7a83b',
          })
        }}
      />
      {stepTasks && (
        <div className="border-t border-gray-200 mt-4 pt-4">
          <h3 className="text-2xl font-medium mb-2">StepTasks:</h3>
          <ul className="list-disc pl-4 flex flex-col gap-4 w-full">
            {stepTasks.map((stepTask, i) => (
              <TodoItem
                key={stepTask.id || i}
                todo={stepTask}
                onToggle={() => {}}
              />
            ))}
          </ul>
        </div>
      )}
    </WrapperTaskModal>
  )
}

export default FolderModal
