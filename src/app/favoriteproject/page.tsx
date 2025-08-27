"use client"

import Back from "@/components/Back";
import ProfileNavbar from "@/components/ProfileNavbar";
import { ListingType } from "@/types/listing";
import axios from "axios";
import { useEffect, useState } from "react";


export default function FavoritePage() {

  const [items, setItems] = useState<ListingType[]>([]);
  const [loadingFavs, setLoadingFavs] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await axios.get("/api/favouriteproject", { withCredentials: true });
        if (mounted) setItems(res.data.listings || []);
      } finally {
        if (mounted) setLoadingFavs(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const removeFavourite = async (id: string) => {
    const previousItems = [...items];
    setItems((prev) => prev.filter((p) => String(p._id) !== String(id)));
    
    await axios.delete(`/api/favouriteproject?listingId=${id}`, { withCredentials: true });
    setItems((prev) => prev.filter((p) => String(p._id) !== String(id)));
  };



  return (
    <div className="bg-[#2C2024] min-h-screen">
      <ProfileNavbar />
      <div className="pt-30 pr-10 flex justify-between">
        <Back />
      </div>

    <div className="w-full px-8 sm:px-25 py-10 space-y-15">
      <div className="flex justify-center">
      <div className="flex items-center gap-8 rounded-xl bg-[#392E34] px-14 py-4 border border-[#FF8162]">
        <div className="hidden md:rounded-xl w-[50px] h-[50px] relative flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bookmark-plus-icon lucide-bookmark-plus"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/><line x1="12" x2="12" y1="7" y2="13"/><line x1="15" x2="9" y1="10" y2="10"/></svg>
        </div>
        <div className="flex flex-col">
          <div className="font-medium md:font-semibold text-[#FF8162] tracking-wider text-xs sm:text-sm md:text-md sm:text-lg">
            Your Favourite Project
          <div className="hidden lg:flex flex-row gap-1 text-lg font-normal tracking-wider text-white">
            Explore more project and save them.
          </div>
        </div>
      </div>
      </div>
    </div>

      <div className="rounded-xl bg-[#392E34] p-5 pb-2 border border-gray-600">
        <div className="divide-y-[0.1px] divide-gray-600">
          {loadingFavs ? (
            <div className="text-white text-md font-bold py-6">Loading...</div>
          ) : items.length === 0 ? (
            <div className="text-white py-6 font-bold text-lg">No favourites yet.</div>
          ) : (
            items.map((project) => (
            <div key={project._id} className="group relative flex flex-row items-start gap-4 rounded-xl p-4 mb-5 transition-all duration-300 cursor-pointer hover:bg-white/5">
              <div className="w-[48px] h-[48px] rounded-xl bg-gray-600">
                {/* Logo Here */}
              </div>
              <div className="flex flex-1 flex-col">
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-base font-semibold text-white flex items-center transition-all group-hover:text-[#FF8162]">
                  {project.name}
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square-arrow-out-up-right-icon lucide-square-arrow-out-up-right ml-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100"><path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"/><path d="m21 3-9 9"/><path d="M15 3h6v6"/></svg>
                </a>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {project.description}
                </div>
                <div className="hidden sm:mt-2 flex flex-row flex-wrap items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-tags-icon lucide-tags"><path d="M13.172 2a2 2 0 0 1 1.414.586l6.71 6.71a2.4 2.4 0 0 1 0 3.408l-4.592 4.592a2.4 2.4 0 0 1-3.408 0l-6.71-6.71A2 2 0 0 1 6 9.172V3a1 1 0 0 1 1-1z"/><path d="M2 7v6.172a2 2 0 0 0 .586 1.414l6.71 6.71a2.4 2.4 0 0 0 3.191.193"/><circle cx="10.5" cy="6.5" r=".5" fill="currentColor"/></svg>
                  {project.tags.map((t, i) => (
                  <div key={i} className="text-xs px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-700 hover:underline">
                    {t}
                  </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">

                <div onClick={() => removeFavourite(project._id)} className="relative group/icon flex flex-col items-center justify-center w-12 h-12 rounded-xl border-2 border-gray-600 hover:border-[#FF8162] transition text-[#FEB57F]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bookmark-plus-icon lucide-bookmark-plus"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/><line x1="12" x2="12" y1="7" y2="13"/><line x1="15" x2="9" y1="10" y2="10"/></svg>
                  <span className="absolute bottom-[120%] whitespace-nowrap text-xs font-bold text-black bg-[#D69B6F] px-2 py-1 rounded-md opacity-0 group-hover/icon:opacity-100 transition">
                    Remove from Favorite
                  </span>
                </div>

              </div>
            </div>
            )
          ))}
        </div>
      </div>
    </div>
  </div>
  )
}
