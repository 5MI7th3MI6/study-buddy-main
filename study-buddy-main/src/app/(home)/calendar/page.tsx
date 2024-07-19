'use server'
import Calendar from "@/components/Calendar"

export default async function Page() {


    return (
        <div className='flex-grow overflow-auto p-5 items-center justify-center'>
            <Calendar />
        </div>
    )
}