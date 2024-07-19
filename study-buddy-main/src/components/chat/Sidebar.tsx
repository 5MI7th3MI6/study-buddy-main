"use client";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from "@/components/ui/tooltip";
import AddCourse from "./AddCourse";

interface SidebarProps {
    isCollapsed: boolean;
    links: {
        name: string;
        messages: any[];
        variant: "default" | "ghost";
        id: string
    }[];
    // eslint-disable-next-line no-unused-vars
    clickHandler: (course_id: string) => void;
}

export function Sidebar({ links, isCollapsed, clickHandler }: SidebarProps) {

    return (
        <div
            data-collapsed={isCollapsed}
            className="relative group flex flex-col gap-4 p-2 data-[collapsed=true]:p-2 bg-background"
        >
            {!isCollapsed && (
                <div className="flex justify-between p-2 items-center">
                    <div className="flex gap-2 items-center text-2xl">
                        <p className="font-medium">Channels</p>
                        <span className="text-zinc-300">({links.length})</span>
                    </div>

                    <div>
                        <AddCourse />
                    </div>
                </div>
            )}
            <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
                {isCollapsed && <AddCourse />}
                {links.map((link, index) =>
                    isCollapsed ? (
                        <TooltipProvider key={index}>
                            <Tooltip key={index} delayDuration={0}>
                                <TooltipTrigger asChild>
                                    <Button
                                        onClick={() => clickHandler(link.id)}
                                        className={cn(
                                            buttonVariants({ variant: link.variant, size: "default" }),
                                            "shrink justify-start gap-4",
                                            link.variant === "ghost" && "bg-background text-foreground"
                                        )}
                                    >

                                        <span className="text-xs sr-only sm:not-sr-only">{link.name}</span>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent
                                    side="right"
                                    className="flex items-center gap-4"
                                >
                                    {link.name}
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    ) : (
                        <Button
                            key={index}
                            onClick={() => clickHandler(link.id)}
                            className={cn(
                                buttonVariants({ size: "xl", variant: link.variant }),
                                "shrink justify-start gap-4",
                                link.variant === "ghost" && "bg-background text-foreground"
                            )}
                        >
                            <div className="flex flex-col max-w-28 ">
                                <span>{link.name}</span>
                                {link.messages.length > 0 && (
                                    <span className="text-xs truncate self-start">
                                        {link.messages[link.messages.length - 1].message}
                                    </span>
                                )}
                            </div>
                        </Button>
                    )
                )}
            </nav>
        </div>
    );
}
