import { useState } from 'react'
import Container from '../components/atoms/Container'
import ProjectItem from '../components/molecules/ProjectItem'
import FolderModal from '../components/organisms/FolderModal'
import TaskModal from '../components/organisms/TaskModal'
import WrapperApp from '../components/organisms/WrapperApp'
import TodoItem from '../components/todo'

import { Project, Task } from '@prisma/client'

export const isDone = (task: Task) => {
  const isRecurring = task.is_recurring && task.doneDate

  if (!isRecurring || !task.doneDate) return task.done

  const today = new Date().getDate()
  const doneDate = new Date(task.doneDate).getDate()

  return doneDate === today
}

export default function DashBoard({
  projects,
  tasks,
}: {
  projects?: Project[]
  tasks: Task[]
}) {
  const [filteredDoneToday, setFilteredDoneToday] = useState<Task[]>()
  const [slice, setSlice] = useState(9)

  return (
    <>
      <WrapperApp>
        {/* {(isTasksLoading || isLoading) && <p>Loading...</p>} */}
        {/* {isTasksError && <p>Error não conseguindo carregar os tarefas</p>} */}
        {projects?.[0] && (
          <Container title="Projects:">
            {projects?.map((project: any, i: number) => (
              <ProjectItem
                key={i}
                id={project.id}
                imgUrl={project.imgUrl}
                name={project.name}
                percent={project.percent}
              />
            ))}
          </Container>
        )}

        {tasks && (
          <>
            <Container
              title="Todo:"
              grid={true}
              showSlice={true}
              onSliceChange={newSlice => {
                setSlice(newSlice)
              }}
            >
              {tasks.map((todo: Task, i: number) => (
                <TodoItem key={i} todo={todo} onToggle={() => {}} />
              ))}
            </Container>
          </>
        )}
        <div className="flex gap-4">
          <div>
            Simplicity:{' '}
            {filteredDoneToday?.reduce(
              (a, b) => (b.simplicity ? a + b.simplicity : a),
              0
            )}
          </div>
          <div>
            Urgency:{' '}
            {filteredDoneToday?.reduce(
              (a, b) => (b.urgency ? a + b.urgency : a),
              0
            )}
          </div>
          <div>
            Relevance:{' '}
            {filteredDoneToday?.reduce(
              (a, b) => (b.relevance ? a + b.relevance : a),
              0
            )}
          </div>
        </div>
        {filteredDoneToday && (
          <Container title="Done Today:" grid={true}>
            {filteredDoneToday.slice(0, 9).map((todo: Task, i: number) => (
              <TodoItem key={i} todo={todo} onToggle={() => {}} />
            ))}
          </Container>
        )}
      </WrapperApp>
      <TaskModal />
      <FolderModal />
    </>
  )
}
