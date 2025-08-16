import Link from "next/link"


function Hero() {
    return (
        <div className="w-full min-h-screen pt-28 max-md:pt-15 px-7 max-md:px-7">
            <div className="text-white font-semibold text-left text-2xl sm:text-3xl md:text-4xl leading-snug ml-7 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
                A platform where developers showcase projects and raise funds
            </div>
            <div className="mt-5 flex items-center">
                <Link href="/" className="relative inline-block font-semibold ml-7 flex-shrink-0 group">
                    <span className="block rounded-md p-[1.55px] transition-all duration-300 group-hover:scale-105" style={{background: 'linear-gradient(to right, white, green, blue, white)'}}>
                        <span className="block rounded-md bg-gray-950 px-5 py-2 text-gray-200 transition-colors duration-300 group-hover:bg-gray-800 group-hover:text-white">
                            List your project
                        </span>
                    </span>
                </Link>
                <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg text-slate-300 pl-10 text-base sm:text-lg md:text-xl leading-relaxed">A place to showcase their projects and receive support from people who believe in their ideas.</div>
            </div>
            <div className="mt-45 text-5xl max-sm:text-3xl max-md:text-4xl font-bold tracking-tight leading-normal text-center bg-gradient-to-b from-green-300 to-green-400 bg-clip-text text-transparent">
                Find Funds for Your Project
            </div>
            <div className="flex justify-center mt-3">
            <div className="relative rounded-full px-5 py-2 border border-zinc-700/50 bg-zinc-900/50 backdrop-blur-sm inline-flex max-w-max">
                <div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]">
                    <div className="absolute aspect-square bg-zinc-500 animate-move" style={{ width: '20px', offsetPath: 'rect(0px auto auto 0px round 20px)', boxShadow:'rgba(255, 255, 255, 0.5) 0px 0px 20px 10px, rgba(0, 0, 0, 0.5) 0px 0px 20px 10px, rgba(0, 0, 0, 0.5) 0px 0px 24px 18px', }}></div>
                </div>
                <div className="flex justify-center items-center gap-2 text-md text-slate-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-git-fork text-slate-50"><circle cx="12" cy="18" r="3" /><circle cx="6" cy="6" r="3" /><circle cx="18" cy="6" r="3" /><path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9" /><path d="M12 12v3" /></svg>
                    <div>To the developer. For the developer. By the developer.</div>
                </div>
            </div>
            </div>
            <div className="flex justify-center items-center gap-4 mt-12">
                <div className="ml-7">
                    <div className="text-left text-white text-4xl font-extrabold mb-6">Raise fund to <span className="text-blue-600">start</span> your project</div>
                    <div className="text-slate-300 mb-8">Connect with people who can support your ideas. Share your project, get advice. Turn your ideas into reality.</div>
                    <div className="flex gap-3 items-center justify-start mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock-icon lucide-lock text-blue-500"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                        <div className="text-slate-300">Secure funding with tailored pitches and proposals</div>
                    </div>
                    <div className="flex gap-3 items-center justify-start mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-icon lucide-user text-blue-500"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        <div className="text-slate-300">Receive expert advice from top mentors in your domain</div>
                    </div>
                    <div className="flex gap-3 items-center justify-start mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-loader-icon lucide-loader text-blue-500"><path d="M12 2v4"/><path d="m16.2 7.8 2.9-2.9"/><path d="M18 12h4"/><path d="m16.2 16.2 2.9 2.9"/><path d="M12 18v4"/><path d="m4.9 19.1 2.9-2.9"/><path d="M2 12h4"/><path d="m4.9 4.9 2.9 2.9"/></svg>
                        <div className="text-slate-300">Set clear milestones for your project and track progress easily</div>
                    </div>
                    <div className="text-white bg-blue-600 hover:bg-blue-700 flex items-center gap-3 rounded-md p-10 mr-130 py-3 font-semibold cursor-pointer">Start Your Journey <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-up-icon lucide-trending-up text-white"><path d="M16 7h6v6"/><path d="m22 7-8.5 8.5-5-5L2 17"/></svg></div>
                </div>
                <div className="p-6 bg-gray-500/20 border border-gray-100/10 rounded-md text-lg font-medium">
                    <div>
                        <div className="flex mb-6 justify-between">
                            <div className="flex gap-4 items-center">
                                <div>
                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" className="text-gray-400" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="m4.736 1.968-.892 3.269-.014.058C2.113 5.568 1 6.006 1 6.5 1 7.328 4.134 8 8 8s7-.672 7-1.5c0-.494-1.113-.932-2.83-1.205l-.014-.058-.892-3.27c-.146-.533-.698-.849-1.239-.734C9.411 1.363 8.62 1.5 8 1.5s-1.411-.136-2.025-.267c-.541-.115-1.093.2-1.239.735m.015 3.867a.25.25 0 0 1 .274-.224c.9.092 1.91.143 2.975.143a30 30 0 0 0 2.975-.143.25.25 0 0 1 .05.498c-.918.093-1.944.145-3.025.145s-2.107-.052-3.025-.145a.25.25 0 0 1-.224-.274M3.5 10h2a.5.5 0 0 1 .5.5v1a1.5 1.5 0 0 1-3 0v-1a.5.5 0 0 1 .5-.5m-1.5.5q.001-.264.085-.5H2a.5.5 0 0 1 0-1h3.5a1.5 1.5 0 0 1 1.488 1.312 3.5 3.5 0 0 1 2.024 0A1.5 1.5 0 0 1 10.5 9H14a.5.5 0 0 1 0 1h-.085q.084.236.085.5v1a2.5 2.5 0 0 1-5 0v-.14l-.21-.07a2.5 2.5 0 0 0-1.58 0l-.21.07v.14a2.5 2.5 0 0 1-5 0zm8.5-.5h2a.5.5 0 0 1 .5.5v1a1.5 1.5 0 0 1-3 0v-1a.5.5 0 0 1 .5-.5"></path></svg>
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-xl">Ashish Jha</h3>
                                    <p className="text-sm max-w-80 text-slate-300">Full Stack Developer</p>
                                </div>
                            </div>
                            <div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-icon lucide-shield text-blue-500"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg></div>
                        </div>
                        <div className="flex mb-3 justify-between">
                            <div className="flex gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-icon lucide-user text-blue-400"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                <div className="text-white">Verified user</div>
                            </div>
                            <div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-toggle-right-icon lucide-toggle-right text-blue-600"><circle cx="15" cy="12" r="3"/><rect width="20" height="14" x="2" y="5" rx="7"/></svg></div>
                        </div>
                        <div className="flex mb-3 justify-between">
                            <div className="flex gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-off-icon lucide-eye-off text-blue-400"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/></svg>
                                <div className="text-white">Close deal</div>
                            </div>
                            <div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-toggle-right-icon lucide-toggle-right text-blue-600"><circle cx="15" cy="12" r="3"/><rect width="20" height="14" x="2" y="5" rx="7"/></svg></div>
                        </div>
                        <div className="flex justify-between">
                            <div className="flex gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock-icon lucide-lock text-blue-400"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                                <div className="text-white">Hide project</div>
                            </div>
                            <div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-toggle-right-icon lucide-toggle-right text-blue-600"><circle cx="15" cy="12" r="3"/><rect width="20" height="14" x="2" y="5" rx="7"/></svg></div>
                        </div>
                        <div className="mt-4 text-blue-700 flex items-center rounded-md p-5 py-2 font-semibold border border-blue-950">{`Privacy first. Connect when you're ready`}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero