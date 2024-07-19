import React from "react";
import { useTaskStoreContext } from "@/app/(home)/task-store-provider";
import { EventImpl } from "@fullcalendar/core/internal";
interface EventHoverCardProps {
    event: EventImpl;
}

const TaskPopover: React.FC<EventHoverCardProps> = ({ event }) => {
    const tasks = useTaskStoreContext((state) => state.tasks);
    const task = tasks.find((task) => task.id == event.id);
    if (!task) return null;
    return (

        <div className="flex cursor-pointer items-center justify-center h-full">
            <h4 className="text-xs md:font-medium md:text:lg ">{task.task_name}</h4>
        </div>
    );
};

export default TaskPopover;
