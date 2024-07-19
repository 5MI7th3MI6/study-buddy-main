import React from 'react'
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils";
import { Textarea } from "./ui/textarea";
import {
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { TaskFormValues } from '@/lib/types';
// @ts-ignore
import { useForm } from 'react-hook-form';

interface TaskFormProps {
    // eslint-disable-next-line no-unused-vars
    formAction: (data: TaskFormValues) => Promise<void>;
    form: ReturnType<typeof useForm<TaskFormValues>>;
    loading: boolean;
}

export default function TaskForm({ formAction, form, loading }: TaskFormProps) {

    const { handleSubmit, control, formState: { errors } } = form

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(formAction)} className="w-full space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={control}
                        name="task_name"
                        render={({ field }: any) => (
                            <FormItem>
                                <FormLabel>Task Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter task name" {...field} />
                                </FormControl>
                                <FormMessage>{errors.task_name?.message}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }: any) => (
                            <FormItem >
                                <FormLabel >Date</FormLabel>
                                <Popover modal={true}>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={(date: Date | undefined) => field.onChange(date?.toISOString().split('T')[0])}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage>{errors.date?.message}</FormMessage>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={control}
                        name="startTime"
                        render={({ field }: any) => (
                            <FormItem>
                                <FormLabel>Start Time</FormLabel>
                                <FormControl>
                                    <Input type="time" {...field} />
                                </FormControl>
                                <FormMessage>{errors.startTime?.message}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="endTime"
                        render={({ field }: any) => (
                            <FormItem>
                                <FormLabel>End Time</FormLabel>
                                <FormControl>
                                    <Input type="time" {...field} />
                                </FormControl>
                                <FormMessage>{errors.endTime?.message}</FormMessage>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={control}
                        name="type"
                        render={({ field }: any) => (
                            <FormItem>
                                <FormLabel>Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select event type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="meeting">Meeting</SelectItem>
                                        <SelectItem value="quiz">Quiz</SelectItem>
                                        <SelectItem value="assignment">Assignment</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                        <SelectItem value="completed">Completed</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage>{errors.type?.message}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="associatedClass"
                        render={({ field }: any) => (
                            <FormItem>
                                <FormLabel>Associated Class</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter class name" {...field} />
                                </FormControl>
                                <FormMessage>{errors.associatedClass?.message}</FormMessage>
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={control}
                    name="details"
                    render={({ field }: any) => (
                        <FormItem>
                            <FormLabel>Details</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Enter details"

                                    rows={4}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage>{errors.details?.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <Button className="w-full mt-6" type="submit" disabled={loading}>
                    Submit
                </Button>
            </form>
        </Form>
    )
}
