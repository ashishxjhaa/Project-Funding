import Link from "next/link";

function Footer() {
  return (
      <div className="w-full mt-5 bg-gray-900 py-10 border-t border-white/10 h-fit items-start flex px-20 justify-between z-50 max-md:p-6 max-md:gap-5 max-md:flex-col">
  
        <div className="flex flex-col">
          <div className="flex items-center gap-1 mb-2 max-md:mb-1">
            <Link href="/" className="text-stone-50 text-xl font-extrabold">
              ProjectFunding
            </Link>
           </div> 
            <p className="text-base text-white/50 mb-1 max-md:leading-tight max-md:text-xs max-md:mb-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-copyright mr-1 text-white/50 inline max-md:w-3 max-md:m-0 max-md:mr-0.5"><circle cx="12" cy="12" r="10"/><path d="M14.83 14.83a4 4 0 1 1 0-5.66"/></svg>
              2026 ProjectFunding Private Limited
            </p>
            <p className="text-white/50 text-base max-md:text-xs">
              All rights reserved
            </p>
          </div>

          <div className="flex gap-20 max-md:gap-11">
            <div>
              <p className="text-stone-50 font-bold max-md:text-sm">PAGES</p>
              <div className="flex flex-col text-white/50 max-md:w-24">
                <Link href={"/"} className="text-sm hover:text-zinc-300 transition-colors duration-200 max-md:text-[11px]">
                  Home
                </Link>
                <Link href={"/signup"} className="text-sm hover:text-zinc-300 transition-colors duration-200 max-md:text-[11px]">
                  Register
                </Link>
                <Link href={"/listing"} className="text-sm hover:text-zinc-300 transition-colors duration-200 max-md:text-[11px]">
                  Listing Page
                </Link>
              </div>
            </div>
          
            <div>
              <p className="text-stone-50 font-bold max-md:text-sm">LEGAL</p>
              <div className="flex flex-col text-white/50">
                <Link href={"/privacy-policy"} className="text-sm hover:text-zinc-300 transition-colors duration-200 max-md:text-[11px]">
                  Privacy Policy
                </Link>
                <Link href={"/terms&condition"} className="text-sm hover:text-zinc-300 transition-colors duration-200 max-md:text-[11px] max-md:leading-tight">
                  Terms and Conditions
                </Link>
              </div>
            </div>

            <div>
              <p className="text-stone-50 font-bold max-md:text-sm">CONNECT</p>
              <div className="flex flex-col text-white/50">
                <a href="https://github.com/ashishxjhaa" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-zinc-300 transition-colors duration-200 max-md:text-xs">
                  Github
                </a>
                <a href="https://x.com/ashishxjha" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-zinc-300 transition-colors duration-200 max-md:text-xs">
                  Twitter
                </a>
              </div>
            </div>
        </div>
      </div>
);
}

export default Footer;