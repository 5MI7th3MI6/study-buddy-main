import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Task } from '@/utils/store/taskStore';
import { deleteFromDatabase } from '@/utils/db/tasks';
import { useTaskStoreContext } from "@/app/(home)/task-store-provider";
import EditTask from '../EditTask';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from 'react';

interface TaskOptionsProps {
    children: React.ReactNode;
    data: Task;
}

export default function TaskOptions({ children, data }: TaskOptionsProps) {
    const removeFromStore = useTaskStoreContext((state) => state.removeTask)
    const editTask = useTaskStoreContext((state) => state.editTask)
    const [open, setOpen] = useState(false);

    const handleDelete = () => {
        deleteFromDatabase(data.id)
        removeFromStore(data.id)
    }

    const handleComplete = () => {
        data.type = 'completed'
        editTask(data.id, data)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger>
                    {children}
                </DropdownMenuTrigger >
                <DropdownMenuContent className="w-52">
                    <DropdownMenuItem onClick={handleComplete} >Mark Completed</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setOpen(true)}>
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleDelete} >Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu >
            <DialogContent className="sm:max-w-[500px] bg-muted">
                <EditTask data={data} setOpen={setOpen} />
            </DialogContent>
        </ Dialog >
    )
}
