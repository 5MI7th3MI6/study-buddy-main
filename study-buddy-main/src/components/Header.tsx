'use server'
import React from 'react'
import { Bell } from 'lucide-react'
import Options from './OptionsDropdown/Options'
import { User } from '@/lib/types'


export default async function Header({user}: {user: User}) {

    return (
        <div className="relative flex items-center justify-end gap-5 p-3 xl:mr-8 2xl:mr-16">
            <Bell size={24} className='cursor-pointer text-black dark:text-white' />
            <Options user={user} />

        </div>

    )
}
