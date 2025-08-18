import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"


export default function NotFound() {
  return (
    <div className="w-full h-screen bg-slate-900">
        <Navbar />

        <div className="w-full h-screen flex flex-col items-center pt-48 overflow-x-hidden px-16 max-md:pt-20 max-md:px-7">
        <div className="flex flex-col gap-28 items-center justify-center w-full max-md:pt-14 pb-48">
            <div className="flex flex-col justify-center items-center">
                <h2 className="text-slate-50 text-8xl font-normal max-md:text-[2.9rem] text-center">
                    <div>404</div>
                    <div>Page Not Found</div>
                </h2>
            </div>
        </div>

        <Footer />
        </div>
    </div>
  )
}