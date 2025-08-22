"use client"

import { useRouter } from "next/navigation";


function UploadProject() {
    const router = useRouter();

  return (
    <div className='w-fit'>
        <div className='flex rounded-lg bg-zinc-600 hover:bg-zinc-700 ml-8 mt-8 px-4 py-2 cursor-pointer' onClick={() => router.back()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-upload-icon lucide-upload text-white"><path d="M12 3v12"/><path d="m17 8-5-5-5 5"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/></svg>
            <div className="text-white pl-2 pr-1">Upload Project</div>
        </div>
    </div>
  )
}

export default UploadProject