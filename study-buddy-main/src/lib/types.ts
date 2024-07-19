import { z } from "zod";

export const TaskFormSchema = z.object({
    task_name: z.string().min(1, { message: "Task name is required" }).max(15, { message: "Task name is too long" }),
    date: z.string().min(6, { message: "Date is required" }),
    startTime: z.string().min(1, { message: "Start time is required" }),
    endTime: z.string(),
    type: z.enum(["meeting", "quiz", "assignment", "other", "completed"]),
    details: z.string(),
    associatedClass: z.string().default("none"),
}).refine(data => data.startTime < data.endTime, {
    message: "End time must be greater than start time",
    path: ["endTime"]
});

export type TaskFormValues = z.infer<typeof TaskFormSchema>;

// set file sizze limit to 5MB
export const EditProfileSchema = z.object({
    username: z.string().min(3, { message: "Username is too short" }),
    avatar_file: z.instanceof(File, { message: 'Please upload a file.' }).optional()
}).refine(data => data.username || data.avatar_file, {
    message: "Please update at least one field",
}).refine(data => !data.avatar_file || data.avatar_file.size < 5 * 1024 * 1024, {
    message: "File size must be less than 5MB",
    path: ["avatar_file"]
});


export type EditProfileValues = z.infer<typeof EditProfileSchema>;

export const AddCourseSchema = z.object({
    course_id: z.string().uuid(),
});

export type AddCourseValues = z.infer<typeof AddCourseSchema>;

export interface Achievement {
    id: number;
    name: string;
    description: string;
    achieved: boolean;
    percentage: number;
    type: string;
    max_value: number;
    uuid: string;
}

export interface UserAchievement {
    user_id: string;
    achievement_id: number;
    achieved: boolean;
    progress: number;
}

export interface Course {
    id: string
    name: string;
    description: string;
}

export interface CourseMessages {
    course_id: string;
    messages: Message[];
}

export interface Message {
    username: string;
    avatar_url: string;
    message: string;
}

export interface User {
    username: string;
    avatar_url?: string;
}