"use client"

import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import FundMoney from "./FundMoney";

type Listing = {
    _id: string;
    name: string;
    description: string;
    tags: string[];
    link?: string;
    createdAt: string;
    funds: number;
    likes: number;
    liked?: boolean;
    favourited?: boolean;
};

function ListingContent({ search, filterTags }: { search: string; filterTags: string[] }) {
    const [topListings, setTopListings] = useState<Listing[]>([]);
    const [allListings, setAllListings] = useState<Listing[]>([]);
    const [loading, setLoading] = useState(true);
    const [fundProjectId, setFundProjectId] = useState<string | null>(null);

    const fetchListings = useCallback(async () => {
        try {
            setLoading(true);
            const listingsRes = await axios.get("/api/listings/public");
            const top = listingsRes.data.topListings || [];
            const all = listingsRes.data.allListings || [];

            let favorites: string[] = [];
            try {
                const favsRes = await axios.get("/api/favouriteproject", { withCredentials: true });
                favorites = favsRes.data.listings?.map((item: Listing) => String(item._id)) || [];
            } catch (err) {
                console.error("Failed to fetch favorites:", err);
            }

            const updatedTop = top.map((listing: Listing) => ({
                ...listing,
                favourited: favorites.includes(String(listing._id)),
            }));
            const updatedAll = all.map((listing: Listing) => ({
                ...listing,
                favourited: favorites.includes(String(listing._id)),
            }));
            
            setTopListings(updatedTop);
            setAllListings(updatedAll);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load listings");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchListings();
    }, [fetchListings]);

    const updateLocalListing = (id: string, updater: (l: Listing) => Listing) => {
        setTopListings((prev) => prev.map((l) => (String(l._id) === String(id) ? updater(l) : l)));
        setAllListings((prev) => prev.map((l) => (String(l._id) === String(id) ? updater(l) : l)));
    };

    const handleLike = async (id: string, currentlyLiked?: boolean) => {
        const topSnap = [...topListings];
        const allSnap = [...allListings];

        updateLocalListing(id, (l) => ({
            ...l,
            liked: !l.liked,
            likes: (l.likes ?? 0) + (l.liked ? -1 : 1),
        }));

        try {
            if (currentlyLiked) {
                await axios.delete(`/api/listings/${id}/like`);
            } else {
                await axios.post(`/api/listings/${id}/like`);
            }
        } catch (err) {
            toast.error("Action failed.");
            setTopListings(topSnap);
            setAllListings(allSnap);
        }
    };

    const handleFavourite = async (id: string, currentlyFavourited?: boolean) => {
        const previousTopListings = [...topListings];
        const previousAllListings = [...allListings];

        updateLocalListing(id, (l) => ({ ...l, favourited: !l.favourited }));

        try {
            const response = await axios({
                method: currentlyFavourited ? 'DELETE' : 'POST',
                url: `/api/favouriteproject${currentlyFavourited ? `?listingId=${id}` : ''}`,
                data: currentlyFavourited ? {} : { listingId: id },
                withCredentials: true,
            });

            if (response.status >= 200 && response.status < 300) {
                toast.success(currentlyFavourited ? "Removed from favourites" : "Added to Favourite");
            } else {
                throw new Error("Unexpected response status");
            }
        } catch (err) {
            setTopListings(previousTopListings);
            setAllListings(previousAllListings);
            toast.error("Failed to add. Please try again.");
        }
    };


    const handleFundSuccess = (amount: number) => {
        if (!fundProjectId) return;
        updateLocalListing(fundProjectId, (l) => ({
            ...l,
            funds: (l.funds ?? 0) + amount,
        }));
    };

    const handleFund = async (id: string) => {
        const raw = window.prompt("Enter amount to fund (INR):", "100");
        if (!raw) return;
        const amount = Math.floor(Number(raw));
        if (!amount || amount <= 0) {
            toast.error("Invalid amount");
            return;
        }

        const res = await axios.get("/api/wallet");
        if (res.data.wallet.balance < amount) {
            toast.error("Insufficient balance");
            return;
        }

        try {
            await axios.post(`/api/listings/${id}/fund`, { amount });
            toast.success("Thanks for funding!");
            handleFundSuccess(amount);
        } catch (err) {
            toast.error("Failed to fund.");
        }
    };

    const filteredAllListings = allListings.filter(project => {
        const matchesSearch = project.name.toLowerCase().includes(search.toLowerCase());
        const matchesTags = filterTags.length === 0 || project.tags.some(tag => filterTags.includes(tag));
        return matchesSearch && matchesTags;
    });

    if (loading) {
        return <div className="text-white font-bold text-lg text-center py-10">Loading...</div>;
    }


    return (
        <div className="w-full px-8 sm:px-25 pt-6 space-y-15 pb-20">

            {fundProjectId && (
                <FundMoney
                  projectId={fundProjectId}
                  onClose={() => setFundProjectId(null)}
                  onSuccess={handleFundSuccess}
                />
            )}

            <div className="rounded-xl bg-[#392E34] p-5 border border-gray-600">
                <div className="font-medium lg:font-bold tracking-wide text-md lg:text-lg text-[#FF8162]">
                    {`This Week's Top Projects`}
                </div>
                <div className="divide-y-[0.1px] divide-gray-600">
                    {topListings.length === 0 ? (
                        <div className="text-white py-6">No top projects yet.</div>
                    ) : (
                      topListings.slice(0, 3).map((project) => (
                        <div key={project._id} className="group relative pb-3 sm:pb-6 flex flex-col sm:flex-row items-start gap-4 rounded-xl sm:p-4 transition-all duration-300 cursor-pointer hover:bg-white/5">
                            <div className="hidden sm:flex w-[48px] h-[48px] rounded-xl bg-gray-600">
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
                                <div className="mt-2 hidden sm:flex flex-row flex-wrap items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-tags-icon lucide-tags"><path d="M13.172 2a2 2 0 0 1 1.414.586l6.71 6.71a2.4 2.4 0 0 1 0 3.408l-4.592 4.592a2.4 2.4 0 0 1-3.408 0l-6.71-6.71A2 2 0 0 1 6 9.172V3a1 1 0 0 1 1-1z"/><path d="M2 7v6.172a2 2 0 0 0 .586 1.414l6.71 6.71a2.4 2.4 0 0 0 3.191.193"/><circle cx="10.5" cy="6.5" r=".5" fill="currentColor"/></svg>
                                    {project.tags.map((t, i) =>
                                        <div key={i} className="text-xs px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-700 hover:underline">
                                            {t}
                                        </div>
                                    )}
                                </div>
                            </div>


                            <div className="grid grid-cols-2 md:flex md:items-center justify-between gap-3 sm:overflow-hidden">
                                <div>
                                    <div onClick={() => setFundProjectId(project._id)} className="relative group/icon flex flex-col items-center justify-center w-12 h-12 rounded-xl border-2 border-gray-600 hover:border-[#FF8162] transition">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-indian-rupee-icon lucide-indian-rupee"><path d="M6 3h12"/><path d="M6 8h12"/><path d="m6 13 8.5 8"/><path d="M6 13h3"/><path d="M9 13c6.667 0 6.667-10 0-10"/></svg>
                                        <span className="absolute bottom-[120%] whitespace-nowrap text-xs font-bold text-black bg-[#D69B6F] px-2 py-1 rounded-md opacity-0 group-hover/icon:opacity-100 transition cursor-pointer">
                                            Fund this project
                                        </span>
                                    </div>
                                    <span className="text-xs mt-2 p-1 rounded-sm border border-gray-600 bg-gray-800 text-white flex justify-center">₹ {project.funds}</span>
                                </div>
                                <div>
                                <div className="relative group/icon flex flex-col items-center justify-center w-12 h-12 rounded-xl border-2 border-gray-600 hover:border-[#FF8162] transition">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-messages-square-icon lucide-messages-square"><path d="M16 10a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 14.286V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/><path d="M20 9a2 2 0 0 1 2 2v10.286a.71.71 0 0 1-1.212.502l-2.202-2.202A2 2 0 0 0 17.172 19H10a2 2 0 0 1-2-2v-1"/></svg>
                                    <span className="absolute bottom-[120%] whitespace-nowrap text-xs font-bold text-black bg-[#D69B6F] px-2 py-1 rounded-md opacity-0 group-hover/icon:opacity-100 transition cursor-pointer">
                                        Chat with developer 
                                    </span>
                                </div>
                                <div className="h-8 flex justify-center"></div>
                                </div>
                                <div>
                                    <div onClick={() => handleLike(project._id, project.liked)} className={`relative group/icon flex flex-col items-center justify-center w-12 h-12 rounded-xl border-2 border-gray-600 hover:border-[#FF8162] transition ${project.liked ? "text-[#FEB57F]" : ""}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-thumbs-up-icon lucide-thumbs-up"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/></svg>
                                        <span className="absolute bottom-[120%] whitespace-nowrap text-xs font-bold text-black bg-[#D69B6F] px-2 py-1 rounded-md opacity-0 group-hover/icon:opacity-100 transition cursor-pointer">
                                            Like this project
                                        </span>
                                    </div>
                                    <span className="text-xs mt-2 p-1 rounded-sm border border-gray-600 bg-gray-800 text-white flex justify-center">{project.likes}</span>
                                </div>
                                <div>
                                <div onClick={() => handleFavourite(project._id, project.favourited)} className={`relative group/icon flex flex-col items-center justify-center w-12 h-12 rounded-xl border-2 border-gray-600 hover:border-[#FF8162] transition ${project.favourited ? "text-[#FEB57F]" : ""}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bookmark-plus-icon lucide-bookmark-plus"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/><line x1="12" x2="12" y1="7" y2="13"/><line x1="15" x2="9" y1="10" y2="10"/></svg>
                                    <span className="absolute bottom-[120%] whitespace-nowrap text-xs font-bold text-black bg-[#D69B6F] px-2 py-1 rounded-md opacity-0 group-hover/icon:opacity-100 transition cursor-pointer">
                                        Favourite project 
                                    </span>
                                </div>
                                <div className="h-8 flex justify-center"></div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
                </div>
            </div>

            <div className="rounded-xl bg-[#392E34] p-5 border border-gray-600">
                <div className="font-medium lg:font-bold tracking-wide text-md lg:text-lg text-[#FF8162]">
                    Explore All Projects
                </div>
                <div className="divide-y-[0.1px] divide-gray-600">
                    {loading ? (
                        <div className="text-white py-6">Loading...</div>
                            ) : allListings.length === 0 ? (
                                <div className="text-white py-6">No projects found.</div>
                            ) : (
                        filteredAllListings.map(project => (
                            <div key={project._id} className="group relative pb-3 sm:pb-6 flex flex-col sm:flex-row items-start gap-4 rounded-xl sm:p-4 transition-all duration-300 cursor-pointer hover:bg-white/5">
                            <div className="hidden sm:flex w-[48px] h-[48px] rounded-xl bg-gray-600">
                                {/* Logo Here */}
                            </div>
                            <div className="flex flex-1 flex-col">
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-base font-semibold text-white flex items-center transition-all group-hover:text-[#FF8162]">
                                    {project.name}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square-arrow-out-up-right-icon lucide-square-arrow-out-up-right ml-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100"><path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"/><path d="m21 3-9 9"/><path d="M15 3h6v6"/></svg>
                                </a>
                                <div className="text-sm text-gray-500 mt-1">
                                    {project.description}
                                </div>
                                <div className="mt-2 hidden sm:flex flex-row flex-wrap items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-tags-icon lucide-tags"><path d="M13.172 2a2 2 0 0 1 1.414.586l6.71 6.71a2.4 2.4 0 0 1 0 3.408l-4.592 4.592a2.4 2.4 0 0 1-3.408 0l-6.71-6.71A2 2 0 0 1 6 9.172V3a1 1 0 0 1 1-1z"/><path d="M2 7v6.172a2 2 0 0 0 .586 1.414l6.71 6.71a2.4 2.4 0 0 0 3.191.193"/><circle cx="10.5" cy="6.5" r=".5" fill="currentColor"/></svg>
                                    {project.tags.map((t,i) =>
                                        <div key={i} className="text-xs px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-700 hover:underline">
                                            {t}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:flex md:items-center justify-between gap-3 sm:overflow-hidden">
                                <div>
                                    <div onClick={() => setFundProjectId(project._id)} className="relative group/icon flex flex-col items-center justify-center w-12 h-12 rounded-xl border-2 border-gray-600 hover:border-[#FF8162] transition">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-indian-rupee-icon lucide-indian-rupee"><path d="M6 3h12"/><path d="M6 8h12"/><path d="m6 13 8.5 8"/><path d="M6 13h3"/><path d="M9 13c6.667 0 6.667-10 0-10"/></svg>
                                        <span className="absolute bottom-[120%] whitespace-nowrap text-xs font-bold text-black bg-[#D69B6F] px-2 py-1 rounded-md opacity-0 group-hover/icon:opacity-100 transition">
                                            Fund this project
                                        </span>
                                    </div>
                                    <span className="text-xs mt-2 p-1 rounded-sm border border-gray-600 bg-gray-800 text-white flex justify-center">₹ {project.funds}</span>
                                </div>
                                <div>
                                <div className="relative group/icon flex flex-col items-center justify-center w-12 h-12 rounded-xl border-2 border-gray-600 hover:border-[#FF8162] transition">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-messages-square-icon lucide-messages-square"><path d="M16 10a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 14.286V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/><path d="M20 9a2 2 0 0 1 2 2v10.286a.71.71 0 0 1-1.212.502l-2.202-2.202A2 2 0 0 0 17.172 19H10a2 2 0 0 1-2-2v-1"/></svg>
                                    <span className="absolute bottom-[120%] whitespace-nowrap text-xs font-bold text-black bg-[#D69B6F] px-2 py-1 rounded-md opacity-0 group-hover/icon:opacity-100 transition">
                                        Chat with developer 
                                    </span>
                                </div>
                                <div className="h-8 flex justify-center"></div>
                                </div>
                                <div>
                                    <div onClick={() => handleLike(project._id)} className={`relative group/icon flex flex-col items-center justify-center w-12 h-12 rounded-xl border-2 border-gray-600 hover:border-[#FF8162] transition ${project.liked ? "text-[#FEB57F]" : ""}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-thumbs-up-icon lucide-thumbs-up"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/></svg>
                                        <span className="absolute bottom-[120%] whitespace-nowrap text-xs font-bold text-black bg-[#D69B6F] px-2 py-1 rounded-md opacity-0 group-hover/icon:opacity-100 transition">
                                            Like this project
                                        </span>
                                    </div>
                                    <span className="text-xs mt-2 p-1 rounded-sm border border-gray-600 bg-gray-800 text-white flex justify-center">{project.likes}</span>
                                </div>
                                <div>
                                <div onClick={() => handleFavourite(project._id, project.favourited)} className={`relative group/icon flex flex-col items-center justify-center w-12 h-12 rounded-xl border-2 border-gray-600 hover:border-[#FF8162] transition ${project.favourited ? "text-[#FEB57F]" : ""}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bookmark-plus-icon lucide-bookmark-plus"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/><line x1="12" x2="12" y1="7" y2="13"/><line x1="15" x2="9" y1="10" y2="10"/></svg>
                                    <span className="absolute bottom-[120%] whitespace-nowrap text-xs font-bold text-black bg-[#D69B6F] px-2 py-1 rounded-md opacity-0 group-hover/icon:opacity-100 transition">
                                        Favorite project 
                                    </span>
                                </div>
                                <div className="h-8 flex justify-center"></div>
                                </div>
                            </div>
                        </div>
                        )
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ListingContent