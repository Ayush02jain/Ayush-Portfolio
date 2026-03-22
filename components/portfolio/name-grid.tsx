import { useState, useEffect, useMemo, memo } from "react"
import { cn } from "@/lib/utils"

// 7 rows tall grid letters for "AYUSH JAIN"
// Each letter is defined as a 2D array where 1 = filled, 0 = empty
const letterPatterns: Record<string, number[][]> = {
  A: [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
  Y: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
  ],
  U: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  S: [
    [0, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
  ],
  H: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
  J: [
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  I: [
    [1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  N: [
    [1, 0, 0, 0, 1],
    [1, 1, 0, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
  " ": [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ],
}

function createGridFromText(text: string): number[][] {
  const rows = 7
  const grid: number[][] = Array(rows).fill(null).map(() => [])
  
  for (const char of text.toUpperCase()) {
    const pattern = letterPatterns[char] || letterPatterns[" "]
    for (let row = 0; row < rows; row++) {
      grid[row].push(...pattern[row], 0) // Add letter + 1 column spacing
    }
  }
  
  return grid
}

export const NameGrid = memo(function NameGrid() {
  const [visibleCells, setVisibleCells] = useState<Set<string>>(new Set())
  const [isAnimating, setIsAnimating] = useState(true)
  const [pulsingCells, setPulsingCells] = useState<Set<string>>(new Set())
  const grid = useMemo(() => createGridFromText("AYUSH JAIN"), [])
  
  useEffect(() => {
    if (!isAnimating) return
    
    const filledCells: [number, number][] = []
    grid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell === 1) {
          filledCells.push([rowIndex, colIndex])
        }
      })
    })
    
    // Animate column by column (left to right) for wave effect
    const sortedByColumn = filledCells.sort((a, b) => a[1] - b[1])
    
    let index = 0
    const interval = setInterval(() => {
      if (index >= sortedByColumn.length) {
        clearInterval(interval)
        setIsAnimating(false)
        return
      }
      
      // Add multiple cells at once for faster animation
      const batchSize = 3
      for (let i = 0; i < batchSize && index < sortedByColumn.length; i++) {
        const [row, col] = sortedByColumn[index]
        setVisibleCells(prev => new Set([...prev, `${row}-${col}`]))
        index++
      }
    }, 20)
    
    return () => clearInterval(interval)
  }, [isAnimating, grid])

  // Continuous pulsing animation after initial reveal
  useEffect(() => {
    if (isAnimating) return
    
    const filledCells: string[] = []
    grid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell === 1) {
          filledCells.push(`${rowIndex}-${colIndex}`)
        }
      })
    })

    const pulseInterval = setInterval(() => {
      // Randomly select some cells to pulse
      const numToPulse = Math.floor(filledCells.length * 0.15)
      const shuffled = [...filledCells].sort(() => Math.random() - 0.5)
      const toPulse = new Set(shuffled.slice(0, numToPulse))
      setPulsingCells(toPulse)
      
      // Clear pulse after animation
      setTimeout(() => {
        setPulsingCells(new Set())
      }, 400)
    }, 1500)

    return () => clearInterval(pulseInterval)
  }, [isAnimating, grid])
  
  // Get random intensity for visual variation
  const getIntensity = (row: number, col: number): number => {
    const seed = row * 100 + col
    return ((seed * 9301 + 49297) % 233280) / 233280
  }
  
  return (
    <div 
      className="inline-flex flex-col gap-[1px] p-2 rounded-md bg-white/10 backdrop-blur-sm border border-white/20"
      role="img"
      aria-label="Ayush Jain"
    >
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-[1px]">
          {row.map((cell, colIndex) => {
            const key = `${rowIndex}-${colIndex}`
            const isVisible = visibleCells.has(key)
            const isPulsing = pulsingCells.has(key)
            const intensity = getIntensity(rowIndex, colIndex)
            
            return (
              <div
                key={colIndex}
                className={cn(
                  "w-[3px] h-[3px] sm:w-[4px] sm:h-[4px] md:w-[5px] md:h-[5px] rounded-[1px] transition-all",
                  cell === 1 && isVisible
                    ? isPulsing
                      ? "bg-green-300 shadow-[0_0_6px_rgba(74,222,128,0.8)] scale-125 duration-200"
                      : intensity > 0.7
                        ? "bg-green-400 shadow-[0_0_3px_rgba(74,222,128,0.4)] duration-300"
                        : intensity > 0.4
                        ? "bg-green-500 duration-300"
                        : "bg-green-600 duration-300"
                    : "bg-white/20 duration-300"
                )}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
})
