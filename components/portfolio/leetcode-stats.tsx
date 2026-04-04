"use client"

import { useEffect, useState, useRef } from "react"
import { ExternalLink } from "lucide-react"

interface LeetCodeData {
  total: { solved: number; total: number }
  easy: { solved: number; total: number }
  medium: { solved: number; total: number }
  hard: { solved: number; total: number }
}

/* ─── Multi-segment donut ring chart ─── */
function DonutChart({
  solved,
  total,
  easy,
  medium,
  hard,
  animated,
}: {
  solved: number
  total: number
  easy: { solved: number; total: number }
  medium: { solved: number; total: number }
  hard: { solved: number; total: number }
  animated: boolean
}) {
  const size = 160
  const strokeWidth = 9
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  
  // Ratios based on totals
  const totalQ = easy.total + medium.total + hard.total || 1
  const easyRatio = easy.total / totalQ
  const medRatio = medium.total / totalQ
  const hardRatio = hard.total / totalQ

  // Setup tracks and gaps
  const gap = circumference * 0.02
  const availableLen = Math.max(circumference - 3 * gap, 0)
  
  const easyTrackLen = availableLen * easyRatio
  const medTrackLen = availableLen * medRatio
  const hardTrackLen = availableLen * hardRatio

  const easyOffset = 0
  const medOffset = easyTrackLen + gap
  const hardOffset = medOffset + medTrackLen + gap

  // Filled parts, ensuring minimum visibility if solved > 0
  const minVis = circumference * 0.015
  const easyFillLen = easy.solved > 0 ? Math.max((easy.solved / easy.total) * easyTrackLen, minVis) : 0
  const medFillLen = medium.solved > 0 ? Math.max((medium.solved / medium.total) * medTrackLen, minVis) : 0
  const hardFillLen = hard.solved > 0 ? Math.max((hard.solved / hard.total) * hardTrackLen, minVis) : 0

  return (
    <div className="relative flex-shrink-0 flex items-center justify-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        {/* EASY (Green) */}
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="rgba(34, 197, 94, 0.15)" strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${easyTrackLen} ${circumference}`}
          strokeDashoffset={-easyOffset}
        />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="#22c55e" strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${animated ? easyFillLen : 0} ${circumference}`}
          strokeDashoffset={-easyOffset}
          style={{ transition: animated ? "stroke-dasharray 1s cubic-bezier(0.4,0,0.2,1)" : "none" }}
        />

        {/* MEDIUM (Amber) */}
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="rgba(245, 158, 11, 0.15)" strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${medTrackLen} ${circumference}`}
          strokeDashoffset={-medOffset}
        />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="#f59e0b" strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${animated ? medFillLen : 0} ${circumference}`}
          strokeDashoffset={-medOffset}
          style={{ transition: animated ? "stroke-dasharray 1s cubic-bezier(0.4,0,0.2,1) 0.15s" : "none" }}
        />

        {/* HARD (Red) */}
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="rgba(239, 68, 68, 0.15)" strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${hardTrackLen} ${circumference}`}
          strokeDashoffset={-hardOffset}
        />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="#ef4444" strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${animated ? hardFillLen : 0} ${circumference}`}
          strokeDashoffset={-hardOffset}
          style={{ transition: animated ? "stroke-dasharray 1s cubic-bezier(0.4,0,0.2,1) 0.3s" : "none" }}
        />
      </svg>

      {/* Center label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-1">
        <div className="flex items-baseline gap-0.5">
          <span className="text-4xl font-bold text-black dark:text-white leading-none">{solved}</span>
          <span className="text-sm text-black dark:text-white font-medium">/{total}</span>
        </div>
        <div className="flex items-center gap-1.5 mt-1.5 text-green-600">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-sm font-semibold">Solved</span>
        </div>
        <div className="mt-1.5 text-xs text-zinc-700 font-medium">
          3 Attempting
        </div>
      </div>
    </div>
  )
}

/* ─── Difficulty row ─── */
function DifficultyRow({
  label,
  solved,
  total,
  barColor,
  animated,
  delay,
}: {
  label: string
  solved: number
  total: number
  barColor: string
  animated: boolean
  delay: number
}) {
  const percent = total > 0 ? (solved / total) * 100 : 0

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span
          className="text-base font-semibold"
          style={{ color: barColor }}
        >
          {label}
        </span>
        <span className="text-base text-muted-foreground tabular-nums">
          <span className="font-bold text-foreground text-lg">{solved}</span>
          <span className="mx-1">/</span>
          {total}
        </span>
      </div>
      <div className="h-2.5 w-full rounded-full bg-zinc-200 dark:bg-[#1a1a1a] overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            backgroundColor: barColor,
            width: animated ? `${percent}%` : "0%",
            transition: animated
              ? `width 1s cubic-bezier(0.4,0,0.2,1) ${delay}ms`
              : "none",
          }}
        />
      </div>
    </div>
  )
}

