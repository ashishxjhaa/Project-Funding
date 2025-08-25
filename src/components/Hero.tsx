import Link from "next/link"
import MovingCards from "@/components/MovingCards"
import Faq from "@/components/Faq"


function Hero() {
    return (
        <div className="w-full min-h-screen pt-28 max-md:pt-15 px-20 max-md:px-7">
            <div className="text-white font-medium text-left text-2xl sm:text-3xl md:text-4xl leading-snug ml-7 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
                A platform where developers showcase projects and raise funds
            </div>
            <div className="mt-5 flex items-center">
                <Link href="/signin" className="relative inline-block font-semibold ml-7 flex-shrink-0 group">
                    <span className="block rounded-lg p-[1.55px] transition-all duration-300 group-hover:scale-105 border-2 border-[#FEB57F] hover:border-[#FF8162]">
                        <span className="block rounded-md bg-black/40 px-5 py-2 text-gray-200 transition-colors duration-300 group-hover:text-white">
                            List your project
                        </span>
                    </span>
                </Link>
                <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg text-slate-300 pl-10 text-base sm:text-lg md:text-xl tracking-wide leading-relaxed">The place to showcase tech projects and raise fund or invest in project ideas.</div>
            </div>
            <div className="mt-45 text-5xl max-sm:text-3xl max-md:text-4xl font-bold tracking-tight leading-normal text-center bg-gradient-to-b from-green-300 to-green-400 bg-clip-text text-transparent">
                Raise Fund for Your Project
            </div>
            <div className="flex justify-center mt-3">
            <div className="relative rounded-full px-5 py-2 border border-zinc-700/50 bg-zinc-900/50 backdrop-blur-sm inline-flex max-w-max">
                <div className="pointer-events-none absolute inset-0 rounded-[inherit] border-[2.5px] border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]">
                    <div className="absolute aspect-square bg-zinc-500 animate-move" style={{ width: '20px', offsetPath: 'rect(0px auto auto 0px round 20px)', boxShadow:'rgba(255, 255, 255, 0.5) 0px 0px 20px 20px, rgba(0, 0, 0, 0.5) 0px 0px 20px 20px, rgba(0, 0, 0, 0.5) 0px 0px 24px 18px', }}></div>
                </div>
                <div className="flex justify-center items-center gap-2 text-md text-slate-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-git-fork text-slate-50"><circle cx="12" cy="18" r="3" /><circle cx="6" cy="6" r="3" /><circle cx="18" cy="6" r="3" /><path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9" /><path d="M12 12v3" /></svg>
                    <div>To the developer. For the developer. By the developer.</div>
                </div>
            </div>
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-12 px-10">
                <div className="w-full md:w-7/12">
                    <div className="text-left text-white text-3xl md:text-4xl font-extrabold mb-6">Raise fund to <span className="text-[#FF8162]">Start</span> your project</div>
                    <div className="text-slate-300 mb-8">Connect with people who can support your ideas. Share your project, get advice. Turn your ideas into reality.</div>
                    <div className="space-y-4">
                    <div className="flex gap-3 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock-icon lucide-lock w-6 h-6 text-green-400"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                        <div className="text-slate-300">Secure funding with tailored pitches and proposals</div>
                    </div>
                    <div className="flex gap-3 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-icon lucide-user w-6 h-6 text-green-400"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        <div className="text-slate-300">Receive expert advice from top mentors in your domain</div>
                    </div>
                    <div className="flex gap-3 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-loader-icon lucide-loader w-6 h-6 text-green-400"><path d="M12 2v4"/><path d="m16.2 7.8 2.9-2.9"/><path d="M18 12h4"/><path d="m16.2 16.2 2.9 2.9"/><path d="M12 18v4"/><path d="m4.9 19.1 2.9-2.9"/><path d="M2 12h4"/><path d="m4.9 4.9 2.9 2.9"/></svg>
                        <div className="text-slate-300">Set clear milestones for your project and track progress easily</div>
                    </div>
                    </div>
                    <div className="mt-6">
                    <Link href={'/signup'} className="inline-flex text-black bg-[#D69B6F] flex items-center gap-3 rounded-md hover:bg-[#FEB57F] px-6 py-3 font-semibold cursor-pointer">Start Your Journey <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-up-icon lucide-trending-up w-5 h-5 text-black"><path d="M16 7h6v6"/><path d="m22 7-8.5 8.5-5-5L2 17"/></svg></Link>
                    </div>
                </div>
                <div className="w-full md:w-5/12 p-6 bg-gray-500/20 border border-[#FF8162] rounded-md text-lg font-medium cursor-pointer hover:scale-100 hover:-translate-y-2 transition-transform duration-300">
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
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-icon lucide-user text-green-400"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                <div className="text-white">Verified user</div>
                            </div>
                            <div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-toggle-right-icon lucide-toggle-right text-red-400"><circle cx="15" cy="12" r="3"/><rect width="20" height="14" x="2" y="5" rx="7"/></svg></div>
                        </div>
                        <div className="flex mb-3 justify-between">
                            <div className="flex gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-off-icon lucide-eye-off text-green-400"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/></svg>
                                <div className="text-white">Close listing</div>
                            </div>
                            <div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-toggle-right-icon lucide-toggle-right text-red-400"><circle cx="15" cy="12" r="3"/><rect width="20" height="14" x="2" y="5" rx="7"/></svg></div>
                        </div>
                        <div className="flex justify-between">
                            <div className="flex gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock-icon lucide-lock text-green-400"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                                <div className="text-white">Hide project</div>
                            </div>
                            <div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-toggle-right-icon lucide-toggle-right text-red-400"><circle cx="15" cy="12" r="3"/><rect width="20" height="14" x="2" y="5" rx="7"/></svg></div>
                        </div>
                        <div className="mt-4 text-green-400 flex justify-center items-center rounded-md p-5 py-2 tracking-wider font-semibold border border-gray-300">Privacy First.</div>
                    </div>
                </div>
            </div>
            <div className="mt-35 text-5xl max-sm:text-3xl max-md:text-4xl font-bold tracking-tight leading-normal text-center bg-gradient-to-b from-green-300 to-green-400 bg-clip-text text-transparent">
                Latest Projects
            </div>
            <div className="text-white">
                <MovingCards />
            </div>
            <div className="text-white">
                <Faq />
            </div>
            <div className="mt-10 text-5xl max-sm:text-3xl max-md:text-4xl font-bold tracking-tight leading-normal text-center bg-gradient-to-b from-green-300 to-green-400 bg-clip-text text-transparent">
                Feedback & Review
            </div>
            <div className="px-4 mt-10 bg-gray-400/20 border border-gray-100/10 rounded-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-10">
       
                    <div className="glass-card h-[230px] w-full max-w-[265px] flex flex-col items-start justify-between p-4 mx-auto bg-gray-950 border border-gray-100/10 rounded-lg cursor-pointer hover:scale-110 hover:-translate-y-2 transition-transform duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-quote-icon lucide-quote my-2 text-blue-400"><path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/><path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/></svg>
                        <p className="text-sm text-left">
                            I really like how this project funding idea works. It makes things easier for people like me who want to support projects without too much confusion.
                        </p>
                        <div className="flex items-center self-start">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-icon lucide-user my-2 text-slate-400"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                            <span className="text-xs pl-4 font-semibold text-slate-100">Amit Kumar</span>
                        </div>
                    </div>

                    <div className="glass-card h-[185px] w-full max-w-[420px] flex flex-col p-4 mx-auto bg-gray-950 border border-gray-100/10 rounded-lg cursor-pointer hover:scale-110 hover:-translate-y-2 transition-transform duration-300">
                        <div className="flex items-center gap-2 mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-icon lucide-user my-2 mb-1 text-orange-400"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                            <span className="text-xs font-semibold text-slate-100">Ravi Shankar</span>
                        </div>
                        <p className="text-sm flex-1 text-left">
                            This project funding idea is impressive. It helps small creators gain real support while keeping things simple and open for everyone to understand easily.
                        </p>
                        <div className="flex gap-6 mt-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-thumbs-up-icon lucide-thumbs-up text-slate-400"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-square-more-icon lucide-message-square-more text-slate-400"><path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/><path d="M12 11h.01"/><path d="M16 11h.01"/><path d="M8 11h.01"/></svg>
                        </div>
                    </div>

                    <div className="glass-card h-[230px] w-full max-w-[265px] flex flex-col items-start justify-between p-4 mx-auto bg-gray-950 border border-gray-100/10 rounded-lg cursor-pointer hover:scale-110 hover:-translate-y-2 transition-transform duration-300">
                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-quote-icon lucide-quote my-2 text-blue-400"><path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/><path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/></svg>
                        <p className="text-sm text-left">
                            The funding process is easy to follow. I think this project will encourage many new ideas and creators to grow.
                        </p>
                        <div className="flex items-center self-start">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-icon lucide-user my-2 text-slate-400"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                            <span className="text-xs pl-4 font-semibold text-slate-100">Suresh Reddy</span>
                        </div>
                    </div>


                    <div className="glass-card h-[130px] w-full max-w-[420px] flex flex-col p-4 col-span-1 sm:col-span-2 lg:col-span-3 mx-auto bg-gray-950 border border-gray-100/10 rounded-lg cursor-pointer hover:scale-110 hover:-translate-y-2 transition-transform duration-300">
                        <div className="flex items-center gap-2 mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-icon lucide-user my-2 mb-1 text-orange-400"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                            <span className="text-xs font-semibold text-slate-100">Priya Singh</span>
                        </div>
                        <p className="text-sm flex-1 text-left">
                            A very helpful funding platform that supports new ideas.
                        </p>
                        <div className="flex gap-6 mt-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-thumbs-up-icon lucide-thumbs-up text-slate-400"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-square-more-icon lucide-message-square-more text-slate-400"><path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/><path d="M12 11h.01"/><path d="M16 11h.01"/><path d="M8 11h.01"/></svg>
                        </div>
                    </div>

                    <div className="glass-card h-[230px] w-full max-w-[265px] flex flex-col items-start justify-between p-4 mx-auto bg-gray-950 border border-gray-100/10 rounded-lg cursor-pointer hover:scale-110 hover:-translate-y-2 transition-transform duration-300">
                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-quote-icon lucide-quote my-2 text-blue-400"><path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/><path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/></svg>
                        <p className="text-sm text-left">
                            Simple, clear, and useful for both creators and supporters. I think this project funding model can help many people move forward with their creative plans.
                        </p>
                        <div className="flex items-center self-start">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-icon lucide-user my-2 text-slate-400"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                            <span className="text-xs pl-4 font-semibold text-slate-100">Neha Sharma</span>
                        </div>
                    </div>

                    <div className="glass-card h-[170px] w-full max-w-[420px] flex flex-col p-4 mx-auto bg-gray-950 border border-gray-100/10 rounded-lg cursor-pointer hover:scale-110 hover:-translate-y-2 transition-transform duration-300">
                        <div className="flex items-center gap-2 mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-icon lucide-user my-2 mb-1 text-orange-400"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                            <span className="text-xs font-semibold text-slate-100">Vikas Patil</span>
                        </div>
                        <p className="text-sm text-left">
                            The funding process is easy to follow. I think this project will encourage many new ideas and creators to grow.
                        </p>
                        <div className="flex gap-6 mt-2">
                             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-thumbs-up-icon lucide-thumbs-up text-slate-400"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-square-more-icon lucide-message-square-more text-slate-400"><path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/><path d="M12 11h.01"/><path d="M16 11h.01"/><path d="M8 11h.01"/></svg>
                        </div>
                    </div>

                    <div className="glass-card h-[230px] w-full max-w-[265px] flex flex-col items-start justify-between p-4 mx-auto bg-gray-950 border border-gray-100/10 rounded-lg cursor-pointer hover:scale-110 hover:-translate-y-2 transition-transform duration-300">
                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-quote-icon lucide-quote my-2 text-blue-400"><path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/><path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/></svg>
                        <p className="text-sm text-left">
                            What I love most is the transparency. The funding system looks secure, and it’s really easy for anyone to join and start supporting meaningful projects.
                        </p>
                        <div className="flex items-center self-start">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-icon lucide-user my-2 text-slate-400"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                            <span className="text-xs pl-4 font-semibold text-slate-100">Anita Desai</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero