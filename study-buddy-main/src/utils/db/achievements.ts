'use server'
import { Achievement } from "@/lib/types";
import { createClient } from '../supabase/server';
import { getFromDatabase } from "./tasks";
import getUserId, { getUserData } from "./user";

export const getAchievementsWithUserProgress = async () => {
    const supabase = createClient();
    const user = await supabase.auth.getUser();
    const user_id = user.data.user?.id;

    const { data, error } = await supabase
        .from('achievements')
        .select(`
        id,
        name,
        description,
        type, 
        max_value,
        userachievements (id, achieved, progress)
      `)
        .eq('userachievements.user_id', user_id);

    if (error) {
        console.error('Error fetching achievements with user progress:', error);
        return [];
    }

    if (!data) {
        return [];
    }

    const achievements: Achievement[] = data.map((achievement: any) => {
        const userAchievement = achievement.userachievements[0];

        return {
            id: achievement.id,
            name: achievement.name,
            description: achievement.description,
            achieved: userAchievement ? userAchievement.achieved : false,
            percentage: userAchievement ? userAchievement.progress : 0,
            type: achievement.type,
            max_value: achievement.max_value,
            uuid: userAchievement?.id
        };
    });

    return achievements;
};


export const updateUserAchievement = async () => {
    const tasks = await getFromDatabase();
    const completedTasks = tasks.filter((task) => task.type === 'completed').length;;
    const createdTasks = tasks.length;
    const achievements = await getAchievementsWithUserProgress();
    const supabase = createClient();
    const user_id =  await getUserId();
    const userData = await getUserData(user_id)

    if (!user_id) {
        return;
    }

    for (const achievement of achievements) {
        if (achievement.type === "completion") {
            achievement.achieved = completedTasks >= achievement.max_value;
            achievement.percentage = Math.min(Math.round((completedTasks / achievement.max_value) * 100 * 10) / 10, 100);
        }
        else if (achievement.type === "create") {
            achievement.achieved = createdTasks >= achievement.max_value;
            achievement.percentage = Math.min(Math.round((tasks.length / achievement.max_value) * 100 * 10) / 10, 100);
        }
        else if (achievement.type === "login" && userData.userStreak) {
            achievement.achieved = userData.userStreak >= achievement.max_value;
            achievement.percentage = Math.min(Math.round((userData.userStreak / achievement.max_value) * 100 * 10) / 10, 100);
        }

        if (achievement.uuid) {
            const { error } = await supabase
                .from('userachievements')
                .update({
                    achieved: achievement.achieved,
                    progress: achievement.percentage,
                })
                .eq("id", achievement.uuid)

            if (error) {
                console.error('Error updating user achievements:', error);
            }
        }

        else {
            const { error } = await supabase
                .from('userachievements')
                .insert({
                    achieved: achievement.achieved,
                    progress: achievement.percentage,
                    user_id: user_id,
                    achievement_id: achievement.id
                })
                .match({ user_id: user_id, achievement_id: achievement.id });

            if (error) {
                console.error('Error inserting user achievements:', error);
            }
        }

    }
}