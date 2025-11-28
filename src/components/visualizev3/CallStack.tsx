/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from "@/src/helper/card";
import { Badge } from "@/src/helper/badge";
import { cn } from "@/src/utils/Utils";

type EncodedValue = string | number | boolean | null | ["REF", number];

interface StackFrame {
  func_name: string;
  is_highlighted: boolean;
  encoded_locals: Record<string, EncodedValue>;
  ordered_varnames: string[];
  frame_id: number;
}

interface CallStackProps {
  frames: StackFrame[];
  heap: Record<string, any>; // add this
}

export const CallStack = ({ frames, heap }: CallStackProps) => {
  const renderValue = (value: EncodedValue): string => {
    // REF -> look up in heap
    if (Array.isArray(value) && value[0] === "REF") {
      const id = String(value[1]);
      const entry = heap[id];
      if (!entry) return `REF(${id})`;
      const tag = entry[0];
      
      if (tag === "CLASS") {
        const name = entry[1] as string;
        return name; // e.g. "Node"
      }
      if (tag === "INSTANCE") {
        const className = entry[1] as string;
        return `${className} instance`; // e.g. "Node instance"
      }
      if (tag === "FUNCTION") {
        const sig = entry[1] as string; // "__init__(self, data)"
        return sig;
      }
      return `REF(${id})`;
    }
    if (value === null || typeof value !== "object") {
      return String(value);
    }
    // For plain objects (rare in locals), fall back
    return JSON.stringify(value);
  };

  return (
    <Card className="h-full overflow-auto">
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Call Stack
        </h3>
        <div className="space-y-3">
          {frames
            .slice()
            .reverse()
            .map((frame, _) => (
              <div
                key={frame.frame_id}
                className={cn(
                  "p-3 rounded-lg border transition-all",
                  frame.is_highlighted
                    ? "bg-primary/5 border-primary shadow-sm"
                    : "bg-muted/30 border-border"
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono font-semibold text-foreground">
                    {frame.func_name === "<module>"
                      ? "Main Block"
                      : frame.func_name}
                  </span>
                  {frame.is_highlighted && (
                    <Badge variant="default" className="text-xs">
                      Active
                    </Badge>
                  )}
                </div>
                {frame.ordered_varnames.length > 0 && (
                  <div className="space-y-1">
                    {frame.ordered_varnames.map((varname) => (
                      <div
                        key={varname}
                        className="flex gap-2 text-sm font-mono"
                      >
                        <span className="text-muted-foreground">
                          {varname === "__return__" ? "return" : varname}:
                        </span>
                        <span className="text-foreground font-medium">
                          {renderValue(frame.encoded_locals[varname])}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </Card>
  );
};
