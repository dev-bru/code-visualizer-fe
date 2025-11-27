/* eslint-disable @typescript-eslint/no-explicit-any */
interface StackFrame {
  func_name: string;
  frame_id: number;
  encoded_locals: Record<string, any>;
  ordered_varnames: string[];
  is_highlighted: boolean;
  unique_hash: string;
}

const StackPanel = ({ stackToRender = [] }: { stackToRender?: StackFrame[] }) => {
  const renderValue = (value: any): React.ReactNode => {
    if (value === null) return 'null';
    if (Array.isArray(value) && value[0] === 'REF') {
      return (
        <span style={stackPanelStyles.reference}>
          REF → {value[1]}
        </span>
      );
    }
    if (typeof value === 'string') return `"${value}"`;
    if (typeof value === 'boolean') return value ? 'True' : 'False';
    return String(value);
  };

  return (
    <div style={stackPanelStyles.panel}>
      <div style={stackPanelStyles.header}>
        <span>📚</span>
        <span style={stackPanelStyles.title}>Stack Frames</span>
      </div>
      <div style={stackPanelStyles.content}>
        {stackToRender.length === 0 ? (
          <div style={stackPanelStyles.emptyState}>Stack is empty</div>
        ) : (
          <div style={stackPanelStyles.framesList}>
            {stackToRender.map((frame) => (
              <div
                key={frame.unique_hash}
                style={{
                  ...stackPanelStyles.frame,
                  ...(frame.is_highlighted ? stackPanelStyles.frameHighlighted : {}),
                }}
              >
                {frame.is_highlighted && (
                  <span style={stackPanelStyles.frameMarker}>→</span>
                )}
                <div style={stackPanelStyles.frameName}>
                  {frame.func_name}
                  <span style={stackPanelStyles.frameId}>({frame.frame_id})</span>
                </div>

                {frame.ordered_varnames.length > 0 && (
                  <div style={stackPanelStyles.frameLocals}>
                    {frame.ordered_varnames.map((varName) => {
                      const value = frame.encoded_locals[varName];
                      const isReturn = varName === '__return__';
                      return (
                        <div
                          key={varName}
                          style={{
                            ...stackPanelStyles.localVar,
                            ...(isReturn ? stackPanelStyles.returnVar : {}),
                          }}
                        >
                          <span style={stackPanelStyles.localName}>{varName}</span>
                          <span style={stackPanelStyles.separator}>:</span>
                          <span style={stackPanelStyles.localValue}>
                            {renderValue(value)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const stackPanelStyles = {
  panel: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    boxShadow: 'var(--shadow-sm)',
    overflow: 'hidden' as const,
    flex: 1,
    minHeight: '200px',
  },
  header: {
    padding: '12px 16px',
    borderBottom: '1px solid var(--color-border)',
    backgroundColor: '#f9f9f7',
    fontWeight: 'var(--font-weight-semibold)',
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text)',
    display: 'flex' as const,
    alignItems: 'center' as const,
    gap: '8px',
    flexShrink: 0,
  },
  title: {
    color: 'var(--color-text)',
  },
  content: {
    flex: 1,
    overflow: 'auto' as const,
    padding: '12px 16px',
    fontFamily: 'var(--font-family-mono)',
    fontSize: '12px',
    lineHeight: '1.8',
  },
  emptyState: {
    color: 'var(--color-text-light)',
    fontStyle: 'italic',
    padding: '20px 0',
    textAlign: 'center' as const,
  },
  framesList: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    gap: '12px',
  },
  frame: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    gap: '8px',
    padding: '12px',
    backgroundColor: '#fafaf8',
    border: '1px solid var(--color-border)',
    borderRadius: '6px',
    transition: 'all 0.15s ease',
    position: 'relative' as const,
    marginLeft: 0,
  },
  frameHighlighted: {
    backgroundColor: 'var(--color-frame-highlight)',
    borderColor: 'var(--color-frame-border)',
    borderWidth: '2px',
    padding: '11px',
  },
  frameMarker: {
    position: 'absolute' as const,
    left: '-20px',
    top: '12px',
    color: 'var(--color-primary)',
    fontSize: '14px',
    fontWeight: 'var(--font-weight-bold)',
  },
  frameName: {
    fontWeight: 'var(--font-weight-bold)',
    color: 'var(--color-primary)',
    fontSize: '13px',
    display: 'flex' as const,
    alignItems: 'center' as const,
    gap: '6px',
  },
  frameId: {
    fontWeight: 'var(--font-weight-normal)',
    color: 'var(--color-text-secondary)',
    fontSize: '11px',
  },
  frameLocals: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    gap: '6px',
    paddingLeft: '12px',
    borderLeft: '2px solid rgba(33, 128, 141, 0.3)',
  },
  localVar: {
    display: 'flex' as const,
    gap: '4px',
    alignItems: 'flex-start' as const,
    wordBreak: 'break-all' as const,
  },
  returnVar: {
    color: 'var(--color-return)',
    fontWeight: 'var(--font-weight-semibold)',
  },
  localName: {
    color: 'var(--color-text)',
    flexShrink: 0,
    fontWeight: 'var(--font-weight-medium)',
  },
  separator: {
    color: 'var(--color-text-secondary)',
    flexShrink: 0,
  },
  localValue: {
    color: 'var(--color-text)',
    wordBreak: 'break-all' as const,
  },
  reference: {
    color: 'var(--color-reference)',
    fontWeight: 'var(--font-weight-semibold)',
    textDecoration: 'underline',
    cursor: 'pointer',
    transition: 'color 0.15s ease',
  },
};

export default StackPanel;