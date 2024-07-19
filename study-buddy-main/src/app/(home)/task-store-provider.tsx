// src/providers/task-store-provider.tsx
'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'
import { createTaskStore, type TaskState } from '@/utils/store/taskStore'


export type TaskStoreApi = ReturnType<typeof createTaskStore>

export const TaskStoreContext = createContext<TaskStoreApi | undefined>(undefined)

export interface TaskStoreProviderProps {
    data: TaskState['tasks']
    children: ReactNode
}

export const TaskStoreProvider = ({ data, children }: TaskStoreProviderProps) => {
    const storeRef = useRef<TaskStoreApi>()


    if (!storeRef.current) {
        storeRef.current = createTaskStore()
    }

    const setStore = useStore(storeRef.current, (state: TaskState) => state.setTasks)
    setStore(data)

    return (
        <TaskStoreContext.Provider value={storeRef.current}>
            {children}
        </TaskStoreContext.Provider>
    )
}

// eslint-disable-next-line no-unused-vars
export const useTaskStoreContext = <T,>(selector: (store: TaskState) => T): T => {
    const taskStoreContext = useContext(TaskStoreContext)

    if (!taskStoreContext) {
        throw new Error(`useTaskStoreContext must be used within TaskStoreProvider`)
    }

    return useStore(taskStoreContext, selector)
}
