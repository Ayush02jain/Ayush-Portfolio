"use client"

import { useInView } from "@/hooks/use-in-view"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Trophy, Code, Star, Award } from "lucide-react"

const achievements = [
  {
    id: 1,
    title: "150+ Problems Solved",
    description: "Solved 150+ coding problems across LeetCode and HackerRank, sharpening problem-solving skills.",
    date: "Feb'25",
    icon: Code,
  },
  {
    id: 2,
    title: "Master Level - Coding Ninjas",
    description: "Achieved Master level on Coding Ninjas in Data Structured and Algorithm.",
    date: "Jan'24",
    icon: Trophy,
  },
  {
    id: 3,
    title: "HackerRank Score: 115 Points",
    description: "Scored 115 points in C and Python languages on HackerRank.",
    date: "Dec'23",
    icon: Star,
  },
  {
    id: 4,
    title: "3-Star Rating - HackerRank",
    description: "Achieved a 3-star rating in C++ and Python for consistent performance on HackerRank.",
    date: "Dec'23",
    icon: Award,
  },
]

export function Achievements() {
  const { ref, isInView } = useInView({ threshold: 0.1 })

  return (
    <section id="achievements" className="py-20">
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            className={cn(
              "text-3xl sm:text-4xl font-bold text-foreground mb-4 transition-all duration-700",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            Achievements
          </h2>
          <div
            className={cn(
              "w-20 h-1 bg-primary mx-auto mb-4 transition-all duration-700 delay-100",
              isInView ? "opacity-100 scale-100" : "opacity-0 scale-0"
            )}
          />
          <p
            className={cn(
              "text-muted-foreground max-w-2xl mx-auto transition-all duration-700 delay-200",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            Recognition and milestones achieved through dedication and continuous improvement.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border hidden md:block" />

          <div className="space-y-8">
            {achievements.map((achievement, index) => (
              <div
                key={achievement.id}
                className={cn(
                  "relative grid md:grid-cols-2 gap-4 md:gap-8 transition-all duration-500",
                  isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                {/* Timeline dot */}
                <div className="absolute left-1/2 top-6 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background hidden md:block z-10" />

                {/* Content */}
                <Card
                  className={cn(
                    "border-2 group hover:shadow-lg hover:border-primary/50 transition-all duration-300",
                    index % 2 === 0 ? "md:col-start-1" : "md:col-start-2"
                  )}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-primary/10 text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <achievement.icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="font-semibold text-foreground">
                            {achievement.title}
                          </h3>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {achievement.date}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Empty space for alternating layout */}
                {index % 2 === 0 ? (
                  <div className="hidden md:block" />
                ) : (
                  <div className="hidden md:block order-first" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
