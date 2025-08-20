import Image from "next/image"


function ListingContent() {
    return (
        <div className="w-full px-25 pt-6 space-y-15">
            <div className="rounded-xl bg-[#392E34] p-5 pb-0 border border-gray-600">
                <div className="font-bold tracking-wide text-xl">
                    {`This Week's Top Projects`}
                </div>
                <div className="divide-y-[0.1px] divide-gray-600">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <div key={i + 1} className="group relative flex flex-row items-start gap-4 rounded-xl p-4 transition-all duration-300 cursor-pointer hover:bg-white/5">
                            <div className="w-[48px] h-[48px] rounded-2xl">
                                <Image src='/logo.svg' alt="project-funding" width={30} height={30} className="w-[38px] h-[38px]" />
                            </div>
                            <div className="flex flex-1 flex-col">
                                <div className="text-base font-semibold text-white flex items-center transition-all group-hover:text-[#FF8162]">
                                    Project Name
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square-arrow-out-up-right-icon lucide-square-arrow-out-up-right ml-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100"><path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"/><path d="m21 3-9 9"/><path d="M15 3h6v6"/></svg>
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    Short description of the project goes here.
                                </div>
                                <div className="mt-2 flex flex-row flex-wrap items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-tags-icon lucide-tags"><path d="M13.172 2a2 2 0 0 1 1.414.586l6.71 6.71a2.4 2.4 0 0 1 0 3.408l-4.592 4.592a2.4 2.4 0 0 1-3.408 0l-6.71-6.71A2 2 0 0 1 6 9.172V3a1 1 0 0 1 1-1z"/><path d="M2 7v6.172a2 2 0 0 0 .586 1.414l6.71 6.71a2.4 2.4 0 0 0 3.191.193"/><circle cx="10.5" cy="6.5" r=".5" fill="currentColor"/></svg>
                                    <div className="text-xs px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-700 hover:underline">
                                        Productivity
                                    </div>
                                    <div className="text-xs px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-700 hover:underline">
                                        SaaS
                                    </div>
                                    <div className="text-xs px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-700 hover:underline">
                                        AI
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="relative group/icon flex flex-col items-center justify-center w-12 h-12 rounded-xl border-2 border-gray-600 hover:border-[#FF8162] transition">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-indian-rupee-icon lucide-indian-rupee"><path d="M6 3h12"/><path d="M6 8h12"/><path d="m6 13 8.5 8"/><path d="M6 13h3"/><path d="M9 13c6.667 0 6.667-10 0-10"/></svg>
                                    <span className="absolute top-[120%] whitespace-nowrap text-xs text-white bg-gray-800 px-2 py-1 rounded-md opacity-0 group-hover/icon:opacity-100 transition">
                                        Fund this project
                                    </span>
                                </div>
                                <div className="relative group/icon flex flex-col items-center justify-center w-12 h-12 rounded-xl border-2 border-gray-600 hover:border-[#FF8162] transition">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle-icon lucide-message-circle"><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/></svg>
                                    <span className="absolute top-[120%] whitespace-nowrap text-xs text-white bg-gray-800 px-2 py-1 rounded-md opacity-0 group-hover/icon:opacity-100 transition">
                                        Chat with developer
                                    </span>
                                </div>
                                <div className="relative group/icon flex flex-col items-center justify-center w-12 h-12 rounded-xl border-2 border-gray-600 hover:border-[#FF8162] transition">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-thumbs-up-icon lucide-thumbs-up"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/></svg>
                                    <span className="absolute top-[120%] whitespace-nowrap text-xs text-white bg-gray-800 px-2 py-1 rounded-md opacity-0 group-hover/icon:opacity-100 transition">
                                        Feedback
                                    </span>
                                </div>
                                <div className="relative group/icon flex flex-col items-center justify-center w-12 h-12 rounded-xl border-2 border-gray-600 hover:border-[#FF8162] transition">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-copy-icon lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                                    <span className="absolute top-[120%] whitespace-nowrap text-xs text-white bg-gray-800 px-2 py-1 rounded-md opacity-0 group-hover/icon:opacity-100 transition">
                                        Favorite project 
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="rounded-xl bg-[#392E34] p-5 border border-gray-600">
                <div className="font-bold tracking-wide text-xl">
                    Explore Projects
                </div>
            </div>
        </div>
    )
}

export default ListingContent