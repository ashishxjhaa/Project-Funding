"use client"

import Back from "@/components/Back";
import ProfileNavbar from "@/components/ProfileNavbar";
import UploadProject from "@/components/UploadProject";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface Project {
  _id: string;
  name: string;
  description: string;
  tags: string[];
  link: string;
  createdAt: string;
}

export default function MyListingPage() {
  const [projectData, setProjectData] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<Project | null>(null);

  const handleEdit = (p: Project) => {
    setEditingProject(p);
  };

  const fetchListings = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get<Project[]>("/api/mylisting");
      setProjectData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  useEffect(() => {
    const handler = () => fetchListings();
    window.addEventListener("listings:refresh", handler as EventListener);
    return () => window.removeEventListener("listings:refresh", handler as EventListener);
  }, [fetchListings]);

  const handleDelete = async (id: string) => {
    toast.promise(
      axios.delete(`/api/mylisting/${id}`).then(() => {
        setProjectData((prev) => prev.filter((p) => p._id !== id));
        setShowDeleteConfirm(null);
      }),
      {
        loading: "Deleting project...",
        success: "Project deleted successfully!",
        error: "Failed to delete project",
      }
    );
  };

  return (
    <div className="bg-[#2C2024] min-h-screen pb-12 sm:pb-20">
      <ProfileNavbar />

      <div className="pt-30 pr-10 flex justify-between">
        <Back />
        <UploadProject />
      </div>

      <div>

        <UploadProject open={!!editingProject}
          initialProject={editingProject}
          onOpenChange={(o) => {
            if (!o) setEditingProject(null);
          }}
          onSubmitted={(updated) => {
            setProjectData((prev) => {
              const i = prev.findIndex((p) => p._id === updated._id);
              if (i === -1) return prev;
              const copy = [...prev];
              copy[i] = { ...copy[i], ...updated };
              return copy;
            });
            setEditingProject(null);
          }}
        />
      </div>

      <div className="w-full px-8 sm:px-25 space-y-15 py-10">
        <div className="flex justify-center">
          <div className="flex items-center gap-8 rounded-xl bg-[#392E34] px-14 py-4 border border-[#FF8162]">
            <div className="hidden md:flex rounded-xl w-[50px] h-[50px] relative flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list-icon lucide-list"><path d="M3 12h.01"/><path d="M3 18h.01"/><path d="M3 6h.01"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M8 6h13"/></svg>
            </div>
            <div className="flex flex-col">
              <div className="font-medium md:font-semibold text-xs sm:text-sm md:text-md sm:text-lg text-[#FF8162] tracking-wider">
                Your All Project
                {projectData.length === 0 ? (
                  <div className="hidden lg:flex flex-row gap-1 text-lg font-normal tracking-wider text-white">
                    Time to build project and upload first one.
                  </div>
                ) : (
                  <div className="hidden lg:flex flex-row gap-1 text-lg font-normal tracking-wider text-white">
                    Time to build more project and upload one more.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-[#392E34] p-5 mx-8 sm:mx-20 border border-gray-600">
        <div className="divide-y-[0.1px] divide-gray-600">
          {loading ? (
            <div className="text-center text-white py-10 text-xl font-semibold">Loading...</div>
          ) : projectData.length === 0 ? (
            <div className="text-center text-white py-10">
              <h2 className="text-xl font-semibold mb-2">No Project Uploaded</h2>
            </div>
          ) : (
            projectData.map((project) => (
              <div
                key={project._id}
                className="group relative flex flex-row items-start gap-4 rounded-xl p-4 transition-all duration-300 cursor-pointer hover:bg-white/5"
              >
                <div className="hidden sm:flex w-[48px] h-[48px] rounded-xl bg-gray-600" />

                <div className="flex flex-1 flex-col">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-semibold text-white flex items-center transition-all group-hover:text-[#FF8162]"
                  >
                    {project.name}
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square-arrow-out-up-right-icon lucide-square-arrow-out-up-right ml-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100"><path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"/><path d="m21 3-9 9"/><path d="M15 3h6v6"/></svg>
                  </a>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {project.description}
                  </div>
                  <div className="mt-2 hidden sm:flex flex-row flex-wrap items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-tags-icon lucide-tags"><path d="M13.172 2a2 2 0 0 1 1.414.586l6.71 6.71a2.4 2.4 0 0 1 0 3.408l-4.592 4.592a2.4 2.4 0 0 1-3.408 0l-6.71-6.71A2 2 0 0 1 6 9.172V3a1 1 0 0 1 1-1z"/><path d="M2 7v6.172a2 2 0 0 0 .586 1.414l6.71 6.71a2 4 0 0 0 3.191.193"/><circle cx="10.5" cy="6.5" r=".5" fill="currentColor"/></svg>
                    {project.tags.map((tag, idx) => (
                      <div key={idx} className="text-xs px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-700 hover:underline">
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div
                    onClick={() => handleEdit(project)}
                    className="relative group/icon flex flex-col items-center justify-center w-12 h-12 rounded-xl border-2 border-gray-600 hover:border-[#FF8162] transition"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil-icon lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
                    <span className="absolute bottom-[120%] whitespace-nowrap text-xs font-bold text-black bg-[#D69B6F] px-2 py-1 rounded-md opacity-0 group-hover/icon:opacity-100 transition">
                      Edit this project
                    </span>
                  </div>

                  <div
                    onClick={() => setShowDeleteConfirm(project)}
                    className="relative group/icon flex flex-col items-center justify-center w-12 h-12 rounded-xl border-2 border-gray-600 hover:border-[#FF8162] transition"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-icon lucide-trash"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                    <span className="absolute bottom-[120%] whitespace-nowrap text-xs font-bold text-black bg-[#D69B6F] px-2 py-1 rounded-md opacity-0 group-hover/icon:opacity-100 transition">
                      Delete this project
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
        
        {showDeleteConfirm && (
          <div onClick={() => setShowDeleteConfirm(null)} className="fixed inset-0 z-50 flex items-center justify-center min-h-screen bg-black/50">
            <div onClick={(e) => e.stopPropagation()} className="relative bg-[#FEB57F] rounded-xl p-6 w-[90%] max-w-md shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="font-semibold text-lg text-black tracking-wide">
                  Confirm Delete ?
                </div>
                <button onClick={() => setShowDeleteConfirm(null)} className="p-1 hover:bg-black/10 rounded-full cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x text-black"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
              </button>
            </div>
            <p className="bg-white rounded-xl px-4 py-4 text-black mb-6">
              Are you sure you want to delete{" "}
              <span className="font-bold">{showDeleteConfirm.name}</span>?
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button onClick={() => setShowDeleteConfirm(null)} className="px-4 py-2 rounded-md bg-black/10 text-black hover:bg-black/20 cursor-pointer">
                Cancel
              </button>
              <button onClick={() => handleDelete(showDeleteConfirm._id)} className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 cursor-pointer">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}