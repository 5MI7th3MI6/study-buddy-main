'use server'
import { createClient } from '../supabase/server';
import { AddCourseValues } from '@/lib/types';
import getUserId from './user';
import { Course } from '@/lib/types';
import { mapToUserMessages } from './utils';
import { getAvatarUrl } from './user';
import { Message } from 'react-hook-form';

export const enrollCourse = async (data: AddCourseValues) => {
    const supabase = createClient()
    const course_id = data.course_id

    const { error } = await supabase
        .from('courses')
        .select('*')
        .eq('id', course_id)

    if (error) {
        throw "Course not found"
    }

    const user_id = await getUserId()

    const {
        error: insertError,
    } = await supabase
        .from('userCourses')
        .insert({
            "user_id": user_id,
            "course_id": course_id,
        })

    if (insertError) {
        throw "Error enrolling course"
    }
}

export const getEnrolledCourses = async () => {
    const supabase = createClient()
    const user_id = await getUserId()

    const { data: userCourses, error: userCoursesError } = await supabase
        .from('userCourses')
        .select('*')
        .eq('user_id', user_id)


    if (userCoursesError) {
        console.error(userCoursesError)
        return []
    }

    if (userCourses.length === 0) {
        return []
    }

    const courseIds = userCourses.map((uc) => uc.course_id);

    // Fetch courses using courseIds
    const { data: courses, error: coursesError } = await supabase
        .from('courses')
        .select('id, name, description')
        .in('id', courseIds);

    if (coursesError) {
        console.error(coursesError)
        return []
    }
    return courses as Course[]

}

export const unenrollCourse = async (course_id: string) => {
    const supabase = createClient()
    const user_id = await getUserId()

    const { error } = await supabase
        .from('userCourses')
        .delete()
        .eq('user_id', user_id)
        .eq('course_id', course_id)

    if (error) {
        throw "Error unenrolling course"
    }
}

interface CourseMessages {
    course_id: string;
    messages: Message;
    user_id: string;
    user: {
        username: string;
        avatar_url: string;
    }
}

export const getCourseMessages = async (data: Course[]) => {
    // fetch msg for each course_id and put them course wise
    const supabase = createClient()
    const courseIds = data.map((course) => course.id)

    const { data: messages, error: messagesError } = await supabase
        .from('courseMessages')
        .select(`
      course_id,
      message,
      user_id,
      user (username, avatar_url)
    `)
        .in('course_id', courseIds).returns<CourseMessages[]>()

    if (messagesError) {
        console.error(messagesError)
        return []
    }

    const updatedMessages = await Promise.all(
        messages.map(async (msg) => {
            if (!msg.user.avatar_url) {
                msg.user.avatar_url = "/default.png";
                return msg;
            }
            const avatar_url = await getAvatarUrl(msg.user.avatar_url);
            msg.user.avatar_url = avatar_url ? avatar_url : "/default.png";
            return msg;
        })
    );

    return mapToUserMessages(updatedMessages)
}