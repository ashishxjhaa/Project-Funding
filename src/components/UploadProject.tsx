"use client"

import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";


function UploadProject() {
  const [showForm, setShowForm] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null);

  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const tags = ["SaaS", "Productivity", "Healthcare", "AI", "Fintech", "E-commerce"]

  const [description, setDescription] = useState("");
  const maxLength = 100;

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }
  
  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowForm(false);
      }
    });
  
    return () => {
      document.removeEventListener("mousedown", (event) => {});
    };
  }, []);

  return (
    <div className='w-fit'>
        <div className='flex rounded-lg bg-zinc-600 hover:bg-zinc-700 ml-8 mt-8 px-4 py-2 cursor-pointer'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-upload-icon lucide-upload text-white"><path d="M12 3v12"/><path d="m17 8-5-5-5 5"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/></svg>
            <div onClick={() => setShowForm(true)} className="text-white pl-2 pr-1">Upload Project</div>

              {showForm && (
                <div onClick={() => setShowForm(false)} className="fixed inset-0 z-50 flex items-center justify-center min-h-screen pt-12">
                  <div onClick={(e) => e.stopPropagation()} className="relative bg-[#2C2024] rounded-xl p-6 w-[90%] max-w-md max-h-[80vh] overflow-y-auto border border-gray-600">
                    <div className="flex items-center justify-between mb-4">
                      <div className="font-semibold text-lg text-white tracking-wide">
                        PROJECT DETAILS
                      </div>
                      <button onClick={() => setShowForm(false)} className="p-1 bg-[#D69B6F] hover:bg-[#FEB57F] rounded-full cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x text-black"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                      </button>
                    </div>

                  <div className="flex flex-col gap-4">
                    <div className="bg-[#43383E] rounded-md p-2 px-3">
                      <label className="block text-md font-bold text-[#FF8162]">Project Name</label>
                      <input type="text" className="w-full mt-1 p-2 mb-2 rounded-md border-2 border-gray-400 focus:outline-none" />
                    </div>

                    <div className="bg-[#43383E] rounded-md p-2 px-3">
                      <div className="flex items-center justify-between">
                        <label className="block text-sm font-bold text-[#FF8162]">Short Description</label>
                        <span className="text-xs text-gray-400">{description.length}/{maxLength}</span>
                      </div>
                      <textarea value={description} onChange={(e) => { if (e.target.value.length <= maxLength) { setDescription(e.target.value) }}} className="w-full max-h-15 min-h-15 mt-1 p-2 rounded-md border-2 border-gray-400 focus:outline-none transition-all" rows={3}></textarea>
                    </div>

                    <div className="bg-[#43383E] rounded-md p-2 px-3">
                      <label className="block text-sm font-bold text-[#FF8162]">Live Link</label>
                      <input type="url" className="w-full mt-1 p-2 mb-2 rounded-md border-2 border-gray-400 focus:outline-none" />
                    </div>

                    <div className="bg-[#43383E] rounded-md p-2 px-3">
                      <label className="block text-sm font-bold text-[#FF8162]">Tags</label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {tags.map((tag) => (
                          <button key={tag} type="button" onClick={() => toggleTag(tag)} className={`px-4 py-2 rounded-md border cursor-pointer ${ selectedTags.includes(tag) ? "bg-[#FF8162] text-black" : "bg-[#2C2024] text-white border-gray-500" }`}>
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button onClick={() => { toast.success("Project submitted!") 
                      setShowForm(false) }} className="hover:bg-[#D69B6F] bg-[#FEB57F] font-semibold tracking-wide rounded-md py-2 cursor-pointer text-black w-full">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            )}
        </div>
    </div>
  )
}

export default UploadProject