"use client"

import { useInView } from "@/hooks/use-in-view"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Award, ExternalLink } from "lucide-react"

const certificates = [
  {
    id: 1,
    title: "Generative AI and LLMs",
    issuer: "Infosys",
    date: "Aug'25",
    image: "/Screenshot 2026-03-24 215910.png",
    link: "https://drive.google.com/file/d/15Tx1ZGn1G1eTGGiWz8YqswDyEwD_T1d1/view",
    description: "Comprehensive course on Generative AI fundamentals and Large Language Models",
  },
  {
    id: 2,
    title: "Cloud Computing with AWS",
    issuer: "Cipher Schools",
    date: "Jul'25",
    image: "/Screenshot 2026-03-24 215958.png",
    link: "https://drive.google.com/file/d/10IaMY9nCeEUkxm4LZsk9cVg8jZNI42JQ/view",
    description: "AWS cloud services, deployment, and infrastructure management",
  },
  {
    id: 3,
    title: "Data Structure and Algorithm",
    issuer: "iamNeo",
    date: "Dec'24",
    image: "/Screenshot 2026-03-24 220022.png",
    link: "https://drive.google.com/file/d/1ZTpaHDGLP_eAPWOER6fFNJMBzEEHsOQp/view",
    description: "In-depth understanding of DSA concepts and problem-solving techniques",
  },
  {
    id: 4,
    title: "Web Development Bootcamp",
    issuer: "Udemy",
    date: "Jan'24",
    image: "/Screenshot 2026-03-24 220039.png",
    link: "https://udemy-certificate.s3.amazonaws.com/pdf/UC-18b7ba36-7f8d-40f0-9ac0-01199a873493.pdf",
    description: "Full-stack web development with modern technologies and frameworks",
  },
]

export function Certificates() {
  const { ref, isInView } = useInView({ threshold: 0.1 })

  return (
    <section id="certificates" className="py-20 bg-muted/30">
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            className={cn(
              "text-3xl sm:text-4xl font-bold text-foreground mb-4 transition-all duration-700",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            Certificates
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
            Professional certifications demonstrating commitment to continuous learning.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificates.map((cert, index) => (
            <Card
              key={cert.id}
              className={cn(
                "border-2 group overflow-hidden flex flex-col transition-all duration-500 hover:shadow-xl hover:border-primary/50 hover:-translate-y-1",
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              <div className="relative h-48 shrink-0 overflow-hidden">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              </div>
              <CardContent className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-foreground mb-1 line-clamp-2">
                  {cert.title}
                </h3>
                <p className="text-sm text-primary font-medium mb-1">{cert.issuer}</p>
                <p className="text-xs text-muted-foreground mb-3">{cert.date}</p>
                <p className="text-sm text-muted-foreground mb-4 flex-1">
                  {cert.description}
                </p>
                <Button asChild variant="outline" size="sm" className="w-full gap-2 mt-auto">
                  <a href={cert.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    View Certificate
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
