"use client"

import { useState } from "react"

function ListingContent() {
    const projects = Array.from({ length: 10 }).map((_, i) => ({
        id: i + 1,
        name: `Project ${i + 1}`,
        description: "Short description of the project goes here.",
        funds: 0,
        feedback: 0,
        likes: 0,
        liked: false,
        favorited: false,
    }));

    const [projectData, setProjectData] = useState(projects)

    const handleFund = (id: number) => {
        setProjectData(prev =>
            prev.map(p =>
                p.id === id ? { ...p, funds: p.funds + 100 } : p // example +100 fund
            )
        )
    }

    const handlefeedback = (id: number) => {
        setProjectData(prev =>
            prev.map(p =>
                p.id === id ? { ...p, comments: p.feedback + 1 } : p
            )
        )
    }

    const handleFavorite = (id: number) => {
        setProjectData(prev =>
            prev.map(p =>
                p.id === id ? { ...p, favorited: !p.favorited } : p
            )
        )
    }


    const handleLike = (id: number) => {
        setProjectData(prev =>
            prev.map(p =>
                p.id === id
                    ? {
                          ...p,
                          liked: !p.liked,
                          likes: p.liked ? p.likes - 1 : p.likes + 1,
                      }
                    : p
            )
        )
    }

    return (
        <div className="w-full px-25 pt-6 space-y-15">
            <div className="rounded-xl bg-[#392E34] p-5 pb-0 border border-gray-600">
                <div className="font-bold tracking-wide text-xl">
                    {`This Week's Top Projects`}
                </div>
                <div className="divide-y-[0.1px] divide-gray-600">
                    {projectData.map((project) => (
                        <div key={project.id} className="group relative flex flex-row items-start gap-4 rounded-xl p-4 transition-all duration-300 cursor-pointer hover:bg-white/5">
                            <div className="w-[48px] h-[48px] rounded-xl bg-gray-600">
                                {/* Logo Here */}
                            </div>
                            <div className="flex flex-1 flex-col">
                                <a href="https://reportpiracy.vercel.app" target="_blank" rel="noopener noreferrer" className="text-base font-semibold text-white flex items-center transition-all group-hover:text-[#FF8162]">
                                    Project Name
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square-arrow-out-up-right-icon lucide-square-arrow-out-up-right ml-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100"><path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"/><path d="m21 3-9 9"/><path d="M15 3h6v6"/></svg>
                                </a>
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
                                <div>
                                    <div onClick={() => handleFund(project.id)} className="relative group/icon flex flex-col items-center justify-center w-12 h-12 rounded-xl border-2 border-gray-600 hover:border-[#FF8162] transition">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-indian-rupee-icon lucide-indian-rupee"><path d="M6 3h12"/><path d="M6 8h12"/><path d="m6 13 8.5 8"/><path d="M6 13h3"/><path d="M9 13c6.667 0 6.667-10 0-10"/></svg>
                                        <span className="absolute bottom-[120%] whitespace-nowrap text-xs font-bold text-black bg-[#D69B6F] px-2 py-1 rounded-md opacity-0 group-hover/icon:opacity-100 transition">
                                            Fund this project
                                        </span>
                                    </div>
                                    <span className="text-xs mt-2 p-1 rounded-sm border border-gray-600 bg-gray-800 text-white flex justify-center">₹ {project.funds}</span>
                                </div>
                                <div>
                                <div className="relative group/icon flex flex-col items-center justify-center w-12 h-12 rounded-xl border-2 border-gray-600 hover:border-[#FF8162] transition">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-messages-square-icon lucide-messages-square"><path d="M16 10a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 14.286V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/><path d="M20 9a2 2 0 0 1 2 2v10.286a.71.71 0 0 1-1.212.502l-2.202-2.202A2 2 0 0 0 17.172 19H10a2 2 0 0 1-2-2v-1"/></svg>
                                    <span className="absolute bottom-[120%] whitespace-nowrap text-xs font-bold text-black bg-[#D69B6F] px-2 py-1 rounded-md opacity-0 group-hover/icon:opacity-100 transition">
                                        Chat with developer 
                                    </span>
                                </div>
                                <div className="h-8 flex justify-center"></div>
                                </div>
                                <div>
                                    <div onClick={() => handleLike(project.id)} className={`relative group/icon flex flex-col items-center justify-center w-12 h-12 rounded-xl border-2 border-gray-600 hover:border-[#FF8162] transition ${project.liked ? "text-[#FEB57F]" : ""}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-thumbs-up-icon lucide-thumbs-up"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/></svg>
                                        <span className="absolute bottom-[120%] whitespace-nowrap text-xs font-bold text-black bg-[#D69B6F] px-2 py-1 rounded-md opacity-0 group-hover/icon:opacity-100 transition">
                                            Like this project
                                        </span>
                                    </div>
                                    <span className="text-xs mt-2 p-1 rounded-sm border border-gray-600 bg-gray-800 text-white flex justify-center">{project.likes}</span>
                                </div>
                                <div>
                                <div onClick={() => handleFavorite(project.id)} className={`relative group/icon flex flex-col items-center justify-center w-12 h-12 rounded-xl border-2 border-gray-600 hover:border-[#FF8162] transition ${project.favorited ? "text-[#FEB57F]" : ""}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bookmark-plus-icon lucide-bookmark-plus"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/><line x1="12" x2="12" y1="7" y2="13"/><line x1="15" x2="9" y1="10" y2="10"/></svg>
                                    <span className="absolute bottom-[120%] whitespace-nowrap text-xs font-bold text-black bg-[#D69B6F] px-2 py-1 rounded-md opacity-0 group-hover/icon:opacity-100 transition">
                                        Favorite project 
                                    </span>
                                </div>
                                <div className="h-8 flex justify-center"></div>
                                </div>
                                <div>
                                    <div onClick={() => handlefeedback(project.id)} className="relative group/icon flex flex-col items-center justify-center w-12 h-12 rounded-xl border-2 border-gray-600 hover:border-[#FF8162] transition">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle-icon lucide-message-circle"><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/></svg>
                                        <span className="absolute bottom-[120%] whitespace-nowrap text-xs font-bold text-black bg-[#D69B6F] px-2 py-1 rounded-md opacity-0 group-hover/icon:opacity-100 transition">
                                            Feedback to this project
                                        </span>
                                    </div>
                                    <span className="text-xs mt-2 p-1 rounded-sm border border-gray-600 bg-gray-800 text-white flex justify-center">{project.feedback}</span>
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
                <div className="divide-y-[0.1px] divide-gray-600">
                    {projectData.map((project) => (
                        <div key={project.id} className="group relative flex flex-row items-start gap-4 rounded-xl p-4 transition-all duration-300 cursor-pointer hover:bg-white/5">
                            <div className="w-[48px] h-[48px] rounded-xl bg-gray-600">
                                {/* Logo Here */}
                            </div>
                            <div className="flex flex-1 flex-col">
                                <a href="https://reportpiracy.vercel.app" target="_blank" rel="noopener noreferrer" className="text-base font-semibold text-white flex items-center transition-all group-hover:text-[#FF8162]">
                                    Project Name
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square-arrow-out-up-right-icon lucide-square-arrow-out-up-right ml-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100"><path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"/><path d="m21 3-9 9"/><path d="M15 3h6v6"/></svg>
                                </a>
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
                                <div>
                                    <div onClick={() => handleFund(project.id)} className="relative group/icon flex flex-col items-center justify-center w-12 h-12 rounded-xl border-2 border-gray-600 hover:border-[#FF8162] transition">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-indian-rupee-icon lucide-indian-rupee"><path d="M6 3h12"/><path d="M6 8h12"/><path d="m6 13 8.5 8"/><path d="M6 13h3"/><path d="M9 13c6.667 0 6.667-10 0-10"/></svg>
                                        <span className="absolute bottom-[120%] whitespace-nowrap text-xs font-bold text-black bg-[#D69B6F] px-2 py-1 rounded-md opacity-0 group-hover/icon:opacity-100 transition">
                                            Fund this project
                                        </span>
                                    </div>
                                    <span className="text-xs mt-2 p-1 rounded-sm border border-gray-600 bg-gray-800 text-white flex justify-center">₹ {project.funds}</span>
                                </div>
                                <div>
                                <div className="relative group/icon flex flex-col items-center justify-center w-12 h-12 rounded-xl border-2 border-gray-600 hover:border-[#FF8162] transition">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-messages-square-icon lucide-messages-square"><path d="M16 10a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 14.286V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/><path d="M20 9a2 2 0 0 1 2 2v10.286a.71.71 0 0 1-1.212.502l-2.202-2.202A2 2 0 0 0 17.172 19H10a2 2 0 0 1-2-2v-1"/></svg>
                                    <span className="absolute bottom-[120%] whitespace-nowrap text-xs font-bold text-black bg-[#D69B6F] px-2 py-1 rounded-md opacity-0 group-hover/icon:opacity-100 transition">
                                        Chat with developer 
                                    </span>
                                </div>
                                <div className="h-8 flex justify-center"></div>
                                </div>
                                <div>
                                    <div onClick={() => handleLike(project.id)} className={`relative group/icon flex flex-col items-center justify-center w-12 h-12 rounded-xl border-2 border-gray-600 hover:border-[#FF8162] transition ${project.liked ? "text-[#FEB57F]" : ""}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-thumbs-up-icon lucide-thumbs-up"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/></svg>
                                        <span className="absolute bottom-[120%] whitespace-nowrap text-xs font-bold text-black bg-[#D69B6F] px-2 py-1 rounded-md opacity-0 group-hover/icon:opacity-100 transition">
                                            Like this project
                                        </span>
                                    </div>
                                    <span className="text-xs mt-2 p-1 rounded-sm border border-gray-600 bg-gray-800 text-white flex justify-center">{project.likes}</span>
                                </div>
                                <div>
                                <div onClick={() => handleFavorite(project.id)} className={`relative group/icon flex flex-col items-center justify-center w-12 h-12 rounded-xl border-2 border-gray-600 hover:border-[#FF8162] transition ${project.favorited ? "text-[#FEB57F]" : ""}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-copy-icon lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                                    <span className="absolute bottom-[120%] whitespace-nowrap text-xs font-bold text-black bg-[#D69B6F] px-2 py-1 rounded-md opacity-0 group-hover/icon:opacity-100 transition">
                                        Favorite project 
                                    </span>
                                </div>
                                <div className="h-8 flex justify-center"></div>
                                </div>
                                <div>
                                    <div onClick={() => handlefeedback(project.id)} className="relative group/icon flex flex-col items-center justify-center w-12 h-12 rounded-xl border-2 border-gray-600 hover:border-[#FF8162] transition">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle-icon lucide-message-circle"><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/></svg>
                                        <span className="absolute bottom-[120%] whitespace-nowrap text-xs font-bold text-black bg-[#D69B6F] px-2 py-1 rounded-md opacity-0 group-hover/icon:opacity-100 transition">
                                            Feedback to this project
                                        </span>
                                    </div>
                                    <span className="text-xs mt-2 p-1 rounded-sm border border-gray-600 bg-gray-800 text-white flex justify-center">{project.feedback}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ListingContent