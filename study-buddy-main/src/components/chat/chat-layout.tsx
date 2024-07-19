"use client";

import React, { useEffect, useState } from "react";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import { Sidebar } from "./Sidebar";
import { Chat } from "./chat";
import { getEnrolledCourses } from "@/utils/db/courses";
import { Course, CourseMessages } from "@/lib/types";
import useSWR from "swr";
import useRealtimeMessages from "@/lib/hooks/useRealtimeData";
import { getCourseMessages } from "@/utils/db/courses";

interface ChatLayoutProps {
	defaultLayout: number[] | undefined;
	defaultCollapsed?: boolean;
	navCollapsedSize: number;
	initialCourses: Course[];
	initialMessages: CourseMessages[];
}

export function ChatLayout({
	defaultLayout = [320, 480],
	defaultCollapsed = false,
	navCollapsedSize,
	initialCourses,
	initialMessages,
}: ChatLayoutProps) {
	const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
	const [selectedCourse, setSelectedCourse] = useState(initialCourses[0]);
	const [isMobile, setIsMobile] = useState(false);
	const [courses, setCourses] = useState<Course[]>(initialCourses);
	const { messages, setMessages } = useRealtimeMessages(initialMessages);
	const { data } = useSWR<Course[]>("enrolledCourses", getEnrolledCourses);

	useEffect(() => {
		const checkScreenWidth = () => {
			setIsMobile(window.innerWidth <= 768);
		};


		checkScreenWidth();
		window.addEventListener("resize", checkScreenWidth);
		return () => {
			window.removeEventListener("resize", checkScreenWidth);
		};
	}, []);

	useEffect(() => {
		const updateData = async (data: Course[]) => {
			setCourses(data);
			setSelectedCourse(data[0]);
			const messages = await getCourseMessages(data);
			setMessages(messages);
		}

		if (data) {
			updateData(data);
		}
	}, [data]);


	const returnCourseMessages = (course: Course) => {
		return messages.find((msg) => msg.course_id === course.id)?.messages ?? [];
	}

	const handleSelectCourse = (course_id: string) => {
		courses.find((course) => {
			if (course.id === course_id) {
				setSelectedCourse(course);
			}
		});
	}

	return (
		<ResizablePanelGroup
			direction="horizontal"
			onLayout={(sizes: number[]) => {
				document.cookie = `react-resizable-panels:layout=${JSON.stringify(
					sizes
				)}`;
			}}
			className="h-full items-stretch"
		>
			<ResizablePanel
				defaultSize={defaultLayout[0]}
				collapsedSize={navCollapsedSize}
				collapsible={true}
				minSize={isMobile ? 0 : 24}
				maxSize={isMobile ? 8 : 30}
				onCollapse={() => {
					setIsCollapsed(true);
					document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
						true
					)}`;
				}}
				onExpand={() => {
					setIsCollapsed(false);
					document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
						false
					)}`;
				}}
				className={cn(
					isCollapsed && "min-w-[50px] md:min-w-[70px] transition-all duration-300 ease-in-out"
				)}
			>
				<Sidebar
					isCollapsed={isCollapsed || isMobile}
					links={courses.map((course) => ({
						name: course.name,
						messages: returnCourseMessages(course),
						variant: selectedCourse.name === course.name ? "default" : "ghost",
						id: course.id,
					}))}
					clickHandler={handleSelectCourse}
				/>
			</ResizablePanel>
			<ResizableHandle withHandle />
			<ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
				{selectedCourse && <Chat
					messages={messages ?? []}
					selectedCourse={selectedCourse}
				/>}
			</ResizablePanel>
		</ResizablePanelGroup>
	);
}
