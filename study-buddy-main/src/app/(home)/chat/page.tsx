'use server'
import { ChatLayout } from "@/components/chat/chat-layout";
import { getEnrolledCourses, getCourseMessages } from "@/utils/db/courses";

export default async function page() {

  const data = await getEnrolledCourses();
  const messages = await getCourseMessages(data);

  return (
    <div className='flex-grow overflow-auto'>
      <ChatLayout defaultLayout={[320, 480]} navCollapsedSize={8} initialCourses={data} initialMessages={messages} />
    </div>

  )
}
