"use client"

import Back from "@/components/Back";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

function Signin() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      await toast.promise(
        axios.post("/api/signin", formData, { withCredentials: true, }),
        {
          loading: "Signing in...",
          success: () => {
            router.push('/listing');
            return "Signin successful  🎉";
          },
          error: "Signin failed!",
        }
      );
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-1 bg-neutral-900">
      <Back />
      <div className="flex flex-col items-center justify-center sm:p-12">
        <div className="w-full max-w-md">

          <div className="mb-8 text-center">
            <div className="flex flex-col items-center gap-2 group">
              <div className="flex items-center justify-center transition-colors rounded-xl bg-white/10 px-2 py-2 mt-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-check-icon lucide-shield-check text-primary text-green-500"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>
              </div>
              <h1 className="mt-2 text-2xl font-bold text-slate-50">Welcome Back</h1>
              <p className="text-base-content/60 text-slate-400">Sign in to your account</p>
            </div>
          </div>


          <form className="space-y-6" onSubmit={handleSubmit}>
            
            <div>
              <label className="block">
                <span className="text-slate-200 font-medium">Email</span>
              </label>
              <div className="border border-[#FF8162] mt-2 py-3 rounded-md relative">
                <div className="text-slate-50 absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail size-5 text-base-content/40"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                </div>
                <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="text-slate-50 w-full pl-10 focus:outline-none focus:ring-0" placeholder="you@example.com"/>
              </div>
            </div>

            <div>
              <label className="block">
                <span className="text-slate-200 font-medium">Password</span>
              </label>
              <div className="border border-[#FF8162] mt-2 py-3 rounded-md relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-50 lucide lucide-lock size-5 text-base-content/40"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                </div>
                <input type={showPassword ? "text" : "password"} value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="input input-bordered w-full pl-10 text-slate-50 focus:outline-none focus:ring-0" placeholder="••••••••"/>
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-slate-50 absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye size-5 text-base-content/40"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye-off-icon lucide-eye-off"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/></svg>
                  )}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="hover:bg-[#D69B6F] bg-[#FEB57F] font-semibold tracking-wide rounded-md py-3 cursor-pointer text-black w-full">{loading ? "Loading..." : "Sign in"}</button>
          </form>


          <div className="text-center mt-5">
            <p className="text-slate-300">
              {`Don't have an account?`}
              <Link className="text-indigo-400 hover:text-indigo-500 underline underline-offset-1 px-2" href={"/signup"} data-discover="true">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default Signin