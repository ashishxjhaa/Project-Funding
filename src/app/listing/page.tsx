"use client";

import ListingContent from '@/components/ListingContent'
import ListingNavbar from '@/components/ListingNavbar'
import ListingWelcome from '@/components/ListingWelcome'
import { useState } from 'react';


function Listing() {
  const [search, setSearch] = useState("");
  const [filterTags, setFilterTags] = useState<string[]>([]);

  return (
    <div className='bg-[#2C2125] min-h-screen w-full'>
      <ListingNavbar search={search} setSearch={setSearch} filterTags={filterTags} setFilterTags={setFilterTags} />
      <ListingWelcome />
      <ListingContent search={search} filterTags={filterTags} />
      <button className="fixed bottom-8 right-7 z-50 rounded-full p-4 shadow-xl bg-[#FF8162] text-white cursor-pointer" aria-label="Open chats"> 
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-messages-square-icon lucide-messages-square"><path d="M16 10a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 14.286V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/><path d="M20 9a2 2 0 0 1 2 2v10.286a.71.71 0 0 1-1.212.502l-2.202-2.202A2 2 0 0 0 17.172 19H10a2 2 0 0 1-2-2v-1"/></svg> 
      </button>
    </div>
  )
}

export default Listing