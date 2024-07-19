'use client'
import { useState, useEffect } from 'react';
import { supabase } from "@/utils/supabase/client";
import { CourseMessages, Message } from '@/lib/types';
import { getUserData } from '@/utils/db/user';

const useRealtimeMessages = (initialMessages: CourseMessages[]) => {
    const [messages, setMessages] = useState<CourseMessages[]>(initialMessages);

    const insertNewMessage = (newMsg: Message, course_id: string) => {
        setMessages(prevMessages =>
            prevMessages.map(course =>
                course.course_id === course_id
                    ? { ...course, messages: [...course.messages, newMsg] }
                    : course
            )
        );
    }

    useEffect(() => {
        const channel = supabase.channel('realtime_messages').on(
            'postgres_changes',
            { event: 'INSERT', schema: 'public', table: 'courseMessages' },
            async (payload) => {
                try {
                    const userData = await getUserData(payload.new.user_id);

                    const { data } = await supabase
                        .storage
                        .from('avatars')
                        .getPublicUrl(userData.avatar_url);

                    const newMsg: Message = {
                        message: payload.new.message,
                        username: userData.username,
                        avatar_url: userData.avatar_url ? data.publicUrl : "/default.png",
                    };
                    insertNewMessage(newMsg, payload.new.course_id);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        ).subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    return {
        messages,
        setMessages
    };
};
export default useRealtimeMessages;
