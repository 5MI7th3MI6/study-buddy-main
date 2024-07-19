'use client'
import React, { useEffect, useState } from 'react';
import {
    LockIcon as FaLock,
    UnlockIcon as FaUnlock,
    MedalIcon as FaMedal,
} from "lucide-react"
import { Progress } from './ui/progress';
import { Achievement } from '@/lib/types';

const Achievements = ({ achievements }: { achievements: Achievement[] }) => {
    const [progressBarValue, setProgressBarValue] = useState(0);

    useEffect(() => {
        const totalAchievements = achievements.length;
        const unlockedAchievements = achievements.filter(achievement => achievement.achieved).length;
        const percentage = (unlockedAchievements / totalAchievements) * 100;
        setProgressBarValue(percentage);
    }, [achievements]);

    return (
        <>
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                <div className="mb-4 md:mb-0">
                    <h1 className="text-2xl font-bold">Your Achievements</h1>
                    <p className="text-primary">Track your progress and unlock achievements</p>
                </div>
                <div className="w-full md:w-1/2">
                    <Progress value={progressBarValue} />
                </div>
            </div>
            <ul>
                {achievements.map(achievement => (
                    <li key={achievement.id} className={`flex items-center justify-between p-4 mb-2 rounded shadow-md w-full ${achievement.achieved ? '' : 'bg-muted'}`}>
                        <div className={`flex items-center mb-4 md:mb-0 ${achievement.achieved ? '' : 'opacity-50'}`}>
                            <FaMedal className={`w-12 h-12 mr-4 ${achievement.achieved ? 'text-yellow-500' : 'text-gray-400 dark:text-gray-600'}`} />

                            <div>
                                <h2 className={`text-lg font-semibold ${achievement.achieved ? 'text-foreground' : 'text-gray-500'}`}>{achievement.name}</h2>
                                <p className={`${achievement.achieved ? 'text-primary' : 'text-gray-500'}`}>{achievement.description}</p>
                            </div >
                        </div >
                        <div className="flex items-center">
                            <span className={`mr-4 ${achievement.achieved ? 'text-primary' : 'text-gray-500'}`}>{achievement.percentage}%</span>
                            <button className="text-2xl">
                                {achievement.achieved ? <FaUnlock className="text-green-500" /> : <FaLock className="text-red-500" />}
                            </button>
                        </div >
                    </li >
                ))}
            </ul >
        </>
    );
};

export default Achievements;
