'use client'
import { zodResolver } from "@hookform/resolvers/zod";
// @ts-ignore
import { useForm } from "react-hook-form";
import { updateDatabase } from '@/utils/db/tasks';
import { useState } from "react";
import toast from 'react-hot-toast';
import { Task } from "@/utils/store/taskStore";
import { TaskFormSchema, TaskFormValues } from "@/lib/types";
import { useTaskStoreContext } from "@/app/(home)/task-store-provider";
import TaskForm from "./TaskForm";

const EditTask = ({ setOpen, data }: any) => {
    const [loading, setLoading] = useState(false);
    const editTask = useTaskStoreContext((state) => state.editTask);

    const form = useForm<TaskFormValues>({
        resolver: zodResolver(TaskFormSchema),
        defaultValues: data,
    });


    const onSubmit = async (values: TaskFormValues) => {
        try {
            setLoading(true);
            await updateDatabase(values);
            toast.success('Task edited successfully')
        } catch (error: any) {
            toast.error(`Error: ${error.message}`);
        } finally {
            setLoading(false);
            setOpen(false);
            editTask(data.id, values as Task);
        }
    };

    return (
        <TaskForm formAction={onSubmit} form={form} loading={loading} />
    );
};

export default EditTask;

