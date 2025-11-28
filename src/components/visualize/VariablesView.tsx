/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from "@/src/helper/card";
import { Badge } from "@/src/helper/badge";
import { EncodedValue } from "@/src/utils/types";
import { renderRef } from "@/src/helper/RenderRed";

interface VariablesViewProps {
  globals: Record<string, any>;
  orderedGlobals: string[];
  heap: Record<string, any>;
}

export const VariablesView = ({
  globals,
  orderedGlobals,
  heap,
}: VariablesViewProps) => {
  const renderValue = (value: EncodedValue) => renderRef(value, heap);

  return (
    <Card className="h-full overflow-auto">
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Global Variables
        </h3>
        <div className="space-y-2">
          {orderedGlobals.length > 0 ? (
            orderedGlobals.map((varname) => (
              <div key={varname} className="p-2 rounded bg-muted/50">
                <div className="flex gap-2 items-start">
                  <Badge variant="secondary" className="text-xs shrink-0">
                    global
                  </Badge>
                  <div className="flex-1 font-mono text-sm">
                    <span className="text-muted-foreground">{varname}:</span>{" "}
                    <span className="text-foreground font-medium">
                      {renderValue(globals[varname])}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              No global variables yet
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};
