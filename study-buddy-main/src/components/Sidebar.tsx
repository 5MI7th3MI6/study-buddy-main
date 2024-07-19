'use client';
import React, { useState } from 'react';
import { Menu, Home, Users, Calendar, Award, Notebook } from 'lucide-react';
import MenuItem from './MenuItem';
import { Avatar, AvatarImage } from './ui/avatar';
import { useUserData } from '@/app/(home)/user-data-store';

export default function Sidebar() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isToggled, setIsToggled] = useState(false);
    const { username, avatar_url } = useUserData();

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
        setIsToggled(!isToggled);
    };

    const handleMouseEnter = () => {
        if (!isToggled)
            setIsExpanded(true);
    };

    const handleMouseLeave = () => {
        if (!isToggled)
            setIsExpanded(false);
    };

    return (
        <>
            <div className={`py-10 px-3 h-screen flex flex-col transition-width duration-300 ${isExpanded ? 'w-52' : 'w-16'} hidden md:flex`}>
                <div className="flex justify-between items-center">
                    <Menu size={32} className='cursor-pointer' onClick={toggleSidebar} />
                </div>
                <div className='flex-1 flex flex-col justify-center space-y-5' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <MenuItem icon={Home} label="Home" isExpanded={isExpanded} href="/home" />
                    <MenuItem icon={Users} label="Chat" isExpanded={isExpanded} href="/chat" />
                    <MenuItem icon={Notebook} label="Homework" isExpanded={isExpanded} href="/tasks" />
                    <MenuItem icon={Calendar} label="Calendar" isExpanded={isExpanded} href="/calendar" />
                    <MenuItem icon={Award} label="Achievements" isExpanded={isExpanded} href="/achievements" />
                </div>
                <div className='relative flex items-center' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <Avatar className='w-10 h-10' >
                        <AvatarImage src={avatar_url} alt="avatar" />
                    </Avatar>
                    <span className={`text-lg absolute left-12 transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>{username}</span>
                </div>
            </div>
            <BottomBar />
        </>
    );
}

function BottomBar() {
    return (
        <div className="fixed bottom-0 left-0 w-full h-16 bg-background text-foreground flex items-center justify-around shadow-md md:hidden">
            <MenuItem icon={Home} label="Home" isExpanded={false} href="/home" />
            <MenuItem icon={Users} label="Chat" isExpanded={false} href="/chat" />
            <MenuItem icon={Notebook} label="Homework Organizer" isExpanded={false} href="/tasks" />
            <MenuItem icon={Calendar} label="Calendar" isExpanded={false} href="/calendar" />
            <MenuItem icon={Award} label="Achievements" isExpanded={false} href="/achievements" />
        </div>
    );
}
