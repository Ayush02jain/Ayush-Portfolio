"use client"

import { useEffect, useState, useMemo } from "react"
import { Github, Linkedin, Mail, Download, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

function LeetCodeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zM9.167 15.817a1.376 1.376 0 0 0-.97.442l-1.356 1.373a1.384 1.384 0 0 0 .009 1.958 1.376 1.376 0 0 0 1.953-.009l1.356-1.373a1.384 1.384 0 0 0-.009-1.958 1.376 1.376 0 0 0-.983-.433zM15.12 12.96h-5.65a1.384 1.384 0 1 0 0 2.768h5.65a1.384 1.384 0 1 0 0-2.768z" />
    </svg>
  )
}

const roles = [
  "AI Engineer",
  "Problem Solver",
  "ML Enthusiast",
]

/* ─────────────────────────────────────────────
   Noise Wave Background
   ───────────────────────────────────────────── */
function NoiseWaveBackground() {
  useEffect(() => {
    const canvas = document.getElementById("hero-bg") as HTMLCanvasElement
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight
    canvas.width = width
    canvas.height = height

    /* ── Wave layer config ── */
    const waveLayers = [
      { yOffset: 0.38, amplitude: 20, color: "rgba(140,90,220,0.2)" },
      { yOffset: 0.45, amplitude: 22, color: "rgba(100,60,180,0.35)" },
      { yOffset: 0.52, amplitude: 16, color: "rgba(120,80,200,0.3)" },
      { yOffset: 0.58, amplitude: 12, color: "rgba(80,40,160,0.25)" },
    ]

    let time = 0
    let animationFrameId: number

    function animate() {
      if (!ctx) return
      time += 0.015

      /* ── 1. Deep dark base ── */
      ctx.fillStyle = "#080510"
      ctx.fillRect(0, 0, width, height)

      /* ── 2. Noise wave layers ── */
      for (const layer of waveLayers) {
        ctx.beginPath()
        ctx.moveTo(0, height)

        for (let x = 0; x <= width; x += 2) {
          const nx = x / width
          const y =
            height * layer.yOffset +
            Math.sin(nx * 6 + time * 1.2) * layer.amplitude +
            Math.sin(nx * 10 + time * 0.8) * (layer.amplitude * 0.5) +
            Math.sin(nx * 14 + time * 1.6) * (layer.amplitude * 0.3)
          ctx.lineTo(x, y)
        }

        ctx.lineTo(width, height)
        ctx.closePath()
        ctx.fillStyle = layer.color
        ctx.fill()
      }

      /* ── 3. Scanlines (CRT texture) ── */
      for (let y = 0; y < height; y += 3) {
        ctx.fillStyle = "rgba(0,0,0,0.12)"
        ctx.fillRect(0, y, width, 1)
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="absolute inset-0 z-0" style={{ backgroundColor: "#080510" }}>
      <canvas id="hero-bg" className="w-full h-full" style={{ pointerEvents: "none" }} />
    </div>
  )
}

/* ─────────────────────────────────────────────
   Glitch Role Text – replaces typewriter
   ───────────────────────────────────────────── */
function GlitchRole() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % roles.length)
        setVisible(true)
      }, 400)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <span
      className="text-primary font-bold inline-block transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {roles[roleIndex]}
    </span>
  )
}

/* ─────────────────────────────────────────────
   Staggered letter reveal for the name
   ───────────────────────────────────────────── */
