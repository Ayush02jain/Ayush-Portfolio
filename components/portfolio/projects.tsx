"use client"

import { useState } from "react"
import { useInView } from "@/hooks/use-in-view"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Github, ExternalLink } from "lucide-react"

const projects = [
    {
    id: 1,
    title: "Quizzer",
    description: [
      "Built a full-stack web application with Django for creating, managing, and taking quizzes online",
      "Creators can build quizzes with custom questions, set timers, add passcodes, and track participant scores",
      "Designed a clean, modern dashboard for seamless quiz management and analytics",
      "Implemented secure authentication and real-time score tracking for participants",
    ],
    techStack: ["Django", "Python", "HTML", "CSS", "JavaScript"],
    category: "Web",
    github: "https://github.com/Ayush02jain/Quiz-App",
    demo: "#",
    image: "/quizzer.png",
    imageClassName: "object-center",
    date: "Jan'26 - Feb'26",
  },
  {
    id: 2,
    title: "Stock Price Prediction using Machine Learning",
    description: [
      "Developed an ML-based system to predict stock prices using historical market data",
      "Implemented LSTM networks to capture long-range temporal trends for better predictions",
      "Performed data preprocessing, feature scaling, and tuning to improve model reliability",
      "Achieved higher forecasting accuracy to support data-driven investment decisions",
    ],
    techStack: ["Python", "NumPy", "Pandas", "Matplotlib", "TensorFlow/Keras"],
    category: "ML",
    github: "https://github.com/Ayush02jain/Stock-Market-Price-Prediction",
    demo: "#",
    image: "/stock-prediction.jpg",
    imageClassName: "object-center",
    date: "Aug'25 - Dec'25",
  },
  {
    id: 3,
    title: "AI-Based Operating System Process Analyzer",
    description: [
      "Developed an intelligent system monitoring module to analyze process behavior",
      "Implemented real-time tracking of CPU/memory usage with optimized RESTful APIs",
      "Integrated Isolation Forest algorithm to detect abnormal processes",
      "Improved system stability by automatically identifying and flagging suspicious processes",
    ],
    techStack: ["HTML", "CSS", "Python", "JavaScript"],
    category: "Web",
    github: "https://github.com/Ayush02jain/Ai_Based_os_process_analyzer",
    demo: "#",
    image: "/ai-process-analyzer.jpg",
    imageClassName: "object-[center_25%]",
    date: "Apr'25 - May'25",
  },
]

const categories = ["All", "Web", "ML"]

export function Projects() {
  const { ref, isInView } = useInView({ threshold: 0.1 })
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory)

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            className={cn(
              "text-3xl sm:text-4xl font-bold text-foreground mb-4 transition-all duration-700",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            Projects
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
            A selection of projects showcasing my skills in software development and machine learning.
          </p>
        </div>

        {/* Category Filter */}
        <div
          className={cn(
            "flex flex-wrap justify-center gap-2 mb-10 transition-all duration-700 delay-300",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <Card
              key={project.id}
              className={cn(
                "border-2 group overflow-hidden flex flex-col transition-all duration-500 hover:shadow-xl hover:border-primary/50 hover:-translate-y-1",
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${400 + index * 100}ms` }}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden h-48 shrink-0">
                <img
                  src={project.image}
                  alt={project.title}
                  className={cn(
                    "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110",
                    project.imageClassName
                  )}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <Badge className="absolute top-3 right-3" variant="secondary">
                  {project.date}
                </Badge>
              </div>

              <CardContent className="p-5 flex-grow">
                <h3 className="text-lg font-semibold text-foreground mb-3 line-clamp-2">
                  {project.title}
                </h3>
                <ul className="text-sm text-muted-foreground mb-4 space-y-1.5">
                  {project.description.slice(0, 3).map((point, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary mt-1">{">"}</span>
                      <span className="line-clamp-2">{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="p-5 pt-0 gap-3 mt-auto">
                <Button asChild variant="outline" size="sm" className="flex-1">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gap-2"
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                  </a>
                </Button>
                {project.demo !== "#" && (
                  <Button asChild size="sm" className="flex-1">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Demo
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
