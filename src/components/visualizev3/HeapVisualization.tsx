/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/src/helper/badge";
import { Card } from "@/src/helper/card";

interface HeapVisualizationProps {
  heap: Record<string, any>;
}

export const HeapVisualization = ({ heap }: HeapVisualizationProps) => {
  const renderHeapObject = (id: string, obj: any[]) => {
    const [type, value, ...rest] = obj;
    
    return (
      <div key={id} className="p-4 rounded-lg border-2 border-primary/20 bg-card">
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
          
          {type === "INSTANCE" && typeof value === "object" && (
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground mb-1">
                {rest[0] || "Object"}
              </div>
              {Object.entries(value).map(([key, val]) => (
                <div key={key} className="flex items-center gap-2 p-2 rounded bg-muted/50">
                  <span className="text-xs font-mono text-muted-foreground">{key}:</span>
                  <span className="text-xs font-mono text-foreground font-medium">
                    {Array.isArray(val) && val[0] === "REF" 
                      ? `→ REF ${val[1]}`
                      : String(val)}
                  </span>
                </div>
              ))}
            </div>
          )}
          
          {type === "LIST" && Array.isArray(value) && (
            <div className="space-y-1">
              {value.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 rounded bg-muted/50">
                  <span className="text-xs font-mono text-muted-foreground">[{idx}]:</span>
                  <span className="text-xs font-mono text-foreground font-medium">
                    {Array.isArray(item) && item[0] === "REF"
                      ? `→ REF ${item[1]}`
                      : String(item)}
                  </span>
                </div>
              ))}
            </div>
          )}
          
          {!["FUNCTION", "INSTANCE", "LIST"].includes(type) && (
            <div className="font-mono text-sm text-foreground">{String(value)}</div>
          )}
        </div>
      </div>
    );
  };

  return (
    <Card className="h-full overflow-auto">
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Heap Memory</h3>
        
        {Object.keys(heap).length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {Object.entries(heap).map(([id, obj]) => renderHeapObject(id, obj))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No objects in heap yet</p>
        )}
      </div>
    </Card>
  );
};
