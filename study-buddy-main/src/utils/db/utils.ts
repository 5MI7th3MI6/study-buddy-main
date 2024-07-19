import { CourseMessages, Message } from "@/lib/types";

export const mapToUserMessages = (data: any[]): CourseMessages[] => {
    const messageMap: { [key: string]: Message[] } = {};

    data.forEach((item) => {
        const { course_id, message, user: { username, avatar_url } } = item;

        if (!messageMap[course_id]) {
            messageMap[course_id] = [];
        }

        messageMap[course_id].push({ username, message, avatar_url });
    });

    return Object.keys(messageMap).map(course_id => ({
        course_id,
        messages: messageMap[course_id]
    }));
};