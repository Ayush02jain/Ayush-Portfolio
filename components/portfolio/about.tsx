"use client"

import { useInView } from "@/hooks/use-in-view"
import { GraduationCap, MapPin, Calendar, Building } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const highlights = [
  {
    icon: GraduationCap,
    label: "Degree",
    value: "B.Tech CSE",
  },
  {
    icon: Building,
    label: "College",
    value: "Lovely Professional University",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Punjab, India",
  },
  {
    icon: Calendar,
    label: "Year",
    value: "Aug 2023 - Present",
  },
]

export function About() {
  const { ref, isInView } = useInView({ threshold: 0.1 })

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            className={cn(
              "text-3xl sm:text-4xl font-bold text-foreground mb-4 transition-all duration-700",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            About Me
          </h2>
          <div
            className={cn(
              "w-20 h-1 bg-primary mx-auto transition-all duration-700 delay-100",
              isInView ? "opacity-100 scale-100" : "opacity-0 scale-0"
            )}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div
            className={cn(
              "flex justify-center transition-all duration-700 delay-200",
              isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            )}
          >
            <div className="relative">
              <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="/ayush2.JPG"
                  alt="Ayush Jain"
                  className="w-full h-full object-cover object-[center_25%]"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-4 -right-4 w-64 h-64 sm:w-80 sm:h-80 border-2 border-primary rounded-2xl -z-10" />
            </div>
          </div>

          {/* Content */}
          <div
            className={cn(
              "transition-all duration-700 delay-300",
              isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            )}
          >
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Hi, I am Ayush Jain
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              I am a passionate Computer Science & Engineering student at Lovely Professional 
              University with a strong foundation in software development, machine learning, 
              and cloud computing. I thrive on solving complex problems and building innovative 
              solutions that make a difference.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              With hands-on experience in Python, JavaScript, and various frameworks, I enjoy 
              working on projects that challenge me to learn and grow. From developing ML-based 
              stock prediction systems to building intelligent OS process analyzers, I am always 
              eager to explore new technologies and push my boundaries.
            </p>

            {/* Highlight Cards */}
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <Card
                  key={item.label}
                  className={cn(
                    "border-2 transition-all duration-500 hover:shadow-lg hover:border-primary/50",
                    isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  )}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="text-sm font-medium text-foreground">{item.value}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
