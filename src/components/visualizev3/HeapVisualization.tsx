/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/src/helper/badge";
import { Card } from "@/src/helper/card";
import { renderRef } from "@/src/helper/RenderRed";
import { EncodedValue } from "@/src/utils/types";
import { useEffect, useRef } from "react";

interface HeapVisualizationProps {
  heap: Record<string, any>;
}

export const HeapVisualization = ({ heap }: HeapVisualizationProps) => {
  const lastItemRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to the latest heap entry whenever heap changes
  useEffect(() => {
    if (lastItemRef.current) {
      lastItemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [heap]);

  const entries = Object.entries(heap).sort(
    ([a], [b]) => Number(a) - Number(b) // ensure numeric ID order
  );
  const renderHeapObject = (id: string, obj: any[], isLast: boolean) => {
    const [type, value, ...rest] = obj;

    const renderRefOrPrimitive = (val: any) =>
      renderRef(val as EncodedValue, heap);

    return (
      <div
        key={id}
        data-heap-id={id}
        ref={isLast ? lastItemRef : null}
        className="p-4 rounded-lg border-2 border-primary/20 bg-card"
      >
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border">
          <Badge variant="outline" className="text-xs">
            ID: {id}
          </Badge>
          <Badge className="text-xs">{type}</Badge>
        </div>

        <div className="space-y-2">
          {type === "FUNCTION" && (
            <div className="font-mono text-sm">
              <span className="text-muted-foreground">function: </span>
              <span className="text-foreground font-medium">{value}</span>
            </div>
          )}

          {type === "CLASS" && (
            <div className="space-y-1 text-xs font-mono">
              <div className="font-semibold mb-1">class {String(value)}</div>
              {rest.map((entry, idx) => {
                const [name, ref] = entry as [string, any];
                return (
                  <div key={idx} className="flex gap-2">
                    <span className="text-muted-foreground">{name}:</span>
                    <span className="text-foreground">
                      {renderRefOrPrimitive(ref)}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {type === "INSTANCE" && (
            <div className="space-y-1 text-xs font-mono">
              <div className="font-semibold mb-1">{String(value)} instance</div>
              {rest.map((field, idx) => {
                const [name, val] = field as [string, any];
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2 rounded bg-muted/50"
                  >
                    <span className="text-muted-foreground">{name}:</span>
                    <span className="text-foreground font-medium">
                      {renderRefOrPrimitive(val)}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {type === "LIST" && Array.isArray(value) && (
            <div className="space-y-1">
              {value.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2 rounded bg-muted/50"
                >
                  <span className="text-xs font-mono text-muted-foreground">
                    [{idx}]:
                  </span>
                  <span className="text-xs font-mono text-foreground font-medium">
                    {renderRefOrPrimitive(item)}
                  </span>
                </div>
              ))}
            </div>
          )}

          {type === "DICT" &&
            value &&
            typeof value === "object" &&
            !Array.isArray(value) && (
              <div className="space-y-1 text-xs font-mono">
                {Object.entries(value).map(([key, val]) => (
                  <div
                    key={key}
                    className="flex items-center gap-2 p-2 rounded bg-muted/50"
                  >
                    <span className="text-muted-foreground">{key}:</span>
                    <span className="text-foreground font-medium">
                      {renderRefOrPrimitive(val)}
                    </span>
                  </div>
                ))}
              </div>
            )}

          {!["FUNCTION", "CLASS", "INSTANCE", "LIST", "DICT"].includes(
            type
          ) && (
            <div className="font-mono text-sm text-foreground">
              {String(value)}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <Card className="h-full overflow-auto">
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Heap Memory
        </h3>

        {Object.keys(heap).length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {Object.entries(heap).map(([id, obj], idx) =>
              renderHeapObject(id, obj, idx === entries.length - 1)
            )}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No objects in heap yet
          </p>
        )}
      </div>
    </Card>
  );
};
