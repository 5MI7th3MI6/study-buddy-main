'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
    const supabase = createClient()

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }
    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        redirect('/login?error=true')
    }

    revalidatePath('/', 'layout')
    redirect('/home')
}

export async function signup(formData: FormData) {
    const supabase = createClient()

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        username: formData.get('username') as string,
    }

    const { error } = await supabase.auth.signUp(data)


    if (error) {
        if (error.code === "over_email_send_rate_limit") {

            redirect('/register?limit=true')
        }
        else {
            redirect('/register?error=true')
        }
    }

    const { error: signInError } = await supabase.from('user').insert({
        username: data.username,
        last_seen: new Date().toISOString(),
        last_updated: new Date().toISOString(),
        login_streak: 1
    })


    if (signInError) {
        console.error(signInError)
        redirect('/register?error=true')
    }

    revalidatePath('/', 'layout')
    redirect('/home')
}

export async function forgetPassword(formData: FormData) {
    const supabase = createClient()

    const email = formData.get('email') as string

    if (!email) {
        return redirect('/forgot-password?error=true')
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email)

    if (error) {
        console.error(error)
        redirect('/forgot-password?error=true')
    }

    redirect('/forgot-passwor"d?success=true')
}

export async function resetPassword(formData: FormData) {
    const supabase = createClient()

    const { error } = await supabase.auth.updateUser({
        password: formData.get('password') as string,
    })


    if (error) {
        console.error(error)
        redirect('/reset-password?error=true')
    }
}