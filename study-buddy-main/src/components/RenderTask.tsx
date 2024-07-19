import React from 'react'
import { Task } from '@/utils/store/taskStore'
import { calcDuration } from '@/lib/utils'
import { Clock, CalendarDays } from 'lucide-react';
import TaskOptions from './hocs/TaskOptions';

export default function RenderTask({ task }: { task: Task }) {
    const duration = calcDuration(task.startTime, task.endTime);
    return (
        <TaskOptions data={task}>
            <div className='flex justify-between items-center mb-3'>
                <h2 className="text-lg text-primary">{task.task_name}</h2>
                <p className="text-md text-accent-foreground">{task.date}</p>
            </div>
            <div className="flex items-center gap-2 py-1">
                <Clock size={20} />
                <p>{duration}</p>
            </div>
            <div className="flex items-center gap-2 py-1">
                <CalendarDays />
                <p>{task.type}</p>
            </div>
        </TaskOptions>
    )
}
