"use client"

import { useEffect, useState, useMemo } from "react"
import { Github, Linkedin, Mail, Download, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

const roles = [
  "AI Engineer",
  "Problem Solver",
  "ML Enthusiast",
]

/* ─────────────────────────────────────────────
   Starfield – kept exactly as-is
   ───────────────────────────────────────────── */
function Starfield() {
  useEffect(() => {
    const canvas = document.getElementById("starfield") as HTMLCanvasElement
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight
    canvas.width = width
    canvas.height = height

    const stars: { x: number; y: number; z: number; size: number }[] = []
    const numStars = 800

    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * width - width / 2,
            y: Math.random() * height - height / 2,
            z: Math.random() * width,
            size: Math.random() * 1.5 + 0.1
        })
    }

    const meteors: { x: number; y: number; length: number; speed: number; angle: number; color: string; life: number; maxLife: number }[] = []
    const meteorColors = ["#A78BFA", "#FF9494", "#2FA4D7", "#ffffff", "#a855f7"]

    function createMeteor() {
        meteors.push({
            x: Math.random() * width * 1.5 - width * 0.25,
            y: -50 - Math.random() * 100,
            length: Math.random() * 150 + 50,
            speed: Math.random() * 15 + 10,
            angle: Math.PI / 4 + (Math.random() * 0.1 - 0.05),
            color: meteorColors[Math.floor(Math.random() * meteorColors.length)],
            life: 0,
            maxLife: Math.random() * 100 + 50
        })
    }

    let animationFrameId: number

    function animate() {
        if (!ctx) return
        ctx.fillStyle = "#000000"
        ctx.fillRect(0, 0, width, height)

        const cx = width / 2
        const cy = height / 2

        for (let i = 0; i < numStars; i++) {
            const star = stars[i]
            star.z -= 1.5

            if (star.z <= 0) {
                star.x = Math.random() * width - width / 2
                star.y = Math.random() * height - height / 2
                star.z = width
                star.size = Math.random() * 1.5 + 0.1
            }

            const x = cx + star.x * (width / star.z)
            const y = cy + star.y * (width / star.z)
            
            const opacity = 1 - star.z / width
            ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
            
            const s = star.size * (width / star.z)
            ctx.beginPath()
            ctx.arc(x, y, s / 2, 0, Math.PI * 2)
            ctx.fill()
        }

        if (Math.random() < 0.015) {
            createMeteor()
        }

        for (let i = meteors.length - 1; i >= 0; i--) {
            const m = meteors[i]
            m.x += Math.cos(m.angle) * m.speed
            m.y += Math.sin(m.angle) * m.speed
            m.life++

            const tailX = m.x - Math.cos(m.angle) * m.length
            const tailY = m.y - Math.sin(m.angle) * m.length

            if (m.life < m.maxLife) {
                const gradient = ctx.createLinearGradient(m.x, m.y, tailX, tailY)
                gradient.addColorStop(0, m.color)
                gradient.addColorStop(1, "transparent")

                ctx.beginPath()
                ctx.moveTo(m.x, m.y)
                ctx.lineTo(tailX, tailY)
                ctx.strokeStyle = gradient
                ctx.lineWidth = 2
                ctx.stroke()

                ctx.beginPath()
                ctx.arc(m.x, m.y, 2, 0, Math.PI * 2)
                ctx.fillStyle = m.color
                ctx.fill()
            }

            if (m.life > m.maxLife || m.y > height + 200 || m.x > width + 200 || m.x < -200) {
                meteors.splice(i, 1)
            }
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
    <div className="absolute inset-0 z-0 bg-black">
      <canvas id="starfield" className="w-full h-full" />
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
      className="hero-glitch-text text-primary font-bold inline-block transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0 }}
      data-text={roles[roleIndex]}
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
      {/* Astronomical Background – untouched */}
      <Starfield />

      {/* Content layer */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-28 lg:py-32">
        <div
          className="grid lg:grid-cols-[1fr_auto] gap-16 lg:gap-24 items-center"
        >
          {/* ── Left: Text Column ── */}
          <div className="flex flex-col gap-8 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
            {/* Greeting */}
            <p
              className="text-primary font-medium mb-4 animate-fade-in-up flex items-center justify-center lg:justify-start gap-1"
            >
              Hello <span className="animate-wave text-xl">👋</span>, I am
            </p>

            {/* Name – Orbitron futuristic font */}
            <h1
              className="hero-name text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 animate-fade-in-up"
              style={{
                fontFamily: "var(--font-orbitron), sans-serif",
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
                  src="/ayush.JPG.jpeg"
                  alt="Ayush Jain"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              {/* Orbiting decorative ring */}
              <OrbitRingSVG size={384} />
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
