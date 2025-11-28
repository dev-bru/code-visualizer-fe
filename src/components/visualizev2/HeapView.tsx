// components/HeapView.tsx
"use client";

import { HeapObject, TraceStep } from "@/src/utils/Types";
import { formatValue, parseHeap } from "@/src/utils/Utils";
import React from "react";

interface Props {
  step: TraceStep;
}

export const HeapView: React.FC<Props> = ({ step }) => {
  const heapObjects = parseHeap(step);

  return (
    <div className="space-y-3">
      <h2 className="font-semibold">Objects</h2>
      <div className="flex flex-wrap gap-3">
        {heapObjects.map((obj) => (
          <HeapCard key={obj.id} obj={obj} />
        ))}
      </div>
    </div>
  );
};

const cardBase =
  "border rounded-md px-2 py-1 text-xs bg-yellow-50 border-yellow-400 shadow-sm min-w-[120px]";

const HeapCard: React.FC<{ obj: HeapObject }> = ({ obj }) => {
  switch (obj.kind) {
    case "FUNCTION":
      return (
        <div className={cardBase}>
          <div className="font-mono text-[11px] mb-1">
            func #{obj.id}: {obj.name}
          </div>
        </div>
      );
    case "CLASS":
      return (
        <div className={cardBase}>
          <div className="font-semibold mb-1">
            Class {obj.name} (#{obj.id})
          </div>
          <div className="space-y-0.5">
            {obj.methods.map((m) => (
              <div key={m.name} className="font-mono">
                {m.name} → REF({m.refId})
              </div>
            ))}
          </div>
        </div>
      );
    case "INSTANCE":
      return (
        <div className={cardBase}>
          <div className="font-semibold mb-1">
            {obj.className} instance (#{obj.id})
          </div>
          <div className="space-y-0.5">
            {obj.fields.map((f) => (
              <div key={f.name} className="font-mono">
                {f.name}: {formatValue(f.value)}
              </div>
            ))}
          </div>
        </div>
      );
    case "LIST":
      return (
        <div className={cardBase}>
          <div className="font-semibold mb-1">list #{obj.id}</div>
          <div className="font-mono">
            [{obj.items.map(formatValue).join(", ")}]
          </div>
        </div>
      );
    case "DICT":
      return (
        <div className={cardBase}>
          <div className="font-semibold mb-1">dict #{obj.id}</div>
          <div className="space-y-0.5 font-mono">
            {obj.entries.map((e) => (
              <div key={e.key}>
                {e.key}: {formatValue(e.value)}
              </div>
            ))}
          </div>
        </div>
      );
    default:
      return null;
  }
};
