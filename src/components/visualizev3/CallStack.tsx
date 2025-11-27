/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from "@/src/helper/card";
import { Badge } from "@/src/helper/badge";
import { cn } from "@/src/utils/Utils";
interface StackFrame {
  func_name: string;
  is_highlighted: boolean;
  encoded_locals: Record<string, any>;
  ordered_varnames: string[];
  frame_id: number;
}

interface CallStackProps {
  frames: StackFrame[];
}

export const CallStack = ({ frames }: CallStackProps) => {
  const renderValue = (value: any): string => {
    if (Array.isArray(value) && value[0] === "REF") {
      return `<function>`;
    }
    if (typeof value === "object") {
      return JSON.stringify(value);
    }
    return String(value);
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
                    {frame.func_name}
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
                          {varname}:
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
