
function ListingWelcome() {
    return (
        <div className="flex justify-center">
        <div className="pt-25 px-25">
            <div className="flex items-center gap-8 rounded-xl bg-[#392E34] px-14 py-4 border border-[#FF8162]">
                <div className="rounded-xl bg-white h-15 w-16 relative flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-gem-icon lucide-gem text-black"><path d="M10.5 3 8 9l4 13 4-13-2.5-6"/><path d="M17 3a2 2 0 0 1 1.6.8l3 4a2 2 0 0 1 .013 2.382l-7.99 10.986a2 2 0 0 1-3.247 0l-7.99-10.986A2 2 0 0 1 2.4 7.8l2.998-3.997A2 2 0 0 1 7 3z"/><path d="M2 9h20"/></svg>
                </div>
                 <div className="flex flex-col">
                    <div className="font-semibold text-[#FF8162] tracking-wider">
                        Welcome to Project Funding!
                        <div className="flex flex-row gap-1 text-lg font-normal tracking-wider text-white">
                            The place to launch and raise fund or invest in projects.
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default ListingWelcome