
function ListingWelcome() {
    return (
        <div className="flex justify-center">
        <div className="pt-25 px-25">
            <div className="flex items-center gap-8 rounded-xl bg-[#392E34] px-14 py-4 border border-[#FF8162]">
                <div className="rounded-xl bg-[#FF8162] w-[50px] h-[50px] relative flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-hand-helping-icon lucide-hand-helping"><path d="M11 12h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 14"/><path d="m7 18 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"/><path d="m2 13 6 6"/></svg>
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