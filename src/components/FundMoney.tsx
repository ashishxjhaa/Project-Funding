"use client"

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface FundMoneyProps {
  projectId: string | null;
  onClose: () => void;
  onSuccess: (amount: number) => void;
}

function FundMoney({ projectId, onClose, onSuccess }: FundMoneyProps) {
  const [amount, setAmount] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  const handleProceed = async () => {
    const value = parseInt(amount, 10);
    if (!value || value <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    try {
      await axios.post(`/api/listings/${projectId}/fund`, { amount: value });
      toast.success("Thanks for funding!");
      onSuccess(value);
      onClose();
    } catch (err) {
      toast.error("Insufficient Amount.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center min-h-screen pt-12 bg-black/40">
      <div
        ref={menuRef}
        className="relative bg-[#2C2024] rounded-xl p-6 w-[90%] max-w-md border border-gray-600"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="font-semibold text-lg text-white tracking-wide">
            Enter Amount
          </div>
          <button
            onClick={onClose}
            className="p-1 bg-[#D69B6F] hover:bg-[#FEB57F] rounded-full cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x-icon lucide-x text-black"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        <div className="bg-[#43383E] rounded-md p-2 px-3">
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={amount}
            onChange={(e) => {
              if (/^\d*$/.test(e.target.value)) {
                setAmount(e.target.value);
              }
            }}
            placeholder="Enter amount (₹)"
            className="w-full mt-1 p-2 mb-2 rounded-md border-2 border-gray-400 focus:outline-none"
          />
        </div>

        <button
          onClick={handleProceed}
          className="hover:bg-[#D69B6F] bg-[#FEB57F] font-semibold tracking-wide rounded-md py-2 cursor-pointer text-black w-full"
        >
          Proceed
        </button>
      </div>
    </div>
  );
}

export default FundMoney;
