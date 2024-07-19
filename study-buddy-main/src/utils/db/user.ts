"use server"
import { createClient } from "@/utils/supabase/server";
import { User } from "@/lib/types";


export default async function getUserId() {
    const supabase = createClient();
    const user = await supabase.auth.getUser()
    return user.data.user?.id
}

export async function updateStreak(user: any) {
    const supabase = createClient();

    const { data, error } = await supabase.from('user').select('*').eq('id', user.id);

    if (error) {
        console.error("Error fetching user data:", error.message);
        return;
    }

    if (!data || data.length === 0) {
        return
    } else {
        const existingUser = data[0];
        const lastSeen = new Date();

        const timeDifferenceHours = Math.abs(lastSeen.getTime() - new Date(existingUser.last_updated).getTime()) / (1000 * 60 * 60);
        const lastSeenFromNowHours = Math.abs(lastSeen.getTime() - new Date(existingUser.last_seen).getTime()) / (1000 * 60 * 60);
        if (lastSeenFromNowHours >= 24) {
            const { error: updateError } = await supabase.from('user')
                .update({
                    last_seen: lastSeen.toISOString(),
                    last_updated: lastSeen.toISOString(),
                    login_streak: 1
                })
                .eq('id', user.id);

            if (updateError) {
                console.error("Error updating user:", updateError.message);
            }
        }
        else if (timeDifferenceHours >= 24) {
            const { error: updateError } = await supabase.from('user')
                .update({
                    last_seen: lastSeen.toISOString(),
                    last_updated: lastSeen.toISOString(),
                    login_streak: existingUser.login_streak + 1
                })
                .eq('id', user.id);

            if (updateError) {
                console.error("Error updating user:", updateError.message);
            }
        } else {
            const { error: updateError } = await supabase.from('user')
                .update({ last_seen: lastSeen.toISOString() })
                .eq('id', user.id);

            if (updateError) {
                console.error("Error updating user:", updateError.message);
            }
        }
    }
}

export async function getUserData(user_id?: string) {
    const supabase = createClient();

    const { data, error } = await supabase.from("user").select("*")
        .eq("id", user_id).single()

    if (error) {
        console.error("Error creating user:", error.message);
    }

    if (!data) return

    return data
}

export async function updateUser(data: User) {
    const supabase = createClient();

    const user_id = await getUserId();
    const { error: updateError } = await supabase.from('user').update(data).eq('id', user_id)

    if (updateError) {
        throw new Error("error updating user");
    }
}

export const getAvatarUrl = async (avatar: string) => {
    if (!avatar) return ""

    const supabase = createClient();

    const { data } = supabase
        .storage
        .from('avatars')
        .getPublicUrl(avatar)


    if (!data) return
    return data.publicUrl
}

export const getUser = async (user_id?: string) => {
    const userData = await getUserData(user_id);
    let avatar = "/default.png";
    if (userData.avatar_url)
        avatar = await getAvatarUrl(userData.avatar_url) ?? "/default.png";

    return {
        username: userData.username,
        avatar_url: avatar,
    }
}