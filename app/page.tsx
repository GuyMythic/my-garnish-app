"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setLoading(true);

    const { error } = await supabase
      .from("waitlist")
      .insert([{ email }]);

    setLoading(false);

    if (error) {
      if (error.code === "23505") {
        // Duplicate email — still show success
        setSubmitted(true);
      } else {
        alert("Something went wrong. Please try again.");
        console.error(error);
      }
    } else {
      setSubmitted(true);
    }
  };

  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700;1,800;1,900&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .gp { font-family: 'DM Sans', sans-serif; background: #F0EDE4; color: #1a1a18; }

        /* NAV */
        .gnav {
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.1rem 3rem;
          border-bottom: 1px solid rgba(0,0,0,0.08);
          background: rgba(240,237,228,0.92);
          backdrop-filter: blur(14px);
          position: sticky; top: 0; z-index: 50;
        }
        .glogo { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 900; color: #1e4d3a; letter-spacing: -0.3px; }
        .glogo span { color: #5aab82; }
        .gnav-links { display: flex; align-items: center; gap: 2.5rem; list-style: none; }
        .gnav-links a { text-decoration: none; color: #666; font-size: 14px; transition: color 0.15s; }
        .gnav-links a:hover { color: #1e4d3a; }
        .gnav-r { display: flex; align-items: center; gap: 0.75rem; }
        .btn-ghost-nav {
          padding: 9px 22px; border-radius: 50px; border: 1.5px solid #1e4d3a;
          background: transparent; color: #1e4d3a; font-size: 14px; font-weight: 500;
          font-family: 'DM Sans', sans-serif; cursor: pointer; transition: background 0.15s, color 0.15s;
        }
        .btn-ghost-nav:hover { background: #1e4d3a; color: #fff; }
        .btn-solid-nav {
          padding: 9px 22px; border-radius: 50px; border: none;
          background: #1e4d3a; color: #fff; font-size: 14px; font-weight: 500;
          font-family: 'DM Sans', sans-serif; cursor: pointer; transition: background 0.15s, transform 0.1s;
        }
        .btn-solid-nav:hover { background: #163a2c; transform: translateY(-1px); }

        /* HERO */
        .ghero {
          display: grid; grid-template-columns: 1fr 1fr; gap: 3rem;
          align-items: center; max-width: 1160px; margin: 0 auto;
          padding: 5rem 3rem 4rem; min-height: calc(100vh - 65px);
        }
        .gleft { display: flex; flex-direction: column; }

        .gbadge {
          display: inline-flex; align-items: center; gap: 7px;
          background: #d4ece1; color: #1e4d3a; font-size: 11px; font-weight: 600;
          padding: 5px 13px; border-radius: 50px; margin-bottom: 1.6rem;
          width: fit-content; letter-spacing: 0.2px;
          border: 1px solid rgba(30,77,58,0.12);
          animation: fadeUp 0.5s ease forwards;
        }
        .gbadge-dot {
          width: 6px; height: 6px; border-radius: 50%; background: #5aab82;
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.35;transform:scale(.8)} }

        .gh1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(46px, 5vw, 68px); font-weight: 900;
          line-height: 1.04; color: #1a1a18; letter-spacing: -1.5px;
          margin: 0 0 1.4rem;
          animation: fadeUp 0.6s ease forwards 0.1s; opacity: 0;
        }
        .gh1-em { font-style: italic; color: #1e4d3a; }
        .gh1-ul { position: relative; display: inline-block; }
        .gh1-ul::after {
          content: ''; position: absolute; left: 0; bottom: 4px;
          width: 100%; height: 3px; background: #5aab82; border-radius: 2px;
        }

        .gsub {
          font-size: 15px; line-height: 1.75; color: #555; font-weight: 400;
          max-width: 440px; margin: 0 0 2rem;
          animation: fadeUp 0.6s ease forwards 0.2s; opacity: 0;
        }
        .gsub strong { color: #1a1a18; font-weight: 600; }

        /* FORM */
        .gform-wrap { animation: fadeUp 0.6s ease forwards 0.3s; opacity: 0; max-width: 440px; }
        .gform { display: flex; gap: 0.5rem; }
        .ginput {
          flex: 1; padding: 13px 20px; border-radius: 50px;
          border: 1.5px solid rgba(0,0,0,0.13);
          background: rgba(255,255,255,0.7); font-size: 14px;
          font-family: 'DM Sans', sans-serif; color: #1a1a18; outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .ginput::placeholder { color: #bbb; }
        .ginput:focus { border-color: #5aab82; box-shadow: 0 0 0 3px rgba(90,171,130,0.14); background: #fff; }
        .gbtn-submit {
          padding: 13px 22px; border-radius: 50px; border: none;
          background: #1e4d3a; color: #fff; font-size: 14px; font-weight: 600;
          font-family: 'DM Sans', sans-serif; cursor: pointer; white-space: nowrap;
          transition: background 0.15s, transform 0.1s, box-shadow 0.15s;
          min-width: 145px; display: flex; align-items: center; justify-content: center;
        }
        .gbtn-submit:hover:not(:disabled) { background: #163a2c; transform: translateY(-1px); box-shadow: 0 8px 20px rgba(30,77,58,0.28); }
        .gbtn-submit:disabled { opacity: 0.7; cursor: not-allowed; }
        .gspinner { width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: spin 0.65s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .gform-note { font-size: 11.5px; color: #aaa; font-weight: 300; margin-top: 0.65rem; }

        /* SUCCESS */
        .gsuccess { display: flex; flex-direction: column; gap: 0.7rem; max-width: 440px; animation: fadeUp 0.5s ease forwards; }
        .gsuccess-icon { width: 48px; height: 48px; border-radius: 50%; background: #d4ece1; border: 1px solid rgba(30,77,58,0.15); display: flex; align-items: center; justify-content: center; font-size: 22px; }
        .gsuccess-title { font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 900; color: #1e4d3a; }
        .gsuccess-sub { font-size: 14px; color: #666; font-weight: 300; line-height: 1.65; }

        /* FEATURES LIST */
        .gfeats { display: flex; flex-wrap: wrap; gap: 0.5rem 1.4rem; margin-top: 2rem; animation: fadeUp 0.6s ease forwards 0.45s; opacity: 0; }
        .gfeat { display: flex; align-items: center; gap: 7px; font-size: 12.5px; color: #777; }
        .gfeat-dot { width: 5px; height: 5px; border-radius: 50%; background: #5aab82; flex-shrink: 0; }

        /* RIGHT MOCKUP */
        .gright { animation: fadeUp 0.7s ease forwards 0.2s; opacity: 0; }
        .gmock { background: #fff; border-radius: 20px; padding: 1.3rem; box-shadow: 0 4px 48px rgba(0,0,0,0.10), 0 1px 0 rgba(0,0,0,0.05); }
        .gmock-bar { display: flex; gap: 5px; margin-bottom: 1rem; }
        .gmock-bar span { width: 10px; height: 10px; border-radius: 50%; }
        .gmock-lbl { font-size: 10px; font-weight: 700; color: #bbb; text-transform: uppercase; letter-spacing: 1.2px; margin-bottom: 0.8rem; }
        .grev { border: 1px solid #eee; border-radius: 12px; padding: 0.9rem; margin-bottom: 0.7rem; background: #fafafa; }
        .grev-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem; }
        .grev-name { font-size: 13px; font-weight: 600; color: #1a1a18; }
        .grev-src { font-size: 10px; color: #aaa; background: #f0f0f0; padding: 2px 7px; border-radius: 4px; margin-left: 5px; font-weight: 400; }
        .gstars-p { color: #f5a623; font-size: 12px; letter-spacing: 1px; }
        .gstars-n { color: #e05c4a; font-size: 12px; letter-spacing: 1px; }
        .grev-txt { font-size: 12px; color: #777; line-height: 1.5; margin-bottom: 0.65rem; font-style: italic; }
        .greply { background: #eef7f2; border-left: 3px solid #1e4d3a; border-radius: 0 8px 8px 0; padding: 0.6rem 0.8rem; }
        .greply-lbl { font-size: 9px; font-weight: 700; color: #1e4d3a; text-transform: uppercase; letter-spacing: 0.6px; margin-bottom: 3px; }
        .greply-txt { font-size: 12px; color: #555; line-height: 1.5; }
        .gai-tag { display: inline-flex; align-items: center; gap: 4px; background: #1e4d3a; color: #d4ece1; font-size: 10px; padding: 3px 9px; border-radius: 50px; margin-top: 6px; font-weight: 500; }
        .gflag { background: #fff5f3; border-left: 3px solid #e05c4a; border-radius: 0 8px 8px 0; padding: 0.55rem 0.75rem; margin-bottom: 0.5rem; }
        .gflag-lbl { font-size: 9px; font-weight: 700; color: #c0392b; text-transform: uppercase; letter-spacing: 0.6px; margin-bottom: 2px; }
        .gflag-txt { font-size: 11px; color: #888; }
        .gsms { background: #1e4d3a; border-radius: 8px; padding: 0.6rem 0.8rem; display: flex; align-items: center; gap: 8px; }
        .gsms-badge { background: #d4ece1; color: #1e4d3a; font-size: 10px; font-weight: 700; padding: 3px 7px; border-radius: 5px; flex-shrink: 0; }
        .gsms-txt { font-size: 11px; color: #a8d4bf; line-height: 1.4; }

        /* FEATURES SECTION */
        .gcoming { background: #fff; border-top: 1px solid rgba(0,0,0,0.07); padding: 5rem 3rem; }
        .gcoming-inner { max-width: 1000px; margin: 0 auto; text-align: center; }
        .gsec-tag { font-size: 11px; font-weight: 700; color: #5aab82; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 0.7rem; }
        .gsec-h2 { font-family: 'Playfair Display', serif; font-size: clamp(26px, 3.5vw, 36px); font-weight: 900; color: #1a1a18; line-height: 1.15; margin-bottom: 0.6rem; }
        .gsec-sub { font-size: 14px; color: #888; font-weight: 300; max-width: 480px; margin-left: auto; margin-right: auto; line-height: 1.7; margin-bottom: 2.5rem; }
        .gfeat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; text-align: left; }
        .gfeat-card { background: #F0EDE4; border-radius: 16px; padding: 1.4rem; border: 1px solid rgba(0,0,0,0.06); }
        .gfeat-card-icon { font-size: 22px; margin-bottom: 0.7rem; }
        .gfeat-card h3 { font-size: 14px; font-weight: 600; color: #1a1a18; margin-bottom: 0.4rem; }
        .gfeat-card p { font-size: 12.5px; color: #888; font-weight: 300; line-height: 1.6; }
        .gfeat-card-pill { display: inline-flex; align-items: center; background: #d4ece1; color: #0f4d2e; font-size: 10px; font-weight: 700; padding: 3px 9px; border-radius: 50px; margin-top: 0.7rem; letter-spacing: 0.3px; }

        /* DARK CTA */
        .gcta { background: #1a1a18; padding: 7rem 3rem; text-align: center; position: relative; overflow: hidden; }
        .gcta::before { content: ''; position: absolute; width: 700px; height: 700px; border-radius: 50%; background: radial-gradient(circle, rgba(90,171,130,0.07) 0%, transparent 70%); top: 50%; left: 50%; transform: translate(-50%, -50%); pointer-events: none; }
        .gcta-inner { position: relative; z-index: 1; }
        .gcta-h2 { font-family: 'Playfair Display', serif; font-size: clamp(34px, 5vw, 58px); font-weight: 900; color: #fff; line-height: 1.08; margin-bottom: 0.9rem; letter-spacing: -1px; }
        .gcta-h2 em { font-style: italic; color: #5aab82; }
        .gcta-sub { font-size: 15px; color: #666; font-weight: 300; margin-bottom: 2.5rem; max-width: 400px; margin-left: auto; margin-right: auto; line-height: 1.7; }
        .gcta-btns { display: flex; align-items: center; justify-content: center; gap: 0.8rem; flex-wrap: wrap; }
        .gcta-btn-p { padding: 15px 36px; border-radius: 50px; border: none; background: #5aab82; color: #fff; font-size: 15px; font-weight: 600; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: background 0.15s, transform 0.1s, box-shadow 0.15s; }
        .gcta-btn-p:hover { background: #4a9270; transform: translateY(-1px); box-shadow: 0 10px 28px rgba(90,171,130,0.28); }
        .gcta-btn-g { padding: 14px 28px; border-radius: 50px; border: 1.5px solid #2a2a28; background: transparent; color: #555; font-size: 14px; font-weight: 400; font-family: 'DM Sans', sans-serif; cursor: default; }

        /* FOOTER */
        .gfooter { background: #1a1a18; border-top: 1px solid rgba(255,255,255,0.06); padding: 1.4rem 3rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem; }
        .gfooter-logo { font-family: 'Playfair Display', serif; font-size: 17px; font-weight: 900; color: #5aab82; }
        .gfooter-links { display: flex; gap: 1.5rem; }
        .gfooter-links a { font-size: 13px; color: #555; text-decoration: none; transition: color 0.15s; }
        .gfooter-links a:hover { color: #5aab82; }
        .gfooter-copy { font-size: 12px; color: #3a3a38; }

        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }

        @media (max-width: 860px) {
          .gnav { padding: 1rem 1.5rem; }
          .gnav-links { display: none; }
          .ghero { grid-template-columns: 1fr; padding: 3rem 1.5rem; min-height: auto; gap: 2.5rem; }
          .gh1 { font-size: 42px; }
          .gform { flex-direction: column; }
          .gbtn-submit { width: 100%; }
          .gcoming { padding: 3rem 1.5rem; }
          .gfeat-grid { grid-template-columns: 1fr; }
          .gcta { padding: 4rem 1.5rem; }
          .gfooter { flex-direction: column; align-items: center; text-align: center; padding: 1.4rem 1.5rem; }
        }
      `}</style>

      <div className="gp">

        {/* NAV */}
        <nav className="gnav">
          <div className="glogo">Garnish<span>.</span></div>
          <ul className="gnav-links">
            <li><a href="#features">Features</a></li>
            <li><a href="#waitlist">Waitlist</a></li>
          </ul>
          <div className="gnav-r">
            <button className="btn-ghost-nav">Login</button>
            <button className="btn-solid-nav" onClick={scrollToWaitlist}>Join Waitlist</button>
          </div>
        </nav>

        {/* HERO */}
        <section className="ghero" id="waitlist">
          <div className="gleft">
            <div className="gbadge">
              <div className="gbadge-dot" />
              Coming soon — join the waitlist
            </div>

            <h1 className="gh1">
              Your<br />
              Reviews.<br />
              Your <span className="gh1-em">Rankings.</span>
              <br />
              <span className="gh1-ul">On Autopilot</span>
            </h1>

            <p className="gsub">
              Garnish is the AI reputation manager built for restaurants. Be the first to know when we launch and get{" "}
              <strong>exclusive early access</strong> before we open to the public.
            </p>

            {submitted ? (
              <div className="gsuccess">
                <div className="gsuccess-icon">🌿</div>
                <div className="gsuccess-title">You're on the list.</div>
                <p className="gsuccess-sub">
                  We'll email you the moment Garnish launches. Early access members get first in the door and a locked-in launch price.
                </p>
              </div>
            ) : (
              <div className="gform-wrap">
                <form className="gform" onSubmit={handleSubmit}>
                  <input
                    className="ginput"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="gbtn-submit" disabled={loading}>
                    {loading ? <div className="gspinner" /> : "Join Waitlist"}
                  </button>
                </form>
                <div className="gform-note">
                  No spam, ever &nbsp;·&nbsp; Unsubscribe anytime &nbsp;·&nbsp; Be first when we launch
                </div>
              </div>
            )}

            <div className="gfeats">
              <div className="gfeat"><div className="gfeat-dot" />AI replies in your voice</div>
              <div className="gfeat"><div className="gfeat-dot" />Bad review interception</div>
              <div className="gfeat"><div className="gfeat-dot" />QR loop review generation</div>
              <div className="gfeat"><div className="gfeat-dot" />Monthly SEO reports</div>
            </div>
          </div>

          {/* MOCKUP */}
          <div className="gright">
            <div className="gmock">
              <div className="gmock-bar">
                <span style={{ background: "#ff6057" }} />
                <span style={{ background: "#ffbb2c" }} />
                <span style={{ background: "#28ca41" }} />
              </div>
              <div className="gmock-lbl">Live dashboard — The Olive Branch</div>
              <div className="grev">
                <div className="grev-top">
                  <div className="grev-name">Marcus T.<span className="grev-src">Google</span></div>
                  <span className="gstars-p">★★★★★</span>
                </div>
                <p className="grev-txt">"Incredible pasta, staff made us feel like family. Absolutely coming back!"</p>
                <div className="greply">
                  <div className="greply-lbl">Garnish reply — sent 90 sec ago</div>
                  <div className="greply-txt">Thank you so much Marcus! Hearing that means the world to our whole team. We can't wait to welcome you back soon!</div>
                </div>
                <div className="gai-tag">✦ Personalized to your menu &amp; voice</div>
              </div>
              <div className="grev" style={{ background: "#fff9f8" }}>
                <div className="grev-top">
                  <div className="grev-name">Linda K.<span className="grev-src">Yelp</span></div>
                  <span className="gstars-n">★★☆☆☆</span>
                </div>
                <p className="grev-txt">"Service felt slow during our anniversary dinner..."</p>
                <div className="gflag">
                  <div className="gflag-lbl">Private feedback intercepted</div>
                  <div className="gflag-txt">Kept off Google — routed to manager</div>
                </div>
                <div className="gsms">
                  <div className="gsms-badge">SMS</div>
                  <div className="gsms-txt">Alert sent to owner + reply draft ready — 1 tap to send</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES GRID */}
        <section className="gcoming" id="features">
          <div className="gcoming-inner">
            <div className="gsec-tag">What's coming</div>
            <h2 className="gsec-h2">Everything your reputation needs.<br />Nothing it doesn't.</h2>
            <p className="gsec-sub">
              Garnish is being built from the ground up for restaurant owners who have zero time to manage reviews manually.
            </p>
            <div className="gfeat-grid">
              <div className="gfeat-card">
                <div className="gfeat-card-icon">🧠</div>
                <h3>Context-aware AI replies</h3>
                <p>Upload your menu and brand vibe. Every reply sounds like you wrote it — because it's trained on your restaurant, not a generic template.</p>
                <div className="gfeat-card-pill">Google · Yelp · OpenTable</div>
              </div>
              <div className="gfeat-card">
                <div className="gfeat-card-icon">🛡</div>
                <h3>Smart Guardrail System</h3>
                <p>5-star reviews get instant automated replies. 1–3 star reviews hit your phone in seconds with a professional apology draft — one tap to send.</p>
                <div className="gfeat-card-pill">SMS alerts included</div>
              </div>
              <div className="gfeat-card">
                <div className="gfeat-card-icon">📲</div>
                <h3>The QR Loop</h3>
                <p>Custom QR codes for your tables and receipts. Happy guests go to Google Maps. Unhappy guests land in a private form — before anything goes public.</p>
                <div className="gfeat-card-pill">Active review generation</div>
              </div>
              <div className="gfeat-card">
                <div className="gfeat-card-icon">📈</div>
                <h3>Monthly SEO reports</h3>
                <p>"Your Google visibility went up 12%" — delivered to your inbox every month in plain English. No login required.</p>
                <div className="gfeat-card-pill">Delivered to your inbox</div>
              </div>
              <div className="gfeat-card">
                <div className="gfeat-card-icon">⚡</div>
                <h3>The Garnish Engine</h3>
                <p>A four-stage system that runs 24/7. While you're running service, the Engine is managing your entire online reputation automatically.</p>
                <div className="gfeat-card-pill">Always on</div>
              </div>
              <div className="gfeat-card">
                <div className="gfeat-card-icon">🔗</div>
                <h3>Multi-platform</h3>
                <p>Google Business, Yelp, and OpenTable connected in one dashboard. Full visibility across every platform that matters to your guests.</p>
                <div className="gfeat-card-pill">More platforms coming</div>
              </div>
            </div>
          </div>
        </section>

        {/* DARK CTA */}
        <section className="gcta">
          <div className="gcta-inner">
            <h2 className="gcta-h2">
              Your next 5-star review is<br />
              <em>already on its way.</em>
            </h2>
            <p className="gcta-sub">
              Join the waitlist and be first through the door when Garnish launches. Early access members lock in the best price — forever.
            </p>
            <div className="gcta-btns">
              <button className="gcta-btn-p" onClick={scrollToWaitlist}>
                Join the waitlist
              </button>
              <button className="gcta-btn-g">
                No credit card required
              </button>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="gfooter">
          <div className="gfooter-logo">Garnish.</div>
          <div className="gfooter-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="mailto:hello@garnish.ai">Support</a>
          </div>
          <div className="gfooter-copy">© 2026 Garnish. All rights reserved.</div>
        </footer>

      </div>
    </>
  );
}