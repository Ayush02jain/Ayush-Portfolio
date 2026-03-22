"use client"

import { useInView } from "@/hooks/use-in-view"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Cloud, Calendar } from "lucide-react"

const training = {
  title: "Cloud Computing with AWS - Project Training",
  date: "Jun'25 - Jul'25",
  description: [
    "Integrated CI/CD pipelines using GitHub Actions and AWS services to automate deployment workflows; this initiative focused on achieving scalability, efficiency, and zero manual intervention for faster more reliable feature delivery.",
    "Applied DevOps best practices by leveraging infrastructure-as-code principles, IAM user configuration, and workflow YAML pipelines with automated testing/validation, demonstrating a production-ready deployment architecture.",
    "Learned how to design secure, CI/CD pipelines by troubleshooting real-world deployment challenges and strengthening expertise in cloud-native DevOps practices.",
  ],
  techStack: ["Amazon Web Services", "HTML", "CSS", "JavaScript"],
}

export function Training() {
  const { ref, isInView } = useInView({ threshold: 0.1 })

  return (
    <section id="training" className="py-20">
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            className={cn(
              "text-3xl sm:text-4xl font-bold text-foreground mb-4 transition-all duration-700",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            Training
          </h2>
          <div
            className={cn(
              "w-20 h-1 bg-primary mx-auto mb-4 transition-all duration-700 delay-100",
              isInView ? "opacity-100 scale-100" : "opacity-0 scale-0"
            )}
          />
        </div>

        <Card
          className={cn(
            "border-2 max-w-4xl mx-auto transition-all duration-500 hover:shadow-lg hover:border-primary/50",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
          style={{ transitionDelay: "200ms" }}
        >
          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-6">
              <div className="p-3 rounded-xl bg-primary/10 text-primary shrink-0">
                <Cloud className="h-8 w-8" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {training.title}
                </h3>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">{training.date}</span>
                </div>
              </div>
            </div>

            <ul className="space-y-4 mb-6">
              {training.description.map((point, index) => (
                <li
                  key={index}
                  className={cn(
                    "flex items-start gap-3 text-muted-foreground transition-all duration-500",
                    isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                  )}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <span className="text-primary mt-1 font-bold">{">"}</span>
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-foreground mr-2">Tech Stack:</span>
              {training.techStack.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
