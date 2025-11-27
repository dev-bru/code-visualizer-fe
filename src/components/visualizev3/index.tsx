/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect, useCallback } from "react";
import { Code2 } from "lucide-react";
import { CallStack } from "./CallStack";
import { ExecutionControls } from "./ExecutionControls";
import { HeapVisualization } from "./HeapVisualization";
import { OutputDisplay } from "./OutputDisplay";
import { VariablesView } from "./VariablesView";
import { CodeMirrorDisplay } from "./CodeMirrorDisplay";
import { Button } from "@/src/helper/button";
import { SAMPLE_PROGRAMS } from "@/src/helper/samples";

const sampleCode = `def sample_code():
  x = 10
  y = 20
  z = x + y
  print("Sum:", z)
sample_code()`;

const VisualizeV3 = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trace, setTrace] = useState<any[]>([]);
  const currentState: any = trace[currentStep];
  const BACKEND_URL = "http://localhost:8000/visualize/trace";
  const [error, setError] = useState<string | null>(null);
  const [speed, setSpeed] = useState(1);
  const [isLocked, setIsLocked] = useState(false);
  const [hasUserEdited, setHasUserEdited] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState("factorial");
  const [code, setCode] = useState(
    SAMPLE_PROGRAMS.find((p) => p.id === "factorial")?.code || ""
  );

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

  const runVisualization = async () => {
    try {
      setIsPlaying(false);
      setCurrentStep(0);

      const res = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          language: "python",
          stdin: "",
          timeout: 10,
        }),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
        setTrace([]);
        return;
      }

      setTrace(data.trace);
      setHasUserEdited(false);
      setIsLocked(true);
    } catch (err: any) {
      setError(err.message);
    }
  };
  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setTrace([]);
    setIsLocked(false);
    setError(null);
    setCode(code);
  };

  const handleFirst = useCallback(() => {
    runVisualization();
    setCurrentStep(0);
    setIsLocked(true);
  }, [runVisualization, setCurrentStep, setIsLocked]);
  
  const handleLast = () => {
    runVisualization();
    setCurrentStep(trace.length - 1);
    setIsLocked(true);
  };

  const handlePlay = async () => {
    runVisualization();
    setIsPlaying(true);
    setIsLocked(true);
  };
  const handlePause = () => setIsPlaying(false);
  const handleStepForward = () => {
    runVisualization();
    setIsLocked(true);
    if (currentStep < trace.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  const handleStepBackward = () => {
    runVisualization();
    setIsLocked(true);
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Code2 className="h-6 w-6 text-primary" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Python Code Visualizer
            </h1>
            <p className="text-sm text-muted-foreground">
              Step through Python code execution and visualize how it works
            </p>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="container mx-auto px-4 py-6">
        {/* Controls always visible */}
        <div className="mb-6">
          {isLocked ? (
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
              handleReset={handleReset}
            />
          ) : hasRun ? (
            <div></div>
          ) : (
            <div className="flex items-center gap-4">
              <Button onClick={runVisualization} variant="default">
                Visualize
              </Button>
              <div className="m-2">
                <select
                  value={selectedProgram}
                  onChange={(e) => {
                    const program = SAMPLE_PROGRAMS.find(
                      (p) => p.id === e.target.value
                    );
                    if (program) setCode(program.code);
                    setSelectedProgram(e.target.value);
                    setIsLocked(false);
                    setTrace([]);
                  }}
                  className="border px-2 py-2 rounded text-sm bg-card"
                >
                  {SAMPLE_PROGRAMS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT SIDE */}
          <div className="space-y-6">
            {/* EDITOR always visible */}
            <div className="h-[500px]">
              <CodeMirrorDisplay
                code={code}
                onCodeChange={setCode}
                currentLine={currentState?.line}
                isLocked={isLocked}
              />
            </div>

            {/* OUTPUT visible only if trace exists */}
            <div className="h-[300px] rounded-lg border-1 border-primary/110 p-1">
              {trace.length > 0 ? (
                <OutputDisplay stdout={currentState?.stdout} />
              ) : (
                <p className="text-m text-muted-foreground p-4">
                  Output will appear here after running.
                </p>
              )}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">
            {/* Stack */}
            <div className="h-[300px] rounded-lg border-1 border-primary/110 p-1">
              {trace.length > 0 ? (
                <CallStack frames={currentState?.stack_to_render ?? []} />
              ) : (
                <p className="text-m text-muted-foreground p-4">
                  Call stack will appear here.
                </p>
              )}
            </div>

            {/* Variables */}
            <div className="h-[300px] rounded-lg border-1 border-primary/110 p-1">
              {trace.length > 0 ? (
                <VariablesView
                  globals={currentState?.globals ?? {}}
                  orderedGlobals={currentState?.ordered_globals ?? []}
                  heap={currentState?.heap ?? {}}
                />
              ) : (
                <p className="text-m text-muted-foreground p-4">
                  Variables will appear here.
                </p>
              )}
            </div>

            {/* Heap */}
            <div className="h-[300px] rounded-lg border-1 border-primary/110 p-1">
              {trace.length > 0 ? (
                <HeapVisualization heap={currentState?.heap ?? {}} />
              ) : (
                <p className="text-m text-muted-foreground p-4">
                  Heap memory will appear here.
                </p>
              )}
            </div>
                {/* <div className="h-[300px]">
                  <DataStructureVisualizer frame={currentState} />
                </div> */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default VisualizeV3;
