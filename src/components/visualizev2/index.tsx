/* eslint-disable @typescript-eslint/no-explicit-any */
// app/visualizer/page.tsx
"use client";

import { TraceStep } from "@/src/utils/Types";
import React, { useEffect, useState } from "react";
import { FramesView } from "./FramesView";
import { HeapView } from "./HeapView";

const BACKEND_URL = "http://localhost:8000/visualize/trace";

const sampleCode = `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

node1 = Node(15)
node2 = Node(3)
node3 = Node(17)
node4 = Node(90)

node1.next = node2
node2.next = node3
node3.next = node4

head = node1
current = head
while current:
    print(current.data, end=" -> ")
    current = current.next
print("None")
`;

export default function VisualizeV2() {
  const [trace, setTrace] = useState<TraceStep[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      setError(null);
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
          setTrace(data.trace as TraceStep[]);
          setCurrent(0);
        }
      } catch (e: any) {
        setError(e.message ?? "Request failed");
      } finally {
        setLoading(false);
      }
    };

    run();
  }, []);

  const step = trace[current];

  return (
    <main className="p-4 space-y-4">
      <h1 className="text-lg font-semibold">Python Trace Visualizer</h1>

      {loading && <p>Running code…</p>}
      {error && <p className="text-red-600 text-sm">Error: {error}</p>}

      {trace.length > 0 && (
        <>
          <div className="flex items-center gap-2 text-sm">
            <span>
              Step {current + 1} / {trace.length}
            </span>
            <input
              type="range"
              min={0}
              max={trace.length - 1}
              value={current}
              onChange={(e) => setCurrent(Number(e.target.value))}
              className="flex-1"
            />
            <span className="text-gray-600">
              line {step.line}, event {step.event}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <FramesView step={step} />
            <HeapView step={step} />
          </div>

          <div className="mt-2 text-xs font-mono bg-gray-50 border rounded p-2">
            stdout: {JSON.stringify(step.stdout)}
          </div>
        </>
      )}
    </main>
  );
}
