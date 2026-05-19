"use client";

import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setLoading(true);
    // Replace this with your real endpoint (Formspree, Supabase, etc.)
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700;1,800;1,900&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        .g-page {
          font-family: 'DM Sans', sans-serif;
          background: #F0EDE4;
          min-height: 100vh;
          color: #1a1a18;
        }

        /* NAV */
        .g-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.1rem 3rem;
          border-bottom: 1px solid rgba(0,0,0,0.08);
          background: rgba(240,237,228,0.9);
          backdrop-filter: blur(12px);
          position: sticky;
          top: 0;
          z-index: 50;
        }
        .g-logo {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          font-weight: 900;
          color: #1e4d3a;
          letter-spacing: -0.3px;
        }
        .g-logo-dot { color: #5aab82; }
        .g-nav-links {
          display: flex;
          align-items: center;
          gap: 2.5rem;
          list-style: none;
          margin: 0; padding: 0;
        }
        .g-nav-links a {
          text-decoration: none;
          color: #666;
          font-size: 14px;
          font-weight: 400;
          transition: color 0.15s;
        }
        .g-nav-links a:hover { color: #1e4d3a; }
        .g-nav-right { display: flex; align-items: center; gap: 0.75rem; }
        .g-btn-login {
          padding: 9px 22px;
          border-radius: 50px;
          border: 1.5px solid #1e4d3a;
          background: transparent;
          color: #1e4d3a;
          font-size: 14px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: background 0.15s, color 0.15s;
        }
        .g-btn-login:hover { background: #1e4d3a; color: #fff; }
        .g-btn-demo {
          padding: 9px 22px;
          border-radius: 50px;
          border: none;
          background: #1e4d3a;
          color: #fff;
          font-size: 14px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: background 0.15s, transform 0.1s;
        }
        .g-btn-demo:hover { background: #163a2c; transform: translateY(-1px); }

        /* HERO */
        .g-hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
          max-width: 1160px;
          margin: 0 auto;
          padding: 5rem 3rem 4rem;
          min-height: calc(100vh - 65px);
        }

        /* LEFT */
        .g-left { display: flex; flex-direction: column; }
        .g-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: #d4ece1;
          color: #1e4d3a;
          font-size: 11px;
          font-weight: 600;
          padding: 5px 13px;
          border-radius: 50px;
          margin-bottom: 1.6rem;
          width: fit-content;
          letter-spacing: 0.2px;
          border: 1px solid rgba(30,77,58,0.12);
          animation: fadeUp 0.5s ease forwards;
        }
        .g-badge-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #5aab82;
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(0.8); }
        }

        .g-h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(48px, 5.5vw, 70px);
          font-weight: 900;
          line-height: 1.04;
          color: #1a1a18;
          letter-spacing: -1.5px;
          margin: 0 0 1.4rem;
          animation: fadeUp 0.6s ease forwards 0.1s;
          opacity: 0;
        }
        .g-h1-italic {
          font-style: italic;
          color: #1e4d3a;
        }
        .g-h1-underline {
          position: relative;
          display: inline-block;
        }
        .g-h1-underline::after {
          content: '';
          position: absolute;
          left: 0; bottom: 4px;
          width: 100%; height: 3px;
          background: #5aab82;
          border-radius: 2px;
        }

        .g-sub {
          font-size: 15px;
          line-height: 1.75;
          color: #555;
          font-weight: 400;
          max-width: 440px;
          margin: 0 0 2rem;
          animation: fadeUp 0.6s ease forwards 0.2s;
          opacity: 0;
        }
        .g-sub strong { color: #1a1a18; font-weight: 600; }

        /* FORM */
        .g-form {
          display: flex;
          gap: 0.5rem;
          animation: fadeUp 0.6s ease forwards 0.3s;
          opacity: 0;
          max-width: 440px;
        }
        .g-input {
          flex: 1;
          padding: 13px 20px;
          border-radius: 50px;
          border: 1.5px solid rgba(0,0,0,0.13);
          background: rgba(255,255,255,0.7);
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          color: #1a1a18;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .g-input::placeholder { color: #bbb; }
        .g-input:focus {
          border-color: #5aab82;
          box-shadow: 0 0 0 3px rgba(90,171,130,0.14);
          background: #fff;
        }
        .g-btn-try {
          padding: 13px 26px;
          border-radius: 50px;
          border: none;
          background: #1e4d3a;
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.15s, transform 0.1s, box-shadow 0.15s;
          position: relative;
          overflow: hidden;
          min-width: 130px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .g-btn-try:hover:not(:disabled) {
          background: #163a2c;
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(30,77,58,0.28);
        }
        .g-btn-try:disabled { opacity: 0.7; cursor: not-allowed; }
        .g-spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.65s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .g-form-note {
          font-size: 11.5px;
          color: #aaa;
          font-weight: 300;
          margin-top: 0.65rem;
          animation: fadeUp 0.6s ease forwards 0.35s;
          opacity: 0;
        }

        /* SUCCESS */
        .g-success {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          max-width: 440px;
          animation: fadeUp 0.5s ease forwards;
        }
        .g-success-icon {
          width: 48px; height: 48px;
          border-radius: 50%;
          background: #d4ece1;
          border: 1px solid rgba(30,77,58,0.15);
          display: flex; align-items: center; justify-content: center;
          font-size: 22px;
        }
        .g-success-title {
          font-family: 'Playfair Display', serif;
          font-size: 24px;
          font-weight: 900;
          color: #1e4d3a;
          line-height: 1.2;
        }
        .g-success-sub {
          font-size: 14px;
          color: #666;
          font-weight: 300;
          line-height: 1.65;
        }

        /* FEATURES */
        .g-features {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem 1.6rem;
          margin-top: 2rem;
          animation: fadeUp 0.6s ease forwards 0.45s;
          opacity: 0;
        }
        .g-feat {
          display: flex; align-items: center; gap: 7px;
          font-size: 12.5px; color: #777;
        }
        .g-feat-dot {
          width: 5px; height: 5px;
          border-radius: 50%; background: #5aab82; flex-shrink: 0;
        }

        /* SOCIAL PROOF */
        .g-social {
          display: flex; align-items: center; gap: 10px;
          margin-top: 1.5rem;
          animation: fadeUp 0.6s ease forwards 0.5s;
          opacity: 0;
        }
        .g-avs { display: flex; }
        .g-av {
          width: 28px; height: 28px;
          border-radius: 50%;
          border: 2px solid #F0EDE4;
          display: flex; align-items: center; justify-content: center;
          font-size: 9px; font-weight: 700; color: #fff;
          margin-right: -7px;
        }
        .g-social-txt {
          font-size: 12px; color: #888; padding-left: 10px;
        }
        .g-social-txt strong { color: #1a1a18; font-weight: 500; }

        /* RIGHT — DASHBOARD MOCKUP */
        .g-right {
          animation: fadeUp 0.7s ease forwards 0.2s;
          opacity: 0;
        }
        .g-mockup {
          background: #fff;
          border-radius: 20px;
          padding: 1.3rem;
          box-shadow: 0 4px 48px rgba(0,0,0,0.10), 0 1px 0 rgba(0,0,0,0.05);
        }
        .g-mock-bar {
          display: flex; gap: 5px; margin-bottom: 1rem;
        }
        .g-mock-bar span {
          width: 10px; height: 10px; border-radius: 50%;
        }
        .g-mock-label {
          font-size: 10px; font-weight: 700;
          color: #bbb; text-transform: uppercase;
          letter-spacing: 1.2px; margin-bottom: 0.8rem;
        }

        /* Review cards */
        .g-rev {
          border: 1px solid #eee;
          border-radius: 12px;
          padding: 0.9rem;
          margin-bottom: 0.7rem;
          background: #fafafa;
        }
        .g-rev-top {
          display: flex; justify-content: space-between;
          align-items: center; margin-bottom: 0.35rem;
        }
        .g-rev-name {
          font-size: 13px; font-weight: 600; color: #1a1a18;
        }
        .g-rev-source {
          font-size: 10px; color: #aaa;
          background: #f0f0f0; padding: 2px 7px;
          border-radius: 4px; margin-left: 5px;
          font-weight: 400;
        }
        .g-stars-pos { color: #f5a623; font-size: 12px; letter-spacing: 1px; }
        .g-stars-neg { color: #e05c4a; font-size: 12px; letter-spacing: 1px; }
        .g-rev-txt {
          font-size: 12px; color: #777;
          line-height: 1.5; margin-bottom: 0.65rem;
          font-style: italic;
        }

        .g-reply {
          background: #eef7f2;
          border-left: 3px solid #1e4d3a;
          border-radius: 0 8px 8px 0;
          padding: 0.6rem 0.8rem;
        }
        .g-reply-lbl {
          font-size: 9px; font-weight: 700;
          color: #1e4d3a; text-transform: uppercase;
          letter-spacing: 0.6px; margin-bottom: 3px;
        }
        .g-reply-txt {
          font-size: 12px; color: #555; line-height: 1.5;
        }
        .g-ai-tag {
          display: inline-flex; align-items: center; gap: 4px;
          background: #1e4d3a; color: #d4ece1;
          font-size: 10px; padding: 3px 9px;
          border-radius: 50px; margin-top: 6px;
          font-weight: 500;
        }

        .g-flag {
          background: #fff5f3;
          border-left: 3px solid #e05c4a;
          border-radius: 0 8px 8px 0;
          padding: 0.55rem 0.75rem;
          margin-bottom: 0.5rem;
        }
        .g-flag-lbl {
          font-size: 9px; font-weight: 700;
          color: #c0392b; text-transform: uppercase;
          letter-spacing: 0.6px; margin-bottom: 2px;
        }
        .g-flag-txt { font-size: 11px; color: #888; }

        .g-sms {
          background: #1e4d3a;
          border-radius: 8px;
          padding: 0.6rem 0.8rem;
          display: flex; align-items: center; gap: 8px;
        }
        .g-sms-badge {
          background: #d4ece1; color: #1e4d3a;
          font-size: 10px; font-weight: 700;
          padding: 3px 7px; border-radius: 5px;
          flex-shrink: 0;
        }
        .g-sms-txt { font-size: 11px; color: #a8d4bf; line-height: 1.4; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* RESPONSIVE */
        @media (max-width: 860px) {
          .g-nav { padding: 1rem 1.5rem; }
          .g-nav-links { display: none; }
          .g-hero {
            grid-template-columns: 1fr;
            padding: 3rem 1.5rem 3rem;
            min-height: auto;
            gap: 2.5rem;
          }
          .g-h1 { font-size: 44px; }
          .g-form { flex-direction: column; max-width: 100%; }
          .g-input { width: 100%; }
          .g-btn-try { width: 100%; }
        }
      `}</style>

      <div className="g-page">
        {/* NAV */}
        <nav className="g-nav">
          <div className="g-logo">
            Garnish<span className="g-logo-dot">.</span>
          </div>
          <ul className="g-nav-links">
            <li><a href="#">How it works</a></li>
            <li><a href="#">Features</a></li>
            <li><a href="#">Pricing</a></li>
          </ul>
          <div className="g-nav-right">
            <button className="g-btn-login">Login</button>
            <button className="g-btn-demo">Get a Demo</button>
          </div>
        </nav>

        {/* HERO */}
        <section className="g-hero">

          {/* LEFT */}
          <div className="g-left">
            <div className="g-badge">
              <div className="g-badge-dot" />
              AI-powered local SEO for restaurants
            </div>

            <h1 className="g-h1">
              Your<br />
              Reviews.<br />
              Your{" "}
              <span className="g-h1-italic">Rankings.</span>
              <br />
              <span className="g-h1-underline">On Autopilot</span>
            </h1>

            <p className="g-sub">
              Garnish turns guest reviews into a marketing engine —{" "}
              <strong>ranking you higher on Google</strong>, protecting your
              reputation from bad press, and driving real foot traffic through
              your door.
            </p>

            {submitted ? (
              <div className="g-success">
                <div className="g-success-icon">🌿</div>
                <div className="g-success-title">You're on the list.</div>
                <p className="g-success-sub">
                  We'll reach out the moment your spot opens. Early access
                  members get Garnish free for 3 months and a locked-in launch
                  price.
                </p>
              </div>
            ) : (
              <>
                <form className="g-form" onSubmit={handleSubmit}>
                  <input
                    className="g-input"
                    type="email"
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className="g-btn-try"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="g-spinner" />
                    ) : (
                      "Try Garnish"
                    )}
                  </button>
                </form>
                <div className="g-form-note">
                  Free during beta &nbsp;·&nbsp; No credit card &nbsp;·&nbsp; Setup in 5 min
                </div>
              </>
            )}

            <div className="g-features">
              <div className="g-feat"><div className="g-feat-dot" />AI replies in your voice</div>
              <div className="g-feat"><div className="g-feat-dot" />Bad review interception</div>
              <div className="g-feat"><div className="g-feat-dot" />QR loop review generation</div>
              <div className="g-feat"><div className="g-feat-dot" />Monthly SEO reports</div>
            </div>

            <div className="g-social">
              <div className="g-avs">
                <div className="g-av" style={{ background: "#3d9e6e" }}>C</div>
                <div className="g-av" style={{ background: "#1e4d3a" }}>N</div>
                <div className="g-av" style={{ background: "#7ab89a" }}>P</div>
                <div className="g-av" style={{ background: "#2d6e52" }}>J</div>
              </div>
              <div className="g-social-txt">
                <strong>38 restaurant owners</strong> already on the waitlist
              </div>
            </div>
          </div>

          {/* RIGHT — MOCKUP */}
          <div className="g-right">
            <div className="g-mockup">
              <div className="g-mock-bar">
                <span style={{ background: "#ff6057" }} />
                <span style={{ background: "#ffbb2c" }} />
                <span style={{ background: "#28ca41" }} />
              </div>
              <div className="g-mock-label">Live dashboard — The Olive Branch</div>

              {/* 5-star review */}
              <div className="g-rev">
                <div className="g-rev-top">
                  <div className="g-rev-name">
                    Marcus T.
                    <span className="g-rev-source">Google</span>
                  </div>
                  <span className="g-stars-pos">★★★★★</span>
                </div>
                <p className="g-rev-txt">
                  "Incredible pasta, staff made us feel like family. Absolutely coming back!"
                </p>
                <div className="g-reply">
                  <div className="g-reply-lbl">Garnish reply — sent 90 sec ago</div>
                  <div className="g-reply-txt">
                    Thank you so much Marcus! Hearing that means the world to our whole team. We can't wait to welcome you back soon!
                  </div>
                </div>
                <div className="g-ai-tag">✦ Personalized to your menu &amp; voice</div>
              </div>

              {/* 2-star review */}
              <div className="g-rev" style={{ background: "#fff9f8" }}>
                <div className="g-rev-top">
                  <div className="g-rev-name">
                    Linda K.
                    <span className="g-rev-source">Yelp</span>
                  </div>
                  <span className="g-stars-neg">★★☆☆☆</span>
                </div>
                <p className="g-rev-txt">
                  "Service felt slow during our anniversary dinner..."
                </p>
                <div className="g-flag">
                  <div className="g-flag-lbl">Private feedback intercepted</div>
                  <div className="g-flag-txt">Kept off Google — routed to manager</div>
                </div>
                <div className="g-sms">
                  <div className="g-sms-badge">SMS</div>
                  <div className="g-sms-txt">
                    Alert sent to owner + reply draft ready — 1 tap to send
                  </div>
                </div>
              </div>
            </div>
          </div>

        </section>
      </div>
    </>
  );
}
