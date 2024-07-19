'use client'
import { Settings } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu"
import ToggleThemeButton from "./ToggleThemeButton"
import LogoutButton from "./LogoutButton"
import EditProfile from "./EditProfile"
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { User } from "@/lib/types"

export default function SettingsDropdown({ user }: { user: User }) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>

            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Settings
                        size={24}
                    // className='cursor-pointer transform transition-transform duration-1000 focus:rotate-90'
                    />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Settings</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <ToggleThemeButton />
                    <DropdownMenuItem onSelect={() => setOpen(true)}>
                        Edit Profile
                    </DropdownMenuItem>
                    <LogoutButton />
                </ DropdownMenuContent>
            </DropdownMenu >
            <DialogContent className="sm:max-w-[500px] bg-muted">
                <EditProfile setOpen={setOpen} user={user} />
            </DialogContent>
        </ Dialog >

    )
}
