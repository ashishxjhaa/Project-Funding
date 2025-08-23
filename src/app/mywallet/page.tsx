"use client"

import AddMoney from "@/components/AddMoney"
import Back from "@/components/Back"
import ProfileNavbar from "@/components/ProfileNavbar"


function MyWallet() {

  return (
    <div className="bg-[#2C2024] min-h-screen">
        <ProfileNavbar />

        <div className="pt-30 pr-10 flex justify-between">
        <Back />
        <AddMoney />
      </div>
        
        <div className="w-full px-25 py-10">
            <div className="flex justify-center">
                <div className="flex flex-col items-center gap-8 rounded-xl bg-[#392E34] px-14 py-4 border border-[#FF8162] shadow-md shadow-white/50">
                    <div className="flex justify-center items-center gap-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-wallet-icon lucide-wallet text-white"><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/></svg>
                        <div className="font-bold text-2xl text-green-400 tracking-wider">
                            Your Balance
                        </div>
                    </div>
                    <div className="flex flex-row gap-1 text-3xl font-bold tracking-wider text-white">
                        ₹ {2000}.00 <span className="flex items-end text-sm text-slate-200 pl-2">Available</span>
                    </div>
                </div>
            </div>
        </div>

        <div className="w-full px-25 py-10 pb-20">
            <div className="flex flex-col items-center gap-8 rounded-xl bg-[#392E34] px-14 py-4 pb-10 border border-gray-600">
                <div className="w-full text-left font-bold pt-2 text-xl text-[#FF8162] tracking-wider">
                    Recent Transactions
                </div>
                <div className="w-full flex flex-col gap-4">
                    <div className="flex justify-between items-center bg-[#2C2024] rounded-lg px-4 py-3 border border-gray-600">
                        <div>
                            <div className="text-white font-semibold">Credit</div>
                            <div className="text-xs text-gray-400">Mon, 18 Aug 2025</div>
                        </div>
                        <div className="text-right">
                            <div className="text-green-400 font-bold">+ ₹500.00</div>
                            <div className="text-xs text-gray-300">Success</div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center bg-[#2C2024] rounded-lg px-4 py-3 border border-gray-600">
                        <div>
                            <div className="text-white font-semibold">Debit</div>
                            <div className="text-xs text-gray-400">Tue, 19 Aug 2025</div>
                        </div>
                        <div className="text-right">
                            <div className="text-red-400 font-bold">- ₹200.00</div>
                            <div className="text-xs text-gray-300">Failed</div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center bg-[#2C2024] rounded-lg px-4 py-3 border border-gray-600">
                        <div>
                            <div className="text-white font-semibold">Credit</div>
                            <div className="text-xs text-gray-400">Wed, 20 Aug 2025</div>
                        </div>
                        <div className="text-right">
                            <div className="text-green-400 font-bold">+ ₹1200.00</div>
                            <div className="text-xs text-gray-300">Success</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MyWallet