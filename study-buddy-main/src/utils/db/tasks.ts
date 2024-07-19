'use server'
import { Task } from '../store/taskStore';
import { createClient } from '../supabase/server';
import { updateUserAchievement } from './achievements';

export const addToDatabase = async (data: any) => {
    const supabase = createClient()
    const user = await supabase.auth.getUser()
    const user_id = user.data.user?.id
    const { error } = await supabase
        .from('tasks')
        .insert([{ ...data, user_id }])

    if (error) {
        console.error('Error inserting data:', error)
    }

    updateUserAchievement()
}

export const getFromDatabase = async () => {
    const supabase = createClient()
    const user = await supabase.auth.getUser()
    const user_id = user.data.user?.id
    const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user_id)
        .order('date', { ascending: true })

    if (error) {
        console.error('Error fetching appointments:', error)
    }

    return data as Task[]
}

export const updateDatabase = async (task: any) => {
    const supabase = createClient()
    const { error } = await supabase.from('tasks').update(
        {
            date: task.date,
            type: task.type,
            startTime: task.startTime,
            endTime: task.endTime,
            task_name: task.task_name,
            details: task.details,
            associatedClass: task.associatedClass
        }
    ).eq('id', task.id)

    if (error) {
        console.error('Error updating tasks:')
    }

    updateUserAchievement()
}

export const deleteFromDatabase = async (id: string) => {

    const supabase = createClient()
    const { error } = await supabase.from('tasks').delete().eq('id', id)

    if (error) {
        console.error('Error deleting task:', error)
    }

    updateUserAchievement()
}
