'use client'
import ChatTopbar from "./chat-topbar";
import { ChatList } from "./chat-list";
import React from "react";
import { Course, CourseMessages } from "@/lib/types";


interface ChatProps {
  messages: CourseMessages[];
  selectedCourse: Course;
}

export function Chat({ messages, selectedCourse }: ChatProps) {

  return (
    <div className="flex flex-col justify-between w-full md:h-full h-[90%]">
      <ChatTopbar selectedCourse={selectedCourse} />

      <ChatList
        messages={messages}
        selectedCourse={selectedCourse}
      />
    </div>
  );
}
