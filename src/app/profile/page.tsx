"use client"

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

import Back from "@/components/Back";
import ProfileNavbar from "@/components/ProfileNavbar";

type UpdatePayload = {
  fullName: string;
  email: string;
  github?: string;
};


export default function ProfilePage() {
  const [totalProjects, setTotalProjects] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);
  const [totalFunds, setTotalFunds] = useState(0);

  const [activeTab, setActiveTab] = useState<"personal" | "language" | null>(null);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const [originalFullName, setOriginalFullName] = useState("");
  const [originalEmail, setOriginalEmail] = useState("");


  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  const [createdAt, setCreatedAt] = useState("");

  const [github, setGithub] = useState("");
  const [originalGithub, setOriginalGithub] = useState("");
  const [isEditingGithub, setIsEditingGithub] = useState(false);

  const [showEmailVerify, setShowEmailVerify] = useState(false);
  const [verifyPassword, setVerifyPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [originalLanguages, setOriginalLanguages] = useState<string[]>([]);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const githubRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("/api/user/stats");
        setTotalProjects(res.data.totalProjects || 0);
        setTotalLikes(res.data.totalLikes || 0);
        setTotalFunds(res.data.totalFunds || 0);
      } catch (err) {
        console.error("Failed to load stats:", err);
      }
    };
    fetchStats();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/me");
        setFullName(res.data.user.fullName);
        setEmail(res.data.user.email);

        setOriginalFullName(res.data.user.fullName);
        setOriginalEmail(res.data.user.email);

        setCreatedAt(res.data.user.createdAt);

        setGithub(res.data.user.github || "");
        setOriginalGithub(res.data.user.github || "");
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    fetchUser();
  }, []);


  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const res = await axios.get("/api/languages", { withCredentials: true });
        setSelectedLanguages(res.data.languages);
        setOriginalLanguages(res.data.languages);
      } catch (err) {
        console.error("Failed to fetch languages:", err);
      }
    };
    fetchLanguages();
  }, []);

  const handleLanguageSubmit = async () => {

    if (originalLanguages.length === 0 && selectedLanguages.length === 0) {
      toast.error("Please select at least one language");
      return;
    }

    const hasChanged = selectedLanguages.length !== originalLanguages.length || selectedLanguages.some((lang) => !originalLanguages.includes(lang));
    if (!hasChanged) {
      toast.error("No changes to update!");
      return;
    }

    try {
      const res = await axios.put("/api/languages", 
        { languages: selectedLanguages }, 
        { withCredentials: true }
      );
      setSelectedLanguages(res.data.languages);
      setOriginalLanguages(res.data.languages);
      toast.success("Languages updated!");
    } catch (err) {
      toast.error("Failed to update languages");
    }
  };

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  : "";

  function getInitials(name: string) {
    if (!name) return "";
    const parts = name.trim().split(" ");
    if (parts.length === 1) {
      return parts[0][0].toUpperCase();
    }
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

  const handleEmailVerification = async () => {
    try {
      const res = await axios.post("/api/verifypass", { password: verifyPassword }, { withCredentials: true });
      if (res.data.success) {
        setIsEditingEmail(true);
        setShowEmailVerify(false);
        toast.success("Password verified, now update your email");
      }
    } catch {
      toast.error("Password verification failed");
    }
  };

  useEffect(() => {
    if (isEditingEmail) {
      emailRef.current?.focus();
    }
  }, [isEditingEmail]);


  const handleUpdate = async () => {
    if (fullName === originalFullName && email === originalEmail && github === originalGithub) {
      toast.error("No changes to update!");
      return;
    }
    try {
      const payload: UpdatePayload = { fullName: fullName.trim(), email: email.trim() };

      if (github !== originalGithub) {
        payload.github = github.trim()
        .replace(/^(https?:\/\/)?(www\.)?github\.com\/?/i, "")
        .replace(/^@/, "")
        .toLowerCase();
      }

      const res = await axios.put("/api/me", payload, { withCredentials: true });

      const updatedUser = res.data?.user;
      if (updatedUser) {
        setFullName(updatedUser.fullName || "");
        setEmail(updatedUser.email || "");
        setGithub(updatedUser.github || "");
        setOriginalFullName(updatedUser.fullName || "");
        setOriginalEmail(updatedUser.email || "");
        setOriginalGithub(updatedUser.github || "");
      }

      setIsEditingName(false);
      setIsEditingEmail(false);
      setIsEditingGithub(false);
      toast.success("Profile updated!");

      setOriginalFullName(fullName);
      setOriginalEmail(email);
      setOriginalGithub(github);
       
      window.dispatchEvent(new Event("userUpdated"));

    } catch (err) {
      toast.error("Failed to update profile");
    }
  };

  const languages = [ "HTML", "CSS", "Tailwind CSS", "JavaScript", "TypeScript", "React", "Next.js", "Vue.js", "Angular", "Three.js", "Node.js", "Express.js", "NestJS", "Bun", "Rust"]
  const toggleLanguage = (lang: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  };

  return (
    <div className="bg-[#2C2024] min-h-screen">
      <ProfileNavbar />

      <div className="pt-30">
        <Back />

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-10 p-10">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-full opacity-75 blur-sm"></div>
            <div className="relative flex shrink-0 rounded-full h-24 w-24">
              <div className="absolute -inset-[7px] bg-gradient-to-r from-[#FF8162] to-[#FEB57F] rounded-full opacity-75 blur-sm"></div>
              <div className="flex h-full w-full items-center justify-center rounded-full text-2xl font-bold bg-gray-700 border-4 border-background relative z-10">{getInitials(fullName)}</div>
            </div>
          </div>


          <div className="flex-1">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
              <h1 className="text-4xl font-bold tracking-tight text-[#FF8162]">{fullName}</h1>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground mb-4">
              <span className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-round h-3.5 w-3.5"><circle cx="12" cy="8" r="5"></circle><path d="M20 21a8 8 0 0 0-16 0"></path></svg>
                Joined {formattedDate}
              </span>
            </div>
            <div className="flex flex-wrap gap-3 cursor-pointer">
              {github && (
              <a href={`https://github.com/${github}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs tracking-wide bg-[#3A2F35] border border-transparent hover:border hover:border-[#FF8162]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github h-3.5 w-3.5"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                @{github}
              </a>
              )}
            </div>
          </div>
        </div>


        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 px-10">
          <div className="rounded-xl border bg-[#3A2F35] text-card-foreground overflow-hidden border-none">
            <div className="p-6 pt-7 pb-9">
              <div className="flex items-center gap-2 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list-collapse-icon lucide-list-collapse h-5 w-5 text-[#FF8162]"><path d="M10 12h11"/><path d="M10 18h11"/><path d="M10 6h11"/><path d="m3 10 3-3-3-3"/><path d="m3 20 3-3-3-3"/></svg>
                <span className="text-sm tracking-wider">Total Project</span>
              </div>
              <p className="text-2xl font-bold">{totalProjects}</p>
              <p className="text-xs mt-2 tracking-wide text-[#FF8162]">Time to build more! ⏰</p>
            </div>
          </div>
          <div className="rounded-xl border bg-[#3A2F35] text-card-foreground overflow-hidden border-none">
            <div className="p-6 pt-7 pb-9">
              <div className="flex items-center gap-2 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-thumbs-up-icon lucide-thumbs-up h-5 w-5 text-[#FF8162]"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/></svg>
                <span className="text-sm tracking-wider">Total Liked</span>
              </div>
              <p className="text-2xl font-bold">{totalLikes} Like</p>
              <p className="text-xs mt-2 tracking-wide text-[#FF8162]">Dedication level: Normal ☀️</p>
            </div>
          </div>
          <div className="rounded-xl border bg-[#3A2F35] text-card-foreground overflow-hidden border-none">
            <div className="p-6 pt-7 pb-9">
              <div className="flex items-center gap-2 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-code h-5 w-5 text-[#FF8162]"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                <span className="text-sm tracking-wider">Languages</span>
              </div>
              <p className="text-2xl font-bold">{selectedLanguages.length}</p>
              <p className="text-xs mt-2 tracking-wide text-[#FF8162]">Time to learn more! 📚</p>
            </div>
          </div>
          <div className="rounded-xl border bg-[#3A2F35] text-card-foreground overflow-hidden border-none">
            <div className="p-6 pt-7 pb-9">
              <div className="flex items-center gap-2 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-indian-rupee-icon lucide-indian-rupee h-5 w-5 text-[#FF8162]"><path d="M6 3h12"/><path d="M6 8h12"/><path d="m6 13 8.5 8"/><path d="M6 13h3"/><path d="M9 13c6.667 0 6.667-10 0-10"/></svg>
                <span className="text-sm tracking-wider">Raised Fund</span>
              </div>
              <p className="text-2xl font-bold">₹ {totalFunds}</p>
              <p className="text-xs mt-2 tracking-wide text-[#FF8162]">Start listing more project 🎯</p>
            </div>
          </div>
        </div>

          <div className="flex items-center justify-center m-8 bg-[#2C2024] p-1 rounded-lg border border-gray-500 w-fit">
            <div onClick={() => setActiveTab("personal")} className={`cursor-pointer tracking-wide px-3 text-md font-medium rounded-md ${activeTab === "personal" ? "bg-[#412E2E]" : "hover:bg-[#412E2E]"}`}>
              Personal
            </div>
            <div onClick={() => setActiveTab("language")} className={`cursor-pointer tracking-wide px-3 text-md font-medium rounded-md ${activeTab === "language" ? "bg-[#412E2E]" : "hover:bg-[#412E2E]"}`}>
              Languages
            </div>
          </div>
          
          <div className="mt-6 px-4 sm:px-10 pb-30">
            <div className="mx-auto w-full max-w-2xl">
              
              {activeTab === "personal" && (
                <div className="rounded-xl bg-[#3A2F35] overflow-hidden">
                  <div className="p-6 pt-7 pb-7">
                    <div className="flex items-center gap-2 mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-icon lucide-user h-5 w-5 text-[#FF8162]"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      <span className="text-md font-bold tracking-wider">Full Name</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <input ref={nameRef} value={fullName} onChange={(e) => setFullName(e.target.value)} type="text" disabled={!isEditingName} className={`text-slate-50 h-10 w-full pl-10 focus:outline-none focus:ring-0 rounded-md border border-gray-500 ${isEditingName ? "" : "cursor-not-allowed"}`} placeholder="Update full name" />
                      <div onClick={() => { setIsEditingName(true); setTimeout(() => nameRef.current?.focus(), 0); }} className="p-3 rounded-sm cursor-pointer hover:bg-white/20 mx-6">
                        <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil-icon lucide-pencil cursor-pointer"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pb-7">
                    <div className="flex items-center gap-2 mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail-icon lucide-mail h-5 w-5 text-[#FF8162]"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg>
                      <span className="text-md font-bold tracking-wider">Email</span>
                    </div>
                    <div className="flex itmes-center justify-center gap-2">
                      <input ref={emailRef} value={email} onChange={(e) => setEmail(e.target.value)} type="email" disabled={!isEditingEmail} className={`text-slate-50 h-10 w-full pl-10 focus:outline-none focus:ring-0 rounded-md border border-gray-500 ${isEditingEmail ? "" : "cursor-not-allowed"}`} placeholder="Update email id"/>
                      <div onClick={() => setShowEmailVerify(true)} className="p-3 rounded-sm cursor-pointer hover:bg-white/20 mx-6">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil-icon lucide-pencil cursor-pointer"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
                      </div>
                    </div>
                  </div>

                  {showEmailVerify && (
                    <div
                      onClick={() => setShowEmailVerify(false)} className="fixed inset-0 z-50 flex items-center justify-center min-h-screen bg-black/50">
                        <div onClick={(e) => e.stopPropagation()} className="relative bg-[#FEB57F] rounded-xl p-6 w-[90%] max-w-md shadow-lg">
                          <div className="flex items-center justify-between mb-4">
                            <div className="font-semibold text-lg text-black tracking-wide">
                              Verify Password
                            </div>
                            <button onClick={() => setShowEmailVerify(false)} className="p-1 hover:bg-black/10 rounded-full cursor-pointer">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x text-black"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                            </button>
                          </div>

                          <div className="relative w-full mb-6">
                            <input type={showPassword ? "text" : "password"} value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)} className="w-full text-black bg-white rounded-xl px-4 py-4 mb-6 outline-none" placeholder="Enter password" />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-slate-50 absolute inset-y-0 right-0 flex items-center pr-3 pb-5 cursor-pointer">
                              {showPassword ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye size-7 text-black"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path><circle cx="12" cy="12" r="3"></circle></svg>
                              ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-off-icon lucide-eye-off text-black"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/></svg>
                              )}
                            </button>
                          </div>

                          <div className="flex justify-end gap-3">
                            <button onClick={() => setShowEmailVerify(false)} className="px-4 py-2 rounded-md bg-black/10 text-black hover:bg-black/20 cursor-pointer">
                              Cancel
                            </button>
                            <button onClick={handleEmailVerification} className="px-4 py-2 rounded-md bg-black/80 text-white hover:bg-black/90 cursor-pointer">
                              Verify
                            </button>
                          </div>
                        </div>
                      </div>
                  )}

                  <div className="px-6 pb-7">
                    <div className="flex items-center gap-2 mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github-icon lucide-github h-5 w-5 text-[#FF8162]"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                      <span className="text-md font-bold tracking-wider">Github</span>
                    </div>
                    <div className="flex itmes-center justify-center gap-2">
                      <input ref={githubRef} value={github} onChange={(e) => setGithub(e.target.value)} type="text" disabled={!isEditingGithub} className={`text-slate-50 h-10 w-full pl-10 focus:outline-none focus:ring-0 rounded-md border border-gray-500 ${ isEditingGithub ? "" : "cursor-not-allowed"}`} placeholder="Add Github username"/>
                      <div onClick={() => { setIsEditingGithub(true); setTimeout(() => githubRef.current?.focus(), 0); }} className="p-3 rounded-sm cursor-pointer hover:bg-white/20 mx-6">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil-icon lucide-pencil cursor-pointer"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
                      </div>
                    </div>
                  </div>
            
                  <div className="flex justify-center items-center mr-16">
                    <button onClick={handleUpdate} type="button" className="hover:bg-[#D69B6F] bg-[#FEB57F] font-semibold tracking-wide rounded-md py-2 cursor-pointer text-black w-[85%] mr-10 mb-8">Update</button>
                  </div>
                </div>
              )}

              {activeTab === "language" && (
                <div className="rounded-xl bg-[#3A2F35] overflow-hidden">
                  <div className="px-6 pt-7 pb-7">
                    <div className="flex items-center gap-2 mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-code-icon lucide-code h-5 w-5 text-[#FF8162]"><path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/></svg>
                      <span className="text-md font-bold tracking-wider">Add Languages</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {languages.map((lang) => (
                        <button key={lang} type="button" onClick={() => toggleLanguage(lang)} className={`px-4 py-2 rounded-md border cursor-pointer ${selectedLanguages.includes(lang) ? "bg-[#FF8162] text-black" : "bg-[#2C2024] text-white border-gray-500"}`}>
                          {lang}
                        </button>
                      ))}
                    </div>
                    <button type="submit" onClick={handleLanguageSubmit} className="hover:bg-[#D69B6F] bg-[#FEB57F] font-semibold tracking-wide rounded-md py-2 cursor-pointer text-black w-full">Submit</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
  )
};
