"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import toast from "react-hot-toast";
import axios from "axios";

type ProjectLike = {
  _id: string;
  name: string;
  description: string;
  link?: string;
  tags: string[];
};

interface UploadProjectProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  initialProject?: ProjectLike | null;
  onSubmitted?: (p: ProjectLike) => void;
}

function UploadProject(props?: UploadProjectProps) {
  const { open, onOpenChange, initialProject, onSubmitted } = props ?? {};

  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = typeof open === "boolean";
  const modalOpen = isControlled ? !!open : internalOpen;

  const openModal = useCallback(() => {
    if (isControlled) {
      onOpenChange?.(true);
    } else {
      setInternalOpen(true);
    }
  }, [isControlled, onOpenChange]);

  const closeModal = useCallback(() => {
    if (isControlled) {
      onOpenChange?.(false);
    } else {
      setInternalOpen(false);
    }
  }, [isControlled, onOpenChange]);

  const menuRef = useRef<HTMLDivElement | null>(null);

  const tags = ["SaaS", "Productivity", "Healthcare", "AI", "Fintech", "E-commerce"];

  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const maxLength = 100;

  const canSubmit =
    projectName.trim().length >= 2 &&
    description.trim().length > 0 &&
    selectedTags.length === 3;

  const toggleTag = useCallback((tag: string) => {
    setSelectedTags((prev) => {
      if (prev.includes(tag)) return prev.filter((t) => t !== tag);
      if (prev.length === 3) {
        toast.error("Pick exactly 3 tags (already 3 selected).");
        return prev;
      }
      return [...prev, tag];
    });
  }, []);

  const outsideHandler = useCallback(
    (event: Event) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        if (modalOpen) closeModal();
      }
    },
    [modalOpen, closeModal]
  );

  useEffect(() => {
    if (initialProject && modalOpen) {
      setProjectName(initialProject.name ?? "");
      setDescription(initialProject.description ?? "");
      setLiveLink(initialProject.link ?? "");
      setSelectedTags(Array.isArray(initialProject.tags) ? initialProject.tags.slice(0, 3) : []);
    } else if (!initialProject && modalOpen === true && !isControlled) {
      setProjectName("");
      setDescription("");
      setLiveLink("");
      setSelectedTags([]);
    }
  }, [initialProject, modalOpen, isControlled]);

  useEffect(() => {
    document.addEventListener("mousedown", outsideHandler);
    return () => document.removeEventListener("mousedown", outsideHandler);
  }, [outsideHandler]);

  const handleSubmit = useCallback(async () => {
    if (!canSubmit) {
      toast.error("Fill all fields and select exactly 3 tags.");
      return;
    }

    const payload = {
      name: projectName.trim(),
      description: description.trim(),
      link: liveLink.trim() || undefined,
      tags: selectedTags,
    };

    const isEdit = !!(initialProject && initialProject._id);
    const req = isEdit
      ? axios.put(`/api/mylisting/${initialProject!._id}`, payload)
      : axios.post("/api/mylisting", payload);

    toast.promise(
      req.then((res) => {
        window.dispatchEvent(new CustomEvent("listings:refresh", { detail: res.data }));
        onSubmitted?.(res.data);
        closeModal();

        if (!isEdit) {
          setProjectName("");
          setDescription("");
          setLiveLink("");
          setSelectedTags([]);
        }
      }),
      {
        loading: isEdit ? "Updating project..." : "Submitting project...",
        success: isEdit ? "Project updated!" : "Project submitted!",
        error: isEdit ? "Failed to update project" : "Failed to submit project",
      }
    );
  }, [ canSubmit, projectName, description, liveLink, selectedTags, initialProject, onSubmitted, closeModal, ]);

  return (
    <div>
      {!isControlled && (
        <div onClick={openModal} className="flex rounded-lg bg-zinc-600 hover:bg-zinc-700 ml-8 mt-8 px-4 py-2 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-upload-icon lucide-upload text-white"><path d="M12 3v12" /><path d="m17 8-5-5-5 5" /><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /></svg>
          <span className="text-white pl-2 pr-1">Upload Project</span>
        </div>
      )}

      {modalOpen && (
        <div onClick={closeModal} className="fixed inset-0 z-50 flex items-center justify-center min-h-screen pt-12">
          <div ref={menuRef} onClick={(e) => e.stopPropagation()} className="relative bg-[#2C2024] rounded-xl p-6 w-[90%] max-w-md max-h-[80vh] overflow-y-auto border border-gray-600">
            <div className="flex items-center justify-between mb-4">
              <div className="font-semibold text-lg text-white tracking-wide">PROJECT DETAILS</div>
              <button onClick={closeModal} className="p-1 bg-[#D69B6F] hover:bg-[#FEB57F] rounded-full cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x text-black"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-[#43383E] rounded-md p-2 px-3">
                <label className="block text-md font-bold text-[#FF8162]">Project Name</label>
                <input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} className="w-full mt-1 p-2 mb-2 rounded-md border-2 border-gray-400 focus:outline-none" />
              </div>

              <div className="bg-[#43383E] rounded-md p-2 px-3">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-bold text-[#FF8162]">Short Description</label>
                  <span className="text-xs text-gray-400">
                    {description.length}/{maxLength}
                  </span>
                </div>
                <textarea value={description} onChange={(e) => { if (e.target.value.length <= maxLength) setDescription(e.target.value); }} className="w-full max-h-15 min-h-15 mt-1 p-2 rounded-md border-2 border-gray-400 focus:outline-none transition-all" rows={3} placeholder="About what it does" />
              </div>

              <div className="bg-[#43383E] rounded-md p-2 px-3">
                <label className="block text-sm font-bold text-[#FF8162]">Live Link</label>
                <input type="url" value={liveLink} onChange={(e) => setLiveLink(e.target.value)} className="w-full mt-1 p-2 mb-2 rounded-md border-2 border-gray-400 focus:outline-none" placeholder="https://example.com" />
              </div>

              <div className="bg-[#43383E] rounded-md p-2 px-3">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-bold text-[#FF8162]">Tags</label>
                  <span className="text-xs text-gray-400">{selectedTags.length}/3 selected</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag) => {
                    const selected = selectedTags.includes(tag);
                    const blocked = !selected && selectedTags.length === 3;
                    return (
                      <button key={tag} type="button" onClick={() => toggleTag(tag)} disabled={blocked} className={`px-4 py-2 rounded-md border cursor-pointer disabled:opacity-50 ${ selected ? "bg-[#FF8162] text-black" : "bg-[#2C2024] text-white border-gray-500" }`}>
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button onClick={handleSubmit} disabled={!canSubmit} className="hover:bg-[#D69B6F] bg-[#FEB57F] font-semibold tracking-wide rounded-md py-2 cursor-pointer text-black w-full">
                {initialProject ? "Update" : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadProject;
