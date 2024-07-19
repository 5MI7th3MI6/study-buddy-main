'use server'
import Achievements from "@/components/AcheivementsContent"
import { getAchievementsWithUserProgress } from '@/utils/db/achievements';

export default async function AchievementsContent() {
    const data = await getAchievementsWithUserProgress()

    return (

        <div className="p-4 bg-background text-foreground w-full overflow-y-auto">
            <Achievements achievements={data} />
        </div>
    )
}
