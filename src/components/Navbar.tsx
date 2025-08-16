"use client"

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

  return (
    <div className={`fixed top-6 border-2 border-white/40 bg-white/10 backdrop-blur-xl rounded-xl z-50 overflow-hidden transition-all duration-600 ease-in-out ${isScrolled ? "inset-x-30" : "inset-x-8"}`}>
        <div className="flex justify-between items-center p-4 lg:p-8 h-22">
            <div className="h-20 flex justify-between items-center cursor-pointer">
                <Image src='/logo.svg' alt="project-funding" width={45} height={45} className="md:min-w-10 md:min-h-10" />
                <div className={`ml-2 text-3xl text-slate-100 font-semibold transition-all duration-600 ease-in-out ${isScrolled ? "lg:opacity-0 lg:w-0 lg:overflow-hidden" : "opacity-100 w-auto"}`}>ProjectFunding</div>
            </div>
            <button className="lg:hidden text-slate-200 hover:text-slate-50 cursor-pointer" onClick={toggleMenu}>
                {isMenuOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu-icon lucide-menu"><path d="M4 12h16"/><path d="M4 18h16"/><path d="M4 6h16"/></svg>
                )}
            </button>
            <div className="hidden lg:flex justify-between items-center gap-4 ml-10 cursor-pointer">
                <div className="text-slate-300 hover:text-slate-50 transition-all duration-300 ease-in-out">Updates</div>
                <div className="text-slate-300 hover:text-slate-50 transition-all duration-300 ease-in-out">Demo</div>
                <div className="text-slate-300 hover:text-slate-50 transition-all duration-300 ease-in-out">Docs</div>
                <div className="text-slate-300 hover:text-slate-50 transition-all duration-300 ease-in-out">Contact</div>
            </div>
            <div className="hidden lg:flex justify-between items-center gap-6 transition-all duration-300 ease-in-out ml-auto">
                <Link href={'https://github.com/ashishxjhaa'}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github-icon lucide-github text-slate-300 hover:text-slate-50"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                </Link>
                <Link href={'https://x.com/ashishxjha'}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter-icon lucide-twitter text-slate-300 hover:text-slate-50"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                </Link>
            </div>
            <Link href="/" className="relative hidden lg:inline-block font-semibold ml-7 flex-shrink-0 group">
                <span className="block rounded-md lg:p-[1.55px] transition-all duration-300 group-hover:scale-105" style={{background: 'linear-gradient(to right, white, green, black, white)'}}>
                    <span className="block rounded-md bg-gray-950 px-5 py-2 text-gray-200 transition-colors duration-300 group-hover:bg-gray-800 group-hover:text-white">
                        Raise Fund
                    </span>
                </span>
            </Link>
        </div>
        {isMenuOpen && (
        <div className="lg:hidden flex flex-col items-start p-4 border-t-2 border-white/40 bg-white/10 backdrop-blur-xl">
          <div className="flex flex-col gap-4 w-full">
            <div className="text-slate-200 cursor-pointer">Updates</div>
            <div className="text-slate-200 cursor-pointer">Demo</div>
            <div className="text-slate-200 cursor-pointer">Docs</div>
            <div className="text-slate-200 cursor-pointer">Contact</div>
            <div className="flex gap-6">
              <Link href={'https://github.com/ashishxjhaa'}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github-icon lucide-github text-slate-300 hover:text-slate-50"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              </Link>
              <Link href={'https://x.com/ashishxjha'}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter-icon lucide-twitter text-slate-300 hover:text-slate-50"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </Link>
            </div>
            <Link href="/" className="relative font-semibold">
              <span className="block rounded-md p-[1.55px]" style={{background: 'linear-gradient(to right, white, green, black, white)'}}>
                <span className="block rounded-md bg-gray-950 px-4 py-2 text-sm text-center">
                  List Your Project
                </span>
              </span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar