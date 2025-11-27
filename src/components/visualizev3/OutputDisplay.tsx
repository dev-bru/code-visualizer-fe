import { Card } from "@/src/helper/card";
import { Terminal } from "lucide-react";

interface OutputDisplayProps {
  stdout: string;
}

export const OutputDisplay = ({ stdout }: OutputDisplayProps) => {
  return (
    <Card className="h-full overflow-auto bg-card">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Terminal className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold text-foreground">Output</h3>
        </div>
        <pre className="font-mono text-sm text-foreground whitespace-pre-wrap">
          {stdout || <span className="text-muted-foreground italic">No output yet</span>}
        </pre>
      </div>
    </Card>
  );
};
