"use client"

import { useRouter } from "next/navigation";


function Back() {
    const router = useRouter();

  return (
    <div className='w-fit'>
        <div className='flex rounded-3xl bg-zinc-600 hover:bg-zinc-700 ml-8 mt-8 px-4 py-2 cursor-pointer' onClick={() => router.back()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left-icon lucide-arrow-left text-white"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
            <div className="text-white pl-2 pr-1">Back</div>
        </div>
    </div>
  )
}

export default Back