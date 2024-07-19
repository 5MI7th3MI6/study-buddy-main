'use client';
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useCallback } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import ChatBottombar from "./chat-bottombar";
import { AnimatePresence, motion } from "framer-motion";
import { CourseMessages } from "@/lib/types";
import { Course } from "@/lib/types";
import { useUserData } from "@/app/(home)/user-data-store";

interface ChatListProps {
  messages: CourseMessages[];
  selectedCourse: Course;
}

export function ChatList({
  messages,
  selectedCourse,
}: ChatListProps) {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const { username, avatar_url } = useUserData();
  const [courseMessages, setCourseMessages] = React.useState<CourseMessages | null>(
    messages.find((msg) => msg.course_id === selectedCourse.id) || null
  );

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages, courseMessages]);

  useEffect(() => {
    setCourseMessages(
      messages.find((msg) => msg.course_id === selectedCourse.id) || null
    );
  }, [messages, selectedCourse]);

  const createMessage = useCallback((message: string): CourseMessages => {
    return {
      course_id: selectedCourse.id,
      messages: [
        {
          username: username,
          avatar_url: avatar_url ?? "/default.png",
          message: message,
        },
      ],
    };
  }, [selectedCourse.id, username, avatar_url]);

  const updateCourseMessages = useCallback((newMessage: string) => {
    const msg = createMessage(newMessage);
    setCourseMessages((prev) => {
      if (prev) {
        return {
          course_id: prev.course_id,
          messages: [...prev.messages, ...msg.messages],
        };
      } else {
        return msg;
      }
    });
  }, [createMessage]);


  return (
    <div className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col">
      <div
        ref={messagesContainerRef}
        className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col"
      >
        <AnimatePresence>
          {courseMessages?.messages.map((message, index) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
              transition={{
                opacity: { duration: 0.1 },
                layout: {
                  type: "spring",
                  bounce: 0.3,
                  duration: courseMessages.messages.length > 1 ? 0.5 : 0.3,
                },
              }}
              style={{
                originX: 0.5,
                originY: 0.5,
              }}
              className={cn(
                "flex flex-col gap-2 p-4 whitespace-pre-wrap",
              )}
            >
              <div className={`flex ${username === message.username ? 'flex-row-reverse' : ''} gap-3 items-center`}>
                {message.username !== selectedCourse.name && (
                  <Avatar className="flex justify-center items-center mt-4">
                    <AvatarImage
                      src={message.avatar_url ?? "/default.png"}
                      width={6}
                      height={6}
                    />
                  </Avatar>
                )}
                <div className="flex flex-col gap-1">
                  <div className="font-light text-xs tracking-wide italic">
                    {message.username}
                  </div>
                  <span className=" bg-accent p-3 rounded-md max-w-xs flex flex-col">
                    {message.message}
                  </span>
                </div>

                {message.username !== selectedCourse.name && (
                  <Avatar className="flex justify-center items-center">
                    <AvatarImage
                      width={6}
                      height={6}
                    />
                  </Avatar>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <ChatBottombar course_id={selectedCourse.id} updateCourseMessages={updateCourseMessages} />
    </div>
  );
}