function StaggeredName({ text }: { text: string }) {
  const letters = useMemo(() => text.split(""), [text])

  return (
    <>
      {letters.map((letter, i) => (
        <span
          key={i}
          className="hero-letter"
          style={{
            animationDelay: `${0.3 + i * 0.05}s`,
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
    </>
  )
}

/* ─────────────────────────────────────────────
   Orbit ring SVG for profile photo
   ───────────────────────────────────────────── */
function OrbitRingSVG({ size }: { size: number }) {
  const r = size / 2 - 4
  const circumference = 2 * Math.PI * r
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="absolute inset-0 animate-orbit pointer-events-none"
      style={{ top: "-8px", left: "-8px", width: size + 16, height: size + 16 }}
    >
      <circle
        cx={size / 2 + 8}
        cy={size / 2 + 8}
        r={r + 8}
        fill="none"
        stroke="rgba(244, 206, 20, 0.2)"
        strokeWidth="1"
        strokeDasharray={`${circumference * 0.15} ${circumference * 0.1}`}
      />
      {/* Orbiting dot */}
      <circle
        cx={size / 2 + 8}
        cy={4}
        r="3"
        fill="#A78BFA"
        className="drop-shadow-[0_0_6px_rgba(167,139,250,0.8)]"
      />
    </svg>
  )
}

/* ─────────────────────────────────────────────
   Hero Section – redesigned
   ───────────────────────────────────────────── */
export function Hero() {
  return (
    <section
      id="hero"
      className="dark min-h-screen flex items-center justify-center relative overflow-hidden text-foreground"
    >
      {/* Background – Noise Waves */}
      <NoiseWaveBackground />

      {/* Content layer */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-28 lg:py-32">
        <div
          className="grid lg:grid-cols-[1fr_auto] gap-16 lg:gap-24 items-center"
        >
          {/* ── Left: Text Column ── */}
          <div className="flex flex-col gap-5 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
            {/* Greeting */}
            <p
              className="text-primary font-medium mb-1 animate-fade-in-up flex items-center justify-center lg:justify-start gap-1"
            >
              Hello <span className="animate-wave text-xl">👋</span>, I am
            </p>

            {/* Name – Rajdhani font */}
            <h1
              className="hero-name mb-2 animate-fade-in-up"
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "clamp(3rem, 8vw, 6rem)",
                fontWeight: 700,
                letterSpacing: "0.04em",
                color: "#FFFFFF",
                textShadow: "none",
                filter: "none",
                animationDelay: "0.1s",
              }}
            >
              Ayush Jain
            </h1>

            {/* Role subtitle – glitch effect */}
            <div
              className="h-10 sm:h-12 animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <span className="text-lg sm:text-xl lg:text-2xl text-white/50 font-light">
                {"I'm a "}
                <GlitchRole />
              </span>
            </div>

            {/* Bio paragraph */}
            <p
              className="text-white/40 text-base sm:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              Passionate about building innovative software solutions, exploring machine learning, 
              and contributing to open-source projects.
            </p>

            {/* CTA Buttons – clear hierarchy */}
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              <Button asChild size="lg" className="hero-cta-primary gap-2 h-12 px-8 text-base rounded-lg w-full sm:w-auto">
                <a
                  href="https://drive.google.com/file/d/19YuXZvmUTInn_eB76rYLw2z1bTn6U3Kx/view"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="h-5 w-5" />
                  Download CV
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="hero-cta-secondary h-12 px-8 text-base rounded-lg w-full sm:w-auto"
                asChild
              >
                <a href="#contact">Contact Me</a>
              </Button>
            </div>

            {/* Social Links – larger, with hover glow */}
            <div
              className="flex gap-5 justify-center lg:justify-start animate-fade-in-up"
              style={{ animationDelay: "0.5s" }}
            >
              <a
                href="https://github.com/Ayush02jain"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-link p-4 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-[#A78BFA] hover:border-[#A78BFA]/40"
              >
                <Github className="h-6 w-6" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/ayushjain02"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-link p-4 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-[#A78BFA] hover:border-[#A78BFA]/40"
              >
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="https://leetcode.com/u/ayush02_jain/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-link p-4 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-[#A78BFA] hover:border-[#A78BFA]/40"
              >
                <LeetCodeIcon className="h-6 w-6" />
                <span className="sr-only">LeetCode</span>
              </a>
              <a
                href="mailto:ayushjsan01@gmail.com"
                className="social-icon-link p-4 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-[#A78BFA] hover:border-[#A78BFA]/40"
              >
                <Mail className="h-6 w-6" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>

          {/* ── Right: Profile Photo ── */}
          <div
            className="flex justify-center lg:justify-end animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="relative">
              {/* Profile image border */}
              <div
                className="w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden border-[3px] border-[#A78BFA]/60"
              >
                <img
                  src="/profile.jpg"
                  alt="Ayush Jain"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator – smooth looping float */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-scroll-float">
          <a
            href="#about"
            className="flex flex-col items-center gap-2 text-white/30 hover:text-[#A78BFA] transition-colors duration-300 group"
          >
            <span className="text-[10px] tracking-[0.3em] uppercase font-medium">Scroll</span>
            <ChevronDown className="h-5 w-5 group-hover:translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  )
}
