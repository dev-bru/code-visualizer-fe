/* eslint-disable @typescript-eslint/no-explicit-any */
const GlobalsPanel = ({
  globals = {},
  orderedGlobals = [],
}: {
  globals?: Record<string, any>;
  orderedGlobals?: string[];
}) => {
  const renderValue = (value: any): React.ReactNode => {
    if (value === null) return 'null';
    if (Array.isArray(value) && value[0] === 'REF') {
      return (
        <span style={globalsPanelStyles.reference}>
          REF → {value[1]}
        </span>
      );
    }
    if (typeof value === 'string') return `"${value}"`;
    if (typeof value === 'boolean') return value ? 'True' : 'False';
    return String(value);
  };

  return (
    <div style={globalsPanelStyles.panel}>
      <div style={globalsPanelStyles.header}>
        <span>🌍</span>
        <span style={globalsPanelStyles.title}>Globals</span>
      </div>
      <div style={globalsPanelStyles.content}>
        {orderedGlobals.length === 0 ? (
          <div style={globalsPanelStyles.emptyState}>No global variables</div>
        ) : (
          <div style={globalsPanelStyles.variablesList}>
            {orderedGlobals.map((varName) => (
              <div key={varName} style={globalsPanelStyles.variable}>
                <span style={globalsPanelStyles.varName}>{varName}</span>
                <span style={globalsPanelStyles.varSeparator}>:</span>
                <span style={globalsPanelStyles.varValue}>
                  {renderValue(globals[varName])}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const globalsPanelStyles = {
  panel: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    boxShadow: 'var(--shadow-sm)',
    overflow: 'hidden' as const,
    height: '100%',
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
  variablesList: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    gap: '8px',
  },
  variable: {
    display: 'flex' as const,
    gap: '4px',
    alignItems: 'flex-start' as const,
    wordBreak: 'break-all' as const,
  },
  varName: {
    color: 'var(--color-primary)',
    fontWeight: 'var(--font-weight-semibold)',
    flexShrink: 0,
  },
  varSeparator: {
    color: 'var(--color-text-secondary)',
    flexShrink: 0,
  },
  varValue: {
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

export default GlobalsPanel;