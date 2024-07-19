import Image from "next/image";

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="w-full h-screen lg:grid lg:grid-cols-2 ">
            <div className="flex flex-col items-center justify-center py-12 h-full">
                <div className="p-5 grid gap-2 text-center items-center">
                    <h1 className="text-5xl font-bold text-primary">Study Buddy</h1>
                </div>
                <div className=" mx-auto grid w-[350px] gap-6">
                    {children}
                </div >
            </div >
            <div className="hidden bg-muted lg:block">
                <Image
                    src="/background.png"
                    alt="Image"
                    width="1920"
                    height="1080"
                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>

    );
}