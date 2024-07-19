"use server"
import React from 'react';
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { createClient } from '@/utils/supabase/server';
import { redirect } from "next/navigation";
import { TaskStoreProvider } from './task-store-provider';
import { getFromDatabase } from '@/utils/db/tasks';
import { Toaster } from 'react-hot-toast';
import getUserId, { getUser, updateStreak } from '@/utils/db/user';
import { UserDataProvider } from './user-data-store';

export default async function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }
    updateStreak(user);

    const tasks = await getFromDatabase();
    const user_id = await getUserId();
    const userData = await getUser(user_id)
    return (
        <div className="flex flex-col md:flex-row w-full h-screen box-border overflow-y-hidden">
            <Toaster />
            <TaskStoreProvider data={tasks}>
                <UserDataProvider data={userData}>
                    <Sidebar />
                    <div className='flex-grow md:p-5 bg-primary dark:bg-foreground h-full'>
                        <div className='md:rounded-lg shadow-md bg-background h-full flex flex-col p-5'>
                            <Header user={userData} />
                            {children}
                        </div>
                    </div>
                </UserDataProvider>
            </TaskStoreProvider>
        </div>
    );
}