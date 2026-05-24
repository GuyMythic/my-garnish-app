"use client";

import { useState, useEffect } from "react";

export default function GuestReviewPage() {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isAnimated, setIsAnimated] = useState<boolean>(false);

  // 1. UPDATED REAL GOOGLE REVIEW OVERLAY TARGET
  const restaurantName = "Rocket Beans";
  const googleMapsUrl = "https://share.google/kbqk7xRboCY8g1Gh7";

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimated(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleRatingSelect = (selectedStars: number) => {
    setRating(selectedStars);
    
    // Redirect 4-5 stars instantly to the live Google Reviews overlay link
    if (selectedStars >= 4) {
      setLoading(true);
      setTimeout(() => {
        window.location.href = googleMapsUrl;
      }, 800);
    }
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;
    setLoading(true);

    try {
      console.log("Routing to private dashboard table logic pipeline:", { rating, feedback });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        /* Import a striking, high-impact sans font for the rocket theme */
        @import url('https://googleapis.com');

        .glogo {
          font-family: 'Playfair Display', serif;
          font-size: 24px;
          font-weight: 900;
          color: #1e4d3a;
          letter-spacing: -0.3px;
        }
        .glogo span {
          color: #5aab82;
        }

        /* 🚀 THE ROCKET BEANS LOGO THEME */
        .rocket-title {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 900;
          font-size: 32px;
          text-transform: uppercase;
          letter-spacing: -1px;
          background: linear-gradient(135deg, #FF3E3E 0%, #D31010 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0px 4px 10px rgba(255, 62, 62, 0.15);
        }

        /* Vibrant high-energy red theme overrides */
        .rocket-accent-bg {
          background: linear-gradient(135deg, #FF3E3E 0%, #B90E0E 100%);
        }
        .rocket-focus:focus-within {
          border-color: #FF3E3E !important;
        }
        .rocket-glow {
          box-shadow: 0 0 25px rgba(255, 62, 62, 0.08);
        }
      `}</style>

      {/* Mobile-First Layout Workspace frame */}
      <main className="min-h-screen bg-gray-50 flex flex-col justify-between px-6 py-12 text-black">
        
        {/* Dynamic Card Container with specific Rocketship styling configurations */}
        <div className={`w-full max-w-md mx-auto my-auto bg-white rounded-3xl p-8 shadow-[0_0_20px_rgba(0,0,0,0.03)] rocket-glow transform transition-all duration-700 ease-out
          ${isAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          {/* Header Section: Garnish Platform Token Branding */}
          <div className="text-center mb-6">
            <h1 className="glogo mb-1">Garnish<span>.</span></h1>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Verified Portal</p>
          </div>

          {!isSubmitted ? (
            <div className="space-y-6">
              
              {/* 🚀 Customized Rocketship Theme Brand Display Element */}
              <div className="text-center space-y-2 border-t border-b border-gray-100 py-6">
                <p className="text-xs font-black tracking-widest uppercase text-gray-400 animate-pulse">Launching Into Coffee Extravagance</p>
                <h2 className="rocket-title tracking-tighter">{restaurantName}</h2>
                <p className="text-sm text-gray-500 max-w-xs mx-auto">How was your journey through our flavor atmosphere today?</p>
              </div>

              {/* Star Interface Module */}
              <div className="flex items-center justify-center space-x-2 py-2">
                {[1, 2, 3, 4, 5].map((starIndex) => {
                  const isActive = starIndex <= (hoverRating || rating);
                  return (
                    <button
                      key={starIndex}
                      type="button"
                      disabled={loading || (rating >= 4)}
                      onMouseEnter={() => setHoverRating(starIndex)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => handleRatingSelect(starIndex)}
                      className={`text-4xl p-1 transition-all duration-150 transform hover:scale-110 active:scale-95 focus:outline-none disabled:opacity-40
                        ${isActive ? "text-amber-400 scale-105" : "text-gray-200"}`}
                    >
                      ★
                    </button>
                  );
                })}
              </div>

              {/* 4-5 Star Redirection Splash Panel Layer */}
              {rating >= 4 && (
                <div className="text-center p-4 bg-red-50 rounded-xl border border-red-100 animate-pulse">
                  <p className="text-red-900 font-bold text-sm">Incredible! Rocketing you directly to our Google Review station...</p>
                </div>
              )}

              {/* 1-3 Star Smart Intercept Form System Guardrail Frame */}
              {rating > 0 && rating <= 3 && (
                <form onSubmit={handleFeedbackSubmit} className="space-y-4 pt-4 animate-fadeIn">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Houston, we have a problem. Tell us what fell short so we can recalibrate:
                    </label>
                    <div className="w-full border border-gray-300 rounded-2xl bg-white shadow-sm overflow-hidden rocket-focus p-2">
                      <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Your feedback goes directly to Gary Thompson's private desk..."
                        rows={4}
                        required
                        disabled={loading}
                        className="w-full bg-transparent text-black outline-none p-2 text-sm resize-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !feedback.trim()}
                    className="w-full rocket-accent-bg h-11 rounded-[30px] text-white font-bold tracking-wide uppercase text-xs hover:opacity-90 transition-opacity shadow-md disabled:opacity-40"
                  >
                    {loading ? "Transmitting..." : "Send Private Message"}
                  </button>
                </form>
              )}
            </div>
          ) : (
            /* Intercept Success View State */
            <div className="text-center space-y-4 py-6">
              <div className="w-16 h-16 bg-red-50 border border-red-100 text-red-600 flex items-center justify-center rounded-full mx-auto text-2xl font-bold">
                ✓
              </div>
              <h2 className="text-xl font-bold text-gray-900">Transmission Complete</h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                Your coordinates have been received. Gary Thompson and the operational staff are reviewing your report immediately to fix the issues.
              </p>
            </div>
          )}
        </div>

        {/* Footer tracking framework elements */}
        <footer className="text-center text-[10px] text-gray-400 font-medium tracking-wide">
          Powered by Garnish. Secure Reputation Protection Guardrails.
        </footer>
      </main>
    </>
  );
}
