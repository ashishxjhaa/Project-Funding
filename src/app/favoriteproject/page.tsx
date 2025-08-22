"use client"

import Back from "@/components/Back";
import ProfileNavbar from "@/components/ProfileNavbar";
import UploadProject from "@/components/UploadProject";
import { useState } from "react";

export default function MyListingPage() {

  const projects = Array.from({ length: 10 }).map((_, i) => ({
    id: i + 1,
    name: `Project ${i + 1}`,
    description: "Short description of the project goes here.",
  }));

  const [projectData, setProjectData] = useState(projects);

  return (
    <div className="bg-[#2C2024] min-h-screen">
      <ProfileNavbar />
      <div className="pt-30 pr-10 flex justify-between">
        <Back />
      </div>
    <div className="w-full px-25 py-10 space-y-15">

      <div className="flex justify-center">
      <div className="flex items-center gap-8 rounded-xl bg-[#392E34] px-14 py-4 border border-[#FF8162]">
        <div className="rounded-xl w-[50px] h-[50px] relative flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-copy-icon lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
        </div>
        <div className="flex flex-col">
          <div className="font-semibold text-lg text-[#FF8162] tracking-wider">
            All Favourite Project
          <div className="flex flex-row gap-1 text-lg font-normal tracking-wider text-white">
            Explore more project and save them.
          </div>
        </div>
      </div>
      </div>
    </div>

      <div className="rounded-xl bg-[#392E34] p-5 pb-0 border border-gray-600">
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

                <div className="relative group/icon flex flex-col items-center justify-center w-12 h-12 rounded-xl border-2 border-gray-600 hover:border-[#FF8162] transition">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                  <span className="absolute bottom-[120%] whitespace-nowrap text-xs font-bold text-black bg-[#D69B6F] px-2 py-1 rounded-md opacity-0 group-hover/icon:opacity-100 transition">
                    Remove from Favorite
                  </span>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  )
}
