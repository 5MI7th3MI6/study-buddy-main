'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// @ts-ignore
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { addToDatabase } from "@/utils/db/tasks";
import { useState } from "react";
import toast from 'react-hot-toast';
import { Task } from "@/utils/store/taskStore";
import { TaskFormSchema, TaskFormValues } from "@/lib/types";
import { useTaskStoreContext } from "@/app/(home)/task-store-provider";
import TaskForm from "./TaskForm";

const AddTask = () => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const addTask = useTaskStoreContext((state) => state.addTask);

    const form = useForm<TaskFormValues>({
        resolver: zodResolver(TaskFormSchema),
        defaultValues: {
            date: "",
            task_name: "",
            startTime: "09:00",
            endTime: "10:00",
            type: "meeting",
            associatedClass: "",
            details: "",
        },
    });


    const onSubmit = async (values: TaskFormValues) => {
        try {
            setLoading(true);
            await addToDatabase(values);
            toast.success('Task added successfully')
        } catch (error: any) {
            toast.error(`Error: ${error.message}`);
        } finally {
            setLoading(false);
            setOpen(false);
            addTask(values as Task);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Create new task</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-muted">
                <DialogHeader>
                    <DialogTitle>Add New Task</DialogTitle>
                </DialogHeader>
                <TaskForm formAction={onSubmit} form={form} loading={loading} />
            </DialogContent>
        </Dialog>
    );
};

export default AddTask;

