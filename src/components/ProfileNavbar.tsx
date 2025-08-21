"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation";
import Image from "next/image"
import axios from "axios";
import { toast } from "react-hot-toast";

interface User {
  _id: string;
  fullName: string;
  email: string;
}

function ProfileNavbar() {
    const [openProfile, setOpenProfile] = useState(false)
    const [user, setUser] = useState<User | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const router = useRouter();

    const handleLogout = async () => {
        await axios.get("/api/logout");
        router.push("/");
        toast.success("Logged out!")
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get("/api/me");
                setUser(res.data.user);
            } catch (err) {
                console.error("Failed to fetch user:", err);
            }
        };
        fetchUser();
    }, []);

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
        <div>
            <div className="fixed top-0 left-0 w-full bg-[#FF8162] px-0.5 py-1 text-center flex justify-center items-center tracking-wide z-50">
                <a target="_blank" rel="noopener" className="hover:underline font-bold flex items-center gap-2 text-sm text-white" href="https://x.com/ashishxjha">
                    Want to Report a bug or talk with me? DM me on X
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right w-3 h-3"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </a>
            </div>
            <div className="fixed top-[30px] left-0 w-full h-fit z-40 p-4 bg-[#2C2125]/40 backdrop-blur-md border-b border-gray-600">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-indian-rupee-icon lucide-indian-rupee text-[#FF8162] cursor-pointer w-[35px] h-[35px] shrink-0"><path d="M6 3h12"/><path d="M6 8h12"/><path d="m6 13 8.5 8"/><path d="M6 13h3"/><path d="M9 13c6.667 0 6.667-10 0-10"/></svg>
                        <div className="font-bold text-2xl">ProjectFunding</div>
                    </div>

                    <div ref={menuRef} className="relative flex items-center justify-end flex-none shrink-0">
                        <div onClick={() => setOpenProfile(true)} className="group flex gap-4 items-center hover:bg-[#FEB57F] cursor-pointer rounded-4xl px-2 py-1.5">
                            <div className="w-10 h-10 bg-gray-600 flex items-center justify-center font-bold text-xl rounded-full hover:text-white">{user?.fullName?.[0]}</div>
                            <div className="text-white font-medium group-hover:text-black">{user?.fullName}
                                <div className="text-slate-300 font-normal text-sm group-hover:text-black tracking-wide">{user?.email}</div>
                            </div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down-icon lucide-chevron-down group-hover:text-black"><path d="m6 9 6 6 6-6"/></svg>
                            </div>
                        </div>

                        {openProfile && (
                            <div className="absolute top-full w-80 p-4">
                                {/* First Part */}
                                <div className="bg-[#D69B6F] flex flex-col gap-3 p-4 rounded-t-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="relative flex shrink-0 overflow-hidden rounded-full size-12 ring-1 ring-black/10">
                                            <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-600 text-white text-2xl font-bold">
                                                {user?.fullName?.[0]}
                                            </div>
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-1.5">
                                                <p className="font-medium text-base truncate text-black tracking-wide text-lg">{user?.fullName}</p>
                                            </div>
                                            <p className="text-xs text-black/80 truncate tracking-wide">{user?.email}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 w-fit px-3 py-[0.95] rounded-md bg-[#4E3834]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-badge-check-icon lucide-badge-check"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/></svg>
                                        <div className="text-white tracking-wider">verified</div>
                                    </div>
                                </div>

                                {/* Second Part */}
                                <div className="bg-[#3A2F35] p-2 space-y-1 w-full rounded-b-lg border border-t-0 border-gray-600">
                                    <div onClick={() => user && router.push("/profile")} className="flex items-center text-slate-200 gap-2 cursor-pointer px-3 py-2 rounded-md hover:bg-[#FEB57F] hover:text-black text-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-round-icon lucide-user-round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>
                                        <span className="tracking-wide">Profile</span>
                                    </div>

                                    <div onClick={() => user && router.push("/mylisting")} className="flex items-center text-slate-200 gap-2 cursor-pointer px-3 py-2 rounded-md hover:bg-[#FEB57F] hover:text-black text-sm">
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
                                        <div onClick={handleLogout} className="flex items-center gap-2 cursor-pointer px-3 py-2 mt-1 rounded-md hover:bg-[#492B31] text-sm">
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
        </div>
    )
}

export default ProfileNavbar