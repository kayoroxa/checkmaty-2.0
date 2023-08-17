import { createFolder } from '@/actions/folder'
import { createProject } from '@/actions/project'
import { createTask } from '@/actions/task'
import { useTaskStore } from '@/store/useTaskStore'
import { Prisma } from '@prisma/client'
import { useRouter } from 'next/router'
import { AiOutlineAppstoreAdd } from 'react-icons/ai'
import { MdAddTask } from 'react-icons/md'
import { VscNewFolder } from 'react-icons/vsc'
import ButtonOp from '../atoms/ButtonOp'
import SquareImg from '../atoms/SquareImg'

export default function Header() {
  const { setTaskSelected } = useTaskStore()

  const { query, asPath } = useRouter()

  return (
    <header className="w-full px-8 py-2 dark:bg-slate-700  shadow-2xl flex justify-end items-center gap-3">
      <section className="mr-auto flex gap-4">
        <ButtonOp
          title="Add task"
          onClick={async () => {
            const data: Prisma.TaskCreateInput = {
              title: 'New task',
              description: '',
              inMainView: true,
              done: false,
            }

            if (typeof query.id === 'string' && asPath.includes('project')) {
              data.project_id = parseInt(query.id)
              data.inMainView = false
            }

            if (asPath.includes('inbox')) {
              data.inMainView = false
            }

            createTask(data)
          }}
        >
          <MdAddTask size={30} className="group-hover:fill-green-400" />
        </ButtonOp>

        <ButtonOp
          title="Add Folder"
          onClick={async () => {
            createFolder({
              description: '',
              title: 'New Folder',
              createdByUserId: '64de7201df61c3c518e7a83b',
              tasksInMainView: true,
            })
          }}
        >
          <VscNewFolder size={30} className="group-hover:fill-green-400" />
        </ButtonOp>

        <ButtonOp
          title="Add Project"
          onClick={async () => {
            createProject({
              name: 'New Project',
              description: '',
              createdByUserId: '64de7201df61c3c518e7a83b',
              imgUrl: 'https://i.stack.imgur.com/IaZve.png',
              coverImg:
                'https://installnet.com/wp-content/themes/u-design/assets/images/placeholders/post-placeholder.jpg',
              accessUserIds: ['64de7201df61c3c518e7a83b'],
            })
          }}
        >
          <AiOutlineAppstoreAdd
            size={30}
            className="group-hover:fill-green-400"
          />
        </ButtonOp>

        {/* <ButtonOp title="Add Project" onClick={() => {}} /> */}
      </section>
      <div className="-mt-2">
        <h1 className="text-xl">{user?.name}</h1>
        <p className="text-sm">@{user?.userName}</p>
      </div>
      <SquareImg
        src={
          user?.imgUrl ||
          'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
        }
      />
    </header>
  )
}
