"use client"

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

type AddMoneyProps = {
  onSuccess?: () => void;
};

function AddMoney({ onSuccess }: AddMoneyProps) {
  const [showForm, setShowForm] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null);

  const [upi, setUpi] = useState("");
  const [amount, setAmount] = useState("");

  const handleProceed = async () => {
      const amt = Number(amount);
      if (!upi || !Number.isInteger(amt) || amt < 1) {
        toast.error("Provide valid UPI");
        return;
      }


      try {
        await axios.post("/api/wallet/add", { amount: amt });
        toast.success("Amount added successfully!");
        setShowForm(false);
        setUpi("");
        setAmount("");
        if (onSuccess) onSuccess();
      } catch (err) {
        toast.error("Failed to add money");
      }
  };
  
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowForm(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);


  return (
    <div>
        <div onClick={() => setShowForm(true)} className='flex rounded-lg bg-zinc-600 hover:bg-zinc-700 ml-8 mt-8 px-4 py-2 cursor-pointer'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus-icon lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
          <span className="text-white pl-2 pr-1">Add Money</span>
        </div>
              {showForm && (
                <div onClick={() => setShowForm(false)} className="fixed inset-0 z-50 flex items-center justify-center min-h-screen pt-12">
                  <div onClick={(e) => e.stopPropagation()} className="relative bg-[#2C2024] rounded-xl p-6 w-[90%] max-w-md max-h-[80vh] overflow-y-auto border border-gray-600">
                    <div className="flex items-center justify-between mb-4">
                      <div className="font-semibold text-lg text-white tracking-wide">
                        PROVIDE DETAIL
                      </div>
                      <button onClick={() => setShowForm(false)} className="p-1 bg-[#D69B6F] hover:bg-[#FEB57F] rounded-full cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x text-black"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                      </button>
                    </div>

                  <div className="flex flex-col gap-4">
                    <div className="bg-[#43383E] rounded-md p-2 px-3">
                      <label className="block text-md font-bold text-[#FF8162]">UPI id</label>
                      <input type="text" value={upi ?? ""} onChange={(e) => setUpi(e.target.value)} className="w-full mt-1 p-2 mb-2 rounded-md border-2 border-gray-400 focus:outline-none" />
                    </div>

                    <div className="bg-[#43383E] rounded-md p-2 px-3">
                      <label className="block text-sm font-bold text-[#FF8162]">Amount</label>
                      <input type="text" inputMode="numeric" pattern="[0-9]*" min="1" value={amount} onChange={(e) => { if (/^\d*$/.test(e.target.value)) { setAmount(e.target.value)}}} className="w-full mt-1 p-2 mb-2 rounded-md border-2 border-gray-400 focus:outline-none" />
                    </div>

                    <button onClick={handleProceed} className="hover:bg-[#D69B6F] bg-[#FEB57F] font-semibold tracking-wide rounded-md py-2 cursor-pointer text-black w-full">
                      Proceed
                    </button>
                  </div>
                </div>
              </div>
            )}
        </div>
  )
}

export default AddMoney