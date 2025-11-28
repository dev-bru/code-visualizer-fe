// components/FramesView.tsx
"use client";

import { TraceStep } from "@/src/utils/Types";
import { formatValue } from "@/src/utils/Utils";
import React from "react";

interface Props {
  step: TraceStep;
}

export const FramesView: React.FC<Props> = ({ step }) => {
  // In Python Tutor, frames are ordered bottom-up; here we just map in order.
  return (
    <div className="space-y-3">
      <h2 className="font-semibold">Frames</h2>
      {step.stack_to_render.map((frame) => (
        <div
          key={frame.unique_hash}
          className={`border rounded-md p-2 text-sm ${
            frame.is_highlighted
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 bg-white"
          }`}
        >
          <div className="font-mono font-semibold mb-1">
            {frame.func_name}{" "}
            <span className="text-xs text-gray-500">#{frame.frame_id}</span>
          </div>
          <table className="w-full text-xs">
            <tbody>
              {frame.ordered_varnames.map((name) => (
                <tr key={name}>
                  <td className="pr-2 text-gray-600 align-top">{name}</td>
                  <td className="font-mono">
                    {formatValue(frame.encoded_locals[name])}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};