/* ─── LeetCode icon SVG (inline, no external dependency) ─── */
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

/* ─── Main Component ─── */
export function LeetCodeStats() {
  const [data, setData] = useState<LeetCodeData | null>(null)
  const [loading, setLoading] = useState(true)
  const [animated, setAnimated] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch("/api/leetcode")
        const stats = await response.json()
        setData(stats)
      } catch {
        setData({
          total: { solved: 88, total: 3874 },
          easy: { solved: 41, total: 932 },
          medium: { solved: 44, total: 2027 },
          hard: { solved: 3, total: 915 },
        })
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  // Trigger animation when card scrolls into view
  useEffect(() => {
    if (loading || !cardRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [loading])

  /* ── Loading skeleton ── */
  if (loading) {
    return (
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-muted animate-pulse" />
            <div className="w-32 h-5 rounded bg-muted animate-pulse" />
          </div>
          <div className="w-20 h-4 rounded bg-muted animate-pulse" />
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-8">
          <div className="w-[160px] h-[160px] rounded-full bg-muted animate-pulse flex-shrink-0" />
          <div className="flex-1 w-full flex flex-col gap-5">
            <div className="h-8 rounded bg-muted animate-pulse" />
            <div className="h-8 rounded bg-muted animate-pulse" />
            <div className="h-8 rounded bg-muted animate-pulse" />
          </div>
        </div>
      </div>
    )
  }

  if (!data) return null

  return (
    <div
      ref={cardRef}
      className="rounded-xl border border-border bg-card p-6 sm:p-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-base font-semibold text-foreground flex items-center gap-2.5">
          <LeetCodeIcon className="w-5 h-5 text-primary" />
          LeetCode Progress
        </h3>
        <a
          href="https://leetcode.com/u/ayush02_jain/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
        >
          View Profile
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      {/* Body: Donut + Stats */}
      <div className="flex flex-col sm:flex-row items-center gap-8 sm:gap-10">
        {/* Donut chart */}
        <DonutChart
          solved={data.total.solved}
          total={data.total.total}
          easy={data.easy}
          medium={data.medium}
          hard={data.hard}
          animated={animated}
        />

        {/* Difficulty rows */}
        <div className="flex-1 w-full flex flex-col gap-5">
          <DifficultyRow
            label="Easy"
            solved={data.easy.solved}
            total={data.easy.total}
            barColor="#22c55e"
            animated={animated}
            delay={200}
          />
          <DifficultyRow
            label="Medium"
            solved={data.medium.solved}
            total={data.medium.total}
            barColor="#f59e0b"
            animated={animated}
            delay={400}
          />
          <DifficultyRow
            label="Hard"
            solved={data.hard.solved}
            total={data.hard.total}
            barColor="#ef4444"
            animated={animated}
            delay={600}
          />
        </div>
      </div>
    </div>
  )
}
