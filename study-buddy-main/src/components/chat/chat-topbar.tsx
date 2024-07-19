import React, { useState } from 'react';
import { EllipsisVertical } from "lucide-react";
import { Course } from '@/lib/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { unenrollCourse } from '@/utils/db/courses';
import { mutate } from 'swr';
import { toast } from 'react-hot-toast';

interface ChatTopbarProps {
  selectedCourse: Course;
}

export default function ChatTopbar({ selectedCourse }: ChatTopbarProps) {
  const [isLoading, setIsLoading] = useState(false);

  const clickHandler = async () => {
    setIsLoading(true);
    try {
      await unenrollCourse(selectedCourse.id);
      await mutate('enrolledCourses');
      toast.success('Course left successfully');
    } catch (error) {
      toast.error('Failed to leave the course');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full h-20 flex p-4 justify-between items-center border-b shadow-md rounded-md">
      <span className="font-medium">{selectedCourse.name}</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <EllipsisVertical size={24} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={clickHandler} disabled={isLoading}>
            {isLoading ? 'Leaving...' : 'Leave'}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
