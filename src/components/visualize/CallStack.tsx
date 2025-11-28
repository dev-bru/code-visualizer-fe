/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from "@/src/helper/card";
import { Badge } from "@/src/helper/badge";
import { cn } from "@/src/utils/Utils";
import { EncodedValue } from "@/src/utils/types";
import { renderRef } from "@/src/helper/RenderRed";

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
  const renderValue = (value: EncodedValue) => renderRef(value, heap);

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
                  <table className="w-full text-xs font-mono">
                    <thead>
                      <tr className="text-muted-foreground">
                        <th className="text-left px-1">name</th>
                        <th className="text-left px-1">value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {frame.ordered_varnames.map((varname) => (
                        <tr key={varname}>
                          <td className="px-1">
                            {varname === "__return__" ? "return" : varname}
                          </td>
                          <td className="px-1">
                            {renderValue(frame.encoded_locals[varname])}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            ))}
        </div>
      </div>
    </Card>
  );
};
