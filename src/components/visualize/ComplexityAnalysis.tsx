/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Alert, AlertDescription } from "@/src/helper/alert";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/src/helper/card";
import {
  AlertTriangle,
  Clock,
  Database,
  Code2,
  RefreshCw,
  Layers,
} from "lucide-react";
import { Badge } from "@/src/helper/badge";

interface ComplexityData {
  success: boolean;
  complexity_data: {
    patterns: {
      nestedLoops: number;
      recursiveCalls: number;
      dynamicProgramming: boolean;
      divideAndConquer: boolean;
      backtracking: boolean;
      memoization: boolean;
    };
    loops: {
      for: number;
      while: number;
      listComp: number;
      map: number;
      filter: number;
    };
    dataStructures: {
      lists: number;
      dicts: number;
      sets: number;
      tuples: number;
      deque: number;
      heapq: number;
    };
    operations: {
      sorting: number;
      searching: number;
      binarySearch: number;
      exponential: number;
      factorial: number;
    };
    recursion: {
      count: number;
      functions: string[];
      multipleRecursive: boolean;
    };
    timeComplexity: {
      notation: string;
      explanation: string;
      confidence: string;
    };
    spaceComplexity: {
      notation: string;
      explanation: string;
      confidence: string;
    };
    totalLines: number;
  };
  visualization_data: {
    detected_complexity: string;
    data_points: number[];
    input_sizes: number[];
    comparison_data: Record<string, number[]>;
    space_complexity: string;
  };
  warnings: string[];
}

interface ComplexityAnalysisProps {
  data: ComplexityData;
}

