import Link from "next/link"


function Hero() {
    return (
        <div className="w-full min-h-screen pt-28 max-md:pt-15 px-7 max-md:px-7">
            <div className="text-white font-semibold text-left text-2xl sm:text-3xl md:text-4xl leading-snug ml-7 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
                A platform where developers showcase projects and raise funds
            </div>
            <div className="mt-5 flex items-center">
                <Link href="/" className="relative inline-block font-semibold ml-7 flex-shrink-0 group">
                    <span className="block rounded-md p-[1.55px] transition-all duration-300 group-hover:scale-105" style={{background: 'linear-gradient(to right, white, green, black, white)'}}>
                        <span className="block rounded-md bg-gray-950 px-5 py-2 text-gray-200 transition-colors duration-300 group-hover:bg-gray-800 group-hover:text-white">
                            List your project
                        </span>
                    </span>
                </Link>
                <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg text-slate-300 pl-5 text-base sm:text-lg md:text-xl leading-relaxed">A place to showcase their projects and receive support from people who believe in their ideas.</div>
            </div>
            <div className="mt-40 text-5xl max-sm:text-3xl max-md:text-4xl font-bold tracking-tight leading-normal text-center bg-gradient-to-b from-green-300 to-green-400 bg-clip-text text-transparent">
                Find Funds for Your Project
            </div>
        </div>
    )
}

export default Hero