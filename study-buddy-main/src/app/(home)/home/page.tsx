import CalendarCarousel from "@/components/CalendarCarousel";
import StudyTipsCarousel from '@/components/StudyTipsCarousel';


export default async function Home() {

    return (
        <div className="flex flex-col h-full">
            <div className="text-2xl font-medium text-center px-4 basis-1/12 box-border">
                Welcome to study buddy
            </div>
            <CalendarCarousel />
            <StudyTipsCarousel />
        </div>
    );
}