export const ComplexityAnalysis = ({ data }: ComplexityAnalysisProps) => {
  const { complexity_data, visualization_data, warnings } = data;

  // Prepare chart data
  const chartData = visualization_data.input_sizes.map((size, idx) => ({
    input: size,
    detected: visualization_data.data_points[idx],
    ...Object.fromEntries(
      Object.entries(visualization_data.comparison_data).map(
        ([key, values]) => [key.replace(/[()]/g, ""), values[idx]]
      )
    ),
  }));

  // Get active patterns
  const activePatterns = Object.entries(complexity_data.patterns)
    .filter(
      ([_, value]) => value === true || (typeof value === "number" && value > 0)
    )
    .map(([key]) => key);

  // Get data structures used
  const usedDataStructures = Object.entries(
    complexity_data.dataStructures
  ).filter(([_, count]) => count > 0);

  // Get loop types used
  const usedLoops = Object.entries(complexity_data.loops).filter(
    ([_, count]) => count > 0
  );

  const complexityColor = (notation: string) => {
    if (notation.includes("2^n") || notation.includes("n!"))
      return "destructive";
    if (notation.includes("n²") || notation.includes("n³")) return "secondary";
    if (notation.includes("n log n")) return "default";
    return "outline";
  };

  return (
    <div className="space-y-6">
      {/* Main Complexity Card */}
      <Card className="rounded-lg border-1 border-primary/110 p-1">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <CardTitle>Complexity Analysis</CardTitle>
            </div>
            <Badge
              variant={complexityColor(complexity_data.timeComplexity.notation)}
            >
              {complexity_data.timeComplexity.notation}
            </Badge>
          </div>
          <CardDescription>
            Automated analysis of algorithm complexity and patterns
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Warnings */}
          {warnings && warnings.length > 0 && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                {warnings.map((warning, idx) => (
                  <div key={idx}>{warning}</div>
                ))}
              </AlertDescription>
            </Alert>
          )}

          {/* Time & Space Complexity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg border bg-card">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <h4 className="font-semibold text-sm">Time Complexity</h4>
              </div>
              <div className="text-2xl font-bold text-primary mb-2">
                {complexity_data.timeComplexity.notation}
              </div>
              <p className="text-sm text-muted-foreground">
                {complexity_data.timeComplexity.explanation}
              </p>
              <Badge variant="outline" className="mt-2 text-xs">
                Confidence: {complexity_data.timeComplexity.confidence}
              </Badge>
            </div>

            <div className="p-4 rounded-lg border bg-card">
              <div className="flex items-center gap-2 mb-2">
                <Database className="h-4 w-4 text-muted-foreground" />
                <h4 className="font-semibold text-sm">Space Complexity</h4>
              </div>
              <div className="text-2xl font-bold text-primary mb-2">
                {complexity_data.spaceComplexity.notation}
              </div>
              <p className="text-sm text-muted-foreground">
                {complexity_data.spaceComplexity.explanation}
              </p>
              <Badge variant="outline" className="mt-2 text-xs">
                Confidence: {complexity_data.spaceComplexity.confidence}
              </Badge>
            </div>
          </div>

          {/* Patterns Detected */}
          {activePatterns.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Code2 className="h-4 w-4 text-muted-foreground" />
                <h4 className="font-semibold text-sm">Detected Patterns</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {activePatterns.map((pattern) => (
                  <Badge key={pattern} variant="secondary">
                    {pattern.replace(/([A-Z])/g, " $1").trim()}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Recursion Details */}
          {complexity_data.recursion.count > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 text-muted-foreground" />
                <h4 className="font-semibold text-sm">Recursion</h4>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <div className="text-sm space-y-1">
                  <div>
                    <span className="text-muted-foreground">
                      Recursive calls:{" "}
                    </span>
                    <span className="font-medium">
                      {complexity_data.recursion.count}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Functions: </span>
                    <span className="font-mono text-xs">
                      {complexity_data.recursion.functions.join(", ")}
                    </span>
                  </div>
                  {complexity_data.recursion.multipleRecursive && (
                    <Badge variant="outline" className="text-xs mt-1">
                      Multiple recursive branches
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Data Structures */}
          {usedDataStructures.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-muted-foreground" />
                <h4 className="font-semibold text-sm">Data Structures</h4>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {usedDataStructures.map(([ds, count]) => (
                  <div key={ds} className="p-2 rounded bg-muted/50 text-sm">
                    <span className="font-medium">{ds}: </span>
                    <span className="text-muted-foreground">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Loop Analysis */}
          {usedLoops.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Loops Used</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {usedLoops.map(([loop, count]) => (
                  <div key={loop} className="p-2 rounded bg-muted/50 text-sm">
                    <span className="font-medium">{loop}: </span>
                    <span className="text-muted-foreground">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Complexity Comparison Chart */}
      <Card className="rounded-lg border-1 border-primary/110 p-1">
        <CardHeader>
          <CardTitle>Growth Comparison</CardTitle>
          <CardDescription>
            How {visualization_data.detected_complexity} compares to other
            complexity classes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="input"
                label={{
                  value: "Input Size",
                  position: "insideBottom",
                  offset: -5,
                }}
                className="text-xs"
              />
              <YAxis
                label={{
                  value: "Operations",
                  angle: -90,
                  position: "insideLeft",
                }}
                className="text-xs"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="detected"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                name={visualization_data.detected_complexity}
              />
              <Line
                type="monotone"
                dataKey="O1"
                stroke="#22c55e"
                strokeWidth={1}
                name="O(1)"
              />
              <Line
                type="monotone"
                dataKey="Olog n"
                stroke="#3b82f6"
                strokeWidth={1}
                name="O(log n)"
              />
              <Line
                type="monotone"
                dataKey="On"
                stroke="#a855f7"
                strokeWidth={1}
                name="O(n)"
              />
              <Line
                type="monotone"
                dataKey="On log n"
                stroke="#f59e0b"
                strokeWidth={1}
                name="O(n log n)"
              />
              <Line
                type="monotone"
                dataKey="On²"
                stroke="#ef4444"
                strokeWidth={1}
                name="O(n²)"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
