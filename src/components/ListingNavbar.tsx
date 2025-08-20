"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

function ListingNavbar() {
    const [openProfile, setOpenProfile] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpenProfile(false);
            }
        }

        if (openProfile) {
            document.addEventListener("click", handleClickOutside);
            document.addEventListener("touchstart", handleClickOutside);
        }

        return () => {
            document.removeEventListener("click", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, [openProfile]);

    return (
        <div className="fixed w-full h-fit z-50 p-4 bg-[#2C2125]/40 backdrop-blur-md border-b border-gray-600">
            <div className="flex items-center justify-between gap-4">

                <div className="flex items-center w-[50px] h-[50px] flex-none shrink-0">
                    <div className="bg-[#FF8162] rounded-xl p-3 cursor-pointer w-[50px] h-[50px] flex items-center justify-center shrink-0">
                        <Image src='/logo.svg' alt="project-funding" width={30} height={30} className="w-[30px] h-[30px] object-contain" />
                    </div>
                </div>

                <div className="flex items-center gap-6 flex-1 justify-center min-w-0">
                    <div className="flex items-center gap-3 border-white border-[1.5px] rounded-lg p-2 min-w-0 max-w-[140px] sm:max-w-xs md:max-w-xs">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search-icon lucide-search text-white ml-2"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>
                        <input type="text" placeholder="Search" className="placeholder-white focus:outline-none w-full sm:w-auto" />
                    </div>
                    <div className="flex items-center gap-4 hover:bg-white/30 rounded-xl px-7 py-2 w-fit cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sliders-horizontal-icon lucide-sliders-horizontal"><line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/></svg>
                        <div className="font-medium tracking-wider text-white text-lg">Filter</div>
                    </div>
                </div>

                <div ref={menuRef} className="relative flex items-center justify-end flex-none shrink-0">
                    <div onClick={() => setOpenProfile(true)} className="group flex gap-4 items-center hover:bg-[#FEB57F] hover:text-black cursor-pointer rounded-4xl px-2 py-1.5">
                        <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
                        <div className="text-white font-medium group-hover:text-black">Ashish Jha
                            <div className="text-slate-300 font-normal text-sm group-hover:text-black">ashishxyzjha@gmail.com</div>
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down-icon lucide-chevron-down hover:text-black"><path d="m6 9 6 6 6-6"/></svg>
                        </div>
                    </div>

                    {openProfile && (
                        <div className="absolute top-full w-80 p-4">
                            {/* First Part */}
                            <div className="bg-[#D69B6F] flex flex-col gap-3 p-4 rounded-t-lg">
                                <div className="flex items-center gap-3">
                                    <div className="relative flex shrink-0 overflow-hidden rounded-full size-12 ring-1 ring-black/10">
                                        <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-600 text-white font-semibold">
                                            A
                                        </div>
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-1.5">
                                            <p className="font-medium text-base truncate text-black tracking-wide text-lg">Ashish Jha</p>
                                        </div>
                                        <p className="text-xs text-black/80 truncate tracking-wide">ashishxyzjha@gmail.com</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 w-fit px-3 py-[0.95] rounded-md bg-[#4E3834]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-badge-check-icon lucide-badge-check"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/></svg>
                                    <div className="text-white tracking-wider">verified</div>
                                </div>
                            </div>

                            {/* Second Part */}
                            <div className="bg-[#3A2F35] p-2 space-y-1 w-full rounded-b-lg border border-t-0 border-gray-600">
                                <div className="flex items-center text-slate-200 gap-2 cursor-pointer px-3 py-2 rounded-md hover:bg-[#FEB57F] hover:text-black text-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-round-icon lucide-user-round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>
                                    <span className="tracking-wide">Profile</span>
                                </div>

                                <div className="flex items-center text-slate-200 gap-2 cursor-pointer px-3 py-2 rounded-md hover:bg-[#FEB57F] hover:text-black text-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list-icon lucide-list"><path d="M3 12h.01"/><path d="M3 18h.01"/><path d="M3 6h.01"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M8 6h13"/></svg>
                                    <span className="tracking-wide">My Listing</span>
                                </div>
                                
                                <div className="flex items-center text-slate-200 gap-2 cursor-pointer px-3 py-2 rounded-md hover:bg-[#FEB57F] hover:text-black text-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-copy-icon lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                                    <span className="tracking-wide">Favorite Project</span>
                                </div>
                                
                                <div className="flex items-center text-slate-200 gap-2 cursor-pointer px-3 py-2 rounded-md hover:bg-[#FEB57F] hover:text-black text-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lightbulb-icon lucide-lightbulb"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
                                    <span className="tracking-wide">Help & Support</span>
                                </div>
                                
                                <div className="flex items-center text-slate-200 gap-2 cursor-pointer px-3 py-2 rounded-md hover:bg-[#FEB57F] hover:text-black text-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-share2-icon lucide-share-2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>
                                    <span className="tracking-wide">Refer Friends</span>
                                </div>

                                <div className="border-t border-gray-600">
                                    <div className="flex items-center gap-2 cursor-pointer px-3 py-2 mt-1 rounded-md hover:bg-[#492B31] text-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out-icon lucide-log-out text-slate-200"><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/></svg>
                                        <span className="text-[#E75C60] tracking-wide">Log out</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ListingNavbar
