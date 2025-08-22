"use client"

import { useState } from "react";
import Back from "@/components/Back";
import ProfileNavbar from "@/components/ProfileNavbar";

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-gray-600 bg-[#392E34]">
        <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-4 py-3 font-semibold text-lg text-left text-[#FF8162] hover:bg-[#2C2024] hover:rounded-xl transition-all cursor-pointer">
            <div className="flex items-center gap-3 text-[#FEB57F]">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-help-circle text-white"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12" y2="17" /></svg>
                {question}
            </div>
            <span className="text-gray-100">{open ? "−" : "+"}</span>
        </button>

        {open && (
            <div className="px-6 pt-2 pb-4 text-gray-300 text-sm font-bold transition-all">
                {answer}
            </div>
        )}
    </div>
  );
}

function HelpSupport() {
  const faqs = [
    {
      q: "How to fund a project?",
      a: "Go to the Project Page, click the 'Fund Now' button, choose an amount, and confirm your payment.",
    },
    {
      q: "How to withdraw funds?",
      a: "Go to your Profile > Wallet > Withdraw, put you account detail or upi id then withdraw now.",
    },
    {
      q: "How long does it take to receive funds?",
      a: "Withdrawals usually take 5-8 hrs depending on your payment provider.",
    },
    {
      q: "What's your future plan for this project?",
      a: "Well we have multiple plan to expand this project, upgrade DB to postgress, developer can able to upload project image even set profile image, and improved fraud detection.",
    },
    {
      q: "What's your personal email?",
      a: "Use ashishxyzjha@gmail.com later we'll use project related email.",
    },
    {
      q: "Want to report bugs, fake projects, or suspicious activity?",
      a: "You can directly reach out to me on X @ashishxjha later we allow developers can report as well.",
    },
  ];

  return (
    <div className="bg-[#2C2024] w-full min-h-screen">
        <ProfileNavbar />
        <div className="pt-30 pr-10 flex justify-between">
            <Back />
        </div>

        <div className="w-full max-w-3xl mx-auto px-6 py-10 space-y-5">
            <div className="flex justify-center">
                <div className="flex items-center gap-8 rounded-xl bg-[#392E34] px-10 py-4 border border-[#FF8162]">
                    <div className="font-semibold text-lg text-[#FF8162] tracking-wider">
                        Help & Support
                    </div>
                </div>
            </div>

            {faqs.map((item, i) => (
                <FAQItem key={i} question={item.q} answer={item.a} />
            ))}
        </div>
    </div>
  );
}

export default HelpSupport;
