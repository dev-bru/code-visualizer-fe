/* eslint-disable react-hooks/exhaustive-deps */
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
import { ArrowsOverlay } from "@/src/helper/ArrowsOverlay";
import { ComplexityAnalysis } from "./ComplexityAnalysis";

const VisualizeV3 = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trace, setTrace] = useState<any[]>([]);
  const currentState: any = trace[currentStep];
  const BACKEND_URL = "http://localhost:8000/";
  const [error, setError] = useState<string | null>(null);
  const [speed, setSpeed] = useState(1);
  const [isLocked, setIsLocked] = useState(false);
  const [hasUserEdited, setHasUserEdited] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState("factorial");
  const [code, setCode] = useState(
    SAMPLE_PROGRAMS.find((p) => p.id === "factorial")?.code || ""
  );
  const [complexityInfo, setComplexityInfo] = useState<any>(null);

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

      const res = await fetch(BACKEND_URL + "visualize/trace", {
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

      const res2 = await fetch(BACKEND_URL + "analyze-complexity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          language: "python",
          stdin: "",
          timeout: 10,
        }),
      });

      const data2 = await res2.json();
      setComplexityInfo(data2);
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

  return (
    <div className="main-container flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container px-4 py-2 flex items-center gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10 flex justify-center items-center gap-2">
                <Code2 className="h-6 w-6 text-primary" />
                <span className="font-bold text-primary text-lg">
                  CodeTrace
                </span>
              </div>
              <span className="text-foreground font-semibold">
                Python Code Visualizer
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Step through Python code execution and visualize how it works
            </p>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="px-4 py-4">
        {/* Controls always visible */}
        <div className="mb-4">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 min-h-0">
          {/* LEFT SIDE */}
          <div className="space-y-3 w-full">
            {/* EDITOR always visible */}
            <div>
              <CodeMirrorDisplay
                code={code}
                onCodeChange={setCode}
                currentLine={currentState?.line}
                isLocked={isLocked}
              />
            </div>

            {/* OUTPUT visible only if trace exists */}
            <div className="rounded-lg border-1 border-primary/110 p-1">
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
          <div className="flex space-x-3 max-h-[630px] min-h-0">
            {/* Stack */}
            <div className="flex flex-col w-1/2 space-y-3 h-full min-h-0">
              <div className="flex-1 rounded-lg border-1 border-primary/110 p-1 min-h-0">
                {trace.length > 0 ? (
                  <CallStack
                    frames={currentState?.stack_to_render ?? []}
                    heap={currentState?.heap}
                  />
                ) : (
                  <p className="text-m text-muted-foreground p-4">
                    Call stack will appear here.
                  </p>
                )}
              </div>

              {/* Variables */}
              <div className="flex-1 rounded-lg border-1 border-primary/110 p-1 min-h-0">
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
            </div>

            {/* Heap */}
            <div className="w-1/2 rounded-lg border-1 border-primary/110 p-1 overflow-auto min-h-0">
              {trace.length > 0 ? (
                <HeapVisualization heap={currentState?.heap ?? {}} />
              ) : (
                <p className="text-m text-muted-foreground p-4">
                  Heap memory will appear here.
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="mt-3">
          {complexityInfo && <ComplexityAnalysis data={complexityInfo} />}
        </div>
      </main>
    </div>
  );
};

export default VisualizeV3;
