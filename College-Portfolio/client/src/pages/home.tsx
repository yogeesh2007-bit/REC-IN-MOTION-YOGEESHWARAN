import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

import heroImg from "@assets/WhatsApp_Image_2026-03-10_at_13.19.37_(1)_1773132885044.jpeg";
import entranceImg from "@assets/WhatsApp_Image_2026-03-10_at_13.19.39_1773132885050.jpeg";
import mentorshipImg from "@assets/WhatsApp_Image_2026-03-10_at_13.17.04_(1)_1773132885012.jpeg";
import libraryImg from "@assets/WhatsApp_Image_2026-03-10_at_13.17.39_1773132885045.jpeg";
import footballImg from "@assets/WhatsApp_Image_2026-03-10_at_13.29.46_1773132885050.jpeg";
import gardenImg from "@assets/WhatsApp_Image_2026-03-10_at_13.19.37_1773132885047.jpeg";
import mascotImg from "@assets/WhatsApp_Image_2026-03-10_at_13.16.56_(1)_1773132885049.jpeg";
import communityImg from "@assets/WhatsApp_Image_2026-03-10_at_13.22.48_1773132885048.jpeg";

function useScrollReveal() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return { ref, isInView };
}

function AnimatedSection({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, isInView } = useScrollReveal();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.75, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = ["Story", "Moments", "Gallery", "About"];

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/70 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      }`}
      data-testid="navbar"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-600 to-yellow-400 flex items-center justify-center shadow-lg shadow-purple-500/30">
            <span className="font-display font-black text-white text-lg">R</span>
          </div>
          <div>
            <span className="font-display font-bold text-white text-lg leading-none block tracking-wide">REC</span>
            <span className="text-yellow-400 text-xs font-grotesk font-medium tracking-[0.2em] uppercase leading-none">in Motion</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              data-testid={`nav-link-${link.toLowerCase()}`}
              className="text-white/70 hover:text-white font-jakarta text-sm font-medium transition-all duration-200 hover:text-yellow-300 tracking-wide"
            >
              {link}
            </button>
          ))}
          <button
            onClick={() => scrollTo("Gallery")}
            data-testid="nav-cta"
            className="px-5 py-2 rounded-full bg-gradient-to-r from-purple-600 to-purple-500 text-white text-sm font-jakarta font-semibold hover:from-purple-500 hover:to-purple-400 transition-all duration-200 shadow-lg shadow-purple-600/30"
          >
            View Gallery
          </button>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white p-2"
          data-testid="mobile-menu-toggle"
        >
          <div className={`w-6 h-0.5 bg-white mb-1.5 transition-transform duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></div>
          <div className={`w-6 h-0.5 bg-white mb-1.5 transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`}></div>
          <div className={`w-6 h-0.5 bg-white transition-transform duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}></div>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10 px-6 py-4">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="block w-full text-left text-white/80 hover:text-white font-jakarta py-3 border-b border-white/5 last:border-0"
            >
              {link}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 180]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section id="story" className="relative min-h-screen flex items-center overflow-hidden bg-black">
      <motion.div className="absolute inset-0" style={{ y }}>
        <img
          src={heroImg}
          alt="Student studying in front of REC campus"
          className="w-full h-full object-cover object-center scale-110"
          data-testid="hero-image"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-purple-400/10"
            style={{
              width: Math.random() * 4 + 1 + "px",
              height: Math.random() * 4 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              animation: `float ${Math.random() * 3 + 3}s ease-in-out infinite`,
              animationDelay: Math.random() * 2 + "s",
            }}
          />
        ))}
      </div>

      <motion.div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 w-full" style={{ opacity }}>
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-2 mb-6"
          >
            <div className="w-6 h-px bg-yellow-400" />
            <span className="text-yellow-400 font-grotesk text-xs font-semibold tracking-[0.3em] uppercase">
              AI-Enhanced Campus Portfolio
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6"
            data-testid="hero-heading"
          >
            Where learning,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-yellow-300">
              energy, and
            </span>
            <br />
            identity meet.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="text-white/60 font-jakarta text-lg md:text-xl leading-relaxed mb-10 max-w-xl"
          >
            A visual journey through the spaces, people, and moments that shape our campus.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={() => document.getElementById("moments")?.scrollIntoView({ behavior: "smooth" })}
              data-testid="cta-explore"
              className="px-7 py-3.5 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-jakarta font-semibold rounded-full transition-all duration-300 shadow-xl shadow-purple-600/40 hover:shadow-purple-500/50 hover:scale-105 active:scale-100"
            >
              Explore the Story
            </button>
            <button
              onClick={() => document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" })}
              data-testid="cta-moments"
              className="px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-jakarta font-semibold rounded-full border border-white/20 hover:border-white/40 backdrop-blur-sm transition-all duration-300 hover:scale-105 active:scale-100"
            >
              View Moments
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 50, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1 }}
          className="absolute bottom-16 right-6 md:right-12 hidden lg:block animate-float"
          data-testid="hero-glass-card"
        >
          <div className="bg-white/8 backdrop-blur-xl border border-white/15 rounded-2xl p-6 shadow-2xl shadow-black/50 min-w-[220px]">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <span className="text-white/50 font-grotesk text-xs tracking-widest uppercase">Live Captured</span>
            </div>
            {[
              { num: "9", label: "Original Moments" },
              { num: "1", label: "Curated Story" },
            ].map(({ num, label }) => (
              <div key={label} className="flex items-center justify-between py-2.5 border-b border-white/10 last:border-0">
                <span className="font-display text-2xl font-bold text-white">{num}</span>
                <span className="text-white/60 font-jakarta text-sm ml-4">{label}</span>
              </div>
            ))}
            <div className="pt-2.5">
              <span className="text-yellow-400/80 font-jakarta text-xs font-medium">📍 Captured Live on Campus</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center pt-2"
        >
          <div className="w-1 h-2 bg-white/60 rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="bg-[#0a0a0f] py-28 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-yellow-600/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection delay={0}>
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-6 h-px bg-yellow-400" />
                <span className="text-yellow-400 font-grotesk text-xs tracking-[0.3em] uppercase font-semibold">About the Story</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-6" data-testid="about-heading">
                More than a campus.
                <br />
                <span className="italic text-purple-300">A living story.</span>
              </h2>
              <p className="text-white/55 font-jakarta text-lg leading-relaxed mb-8">
                This portfolio was born from a single afternoon at REC — a deliberate, slow walk through the campus with a camera and a curiosity. Every frame captures something real: the quiet focus of a student, the laughter between friends, the poetry of an empty corridor.
              </p>
              <p className="text-white/40 font-jakarta text-base leading-relaxed mb-10">
                Enhanced with AI processing to bring out mood and emotion, these images tell a story that goes beyond architecture — they reveal the heartbeat of this institution.
              </p>
              <div className="flex flex-wrap gap-3" data-testid="about-tags">
                {["Focus", "Collaboration", "Motion"].map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-300 font-grotesk text-sm font-medium backdrop-blur-sm"
                    data-testid={`tag-${tag.toLowerCase()}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/30 border border-white/8">
                <img
                  src={entranceImg}
                  alt="REC campus entrance"
                  className="w-full h-[480px] object-cover"
                  data-testid="about-image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-purple-600/90 to-purple-800/90 backdrop-blur-lg rounded-xl p-5 border border-purple-400/20 shadow-xl">
                <div className="font-display text-3xl font-bold text-white">REC</div>
                <div className="text-purple-200 font-jakarta text-xs mt-1">Rajalakshmi Engineering College</div>
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-yellow-400/15 backdrop-blur-sm border border-yellow-400/20 flex items-center justify-center">
                <span className="text-yellow-300 font-display text-lg font-bold">✦</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

function SignatureMomentsSection() {
  const moments = [
    {
      img: mentorshipImg,
      title: "Mentorship",
      caption: "Faculty and students in spontaneous conversation outside the innovation hub.",
      tag: "Connection",
      color: "from-purple-600 to-purple-800",
    },
    {
      img: libraryImg,
      title: "Study Culture",
      caption: "The library at golden hour — where ambition meets discipline, every day.",
      tag: "Focus",
      color: "from-yellow-600 to-amber-700",
    },
    {
      img: footballImg,
      title: "Campus Rhythm",
      caption: "Energy, freedom, and movement — the pulse of campus life after hours.",
      tag: "Energy",
      color: "from-purple-700 to-indigo-800",
    },
  ];

  return (
    <section id="moments" className="bg-[#080810] py-28 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-950/30 via-transparent to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-px bg-yellow-400" />
              <span className="text-yellow-400 font-grotesk text-xs tracking-[0.3em] uppercase font-semibold">Signature Moments</span>
              <div className="w-8 h-px bg-yellow-400" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight" data-testid="moments-heading">
              Three frames.
              <br />
              <span className="italic text-purple-300">One campus story.</span>
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6" data-testid="moments-grid">
          {moments.map((moment, i) => (
            <AnimatedSection key={moment.title} delay={i * 0.15}>
              <div
                className="group relative rounded-2xl overflow-hidden cursor-pointer h-[480px] shadow-2xl shadow-black/60"
                data-testid={`moment-card-${moment.title.toLowerCase().replace(" ", "-")}`}
              >
                <img
                  src={moment.img}
                  alt={moment.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{ transition: "transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full bg-gradient-to-r ${moment.color} text-white font-grotesk text-xs font-semibold shadow-lg`}>
                    {moment.tag}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 mb-2 opacity-60">
                    <div className="w-4 h-px bg-yellow-400" />
                    <span className="text-yellow-400 font-grotesk text-xs tracking-widest uppercase">Featured</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mb-2">{moment.title}</h3>
                  <p className="text-white/60 font-jakarta text-sm leading-relaxed transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    {moment.caption}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const filters = ["All", "Learning", "Nature", "Community", "Energy"];

  const images = [
    { src: heroImg, category: "Learning", caption: "Study in Solitude", desc: "A quiet moment of deep focus." },
    { src: mentorshipImg, category: "Community", caption: "Faculty Exchange", desc: "Knowledge flows in every direction." },
    { src: libraryImg, category: "Learning", caption: "The Archive", desc: "Where curiosity finds its answers." },
    { src: gardenImg, category: "Nature", caption: "Green Sanctuary", desc: "A reminder that life blooms quietly." },
    { src: communityImg, category: "Community", caption: "Circle of Ideas", desc: "Every great idea starts in a group." },
    { src: mascotImg, category: "Energy", caption: "The Meditator", desc: "Balance in the midst of motion." },
    { src: entranceImg, category: "Learning", caption: "Gateway", desc: "Where every day begins with purpose." },
    { src: footballImg, category: "Energy", caption: "In Full Flight", desc: "Bodies in motion, spirits elevated." },
  ];

  const filtered = activeFilter === "All" ? images : images.filter((img) => img.category === activeFilter);

  return (
    <section id="gallery" className="bg-[#0a0a0f] py-28 px-6 relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-900/15 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        <AnimatedSection>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-px bg-yellow-400" />
                <span className="text-yellow-400 font-grotesk text-xs tracking-[0.3em] uppercase font-semibold">Smart Gallery</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white" data-testid="gallery-heading">
                Every frame,
                <br />
                <span className="italic text-purple-300">a world entire.</span>
              </h2>
            </div>
            <div className="flex flex-wrap gap-2" data-testid="gallery-filters">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  data-testid={`filter-${f.toLowerCase()}`}
                  className={`px-4 py-2 rounded-full font-grotesk text-sm font-medium transition-all duration-200 ${
                    activeFilter === f
                      ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                      : "bg-white/8 text-white/60 hover:bg-white/15 hover:text-white border border-white/10"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4" data-testid="gallery-grid">
          {filtered.map((img, i) => (
            <AnimatedSection key={img.src + i} delay={i * 0.05}>
              <div
                className="relative rounded-xl overflow-hidden cursor-pointer break-inside-avoid group"
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                data-testid={`gallery-item-${i}`}
              >
                <img
                  src={img.src}
                  alt={img.caption}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ minHeight: i % 3 === 0 ? "280px" : i % 3 === 1 ? "220px" : "320px" }}
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-300 ${
                    hoveredIdx === i ? "opacity-100" : "opacity-0"
                  }`}
                />
                <div
                  className={`absolute bottom-0 left-0 right-0 p-4 transform transition-all duration-300 ${
                    hoveredIdx === i ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  }`}
                >
                  <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-grotesk font-semibold mb-2 ${
                    img.category === "Learning" ? "bg-purple-600/80 text-white" :
                    img.category === "Nature" ? "bg-emerald-600/80 text-white" :
                    img.category === "Community" ? "bg-blue-600/80 text-white" :
                    "bg-yellow-600/80 text-white"
                  }`}>
                    {img.category}
                  </span>
                  <h4 className="font-display text-white font-bold text-base">{img.caption}</h4>
                  <p className="text-white/60 font-jakarta text-xs mt-1">{img.desc}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function HighlightsSection() {
  const highlights = [
    {
      icon: "🏛️",
      label: "Learning Spaces",
      value: "24+",
      desc: "Dedicated zones for focused academic growth and innovation.",
      gradient: "from-purple-600/20 to-purple-900/10",
      border: "border-purple-500/20",
      glow: "shadow-purple-500/10",
    },
    {
      icon: "🤝",
      label: "Community Interactions",
      value: "∞",
      desc: "Spontaneous connections that define the campus experience.",
      gradient: "from-yellow-600/20 to-yellow-900/10",
      border: "border-yellow-500/20",
      glow: "shadow-yellow-500/10",
    },
    {
      icon: "🌿",
      label: "Green Corners",
      value: "12+",
      desc: "Natural sanctuaries woven into the architecture of learning.",
      gradient: "from-emerald-600/20 to-emerald-900/10",
      border: "border-emerald-500/20",
      glow: "shadow-emerald-500/10",
    },
    {
      icon: "⚡",
      label: "Everyday Energy",
      value: "365",
      desc: "Days a year the campus pulses with life, ambition, and movement.",
      gradient: "from-blue-600/20 to-blue-900/10",
      border: "border-blue-500/20",
      glow: "shadow-blue-500/10",
    },
  ];

  return (
    <section className="bg-[#080810] py-28 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,_rgba(120,50,200,0.08),_transparent)]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-px bg-yellow-400" />
              <span className="text-yellow-400 font-grotesk text-xs tracking-[0.3em] uppercase font-semibold">Highlights</span>
              <div className="w-8 h-px bg-yellow-400" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white" data-testid="highlights-heading">
              By the numbers,
              <br />
              <span className="italic text-purple-300">beyond the frame.</span>
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" data-testid="highlights-grid">
          {highlights.map((h, i) => (
            <AnimatedSection key={h.label} delay={i * 0.1}>
              <div
                className={`relative rounded-2xl border ${h.border} bg-gradient-to-br ${h.gradient} p-7 shadow-xl ${h.glow} backdrop-blur-sm group hover:scale-105 transition-transform duration-300`}
                data-testid={`highlight-card-${i}`}
              >
                <div className="text-4xl mb-4">{h.icon}</div>
                <div className="font-display text-4xl font-black text-white mb-2">{h.value}</div>
                <div className="font-grotesk text-sm font-bold text-white/80 mb-3 uppercase tracking-wide">{h.label}</div>
                <div className="text-white/45 font-jakarta text-sm leading-relaxed">{h.desc}</div>
                <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-white/3 group-hover:bg-white/6 transition-colors duration-300" />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClosingSection() {
  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden">
      <img
        src={mascotImg}
        alt="REC campus mascot"
        className="absolute inset-0 w-full h-full object-cover object-top"
        data-testid="closing-image"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-black/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <AnimatedSection>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-px bg-yellow-400" />
              <span className="text-yellow-400 font-grotesk text-xs tracking-[0.3em] uppercase font-semibold">Fin</span>
            </div>
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6" data-testid="closing-heading">
              More than
              <br />
              a campus.
              <br />
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-yellow-300">
                A living story.
              </span>
            </h2>
            <p className="text-white/50 font-jakarta text-lg leading-relaxed mb-10">
              These images are just the beginning. Behind every door and under every tree is a story still unfolding.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                data-testid="btn-back-to-top"
                className="px-7 py-3.5 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-jakarta font-semibold rounded-full transition-all duration-300 shadow-xl shadow-purple-600/40 hover:scale-105 active:scale-100"
              >
                Back to Top
              </button>
              <button
                onClick={() => document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" })}
                data-testid="btn-view-gallery"
                className="px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-jakarta font-semibold rounded-full border border-white/20 hover:border-white/40 backdrop-blur-sm transition-all duration-300 hover:scale-105 active:scale-100"
              >
                View Full Gallery
              </button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-black border-t border-white/8 py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-yellow-400 flex items-center justify-center">
            <span className="font-display font-black text-white text-sm">R</span>
          </div>
          <div>
            <span className="font-display font-bold text-white leading-none">REC in Motion</span>
            <p className="text-white/30 font-jakarta text-xs">AI-Enhanced Campus Portfolio</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-6 text-white/30 font-jakarta text-sm">
          {["Story", "Moments", "Gallery", "About"].map((link) => (
            <button
              key={link}
              onClick={() => document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: "smooth" })}
              className="hover:text-white/70 transition-colors duration-200"
            >
              {link}
            </button>
          ))}
        </div>
        <div className="text-white/20 font-jakarta text-xs text-center">
          © 2026 REC in Motion · All images captured on campus
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
    return () => {};
  }, []);

  return (
    <div className="bg-black text-white overflow-x-hidden" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SignatureMomentsSection />
      <GallerySection />
      <HighlightsSection />
      <ClosingSection />
      <Footer />
    </div>
  );
}
