
import type { Task } from "../types"
import { Pencil, Trash } from "../assets/svgs"
import { useTaskModal } from "../hooks/useTaskModal"
import { useDeleteTask } from "../hooks/useTasks"

type TaskRowProps = {
  task: Task
  onToggle: (id: string) => void
}



const TaskItem = ({task, onToggle}: TaskRowProps) => {
    
    const { openEditTaskModal } = useTaskModal()
    const deleteTaskMutation = useDeleteTask()

   
  return (
    <div className="flex items-center gap-3 py-1">
      <input type="checkbox" checked={task.isCompleted} onChange={()=> onToggle(task.id)} className='accent-[#52E2CD]'></input>
        <div className="flex items-center flex-row gap-2">
            <span  className={`text-[#D4E4FA] text-sm cursor-default ${task.isCompleted ? "line-through opacity-60" : ""}`}>
                {task.title}
            </span>
            <button className='text-[#52E2CD]' onClick={()=> {openEditTaskModal(task)}}><Pencil height={15} width={15}/></button>
            <button className='text-[#bb3131ea]' onClick={()=> {deleteTaskMutation.mutate(task.id)}}><Trash height={15} width={15}/></button>
        </div>
        <span className="text-[#BACAC5] text-xs ml-auto">{new Date(task.startDate).toLocaleDateString('es-MX', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </span>

    </div>
  )
}

export default TaskItem
