import { Badge } from "@/src/helper/badge";
import { Button } from "@/src/helper/button";
import { Slider } from "@/src/helper/slider";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface ExecutionControlsProps {
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  speed: number;
  onSpeedChange: (speed: number) => void;
  onStepChange: (step: number) => void;
  onPlay: () => void;
  onPause: () => void;
  onStepForward: () => void;
  onStepBackward: () => void;
  onFirst: () => void;
  onLast: () => void;
}

export const ExecutionControls = ({
  currentStep,
  totalSteps,
  isPlaying,
  onStepChange,
  onPlay,
  onPause,
  onStepForward,
  onStepBackward,
  onFirst,
  onLast,
  speed,
  onSpeedChange,
}: ExecutionControlsProps) => {
  return (
    <div className="space-y-4 p-4 bg-card rounded-lg border">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="font-mono">
            Step {currentStep + 1} / {totalSteps}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={onFirst}
            disabled={currentStep === 0}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={onStepBackward}
            disabled={currentStep === 0}
          >
            <SkipBack className="h-4 w-4" />
          </Button>

          {isPlaying ? (
            <Button size="sm" onClick={onPause} variant="default">
              <Pause className="h-4 w-4 mr-2" />
              Pause
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={onPlay}
              variant="default"
              disabled={currentStep === totalSteps - 1}
            >
              <Play className="h-4 w-4 mr-2" />
              Play
            </Button>
          )}

          <Button
            size="sm"
            variant="outline"
            onClick={onStepForward}
            disabled={currentStep === totalSteps - 1}
          >
            <SkipForward className="h-4 w-4" />
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={onLast}
            disabled={currentStep === totalSteps - 1}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex">
        <Slider
          value={[currentStep]}
          min={0}
          max={totalSteps - 1}
          step={1}
          onValueChange={([value]) => onStepChange(value)}
          className="w-full"
        />
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {speed.toFixed(2)}x
          </span>
          <Slider
          min={0.25}
            max={5}
            step={0.25}
            value={[speed]}
            onValueChange={([value]) => onSpeedChange(value)}
            className="w-32"
          />
        </div>
      </div>
    </div>
  );
};
