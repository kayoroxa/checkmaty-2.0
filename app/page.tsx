import prismadb from '@/lib/prismadb'
import DashBoard from '@/template/DashBoard'

export default async function Home() {
  const user = await prismadb.user.findUnique({
    where: {
      email: 'kayoroxa@gmail.com',
    },
  })

  // const filteredTodo = sortScoredTasks(tasksNormal)
  //       .filter(t =>
  //         t.doneDate && t.is_recurring && t.done
  //           ? new Date(t.doneDate).getDate() !== new Date().getDate()
  //           : !t.done
  //       )
  //       .slice(0, slice)

  //     const filteredDoneToday = tasksNormal.filter(
  //       (t: Task) =>
  //         t.done &&
  //         t.doneDate &&
  //         new Date().getDate() === new Date(t.doneDate).getDate()
  //     )

  //     setFilteredTasks(filteredTodo)
  //     setFilteredDoneToday(filteredDoneToday)

  return <DashBoard tasks={[]} projects={[]} />
}
