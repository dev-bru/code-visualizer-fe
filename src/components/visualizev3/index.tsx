/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { Code2 } from "lucide-react";
import { CallStack } from "./CallStack";
import { CodeDisplay } from "./CodeDisplay";
import { ExecutionControls } from "./ExecutionControls";
import { HeapVisualization } from "./HeapVisualization";
import { OutputDisplay } from "./OutputDisplay";
import { VariablesView } from "./VariablesView";

const sampleCode = `def calculate_factorial(num):
    if num < 0:
        return "Factorial is not defined for negative numbers."
    elif num == 0:
        return 1
    else:
        factorial = 1
        for i in range(1, num + 1):
            factorial *= i
        return factorial

number = 5
result = calculate_factorial(number)
print(f"The factorial of {number} is {result}")

number = 0
result = calculate_factorial(number)
print(f"The factorial of {number} is {result}")

number = -3
result = calculate_factorial(number)
print(f"The factorial of {number} is {result}")`;

const VisualizeV3 = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trace, setTrace] = useState<any[]>([]);
  const currentState: any = trace[currentStep];
  const BACKEND_URL = "http://localhost:8000/visualize/trace";
  const [error, setError] = useState<string | null>(null);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch(BACKEND_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            code: sampleCode,
            language: "python",
            stdin: "",
            timeout: 10,
          }),
        });

        const data = await res.json();
        if (data.error) {
          setError(data.error);
          setTrace([]);
        } else {
          setTrace(data.trace as any[]);
        }
      } catch (e: any) {
        setError(e.message ?? "Request failed");
      }
    };

    run();
  }, []);

  useEffect(() => {
    if (!isPlaying) return;

    if (currentStep >= trace.length - 1) {
      // avoid calling setState synchronously inside the effect body:
      const t = setTimeout(() => setIsPlaying(false), 0);
      return () => clearTimeout(t);
    }

    const timer = setTimeout(() => {
      setCurrentStep((prev) => {
        const next = prev + 1;
        if (next >= trace.length - 1) setIsPlaying(false);
        return next;
      });
    }, 800 / speed);

    return () => clearTimeout(timer);
  }, [speed, isPlaying, currentStep, trace.length]);

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);
  const handleStepForward = () => {
    if (currentStep < trace.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  const handleStepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  const handleFirst = () => setCurrentStep(0);
  const handleLast = () => setCurrentStep(trace.length - 1);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        if (isPlaying) handlePause();
        else handlePlay();
      }

      if (e.key === "ArrowRight") {
        e.preventDefault();
        handleStepForward();
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handleStepBackward();
      }

      if (e.key === "Home") {
        e.preventDefault();
        handleFirst();
      }

      if (e.key === "End") {
        e.preventDefault();
        handleLast();
      }

      if (e.shiftKey && e.key === "ArrowUp") {
        setSpeed(Math.min(speed + 0.25, 5));
      }

      if (e.shiftKey && e.key === "ArrowDown") {
        setSpeed(Math.max(speed - 0.25, 0.25));
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [
    isPlaying,
    currentStep,
    speed,
    handlePlay,
    handlePause,
    handleStepForward,
    handleStepBackward,
    handleFirst,
    handleLast,
    setSpeed,
  ]);

  return (
    <>
      {!!trace.length && (
        <div className="min-h-screen bg-background">
          {/* Header */}
          <header className="border-b bg-card">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Code2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">
                    Python Code Visualizer
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Step through Python code execution and visualize how it
                    works
                  </p>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="container mx-auto px-4 py-6">
            {/* Controls */}
            <div className="mb-6">
              <ExecutionControls
                currentStep={currentStep}
                totalSteps={trace.length}
                isPlaying={isPlaying}
                onStepChange={setCurrentStep}
                onPlay={handlePlay}
                onPause={handlePause}
                onStepForward={handleStepForward}
                onStepBackward={handleStepBackward}
                onFirst={handleFirst}
                onLast={handleLast}
                speed={speed}
                onSpeedChange={setSpeed}
              />
            </div>

            {/* Visualization Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                <div className="h-[500px]">
                  <CodeDisplay
                    code={sampleCode}
                    currentLine={currentState?.line}
                  />
                </div>
                <div className="h-[300px]">
                  <OutputDisplay stdout={currentState?.stdout} />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div className="h-[300px]">
                  <CallStack frames={currentState?.stack_to_render} />
                </div>
                <div className="h-[300px]">
                  <VariablesView
                    globals={currentState?.globals}
                    orderedGlobals={currentState?.ordered_globals}
                    heap={currentState?.heap}
                  />
                </div>
                <div className="h-[300px]">
                  <HeapVisualization heap={currentState?.heap} />
                </div>
                {/* <div className="h-[300px]">
                  <DataStructureVisualizer frame={currentState} />
                </div> */}
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default VisualizeV3;
