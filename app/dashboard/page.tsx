"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const router = useRouter();
  
  // Interface and data states
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAnimated, setIsAnimated] = useState(false);

  // AI Review Feature States
  const [review, setReview] = useState<string>('');
  const [tone, setTone] = useState<string>('friendly');
  const [response, setResponse] = useState<string>('');
  const [aiLoading, setAiLoading] = useState<boolean>(false);

  // Fetch user session data on load
  useEffect(() => {
    async function getUserData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email ?? "User");
      }
      setLoading(false);
      setTimeout(() => {
        setIsAnimated(true);
      }, 50);
    }
    getUserData();
  }, []);

  // Handle Log Out Action
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  // Submit Review to Your AI Engine Backend Route
  const handleAiSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!review.trim()) return;
    setAiLoading(true);
    setResponse('');
    
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ review, tone }),
      });
      const data = await res.json();
      if (data.error) {
        setResponse(`Error: ${data.error}`);
      } else {
        setResponse(data.text);
      }
    } catch (err) {
      setResponse('An unexpected error occurred.');
    } finally {
      setAiLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500 font-medium animate-pulse">Loading Garnish Dashboard...</p>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .glogo {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          font-weight: 900;
          color: #1e4d3a;
          letter-spacing: -0.3px;
        }
        .glogo span {
          color: #5aab82;
        }
        .accent-bar {
          background-color: #1E4D39;
        }
        .login-button {
          background-color: #1E4D39;
        }
      `}</style>

      {/* Main Dashboard Layout wrapper */}
      <main className={`min-h-screen bg-gray-50 transform transition-all duration-500 ease-out
        ${isAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >
        
        {/* Top Navbar Component */}
        <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
          <h1 className="glogo">Garnish<span>.</span></h1>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600 font-medium hidden sm:inline">
              {userEmail}
            </span>
            <button
              onClick={handleSignOut}
              className="text-xs uppercase font-bold tracking-wider text-red-600 border border-red-200 px-4 py-2 rounded-[30px] bg-red-50 hover:bg-red-100 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </nav>

        {/* Core Dashboard Workspace Content View */}
        <section className="p-6 max-w-7xl mx-auto">
          
          {/* Main Welcome Hero Panel Banner */}
          <header className="accent-bar text-white rounded-2xl p-8 mb-8 shadow-md">
            <h2 className="text-3xl font-bold mb-2">Welcome back!</h2>
            <p className="text-emerald-100 opacity-90">
              Logged in secure portal account access: <span className="font-semibold underline">{userEmail}</span>
            </p>
          </header>

          {/* Two Column Interactive Split for Demo Prettiness */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* LEFT COLUMN: The AI Review Engine Tool Component (Takes 2 blocks width) */}
            <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-8 shadow-[0_0_18.2px_7px_rgba(0,0,0,0.03)]">
              <div className="mb-6">
                <h3 className="text-gray-900 font-bold text-xl">AI Review Responder</h3>
                <p className="text-gray-500 text-sm mt-1">Generate brand-aligned responses tailored to your custom tone profiles.</p>
              </div>

              <form onSubmit={handleAiSubmit} className="space-y-5">
                {/* Tone Select Box Dropdown */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Select Reply Tone:</label>
                  <div className="w-full border border-gray-300 rounded-[30px] bg-white shadow-sm overflow-hidden focus-within:border-emerald-700 px-4 py-1">
                    <select 
                      value={tone} 
                      onChange={(e) => setTone(e.target.value)} 
                      className="w-full bg-transparent text-gray-900 outline-none p-2 text-sm cursor-pointer"
                    >
                      <option value="friendly">Warm & Friendly</option>
                      <option value="professional">Polite & Professional</option>
                      <option value="casual">Casual & Direct</option>
                      <option value="witty">Witty & Enthusiastic</option>
                    </select>
                  </div>
                </div>

                {/* Review Textarea Input Box */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Customer Review:</label>
                  <div className="w-full border border-gray-300 rounded-2xl bg-white shadow-sm overflow-hidden focus-within:border-emerald-700 p-2">
                    <textarea 
                      value={review} 
                      onChange={(e) => setReview(e.target.value)} 
                      placeholder="Paste the customer review from Google or Yelp here..." 
                      rows={5} 
                      className="w-full bg-transparent text-black outline-none p-2 text-sm resize-none"
                      disabled={aiLoading} 
                    />
                  </div>
                </div>

                {/* AI Submission Form Action Button */}
                <div>
                  <button 
                    type="submit" 
                    disabled={aiLoading || !review.trim()} 
                    className="w-full login-button h-11 rounded-[30px] text-white font-medium hover:opacity-90 transition-opacity shadow-sm disabled:opacity-40"
                  >
                    {aiLoading ? 'Generating Response...' : 'Generate Restaurant Reply'}
                  </button>
                </div>
              </form>

              {/* AI Generation Response Display Frame Box */}
              {response && (
                <div className="mt-6 p-5 bg-emerald-50/50 border border-emerald-100 text-black rounded-xl transform transition-all duration-300">
                  <div className="flex items-center justify-between border-b border-emerald-100 pb-2 mb-3">
                    <strong className="text-emerald-900 text-sm font-bold tracking-wide uppercase">Official Draft Response</strong>
                    <span className="text-xs font-semibold bg-emerald-700 text-white px-2.5 py-0.5 rounded-full capitalize">{tone}</span>
                  </div>
                  <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">{response}</p>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: Static Metrics Panel */}
            <div className="space-y-6">
              
              {/* Card 1 */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-gray-900 font-bold text-base">Analytics Summary</h3>
                  <span className="text-xs bg-emerald-50 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">Live</span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">Real-time data feeds mapping out across your connected API access pipelines.</p>
                <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-2 text-center">
                  <div className="bg-gray-50 p-2 rounded-lg">
                    <p className="text-xs text-gray-400">Total Replies</p>
                    <p className="text-lg font-bold text-gray-800">142</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg">
                    <p className="text-xs text-gray-400">Interceptions</p>
                    <p className="text-lg font-bold text-emerald-700">4</p>
                  </div>
                </div>
              </div>

                      {/* Card 2 */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-gray-900 font-bold text-base mb-2">Active Controls</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Manage system constraints, update model parameters, and toggle administrative network controls.</p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-xs font-medium text-gray-600 bg-gray-50 p-2 rounded-lg">
                    <span>Google Profile</span>
                    <span className="text-emerald-600 font-bold">Connected</span>
                  </div>
                  <div className="flex justify-between text-xs font-medium text-gray-600 bg-gray-50 p-2 rounded-lg">
                    <span>Yelp Engine</span>
                    <span className="text-emerald-600 font-bold">Connected</span>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-gray-900 font-bold text-base mb-2">Account Status</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Review user database permission settings, subscription values, and system key expiration dates.</p>
              </div>

            </div>
          </div>
        </section>
      </main>
    </>
  );
}

