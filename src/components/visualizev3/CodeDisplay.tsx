import { Card } from "@/src/helper/card";
import { cn } from "@/src/utils/Utils";
import { useEffect, useRef } from "react";

interface CodeDisplayProps {
  code: string;
  currentLine: number;
}

export const CodeDisplay = ({ code, currentLine }: CodeDisplayProps) => {
  const lines = code.split("\n");
  const activeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center", 
      });
    }
  }, [currentLine]);

  return (
    <Card className="h-full overflow-auto">
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Code</h3>
        <div className="font-mono text-sm">
          {lines.map((line, idx) => {
            const isActive = currentLine === idx + 1;

            return (
              <div
                key={idx}
                ref={isActive ? activeRef : null}
                className={cn(
                  "flex gap-4 px-2 py-1 rounded transition-colors",
                  isActive &&
                    "bg-primary/10 border-l-4 border-primary"
                )}
              >
                <span className="text-muted-foreground select-none w-8 text-right">
                  {idx + 1}
                </span>
                <span
                  className={cn(
                    "flex-1 whitespace-pre",
                    isActive
                      ? "text-foreground font-medium"
                      : "text-muted-foreground"
                  )}
                >
                  {line || " "}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};
