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
    </div>
  )
}

export default Listing