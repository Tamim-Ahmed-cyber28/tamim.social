import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

interface SocialLink {
  id: string;
  name: string;
  iconClass: string;
  url?: string;
  usernameText: string;
  brandColor: string;      // Color for hover icons
  glowColor: string;       // Tailwind sky/blue outline style
  accentBg: string;        // Soft bg color highlight
  category: "Professional" | "Social" | "Gaming & Cybersecurity";
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    id: "linkedin",
    name: "LinkedIn",
    iconClass: "fa-brands fa-linkedin-in",
    url: "https://www.linkedin.com/in/md-tamim-ahmed-709bb93ab",
    usernameText: "md-tamim-ahmed-709bb93ab",
    brandColor: "group-hover:text-[#0077b5]",
    glowColor: "hover:border-[#0077b5]/40 hover:shadow-[0_0_20px_rgba(0,119,181,0.2)]",
    accentBg: "group-hover:bg-[#0077b5]/5",
    category: "Professional",
  },
  {
    id: "github",
    name: "GitHub",
    iconClass: "fa-brands fa-github",
    url: "https://github.com/TamimAhmed1122",
    usernameText: "TamimAhmed1122",
    brandColor: "group-hover:text-white",
    glowColor: "hover:border-slate-500/40 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]",
    accentBg: "group-hover:bg-white/5",
    category: "Professional",
  },
  {
    id: "x",
    name: "X / Twitter",
    iconClass: "fa-brands fa-x-twitter",
    url: "https://x.com/TamimAhmed1122",
    usernameText: "@TamimAhmed1122",
    brandColor: "group-hover:text-white",
    glowColor: "hover:border-neutral-500/40 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]",
    accentBg: "group-hover:bg-white/5",
    category: "Social",
  },
  {
    id: "facebook",
    name: "Facebook",
    iconClass: "fa-brands fa-facebook",
    url: "https://www.facebook.com/tamim1ahmed1122",
    usernameText: "tamim1ahmed1122",
    brandColor: "group-hover:text-[#1877f2]",
    glowColor: "hover:border-[#1877f2]/40 hover:shadow-[0_0_20px_rgba(24,119,242,0.2)]",
    accentBg: "group-hover:bg-[#1877f2]/5",
    category: "Social",
  },
  {
    id: "telegram",
    name: "Telegram",
    iconClass: "fa-brands fa-telegram",
    url: "https://t.me/tamim1ahmed1122",
    usernameText: "@tamim1ahmed1122",
    brandColor: "group-hover:text-[#24A1DE]",
    glowColor: "hover:border-[#24A1DE]/40 hover:shadow-[0_0_20px_rgba(36,161,222,0.2)]",
    accentBg: "group-hover:bg-[#24A1DE]/5",
    category: "Social",
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    iconClass: "fa-brands fa-whatsapp",
    url: "https://wa.me/qr/OXADFKTJVYEVF1",
    usernameText: "Message directly",
    brandColor: "group-hover:text-[#25D366]",
    glowColor: "hover:border-[#25D366]/40 hover:shadow-[0_0_20px_rgba(37,211,102,0.2)]",
    accentBg: "group-hover:bg-[#25D366]/5",
    category: "Social",
  },
  {
    id: "tryhackme",
    name: "TryHackMe",
    iconClass: "fa-solid fa-shield-halved",
    url: "https://tryhackme.com/p/Tamim28",
    usernameText: "Tamim28",
    brandColor: "group-hover:text-[#cc1100]",
    glowColor: "hover:border-[#cc1100]/40 hover:shadow-[0_0_20px_rgba(204,17,0,0.2)]",
    accentBg: "group-hover:bg-[#cc1100]/5",
    category: "Gaming & Cybersecurity",
  },
  {
    id: "chess",
    name: "Chess.com",
    iconClass: "fa-solid fa-chess-knight",
    url: "https://www.chess.com/member/TamimAhmed1122",
    usernameText: "TamimAhmed1122",
    brandColor: "group-hover:text-[#7fa64c]",
    glowColor: "hover:border-[#7fa64c]/40 hover:shadow-[0_0_20px_rgba(127,166,76,0.2)]",
    accentBg: "group-hover:bg-[#7fa64c]/5",
    category: "Gaming & Cybersecurity",
  },
];

