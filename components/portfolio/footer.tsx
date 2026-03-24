"use client"

import { Github, Linkedin, Mail, Heart, Twitter } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 border-t border-border bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="text-xl font-bold text-foreground">
            {"<AJ />"}
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Ayush02jain"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/ayushjain02"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a
              href="https://x.com/AyushjainX"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter (X)</span>
            </a>
            <a
              href="mailto:ayushjsan01@gmail.com"
              className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            {currentYear} Ayush Jain. Made with{" "}
            <Heart className="h-4 w-4 text-red-500 fill-red-500" />
          </p>
        </div>
      </div>
    </footer>
  )
}
