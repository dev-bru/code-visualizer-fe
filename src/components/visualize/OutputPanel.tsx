const OutputPanel = ({ stdout = "" }: { stdout?: string }) => {
  return (
    <div style={outputPanelStyles.panel}>
      <div style={outputPanelStyles.header}>
        <span>📤</span>
        <span style={outputPanelStyles.title}>Output</span>
      </div>
      <div style={outputPanelStyles.content}>
        {stdout ? (
          <pre style={outputPanelStyles.stdout}>{stdout}</pre>
        ) : (
          <div style={outputPanelStyles.emptyState}>No output yet</div>
        )}
      </div>
    </div>
  );
};

const outputPanelStyles = {
  panel: {
    display: "flex" as const,
    flexDirection: "column" as const,
    backgroundColor: "var(--color-surface)",
    border: "1px solid var(--color-border)",
    borderRadius: "8px",
    boxShadow: "var(--shadow-sm)",
    overflow: "hidden" as const,
    flex: "0 0 auto",
    maxHeight: "25%",
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
    flexShrink: 0,
  },
  title: {
    color: "var(--color-text)",
  },
  content: {
    flex: 1,
    overflow: "auto" as const,
    padding: "12px 16px",
    backgroundColor: "var(--color-stdout-bg)",
    fontFamily: "var(--font-family-mono)",
    fontSize: "13px",
    lineHeight: "1.6",
    color: "var(--color-stdout-text)",
  },
  stdout: {
    margin: 0,
    padding: 0,
    whiteSpace: "pre-wrap" as const,
    wordWrap: "break-word" as const,
    color: "var(--color-stdout-text)",
    fontFamily: "var(--font-family-mono)",
    fontSize: "13px",
  },
  emptyState: {
    color: "var(--color-text-light)",
    fontStyle: "italic",
  },
};

export default OutputPanel;
