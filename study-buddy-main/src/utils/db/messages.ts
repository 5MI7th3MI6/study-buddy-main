'use server'
import getUserId from "./user";
import { createClient } from "../supabase/server";

export async function sendMessage(message: string, course_id: string) {
    const supabase = createClient();
    const user_id = await getUserId();

    const { error } = await supabase.from("courseMessages").insert({
        user_id: user_id,
        message: message,
        course_id: course_id
    });

    if (error) {
        console.error("Error inserting message:", error.message);
    }
}