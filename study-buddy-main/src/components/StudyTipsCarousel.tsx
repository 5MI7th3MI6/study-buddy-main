'use client'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { MoveRight } from "lucide-react";

const VIDEOS_URL = [
    "https://www.youtube.com/embed/Rvey9g0VgY0?si=ZzFSzghr1rROwlnp",
    "https://www.youtube.com/embed/DdNAUJWJN08?si=kKC34JAq4M9CIgyB",
    "https://www.youtube.com/embed/TjPFZaMe2yw?si=-3LNAwmegWu1SSnq",
    "https://www.youtube.com/embed/76yqErAib5g?si=Rn0xKMXMrom0aDNR",
    "https://www.youtube.com/embed/Rvey9g0VgY0?si=43YmrxJ0E9fDXoj1"
]

const StudyTipsCarousel = () => {
    return (
        <div className="flex flex-col pt-3 md:px-4 gap-4 basis-5/12 shadow-md border-4 items-center justify-center">
            <div className="text-2xl ml-3 md:ml-0 text-accent-foreground flex gap-5 self-start">
                Study tips
                <MoveRight size={32} />
            </div>
            <div className='flex justify-center items-center mb-10 w-3/4'>
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    className="w-full max-w-sm md:max-w-2xl lg:max-w-4xl 2xl:max-w-7xl h-52"
                >
                    <CarouselContent >
                        {VIDEOS_URL.map((URL, index) => (
                            <CarouselItem key={index} className="basis-full md:basis-1/2 flex items-center justify-center">
                                <iframe
                                    height={200}
                                    width="80%"
                                    src={URL}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen>
                                </iframe>
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

export default StudyTipsCarousel;