// Seed floating stars/particles
const BACKGROUND_PARTICLES = Array.from({ length: 18 }).map((_, i) => ({
  id: i,
  size: Math.random() * 4 + 2,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  duration: Math.random() * 15 + 15,
  delay: Math.random() * -15,
}));

export default function App() {
  const [toast, setToast] = useState<{ message: string; id: number } | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const showToastMessage = useCallback((message: string) => {
    setToast({ message, id: Date.now() });
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const copyToClipboard = (text: string, notificationMsg: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        showToastMessage(notificationMsg);
      },
      () => {
        // Fallback
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand("copy");
          showToastMessage(notificationMsg);
        } catch (err) {
          showToastMessage("Failed to copy text.");
        }
        document.body.removeChild(textarea);
      }
    );
  };

  const handleShareProfile = () => {
    const profileUrl = window.location.href;
    copyToClipboard(profileUrl, "Profile link copied to clipboard!");
  };

  // Filter links
  const filteredLinks = activeCategory === "All"
    ? SOCIAL_LINKS
    : SOCIAL_LINKS.filter(link => link.category === activeCategory);

  return (
    <div className="relative min-h-screen bg-[#030712] overflow-hidden flex flex-col justify-between font-sans selection:bg-sky-500/30 selection:text-sky-200">
      
      {/* Subtle Glowing Background Accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-sky-950/20 blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-950/20 blur-[150px] animate-pulse-slow" />
        <div className="absolute top-[35%] left-[25%] w-[40%] h-[40%] rounded-full bg-cyan-950/10 blur-[130px]" />
        
        {/* Animated Particles */}
        {BACKGROUND_PARTICLES.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ y: 0, opacity: 0.1 }}
            animate={{
              y: [-15, 15, -15],
              x: [-10, 10, -10],
              opacity: [0.15, 0.45, 0.15],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              width: particle.size,
              height: particle.size,
              borderRadius: "50%",
              backgroundColor: "rgba(56, 189, 248, 0.25)",
              left: particle.left,
              top: particle.top,
            }}
          />
        ))}
      </div>

      {/* Main Container */}
      <main className="relative z-10 w-full max-w-4xl mx-auto px-4 pt-16 pb-12 flex-grow flex flex-col justify-center">
        
        {/* Share Button (Top Right Corner) */}
        <div className="absolute top-6 right-4 sm:right-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShareProfile}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg glass-panel text-sky-400 hover:text-sky-300 border border-sky-500/15 hover:border-sky-500/40 hover:bg-sky-500/5 transition-all shadow-[0_0_15px_rgba(56,189,248,0.05)] cursor-pointer"
            title="Share Profile"
            id="share-btn"
          >
            <i className="fa-solid fa-share-nodes"></i>
            <span>Share</span>
          </motion.button>
        </div>

        {/* Profile Card Header */}
        <div className="text-center flex flex-col items-center mb-10 max-w-lg mx-auto">
          {/* Custom Ambient Graphic Avatar */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="relative mb-6 group cursor-default"
            id="avatar-container"
          >
            {/* Spinning decorative orbit light ring */}
            <div className="absolute inset-[-6px] rounded-full bg-gradient-to-tr from-sky-400/20 via-blue-500/5 to-cyan-400/20 animate-spin" style={{ animationDuration: '12s' }} />
            {/* Glowing static aura */}
            <div className="absolute inset-[-1px] rounded-full bg-gradient-to-tr from-sky-400 to-blue-500 opacity-60 blur-md group-hover:opacity-100 group-hover:blur-lg transition-all duration-500" />
            
            {/* Inner Avatar */}
            <div className="relative w-24 h-24 rounded-full bg-slate-950 flex items-center justify-center border-2 border-sky-400/30">
              <span className="font-extrabold text-3xl tracking-wider text-transparent bg-clip-text bg-gradient-to-tr from-sky-300 via-blue-400 to-cyan-300">
                TA
              </span>
            </div>
            
            {/* Active System Verified Checkmark Badge */}
            <div className="absolute bottom-1 right-1 bg-sky-400 text-slate-950 w-5 h-5 rounded-full flex items-center justify-center text-[10px] border border-slate-950 shadow-md shadow-sky-950" title="Verified Portfolio Owner">
              <i className="fa-solid fa-check"></i>
            </div>
          </motion.div>

          {/* Premium Typography Name Heading */}
          <motion.h1
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-3"
            id="profile-name"
          >
            TAMIM AHMED
          </motion.h1>

          {/* Core Literal / Professional Tag */}
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex items-center gap-2 px-3 py-1 bg-sky-500/5 border border-sky-400/15 rounded-full mb-3"
          >
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
            <span className="font-mono text-xs uppercase tracking-widest text-sky-400/90 font-semibold select-none">
              Developer & Systems Enthusiast
            </span>
          </motion.div>
        </div>

        {/* Minimal Category Tabs */}
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex justify-center gap-2 mb-8"
        >
          {["All", "Professional", "Social", "Gaming & Cybersecurity"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-sky-500/15 border border-sky-400/40 text-sky-300 shadow-[0_0_15px_rgba(56,189,248,0.1)]"
                  : "bg-transparent border border-white/5 text-slate-400 hover:text-slate-200 hover:border-white/15"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Bento Grid Social Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-fr">
          
          {/* Render Active Filtered Social and Profiler Cards */}
          <AnimatePresence mode="popLayout">
            {filteredLinks.map((link, idx) => (
              <motion.a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                className={`group flex flex-col justify-between p-5 rounded-2xl glass-panel glass-panel-hover transition-all duration-300 relative select-none cursor-pointer ${link.glowColor} h-36`}
                aria-label={`Visit Tamim's ${link.name}`}
              >
                {/* Accent Highlight Blob on Hover */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl ${link.accentBg} pointer-events-none`} />

                {/* Top of Card */}
                <div className="flex justify-between items-start w-full relative z-10">
                  <span className="font-mono text-[10px] tracking-wider text-slate-500 uppercase">
                    {link.category}
                  </span>
                  
                  {/* Hover visual action arrow */}
                  <div className="w-6 h-6 flex items-center justify-center rounded-full bg-slate-950/60 border border-white/5 text-slate-500 group-hover:text-white group-hover:border-white/20 transition-all text-xs opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <i className="fa-solid fa-arrow-up-right-from-square"></i>
                  </div>
                </div>

                {/* Bottom of Card */}
                <div className="flex items-center gap-4 w-full relative z-10">
                  {/* Platform Branding Icon */}
                  <div className={`text-4xl text-slate-300 transition-all duration-500 group-hover:scale-110 ${link.brandColor}`}>
                    <i className={link.iconClass}></i>
                  </div>

                  <div className="text-left">
                    <h3 className="font-bold text-lg text-slate-100 tracking-tight leading-tight group-hover:text-white">
                      {link.name}
                    </h3>
                    <p className="font-mono text-xs text-sky-400/75 tracking-tight line-clamp-1 mt-0.5">
                      {link.usernameText}
                    </p>
                  </div>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>

          {/* Interactive Custom Discord Card (Copies Username, does not redirect) */}
          {(activeCategory === "All" || activeCategory === "Social") && (
            <motion.div
              layout
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              onClick={() => copyToClipboard("tamimahmed1122", "Discord username copied.")}
              className="group flex flex-col justify-between p-5 rounded-2xl glass-panel glass-panel-hover hover:border-indigo-500/40 hover:shadow-[0_0_20px_rgba(114,137,218,0.2)] transition-all duration-300 relative select-none cursor-pointer h-36"
              aria-label="Copy Tamim's Discord Username"
              id="discord-card"
            >
              {/* Custom brand accent bg highlight on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl bg-[#7289da]/5 pointer-events-none" />

              <div className="flex justify-between items-start w-full relative z-10">
                <span className="font-mono text-[10px] tracking-wider text-slate-500 uppercase">
                  Social Channels
                </span>
                <div className="px-2.5 py-0.5 rounded bg-[#7289da]/10 border border-[#7289da]/30 text-[#7289da] font-mono text-[9px] font-bold uppercase tracking-wider group-hover:scale-105 transition-transform">
                  Copy Tag
                </div>
              </div>

              <div className="flex items-center gap-4 w-full relative z-10">
                <div className="text-4xl text-slate-300 transition-all duration-500 group-hover:scale-110 group-hover:text-[#7289da]">
                  <i className="fa-brands fa-discord"></i>
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-lg text-slate-100 tracking-tight leading-tight group-hover:text-white">
                    Discord
                  </h3>
                  <p className="font-mono text-xs text-[#7289da] tracking-tight line-clamp-1 mt-0.5 font-semibold">
                    tamimahmed1122
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Interactive Custom Email Card with dedicated Mail Link and Direct Copy Switch */}
          {(activeCategory === "All" || activeCategory === "Professional") && (
            <motion.div
              layout
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="group flex flex-col justify-between p-5 rounded-2xl glass-panel glass-panel-hover hover:border-cyan-400/40 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all duration-300 relative select-none h-36"
              id="email-card"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl bg-cyan-400/5 pointer-events-none" />

              <div className="flex justify-between items-start w-full relative z-10">
                <span className="font-mono text-[10px] tracking-wider text-slate-500 uppercase">
                  Direct Messaging
                </span>
                
                {/* Secondary copy button explicitly requested */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    copyToClipboard("tamim1ahmed1122@gmail.com", "Email copied to clipboard!");
                  }}
                  className="px-2.5 py-1 text-[10px] text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10 border border-cyan-400/20 hover:border-cyan-400/40 rounded transition-all flex items-center gap-1 cursor-pointer font-sans"
                  title="Copy Email Address"
                >
                  <i className="fa-regular fa-copy"></i>
                  <span>Copy</span>
                </button>
              </div>

              {/* Clicking the main body area triggers direct mailto */}
              <a
                href="mailto:tamim1ahmed1122@gmail.com"
                className="flex items-center gap-4 w-full relative z-10 cursor-pointer"
                aria-label="Send direct Email to Tamim"
              >
                <div className="text-4xl text-slate-300 transition-all duration-500 group-hover:scale-110 group-hover:text-cyan-400">
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-lg text-slate-100 tracking-tight leading-tight group-hover:text-white">
                    Email Index
                  </h3>
                  <p className="font-mono text-[11px] sm:text-xs text-cyan-400/90 tracking-tight line-clamp-1 mt-0.5">
                    tamim1ahmed1122@gmail.com
                  </p>
                </div>
              </a>
            </motion.div>
          )}

        </div>

      </main>

      {/* Modern, Compact Footer */}
      <footer className="relative z-10 text-center py-8 px-4 border-t border-white/5 bg-slate-950/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <span className="select-none">
            &copy; {new Date().getFullYear()} TAMIM AHMED. All rights reserved.
          </span>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span>Secure Digital Identity</span>
          </div>
        </div>
      </footer>

      {/* Elegant Centered Floating Toast Notifications */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-5 py-3 rounded-xl border border-sky-400/30 bg-[#0f172a]/95 backdrop-blur-md shadow-[0_10px_30px_rgba(56,189,248,0.15)] text-sky-400 text-sm font-medium"
          >
            <i className="fa-solid fa-check-circle text-lg animate-bounce text-sky-400"></i>
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
