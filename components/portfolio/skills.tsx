"use client"

import { useInView } from "@/hooks/use-in-view"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { LeetCodeStats } from "./leetcode-stats"
import { 
  Code2, 
  Globe, 
  Database, 
  Wrench, 
  Brain,
  Users,
  Lightbulb,
  Target
} from "lucide-react"

const technicalSkills = [
  {
    category: "Languages",
    icon: Code2,
    skills: [
      { name: "Python", level: 85, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
      { name: "NodeJS", level: 30, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
      { name: "C/C++", level: 75, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
      { name: "JavaScript", level: 80, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
    ],
  },
  {
    category: "Web Development",
    icon: Globe,
    skills: [
      { name: "HTML", level: 90, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
      { name: "CSS", level: 85, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
      { name: "Bootstrap", level: 75, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg" },
      { name: "NodeJS", level: 30, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
    ],
  },
  {
    category: "Tools & Platforms",
    icon: Wrench,
    skills: [
      { name: "Git", level: 85, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
      { name: "MySQL", level: 75, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
      { name: "GitHub", level: 90, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg", invertDark: true },
      { name: "Postman", level: 80, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg" },
      { name: "Vercel", level: 75, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg", invertDark: true },
    ],
  },
  {
    category: "ML Tools",
    icon: Database,
    skills: [
      { name: "NumPy", level: 80, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg" },
      { name: "Pandas", level: 80, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg", invertDark: true },
      { name: "Matplotlib", level: 75, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matplotlib/matplotlib-original.svg" },
      { name: "TensorFlow/Keras", level: 70, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg" },
      { name: "LangChain", level: 20, icon: "https://unpkg.com/@lobehub/icons-static-svg@latest/icons/langchain-color.svg" },
    ],
  },
]

const softSkills = [
  { name: "Problem-Solving", icon: Brain },
  { name: "Adaptability", icon: Target },
  { name: "Team Collaboration", icon: Users },
  { name: "Critical Thinking", icon: Lightbulb },
]

export function Skills() {
  const { ref, isInView } = useInView({ threshold: 0.1 })

  return (
    <section id="skills" className="py-20">
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            className={cn(
              "text-3xl sm:text-4xl font-bold text-foreground mb-4 transition-all duration-700",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            Skills
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
            Technical proficiencies and soft skills acquired through academic pursuits and hands-on projects.
          </p>
        </div>

        {/* Technical Skills */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {technicalSkills.map((category, catIndex) => (
            <Card
              key={category.category}
              className={cn(
                "border-2 transition-all duration-500 hover:shadow-lg hover:border-primary/50",
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${300 + catIndex * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <category.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {category.category}
                  </h3>
                </div>
                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-foreground flex items-center gap-2">
                          <img 
                            src={skill.icon} 
                            alt={`${skill.name} icon`} 
                            className={cn("w-4 h-4 object-contain", (skill as any).invertDark ? "dark:invert opacity-80" : "")} 
                          />
                          {skill.name}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={cn(
                            "h-full bg-primary rounded-full transition-all duration-1000 ease-out",
                            isInView ? "" : "!w-0"
                          )}
                          style={{ width: isInView ? `${skill.level}%` : "0%" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* LeetCode Stats - Real-time */}
        <div
          className={cn(
            "mb-12 transition-all duration-500",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
          style={{ transitionDelay: "700ms" }}
        >
          <LeetCodeStats />
        </div>

        {/* Soft Skills */}
        <div
          className={cn(
            "transition-all duration-500",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
          style={{ transitionDelay: "800ms" }}
        >
          <h3 className="text-xl font-semibold text-foreground mb-6 text-center">
            Soft Skills
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {softSkills.map((skill) => (
              <Badge
                key={skill.name}
                variant="secondary"
                className="px-6 py-3 text-base gap-2.5 hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
              >
                <skill.icon className="h-5 w-5" />
                {skill.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
