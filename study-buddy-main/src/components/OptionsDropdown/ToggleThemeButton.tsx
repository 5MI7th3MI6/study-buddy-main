import React from 'react'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Switch } from '@/components/ui/switch'
import { useTheme } from 'next-themes'

export default function ToggleThemeButton() {
    const { theme, setTheme } = useTheme()
    const changeTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    const handleItemClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        e.stopPropagation();
    };


    return (
        <DropdownMenuItem className="flex justify-between" onClick={handleItemClick}>
            <label htmlFor="dark-mode">Dark Mode</label>
            <Switch id="dark-mode" checked={theme === 'dark'} onCheckedChange={changeTheme} />
        </DropdownMenuItem>
    )
}
