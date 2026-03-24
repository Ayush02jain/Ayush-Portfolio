"use client"

import { useInView } from "@/hooks/use-in-view"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { GraduationCap, Calendar, MapPin } from "lucide-react"

const education = [
  {
    id: 1,
    degree: "Bachelor of Technology",
    field: "Computer Science and Engineering",
    institution: "Lovely Professional University",
    location: "Punjab, India",
    duration: "Aug'23 - Present",
    score: "CGPA: 8.30",
    description:
      "Currently pursuing B.Tech in CSE with focus on software development, machine learning, and cloud computing. Active participant in coding competitions and hackathons.",
    current: true,
  },
  {
    id: 2,
    degree: "Intermediate",
    field: "Science (PCM)",
    institution: "Seven Hills School",
    location: "Etawah, Uttar Pradesh",
    duration: "Apr'21 - Mar'22",
    score: "Percentage: 74.60%",
    description: "Completed higher secondary education with a focus on Physics, Chemistry, and Mathematics.",
    current: false,
  },
  {
    id: 3,
    degree: "Matriculation",
    field: "General Science",
    institution: "Seven Hills School",
    location: "Etawah, Uttar Pradesh",
    duration: "Apr'19 - Mar'20",
    score: "Percentage: 78.17%",
    description: "Completed secondary education with a focus on core academic subjects.",
    current: false,
  },
]

export function Education() {
  const { ref, isInView } = useInView({ threshold: 0.1 })

  return (
    <section id="education" className="py-20 bg-muted/30">
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            className={cn(
              "text-3xl sm:text-4xl font-bold text-foreground mb-4 transition-all duration-700",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            Education
          </h2>
          <div
            className={cn(
              "w-20 h-1 bg-primary mx-auto mb-4 transition-all duration-700 delay-100",
              isInView ? "opacity-100 scale-100" : "opacity-0 scale-0"
            )}
          />
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-border" />

            <div className="space-y-8">
              {education.map((edu, index) => (
                <div
                  key={edu.id}
                  className={cn(
                    "relative pl-20 transition-all duration-500",
                    isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                  )}
                  style={{ transitionDelay: `${300 + index * 150}ms` }}
                >
                  {/* Timeline dot */}
                  <div
                    className={cn(
                      "absolute left-6 top-6 w-5 h-5 rounded-full border-4 border-background z-10",
                      edu.current ? "bg-primary" : "bg-muted-foreground"
                    )}
                  />

                  <Card className="border-2 group hover:shadow-lg hover:border-primary/50 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-xl bg-primary/10 text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            <GraduationCap className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">
                              {edu.degree}
                            </h3>
                            <p className="text-primary font-medium">{edu.field}</p>
                          </div>
                        </div>
                        {edu.current && (
                          <Badge className="shrink-0">Current</Badge>
                        )}
                      </div>

                      <div className="space-y-2 mb-4">
                        <p className="text-foreground font-medium">
                          {edu.institution}
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {edu.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {edu.duration}
                          </span>
                        </div>
                      </div>

                      <Badge variant="secondary" className="mb-4">
                        {edu.score}
                      </Badge>

                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {edu.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
