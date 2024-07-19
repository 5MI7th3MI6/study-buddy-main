import { useEffect, useState } from 'react'
import { useTaskStoreContext } from "@/app/(home)/task-store-provider";
import { getHighContrastColor, dateToUTC } from '@/lib/utils'
import { Task } from '@/utils/store/taskStore';


export interface EventType {
    id: string
    title: string
    start: Date
    end: Date
    color: string
    backgroundColor: string
    borderColor: string
    textColor: string
    editable: boolean
    startEditable: boolean
    durationEditable: boolean
    resourceEditable: boolean
    overlap: boolean
    allDay: boolean
}


export default function useEventData() {
    const tasks = useTaskStoreContext((state) => state.tasks);
    const { editTask } = useTaskStoreContext((state) => state);
    const [events, setEvents] = useState<EventType[]>([])

    useEffect(() => {
        setEvents(tasks.map(task => ({
            id: task.id,
            title: task.task_name,
            start: dateToUTC(task.date, task.startTime),
            end: dateToUTC(task.date, task.endTime),
            ...getHighContrastColor(task.type),
            editable: true,
            startEditable: true,
            durationEditable: true,
            resourceEditable: true,
            overlap: true,
            allDay: false,
        })))
    }, [tasks, setEvents, editTask])

    const updateEvent = (resizeInfo: any) => {
        const oldTask = tasks.find(task => task.id == resizeInfo.event.id);
        if (!oldTask)
            return;
        const updatedEvents = events.map(event => {
            if (event.id === resizeInfo.event.id) {
                return {
                    ...event,
                    start: resizeInfo.event.start,
                    end: resizeInfo.event.end
                };
            }
            return event;
        });
        setEvents(updatedEvents);


        const updatedTask: Task = {
            ...oldTask,
            date: resizeInfo.event.start.toISOString().split('T')[0],
            startTime: resizeInfo.event.start.toISOString().split('T')[1].split(':')[0] + ':' + resizeInfo.event.start.toISOString().split('T')[1].split(':')[1],
            endTime: resizeInfo.event.end.toISOString().split('T')[1].split(':')[0] + ':' + resizeInfo.event.end.toISOString().split('T')[1].split(':')[1],
        };
        editTask(oldTask?.id, updatedTask);
    }

    return { events, updateEvent }
}
