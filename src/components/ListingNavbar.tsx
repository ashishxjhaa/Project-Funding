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
        <div className="fixed w-full h-fit z-50 p-4 border-b border-gray-600">
            <div className="flex items-center justify-between gap-4">

                <div className="flex items-center w-[50px] h-[50px] flex-none shrink-0">
                    <div className="bg-[#FF8162] rounded-xl p-3 border-b cursor-pointer w-[50px] h-[50px] flex items-center justify-center shrink-0">
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
                        <div className="font-semibold text-white text-lg">Filter</div>
                    </div>
                </div>

                <div ref={menuRef} className="relative flex items-center justify-end flex-none shrink-0">
                    <div onClick={() => setOpenProfile(true)} className="group flex gap-4 items-center hover:bg-[#FEB57F] hover:text-black cursor-pointer rounded-4xl px-2 py-1.5">
                        <div className="w-10 h-10 bg-blue-500 rounded-full"></div>
                        <div className="text-slate-200 font-medium group-hover:text-black">Ashish Jha
                            <div className="text-slate-300 font-normal text-sm group-hover:text-black">ashishxyzjha@gmail.com</div>
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down-icon lucide-chevron-down hover:text-black"><path d="m6 9 6 6 6-6"/></svg>
                        </div>
                    </div>

                    {openProfile && (
                        <div className="absolute top-full right-2 mt-4 w-72 bg-[#FEB57F] shadow-lg rounded-xl p-4">
                            {/* First Part */}
                            <div className="bg-[#FEB57F] flex items-center gap-3 mb-3">
                                <div className="relative flex shrink-0 overflow-hidden rounded-full size-12 ring-1 ring-black/10">
                                    <div className="flex h-full w-full items-center justify-center rounded-full bg-white/40 text-black font-semibold">
                                        A
                                    </div>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1.5">
                                        <p className="font-medium text-base truncate text-black">Ashish Jha</p>
                                    </div>
                                    <p className="text-xs text-black/80 truncate">ashishxyzjha@gmail.com</p>
                                </div>
                            </div>

                            {/* Second Part */}
                            <div className="bg-[#3A2F35] p-2 space-y-1 w-full">
                                <div className="flex items-center gap-2 cursor-pointer px-3 py-2 rounded-md hover:bg-black/10 text-sm">
                                    <span>Profile</span>
                                </div>
                            
                                <div className="flex items-center gap-2 cursor-pointer px-3 py-2 rounded-md hover:bg-black/10 text-sm">
                                    <span>Sign out</span>
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
