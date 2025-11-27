/* eslint-disable @typescript-eslint/no-explicit-any */
const ControlsPanel = ({
  currentStep,
  totalSteps,
  isPlaying,
  speed,
  onFirst,
  onPrevious,
  onNext,
  onLast,
  onPlayPause,
  onSpeedChange,
}: {
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  speed: number;
  onFirst: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onLast: () => void;
  onPlayPause: () => void;
  onSpeedChange: (speed: number) => void;
}) => {
  const speedLabel = (speed / 1000).toFixed(1);

  return (
    <div style={controlsPanelStyles.panel}>
      <div style={controlsPanelStyles.header}>
        <span>⚙️</span>
        <span style={controlsPanelStyles.title}>Playback Controls</span>
      </div>

      <div style={controlsPanelStyles.content}>
        <div style={controlsPanelStyles.buttonGroup}>
          <button
            onClick={onFirst}
            title="First step (Home)"
            disabled={currentStep === 0}
            style={{
              ...controlsPanelStyles.button,
              ...(currentStep === 0 ? controlsPanelStyles.buttonDisabled : {}),
            }}
          >
            ⏮️
          </button>
          <button
            onClick={onPrevious}
            title="Previous step (←)"
            disabled={currentStep === 0}
            style={{
              ...controlsPanelStyles.button,
              ...(currentStep === 0 ? controlsPanelStyles.buttonDisabled : {}),
            }}
          >
            ◀
          </button>

          <div style={controlsPanelStyles.stepCounter}>
            <span style={controlsPanelStyles.stepText}>
              Step{" "}
              <span style={controlsPanelStyles.stepNumber}>
                {currentStep + 1}
              </span>{" "}
              of{" "}
              <span style={controlsPanelStyles.stepNumber}>{totalSteps}</span>
            </span>
          </div>

          <button
            onClick={onNext}
            title="Next step (→)"
            disabled={currentStep >= totalSteps - 1}
            style={{
              ...controlsPanelStyles.button,
              ...(currentStep >= totalSteps - 1
                ? controlsPanelStyles.buttonDisabled
                : {}),
            }}
          >
            ▶
          </button>
          <button
            onClick={onLast}
            title="Last step (End)"
            disabled={currentStep >= totalSteps - 1}
            style={{
              ...controlsPanelStyles.button,
              ...(currentStep >= totalSteps - 1
                ? controlsPanelStyles.buttonDisabled
                : {}),
            }}
          >
            ⏭️
          </button>
        </div>

        <div style={controlsPanelStyles.playControls}>
          <button
            onClick={onPlayPause}
            title="Play/Pause (Space)"
            style={{
              ...controlsPanelStyles.button,
              ...controlsPanelStyles.playButton,
              ...(isPlaying ? controlsPanelStyles.playing : {}),
            }}
          >
            {isPlaying ? "⏸️ Pause" : "▶ Play"}
          </button>

          <div style={controlsPanelStyles.speedControl}>
            <label
              htmlFor="speed-slider"
              style={controlsPanelStyles.speedLabel}
            >
              Speed:
            </label>
            <input
              id="speed-slider"
              type="range"
              min="500"
              max="3000"
              step="100"
              value={speed}
              onChange={(e) => onSpeedChange(parseInt(e.target.value))}
              style={controlsPanelStyles.slider}
            />
            <span style={controlsPanelStyles.speedValue}>{speedLabel}s</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const controlsPanelStyles = {
  panel: {
    display: "flex" as const,
    flexDirection: "column" as const,
    backgroundColor: "var(--color-surface)",
    border: "1px solid var(--color-border)",
    borderRadius: "8px",
    boxShadow: "var(--shadow-sm)",
    overflow: "hidden" as const,
  },
  header: {
    padding: "12px 16px",
    borderBottom: "1px solid var(--color-border)",
    backgroundColor: "#f9f9f7",
    fontWeight: "var(--font-weight-semibold)",
    fontSize: "var(--font-size-sm)",
    color: "var(--color-text)",
    display: "flex" as const,
    alignItems: "center" as const,
    gap: "8px",
  },
  title: {
    color: "var(--color-text)",
  },
  content: {
    padding: "16px",
    display: "flex" as const,
    flexDirection: "column" as const,
    gap: "16px",
  },
  buttonGroup: {
    display: "flex" as const,
    alignItems: "center" as const,
    gap: "8px",
    flexWrap: "wrap" as const,
  },
  button: {
    padding: "8px 12px",
    border: "1px solid var(--color-border)",
    borderRadius: "6px",
    backgroundColor: "var(--color-surface)",
    color: "var(--color-text)",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "var(--font-weight-medium)",
    transition: "all 0.15s ease",
    display: "flex" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    minWidth: "36px",
    height: "36px",
  },
  buttonDisabled: {
    opacity: 0.5,
    cursor: "not-allowed",
    color: "var(--color-disabled)",
    borderColor: "var(--color-disabled)",
  },
  stepCounter: {
    flex: 1,
    minWidth: "150px",
    display: "flex" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    backgroundColor: "#f9f9f7",
    border: "1px solid var(--color-border)",
    borderRadius: "6px",
    padding: "8px 16px",
  },
  stepText: {
    fontSize: "14px",
    fontWeight: "var(--font-weight-medium)",
    color: "var(--color-text)",
    fontFamily: "var(--font-family-mono)",
  },
  stepNumber: {
    fontWeight: "var(--font-weight-bold)",
    color: "var(--color-primary)",
  },
  playControls: {
    display: "flex" as const,
    alignItems: "center" as const,
    gap: "12px",
  },
  playButton: {
    minWidth: "100px",
    backgroundColor: "var(--color-primary)",
    color: "white",
    borderColor: "var(--color-primary)",
    fontWeight: "var(--font-weight-semibold)",
    fontSize: "14px",
  },
  playing: {
    backgroundColor: "var(--color-primary-hover)",
  },
  speedControl: {
    display: "flex" as const,
    alignItems: "center" as const,
    gap: "8px",
    flex: 1,
  },
  speedLabel: {
    fontSize: "12px",
    fontWeight: "var(--font-weight-semibold)",
    color: "var(--color-text-secondary)",
    whiteSpace: "nowrap" as const,
  },
  slider: {
    flex: 1,
    minWidth: "80px",
    height: "6px",
    borderRadius: "3px",
    background:
      "linear-gradient(to right, var(--color-border) 0%, var(--color-primary-light) 50%, var(--color-border) 100%)",
    outline: "none",
    appearance: "none" as const,
    cursor: "pointer",
    WebkitAppearance: "none" as any,
  },
  speedValue: {
    fontSize: "12px",
    fontWeight: "var(--font-weight-semibold)",
    color: "var(--color-text)",
    fontFamily: "var(--font-family-mono)",
    minWidth: "35px",
    textAlign: "right" as const,
  },
};

export default ControlsPanel;
