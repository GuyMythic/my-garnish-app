"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase"; // Imports the client you made above

export default function Page() {
const router = useRouter(); 
  // Input tracking states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Status states
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Interface states
  const [showPassword, setShowPassword] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle Form Submission to Supabase
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevents the browser from reloading the page
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    // Send data to Supabase Authentication
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message); // Displays the error (e.g., "Invalid login credentials")
    } else {
      setSuccessMsg("Logged in successfully! Redirecting...");
      router.push("/dashboard")
      // You can redirect your user here using Next.js useRouter() if needed
    }
  };

  return (
    <>
      <style>{`
        .login-background { background-color: #1E4D39; }
        .login-button { background-color: #1E4D39; }
        .glogo { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 900; color: #1e4d3a; letter-spacing: -0.3px; }
        .glogo span { color: #5aab82; }
        .inputfields { color: #A7A7A7; width: 100%; background: transparent; outline: none; padding: 12px 20px; }
      `}</style>

      {/* Main Container */}
      <main className="grid grid-cols-1 md:grid-cols-6 min-h-screen bg-gray-50"> 
        
        {/* Left Green Section */}
        <section className="hidden md:block login-background md:col-span-4 text-white p-8"></section>

        {/* Right White Section */}
        <section className="bg-white col-span-1 md:col-span-2 p-6 md:p-12 flex flex-col justify-center">
          
          {/* Custom Figma Card with Entry Animation */}
          <div className={`w-full max-w-md mx-auto bg-white rounded-2xl p-8 shadow-[0_0_18.2px_7px_rgba(0,0,0,0.08)]
            transform transition-all duration-700 ease-out
            ${isAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <h2 className="glogo text-center">Garnish<span>.</span></h2>
            <h3 className="text-black text-center pt-1.5">Welcome</h3>
            <p className="text-gray-500 text-center text-sm pt-1.5 mb-6">Login to Garnish to continue</p>

            {/* Error & Success Messages feedback */}
            {errorMsg && <p className="text-red-600 text-sm text-center mb-4 bg-red-50 p-2 rounded-lg">{errorMsg}</p>}
            {successMsg && <p className="text-emerald-700 text-sm text-center mb-4 bg-emerald-50 p-2 rounded-lg">{successMsg}</p>}

            {/* Form submit handler attached */}
            <form onSubmit={handleLogin} className="space-y-4">
              
              {/* Email Input Box */}
              <div className="w-full border border-gray-300 rounded-[30px] bg-white shadow-sm overflow-hidden focus-within:border-emerald-700">
                <input 
                  className="inputfields text-black" 
                  type="email" 
                  placeholder="Enter your email address*" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Captures typing
                />
              </div>

              {/* Password Input Box */}
              <div className="w-full flex items-center border border-gray-300 rounded-[30px] bg-white shadow-sm overflow-hidden focus-within:border-emerald-700 pr-4">
                <input 
                  className="inputfields text-black" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Password*" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Captures typing
                />
                
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="text-gray-400 hover:text-emerald-700 focus:outline-none transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
                  ) : (
                    <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
                  )}
                </button>
              </div>

              {/* Submit Button */}
              <div className="mt-6"> 
                <button 
                  type="submit"
                  disabled={loading} // Disables button while loading so users don't multi-click
                  className="w-full login-button h-10 rounded-[30px] text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {loading ? "Signing in..." : "Login"}
                </button>
              </div>
            </form>

          </div>
        </section>
      </main>
    </>
  );
}
