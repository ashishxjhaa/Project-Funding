"use client";

import Marquee from "react-fast-marquee";

const projects = [
  { id: 1, title: "Intelligent Customer Support Chatbot", techStack: "(AI/LLM-based)", owner: "Aarav Mehta" },
  { id: 2, title: "Decentralized Identity Verification System", techStack: "(Web3)", owner: "Ishaan Sharma" },
  { id: 3, title: "AI-Powered Resume Screening Tool", techStack: "(HR Tech)", owner: "Rohan Verma" },
  { id: 4, title: "Fraud Detection System", techStack: "(Machine Learning for FinTech)", owner: "Kabir Nair" },
  { id: 5, title: "Real-Time Collaboration Platform", techStack: "(Full-Stack SaaS)", owner: "Aditya Reddy" },
  { id: 6, title: "AI-Based Healthcare Assistant", techStack: "(AI/LLM-based)", owner: "Sahil Bansal" },
  { id: 7, title: "Blockchain Supply Chain Transparency System", techStack: "(Web3)", owner: "Nikhil Iyer" },
  { id: 8, title: "Smart Contract Audit Tool", techStack: "(Web3 Security)", owner: "Rajesh Patel" },
  { id: 9, title: "Predictive Analytics Dashboard for Businesses", techStack: "(Full-Stack SaaS)", owner: "Amit Khanna" },
  { id: 10, title: "Voice-to-Text Transcription Service", techStack: "(Speech AI)", owner: "Vikram Desai" },
  { id: 11, title: "Personalized Learning Recommendation Engine", techStack: "(EdTech AI)", owner: "Manish Malhotra" },
  { id: 12, title: "IoT-Enabled Smart Home Controller", techStack: "(Full-Stack SaaS)", owner: "Pranav Kapoor" },
  { id: 13, title: "AI-Powered Marketing Campaign Optimizer", techStack: "(AI/LLM-based)", owner: "Deepak Sinha" },
  { id: 14, title: "Virtual Event Management Platform", techStack: "(Full-Stack)", owner: "Arjun Chauhan" },
  { id: 15, title: "Cybersecurity Threat Detection System", techStack: "(ML + Cloud)", owner: "Kunal Joshi" },
];

export default function MovingCards() {

  return (
    <div className="relative overflow-hidden w-full h-[300px] bg-black flex items-center">
      <Marquee pauseOnHover autoFill>
        {projects.map((p, index) => (
          <div key={index} className="mx-3">
          <div className="w-52 sm:w-60 md:w-65 lg:w-65 h-40 sm:h-44 md:h-45 lg:h-45 bg-gray-500/20 border border-gray-600 rounded-md p-4 flex flex-col justify-between text-white hover:scale-90 hover:-translate-y-2 transition-transform duration-300 cursor-pointer">
            <h3 className="text-md font-semibold">{p.title}</h3>
            <div className="text-[#FF8162] font-bold">{p.techStack}</div>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-icon lucide-user my-2 text-slate-300"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <span className="text-sm">{p.owner}</span>
            </div>
          </div>
          </div>
        ))}
        </Marquee>
    </div>
  );
}
