'use client'
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import RenderTask from "@/components/RenderTask";
import { MoveRight } from "lucide-react";
import { useTaskStoreContext } from "@/app/(home)/task-store-provider";

const CalendarCarousel = () => {
    const tasks = useTaskStoreContext((state) => state.tasks);

    return (
        <div className="flex flex-col pt-5 md:px-4 gap-4 basis-5/12 border-4 items-center justify-center ">
            <div className="text-2xl ml-3 md:ml-0 text-accent-foreground flex gap-5 self-start">
                Calendar
                <MoveRight size={32} />
            </div>
            <div className='flex justify-center items-center mb-10 w-3/4'>
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    className="w-full max-w-sm md:max-w-2xl lg:max-w-4xl 2xl:max-w-7xl"
                >
                    <CarouselContent>
                        {tasks.map((task, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/3 2xl:basis-1/4">
                                <div className="p-1">
                                    <Card>
                                        <CardContent className="flex flex-col p-3 bg-white dark:bg-muted gap-1">

                                            <RenderTask task={task} />

                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </div>
    );
}

export default CalendarCarousel;
