"use client";

import Link from "next/link";
import { Button } from "@/src/helper/button";
import { Card } from "@/src/helper/card";
import { Code2 } from "lucide-react";

function Navbar() {
  return (
    <nav className="w-full border-b bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/60 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left side: logo + title */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="p-2 rounded-lg bg-primary/10 flex justify-center items-center gap-2 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-105">
            <Code2 className="h-6 w-6 text-primary group-hover:rotate-12 transition" />
            <span className="font-bold text-primary text-lg">CodeTrace</span>
          </div>
          <span className="text-foreground font-semibold group-hover:text-primary transition-colors">
            Python Code Visualizer
          </span>
        </div>

        {/* Right side: nav links */}
        <div className="flex items-center gap-6 text-sm">
          <Link
            href="#features"
            scroll={true}
            className="relative text-muted-foreground hover:text-primary transition group"
          >
            Features
            <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
          </Link>

          <Link
            href="#about"
            scroll={true}
            className="relative text-muted-foreground hover:text-primary transition group"
          >
            About
            <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
          </Link>

          <Link href="/visualize/v2">
            <Button className="px-4 py-2 transition-all duration-300 hover:scale-[1.05] hover:shadow-md">
              Launch Visualizer
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default function VisualizerHome() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* HERO SECTION */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* LEFT: TEXT */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Visualize Python Code Execution
              <br />
              <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                Line by Line
              </span>
            </h1>

            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-md">
              Experience Python execution visually - watch variables change,
              track stack frames, follow heap references, and understand your
              code like never before.
            </p>

            <div className="flex gap-4">
              <Link href="/visualize/v2">
                <Button
                  size="lg"
                  className="px-8 py-5 text-lg transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  Launch Visualizer
                </Button>
              </Link>

              <Link href="#features">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-5 text-lg transition-all duration-300 hover:scale-105"
                >
                  Explore Features
                </Button>
              </Link>
            </div>
          </div>

          {/* RIGHT: GIF */}
          <div className="flex justify-center md:justify-end">
            <img
              src="/demo-visualizer.gif"
              alt="Python Visualizer Demo"
              className="w-full max-w-xxl rounded-xl border border-border shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="bg-card py-16 border-t border-border">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-semibold text-foreground text-center mb-10">
            Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[ 
              {
                title: "Live Execution Flow",
                desc: "Highlight the current line and follow control flow step-by-step.",
              },
              {
                title: "Stack & Heap Visualization",
                desc: "Inspect stack frames, variables, object references, and memory.",
              },
              {
                title: "Modern Code Editor",
                desc: "Syntax highlighting, locking mechanism, and smooth interactions.",
              },
            ].map((item, i) => (
              <Card
                key={i}
                className="p-6 border border-primary/10 shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:border-primary/30"
              >
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="bg-card py-16 border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-foreground mb-4">
            About This Project
          </h2>

          <p className="max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            This visualizer is built to help learners truly understand Python
            execution. Designed with a clean and modern UI, it mirrors the
            structured design patterns from our SkillBrew ecosystem and breaks
            down complex runtime behavior into intuitive visuals.
          </p>
        </div>
      </section>
    </div>
  );
}
