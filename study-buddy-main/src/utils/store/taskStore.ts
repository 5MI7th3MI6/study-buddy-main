import { create } from 'zustand';
import { updateDatabase } from '../db/tasks';

export interface Task {
  id: string;
  task_name: string;
  date: string;
  startTime: string;
  endTime: string;
  type: string;
  associatedClass: string;
  details: string;
}

export interface TaskState {
  tasks: Task[];
  // eslint-disable-next-line no-unused-vars
  addTask: (newTask: Task) => void;
  // eslint-disable-next-line no-unused-vars
  setTasks: (tasks: Task[]) => void;
  // eslint-disable-next-line no-unused-vars
  removeTask: (taskId: string) => void;
  // eslint-disable-next-line no-unused-vars
  editTask: (taskId: string, newTask: Task) => void;
}


export const createTaskStore = () =>
  create<TaskState>()(
    (set, get) => ({
      tasks: [],
      addTask: (newTask: Task) => set({ tasks: [...get().tasks, newTask] }),
      setTasks: (tasks: Task[]) => set({ tasks }),
      removeTask: (taskId: string) => {
        const updatedTasks = get().tasks.filter((task) => task.id !== taskId)
        set({ tasks: updatedTasks })
      },
      editTask: (taskId: string, newTask: Task) => {
        const updatedTasks = get().tasks.map((task) => {
          if (task.id === taskId) {
            return newTask
          }
          return task
        })
        set({ tasks: updatedTasks })
        updateDatabase(newTask)
      },
    }),
  )