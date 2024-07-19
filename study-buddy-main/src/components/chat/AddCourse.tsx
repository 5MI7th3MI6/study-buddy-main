'use client'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import React from 'react'
import { AddCourseSchema, AddCourseValues } from "@/lib/types";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { enrollCourse } from "@/utils/db/courses";
import toast from 'react-hot-toast';
import { mutate } from 'swr';

export default function AddCourse() {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const form = useForm<AddCourseValues>({
        resolver: zodResolver(AddCourseSchema),
        defaultValues: {
            course_id: "",
        },
    });

    const { handleSubmit, control, formState: { errors } } = form


    const onSubmit = async (values: AddCourseValues) => {
        try {
            setLoading(true);
            await enrollCourse(values);
            await mutate('enrolledCourses');
            toast.success('Course enrolled successfully')
        } catch (error: any) {
            toast.error(`Error enrolling course`);
        } finally {
            setLoading(false);
            setOpen(false);

        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={"ghost"} >
                    <Plus size={18} />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-muted">
                <DialogHeader>
                    <DialogTitle>Add New Course</DialogTitle>
                </DialogHeader>
                <div className="p-4">
                    <Form {...form}>
                        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
                            <FormField
                                control={control}
                                name="course_id"
                                render={({ field }: any) => (
                                    <FormItem>
                                        <FormLabel>Task Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter course ID:" {...field} />
                                        </FormControl>
                                        <FormMessage>{errors.course_id?.message}</FormMessage>
                                    </FormItem>
                                )}
                            />
                            <Button className="w-full mt-6" type="submit" disabled={loading}>
                                Submit
                            </Button>
                        </form>
                    </Form>

                </div>
            </DialogContent>
        </Dialog >
    )
}
